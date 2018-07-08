const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const shipDAO = require( '../Data/ShipDAO' );
const shipBO = require( '../BO/ShipBO' );
const TABLE_NAME = shipDAO.tableName;
const ID_KEY = require('config').get('ID_KEY');
const testSave = require( './testSave');
var useFuncs = {
    create: shipDAO.createShip,
    save: shipBO.saveShip,
    searchDB: shipDAO.getShip
};

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

        testSave.testValueUpdate( useFuncs, shipObj, "name", "Beverly Hills", shipBO.changeName, done );
    });

    it( 'test changeCompany success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var shipObj = mockDataList[ 0 ];

        testSave.testValueUpdate( useFuncs, shipObj, "companyId", "1", shipBO.changeCompany, done );
    });

    it( 'test clearDestination success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var shipObj = mockDataList[ 1 ];

        testSave.testValueUpdate( useFuncs, shipObj, "destination", {}, shipBO.clearDestination, done );
    });

    it( 'test changeDestination success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var shipObj = mockDataList[ 0 ];
        let newDestination = { "x" : 1 , "y" : 1 , "z" : 1 };

        testSave.testValueUpdate( useFuncs, shipObj, "destination", newDestination, shipBO.changeDestination, done );
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
