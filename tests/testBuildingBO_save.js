const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const dao = require( '../Data/BuildingDAO' );
const bo = require( '../BO/BuildingBO' );
const TABLE_NAME = dao.tableName;
const ID_KEY = require('config').get('ID_KEY');
const testSave = require( './testSave');
var useFuncs = {
    create: dao.createBuilding,
    save: bo.saveBuilding,
    searchDB: dao.getBuilding
};

describe('TestBuildingBO_Save', function()
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
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var testObj = mockDataList[ 0 ];

        testSave.testValueUpdate( useFuncs, testObj, "name", "Midnite Rider", bo.changeName, done );
    });

    it( 'test changeCompany success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var testObj = mockDataList[ 0 ];

        testSave.testValueUpdate( useFuncs, testObj, "companyId", "1", bo.changeCompany, done );
    });

    it( 'test addDamage success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var testObj = mockDataList[ 0 ];
        let damageAddValue = 1;

        testSave.testValueIncrement( useFuncs, testObj, "damage", damageAddValue, bo.addDamage, done );
    });

    it( 'test fixDamage success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var testObj = mockDataList[ 0 ];
        let damageFixValue = 1;
        let damageAddValue = 5;

        let updateCommands = [];
        updateCommands[ 0 ] = { "updateKey" : "damage", "updateValue" : damageAddValue, "updateFunc" : bo.addDamage };
        updateCommands[ 0 ].isOverwrite = false;
        updateCommands[ 1 ] = { "updateKey" : "damage", "updateValue" : damageFixValue, "updateFunc" : bo.fixDamage };
        updateCommands[ 1 ].isOverwrite = false;

        testSave.testValueUpdates( useFuncs, testObj, updateCommands, done );

    });

    it( 'test addGoods success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length > 1 );
        var testObj = mockDataList[ 1 ];
        let addedGoods = { "Food" : 10 };

        testSave.testValueIncrement( useFuncs, testObj, "inventory", addedGoods, bo.addGoods, done );
    });

    it( 'test removeGoods success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var testObj = mockDataList[ 0 ];
        let removedGoods = { "Ore" : 4 };
        assert.ok( testObj.inventory[ "Ore"] > 4 );

        testSave.testValueIncrement( useFuncs, testObj, "inventory", removedGoods, bo.removeGoods, done );
    });

    it( 'test change everything success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length > 1 );
        var testObj = mockDataList[ 1 ];
        let newDestination = { "x" : 5 , "y" : 6};
        let addedGoods = { "Stereo" : 5 };

        let updateCommands = [];
        updateCommands.push( { "updateKey" : "name" , "updateValue" : "Hanging Tree" , "updateFunc" : bo.changeName , "isOverwrite" : true } );
        updateCommands.push( { "updateKey" : "inventory" , "updateValue" : addedGoods , "updateFunc" : bo.addGoods , "isOverwrite" : false } );
        updateCommands.push( { "updateKey" : "companyId" , "updateValue" : "5" , "updateFunc" : bo.changeCompany , "isOverwrite" : true } );
        testSave.testValueUpdates( useFuncs, testObj, updateCommands, done );
    });

    it( 'test createBuilding success with custom id' , function(done)
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var testObj = mockDataList[ 0 ];

        bo.createBuilding( testObj, function( err, insertedObj )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error with bo.createBuilding" );
            }

            assert.ok( insertedObj );
            assert.equal( insertedObj[ ID_KEY ] , testObj[ ID_KEY ] );
            assert.deepEqual( insertedObj, testObj );
            dao.getBuilding( insertedObj[ ID_KEY ] , function( err2, foundResult )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error with dao.getBuilding" );
                }

                assert.ok( foundResult );
                assert.deepEqual( foundResult, insertedObj );
                done();
            });
        });
    });

    it( 'test createBuilding success with db generated id' , function(done)
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var testObj = mockDataList[ 0 ];
        delete testObj[ ID_KEY ];

        bo.createBuilding( testObj, function( err, insertedObj )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error with bo.createBuilding" );
            }

            assert.ok( insertedObj );
            assert.ok( insertedObj[ ID_KEY ] );
            testObj[ ID_KEY ] = insertedObj[ ID_KEY ];
            assert.deepEqual( insertedObj, testObj );
            dao.getBuilding( insertedObj[ ID_KEY ] , function( err2, foundResult )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error with dao.getBuilding" );
                }

                assert.ok( foundResult );
                assert.deepEqual( foundResult, insertedObj );
                done();
            });
        });
    });

    //after() is run after all tests have completed.
    //close down the database connection
    after( function( done )
    {
        dataAPI.closeConnection( done );
    });
});
