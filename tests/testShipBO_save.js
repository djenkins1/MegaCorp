const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const shipDAO = require( '../Data/ShipDAO' );
const shipBO = require( '../BO/ShipBO' );
const TABLE_NAME = shipDAO.tableName;
const ID_KEY = require('config').get('ID_KEY');

function testValueUpdates( shipObj, updateCommands, onFinish )
{
    shipDAO.createShip( shipObj , function( err , insertedObj )
    {
        if ( err )
        {
            console.log( err );
            assert.fail( "Error occured from shipDAO.createShip" );
            onFinish();
            return;
        }

        assert.ok( insertedObj._id );
        assert.deepEqual( insertedObj, shipObj );
        for ( var i = 0; i < updateCommands.length; i++ )
        {
            let updateFunc = updateCommands[ i ].updateFunc;
            let updateKey = updateCommands[ i ].updateKey;
            let updateValue = updateCommands[ i ].updateValue;
            var resultValue = updateFunc( insertedObj , updateValue );
            assert.ok( resultValue );
            assert.equal( insertedObj[ updateKey ] , resultValue );
        }

        shipBO.saveShip( insertedObj, function( err2, updatedObj )
        {
            if ( err2 )
            {
                console.log( err2 );
                assert.fail( "Error occured from shipBO.saveShip" );
                onFinish();
                return;
            }

            assert.ok( updatedObj );
            assert.deepEqual( updatedObj, insertedObj );
            shipDAO.getShip( updatedObj[ ID_KEY ] , function( err3, foundResult )
            {
                if ( err3 )
                {
                    console.log( err3 );
                    assert.fail( "Error occured from shipDAO.getShip" );
                    onFinish();
                    return;
                }

                assert.deepEqual( foundResult, insertedObj );
                onFinish();
            });
        });
    });
}

function testValueUpdate( shipObj, updateKey, updateValue, updateFunc, onFinish )
{
    let updateCommands = [];
    updateCommands[ 0 ] = { "updateKey" : updateKey, "updateValue" : updateValue, "updateFunc" : updateFunc };
    testValueUpdates( shipObj, updateCommands, onFinish );
}

describe('TestShipBO_Save', function()
{
    //The before() callback gets run before all tests in the suite.
    before( function( done )
    {
        done();
    });

    //The beforeEach() callback gets run before each test in the suite.
    //Clean and setup the database.
    beforeEach( function( done )
    {
        dataAPI.cleanDatabase( function()
        {
            dataAPI.setupDatabase( done );
        });
    });

    it( 'test changeName success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var shipObj = mockDataList[ 0 ];

        testValueUpdate( shipObj, "name", "Beverly Hills", shipBO.changeName, done );
    });

    it( 'test changeCompany success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var shipObj = mockDataList[ 0 ];

        testValueUpdate( shipObj, "companyId", "1", shipBO.changeCompany, done );
    });

    //TODO: need to fix this test case
    //skipped until testValueUpdate can handle this case where returnValue != updateValue
    xit( 'test clearDestination success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var shipObj = mockDataList[ 1 ];

        testValueUpdate( shipObj, "destination", {}, shipBO.clearDestination, done );
    });

    it( 'test changeDestination success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var shipObj = mockDataList[ 0 ];
        let newDestination = { "x" : 1 , "y" : 1 , "z" : 1 };

        testValueUpdate( shipObj, "destination", newDestination, shipBO.changeDestination, done );
    });

    /*
    //TODO: test each
        moveShip
        addGoods
        removeGoods
        useFuel
        fixDamage
        addDamage
    */


    //after() is run after all tests have completed.
    //close down the database connection
    after( function( done )
    {
        dataAPI.closeConnection( done );
    });
});
