const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const buildingDAO = require( '../Data/BuildingDAO' );
const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "Building" ];
var mockDataList = require( "../sampleData/testData/buildingsAllSameCompany.json" );

describe('TestBuildingDAO', function() 
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

    it( 'test getBuildingsOwnedBy after InsertMany', function( done )
    {
        assert.ok( mockDataList.length > 0 );
        dataAPI.insertMany( TABLE_NAME, mockDataList, function( err, insertResults )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from dataAPI.insertMany" );
                done();
                return;
            }

            if ( mockDataList[ 0 ].companyId != mockDataList[ 1 ].companyId )
            {
                assert.fail( "MockDataList[0] does not have same owner as MockDataList[1]" );
                done();
                return;                
            }

            buildingDAO.getBuildingsOwnedBy( mockDataList[ 0 ].companyId, function( err2, foundResults )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from buildingDAO.getBuildingsOwnedBy" );
                    done();
                    return;
                }

                assert.equal( foundResults.length , mockDataList.length );
                done();
            });
        });
    });

    it( 'test getBuildingsOwnedBy no results after InsertMany', function( done )
    {
        assert.ok( mockDataList.length > 0 );
        dataAPI.insertMany( TABLE_NAME, mockDataList, function( err, insertResults )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from dataAPI.insertMany" );
                done();
                return;
            }

            var mockTestId = "223";
            if ( mockTestId == mockDataList[ 0 ].companyId || mockTestId == mockDataList[ 1 ].companyId )
            {
                assert.fail( "MockDataList contains the test company id: " + mockTestId );
                done();
                return;                
            }

            buildingDAO.getBuildingsOwnedBy( mockTestId, function( err2, foundResults )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from buildingDAO.getBuildingsOwnedBy" );
                    done();
                    return;
                }

                assert.equal( foundResults.length , 0 );
                done();
            });
        });
    });

    it( 'test getBuildingsOwnedBy different owners after InsertMany', function( done )
    {
        var diffOwnerMockDataList = require( "../sampleData/testData/buildingsDifferentCompanies.json" );
        assert.ok( diffOwnerMockDataList.length > 0 );
        dataAPI.insertMany( TABLE_NAME, diffOwnerMockDataList, function( err, insertResults )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from dataAPI.insertMany" );
                done();
                return;
            }

            if ( diffOwnerMockDataList[ 0 ].companyId == diffOwnerMockDataList[ 1 ].companyId )
            {
                assert.fail( "diffOwnerMockDataList[0] has same owner as diffOwnerMockDataList[1]" );
                done();
                return;                
            }

            buildingDAO.getBuildingsOwnedBy( diffOwnerMockDataList[ 0 ].companyId, function( err2, foundResults )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from buildingDAO.getBuildingsOwnedBy" );
                    done();
                    return;
                }

                assert.equal( foundResults.length , 1 );
                assert.equal( foundResults[ 0 ].companyId, diffOwnerMockDataList[ 0 ].companyId );
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
