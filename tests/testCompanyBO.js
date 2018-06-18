const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const companyDAO = require( '../Data/CompanyDAO' );
const companyBO = require( '../BO/CompanyBO' );
const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "Company" ];

describe('TestCompanyBO', function() 
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

    it( 'test changeName without saving' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var newTestName = "New Company";
        if ( newTestName == mockDataList[ 0 ].name )
        {
            assert.fail( "mockDataList[0] already has test name: " + newTestName );
            done();
            return;
        }

        assert.equal( companyBO.changeName( mockDataList[ 0 ] , newTestName ) , newTestName );
        assert.equal( mockDataList[ 0 ].name, newTestName );
        done();
    });

    it( 'test changeName newName not string without saving' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var newTestName = 104;
        var oldName = mockDataList[ 0 ].name;
        if ( newTestName == oldName )
        {
            assert.fail( "mockDataList[0] already has test name: " + newTestName );
            done();
            return;
        }

        var resultName = companyBO.changeName( mockDataList[ 0 ] , newTestName );
        if ( resultName )
        {
            assert.fail( "mockDataList[0] changed name to non string value: " + resultName );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].name, oldName );
        done();
    });

    it( 'test changeName newName old name undefined without saving' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var newTestName = "New Company";
        if ( newTestName == mockDataList[ 0 ].name )
        {
            assert.fail( "mockDataList[0] already has test name: " + newTestName );
            done();
            return;
        }

        mockDataList[ 0 ].name = undefined;
        var resultName = companyBO.changeName( mockDataList[ 0 ] , newTestName );
        if ( resultName )
        {
            assert.fail( "mockDataList[0] changed name for undefined old name: " + resultName );
            done();
            return;
        }

        if ( mockDataList[ 0 ].name )
        {
            assert.fail( "mockDataList[0] now has defined name: " + mockDataList[ 0 ].name );
        }

        done();
    });

    //after() is run after all tests have completed.
    //close down the database connection
    after( function( done ) 
    {
        dataAPI.closeConnection( done );
    });
});
