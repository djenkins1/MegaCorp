const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const planetDAO = require( '../Data/PlanetDAO' );
const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "Planet" ];
var mockDataList = require( "../sampleData/testData/planetsDifferentSystems.json" );

describe('TestPlanetDAO', function() 
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

    it( 'test getPlanetsInSystem different systems after InsertMany', function( done )
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

            if ( mockDataList[ 0 ].systemId == mockDataList[ 1 ].systemId )
            {
                assert.fail( "MockDataList[0] has same systemId as MockDataList[1]" );
                done();
                return;                
            }

            planetDAO.getPlanetsInSystem( mockDataList[ 0 ].systemId, function( err2, foundResults )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from planetDAO.getPlanetsInSystem" );
                    done();
                    return;
                }

                assert.equal( foundResults.length , 1 );
                assert.equal( foundResults[ 0 ].systemId, mockDataList[ 0 ].systemId );
                done();
            });
        });
    });

    it( 'test getPlanetsInSystem same systems after InsertMany', function( done )
    {
        var diffMockDataList = require( "../sampleData/testData/planetsSameSystem.json" );
        assert.ok( diffMockDataList.length > 0 );
        dataAPI.insertMany( TABLE_NAME, diffMockDataList, function( err, insertResults )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from dataAPI.insertMany" );
                done();
                return;
            }

            if ( diffMockDataList[ 0 ].systemId != diffMockDataList[ 1 ].systemId )
            {
                assert.fail( "diffMockDataList[0] does not have same systemId as diffMockDataList[1]" );
                done();
                return;                
            }

            planetDAO.getPlanetsInSystem( diffMockDataList[ 0 ].systemId, function( err2, foundResults )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from planetDAO.getPlanetsInSystem" );
                    done();
                    return;
                }

                assert.equal( foundResults.length , diffMockDataList.length );
                done();
            });
        });
    });

    it( 'test getPlanetsInSystem no results after InsertMany', function( done )
    {
        var diffMockDataList = require( "../sampleData/testData/planetsSameSystem.json" );
        assert.ok( diffMockDataList.length > 0 );
        dataAPI.insertMany( TABLE_NAME, diffMockDataList, function( err, insertResults )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from dataAPI.insertMany" );
                done();
                return;
            }

            var testMockId = "223";
            if ( testMockId == diffMockDataList[ 0 ].systemId || testMockId == diffMockDataList[ 1 ].systemId )
            {
                assert.fail( "diffMockDataList contains systemId with test id: " + testMockId );
                done();
                return;                
            }

            planetDAO.getPlanetsInSystem( testMockId, function( err2, foundResults )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from planetDAO.getPlanetsInSystem" );
                    done();
                    return;
                }

                assert.equal( foundResults.length , 0 );
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
