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

    it( 'test moveShip success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var shipObj = mockDataList[ 0 ];
        let newLocation = { "x" : 1 , "y" : 1 , "z" : 1 };

        testSave.testValueUpdate( useFuncs, shipObj, "location", newLocation, shipBO.moveShip, done );
    });

    it( 'test addDamage success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var shipObj = mockDataList[ 0 ];
        let damageAddValue = 1;

        testSave.testValueIncrement( useFuncs, shipObj, "damage", damageAddValue, shipBO.addDamage, done );
    });

    it( 'test fixDamage success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var shipObj = mockDataList[ 0 ];
        let damageFixValue = 1;
        let damageAddValue = 5;

        let updateCommands = [];
        updateCommands[ 0 ] = { "updateKey" : "damage", "updateValue" : damageAddValue, "updateFunc" : shipBO.addDamage };
        updateCommands[ 0 ].isOverwrite = false;
        updateCommands[ 1 ] = { "updateKey" : "damage", "updateValue" : damageFixValue, "updateFunc" : shipBO.fixDamage };
        updateCommands[ 1 ].isOverwrite = false;

        testSave.testValueUpdates( useFuncs, shipObj, updateCommands, done );

    });

    it( 'test addGoods success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length > 1 );
        var shipObj = mockDataList[ 1 ];
        let addedGoods = { "Food" : 20 };

        testSave.testValueIncrement( useFuncs, shipObj, "inventory", addedGoods, shipBO.addGoods, done );
    });

    it( 'test removeGoods success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var shipObj = mockDataList[ 0 ];
        let removedGoods = { "Spice" : 10 };
        assert.ok( shipObj.inventory[ "Spice"] > 10 );

        testSave.testValueIncrement( useFuncs, shipObj, "inventory", removedGoods, shipBO.removeGoods, done );
    });

    it( 'test useFuel success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var shipObj = mockDataList[ 0 ];
        assert.ok( shipObj.inventory );

        testSave.testValueIncrement( useFuncs, shipObj, "inventory", {}, shipBO.useFuel, done );
    });

    it( 'test change everything success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );

        assert.ok( mockDataList.length > 1 );
        var shipObj = mockDataList[ 1 ];
        let newDestination = { "x" : 5 , "y" : 6};
        let addedGoods = { "Stereo" : 5 };

        let updateCommands = [];
        updateCommands.push( { "updateKey" : "name" , "updateValue" : "Stereo Hearts" , "updateFunc" : shipBO.changeName , "isOverwrite" : true } );
        updateCommands.push( { "updateKey" : "destination" , "updateValue" : newDestination , "updateFunc" : shipBO.changeDestination , "isOverwrite" : true } );
        updateCommands.push( { "updateKey" : "location" , "updateValue" : newDestination , "updateFunc" : shipBO.moveShip , "isOverwrite" : true } );
        updateCommands.push( { "updateKey" : "inventory" , "updateValue" : addedGoods , "updateFunc" : shipBO.addGoods , "isOverwrite" : false } );
        updateCommands.push( { "updateKey" : "companyId" , "updateValue" : "5" , "updateFunc" : shipBO.changeCompany , "isOverwrite" : true } );
        testSave.testValueUpdates( useFuncs, shipObj, updateCommands, done );
    });


    //after() is run after all tests have completed.
    //close down the database connection
    after( function( done )
    {
        dataAPI.closeConnection( done );
    });
});
