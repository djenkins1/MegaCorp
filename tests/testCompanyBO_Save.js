const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const companyDAO = require( '../Data/CompanyDAO' );
const companyBO = require( '../BO/CompanyBO' );
const TABLE_NAME = companyDAO.tableName;
const ID_KEY = require('config').get('ID_KEY');
const testSave = require( './testSave');
var useFuncs = {
    create: companyDAO.createCompany,
    save: companyBO.saveCompany,
    searchDB: companyDAO.getCompany
};

describe('TestCompanyBO_Save', function()
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
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var companyObj = mockDataList[ 0 ];

        testSave.testValueUpdate( useFuncs, companyObj, "name", "Western Intersect", companyBO.changeName, done );
    });

    it( 'test changeLogo success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var companyObj = mockDataList[ 0 ];

        testSave.testValueUpdate( useFuncs, companyObj, "logo", "cloud", companyBO.changeLogo, done );
    });

    it( 'test addMoney success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var companyObj = mockDataList[ 0 ];

        testSave.testValueIncrement( useFuncs, companyObj, "money", 5, companyBO.addMoney, done );
    });

    it( 'test removeMoney success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var companyObj = mockDataList[ 0 ];

        testSave.testValueIncrement( useFuncs, companyObj, "money", 5, companyBO.removeMoney, done );
    });

    it( 'test addEmployees success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var companyObj = mockDataList[ 0 ];

        testSave.testValueIncrement( useFuncs, companyObj, "employees", 5, companyBO.addEmployees, done );
    });

    it( 'test removeEmployees success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var companyObj = mockDataList[ 0 ];

        testSave.testValueIncrement( useFuncs, companyObj, "employees", 5, companyBO.removeEmployees, done );
    });

    it( 'test changeHQ success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var companyObj = mockDataList[ 0 ];

        testSave.testValueUpdate( useFuncs, companyObj, "planetHq", "55", companyBO.changeHq, done );
    });

    it( 'test change everything success and save' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var companyObj = mockDataList[ 0 ];

        let updateCommands = [];
        updateCommands.push( { "updateKey" : "name" , "updateValue" : "Papa Americano" , "updateFunc" : companyBO.changeName , "isOverwrite" : true } );
        updateCommands.push( { "updateKey" : "logo" , "updateValue" : "cookie" , "updateFunc" : companyBO.changeLogo, "isOverwrite" : true } );
        updateCommands.push( { "updateKey" : "money" , "updateValue" : 50 , "updateFunc" : companyBO.addMoney , "isOverwrite" : false } );
        updateCommands.push( { "updateKey" : "employees" , "updateValue" : 5 , "updateFunc" : companyBO.removeEmployees, "isOverwrite" : false } );
        updateCommands.push( { "updateKey" : "planetHq" , "updateValue" : "20" , "updateFunc" : companyBO.changeHq, "isOverwrite" : true } );
        updateCommands.push( { "updateKey" : "money" , "updateValue" : 10 , "updateFunc" : companyBO.removeMoney, "isOverwrite" : false } );
        testSave.testValueUpdates( useFuncs, companyObj, updateCommands, done );
    });

    it( 'test createCompany success with custom id' , function(done)
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var companyObj = mockDataList[ 0 ];

        companyBO.createCompany( companyObj, function( err, insertedObj )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error with companyBO.createCompany" );
            }

            assert.ok( insertedObj );
            assert.equal( insertedObj[ ID_KEY ] , companyObj[ ID_KEY ] );
            assert.deepEqual( insertedObj, companyObj );
            companyDAO.getCompany( insertedObj[ ID_KEY ] , function( err2, foundResult )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error with companyDAO.getCompany" );
                }

                assert.ok( foundResult );
                assert.deepEqual( foundResult, insertedObj );
                done();
            });
        });
    });

    it( 'test createCompany success with db generated id' , function(done)
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        assert.ok( mockDataList.length >= 1 );
        var companyObj = mockDataList[ 0 ];
        delete companyObj[ ID_KEY ];

        companyBO.createCompany( companyObj, function( err, insertedObj )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error with companyBO.createCompany" );
            }

            assert.ok( insertedObj );
            assert.ok( insertedObj[ ID_KEY ] );
            assert.equal( insertedObj.name, companyObj.name );
            assert.equal( insertedObj.money, companyObj.money );
            assert.equal( insertedObj.employees, companyObj.employees );
            assert.equal( insertedObj.planetHq, companyObj.planetHq );
            companyDAO.getCompany( insertedObj[ ID_KEY ] , function( err2, foundResult )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error with companyDAO.getCompany" );
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
