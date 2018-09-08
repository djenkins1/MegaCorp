const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const dao = require( '../Data/PlanetDAO' );
const bo = require( '../BO/PlanetBO' );
const TABLE_NAME = dao.tableName;
const ID_KEY = require('config').get('ID_KEY');
const testSave = require( './testSave');
var useFuncs = {
    create: dao.createPlanet,
    save: bo.savePlanet,
    searchDB: dao.getPlanet
};

describe('TestPlanetBO_Save', function()
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
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var testObj = mockDataList[ 0 ];

        testSave.testValueUpdate( useFuncs, testObj, "name", "Earth", bo.changeName, done );
    });

    it( 'test changeTaxes success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var testObj = mockDataList[ 0 ];

        testSave.testValueUpdate( useFuncs, testObj, "taxes", 0.15, bo.changeTaxes, done );
    });

    it( 'test addMoney success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var testObj = mockDataList[ 0 ];
        let moneyAddValue = 1000;

        testSave.testValueIncrement( useFuncs, testObj, "money", moneyAddValue, bo.addMoney, done );
    });

    it( 'test addPopulation success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var testObj = mockDataList[ 0 ];
        let peopleAdd = 25;

        testSave.testValueIncrement( useFuncs, testObj, "population", peopleAdd, bo.addPopulation, done );
    });


    it( 'test change everything success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );

        assert.ok( mockDataList.length > 1 );
        var testObj = mockDataList[ 1 ];
        var addedMoney = 1005;

        let updateCommands = [];
        updateCommands.push( { "updateKey" : "name" , "updateValue" : "Valerian" , "updateFunc" : bo.changeName , "isOverwrite" : true } );
        updateCommands.push( { "updateKey" : "taxes" , "updateValue" : 0.23 , "updateFunc" : bo.changeTaxes , "isOverwrite" : true } );
        updateCommands.push( { "updateKey" : "money" , "updateValue" : addedMoney , "updateFunc" : bo.addMoney , "isOverwrite" : false } );
        testSave.testValueUpdates( useFuncs, testObj, updateCommands, done );
    });

    it( 'test createPlanet success with custom id' , function(done)
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var testObj = mockDataList[ 0 ];

        bo.createPlanet( testObj, function( err, insertedObj )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error with bo.createPlanet" );
            }

            assert.ok( insertedObj );
            assert.equal( insertedObj[ ID_KEY ] , testObj[ ID_KEY ] );
            assert.deepEqual( insertedObj, testObj );
            useFuncs.searchDB( insertedObj[ ID_KEY ] , function( err2, foundResult )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error with searchDB" );
                }

                assert.ok( foundResult );
                assert.deepEqual( foundResult, insertedObj );
                done();
            });
        });
    });

    it( 'test createPlanet success with db generated id' , function(done)
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var testObj = mockDataList[ 0 ];
        delete testObj[ ID_KEY ];

        bo.createPlanet( testObj, function( err, insertedObj )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error with bo.createPlanet" );
            }

            assert.ok( insertedObj );
            assert.ok( insertedObj[ ID_KEY ] );
            testObj[ ID_KEY ] = insertedObj[ ID_KEY ];
            assert.deepEqual( insertedObj, testObj );
            useFuncs.searchDB( insertedObj[ ID_KEY ] , function( err2, foundResult )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error with searchDB" );
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
