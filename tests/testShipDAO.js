const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const shipDAO = require( '../Data/ShipDAO' );
const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "Ship" ];
var mockDataList = require( "../sampleData/testData/shipsDockedAndTravel.json" );

describe('TestShipDAO', function() 
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

    it( 'test getShipsAtLocation for docked after InsertMany', function( done )
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

            if ( mockDataList[ 0 ].location.z == undefined )
            {
                assert.fail( "MockDataList[0] has undefined z location so is not docked" );
                done();
                return;                
            }

            shipDAO.getShipsAtLocation( mockDataList[ 0 ].location, function( err2, foundResults )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from shipDAO.getShipsAtLocation" );
                    done();
                    return;
                }

                assert.equal( foundResults.length , 1 );
                assert.deepEqual( foundResults[ 0 ].location, mockDataList[ 0 ].location );
                done();
            });
        });
    });

    it( 'test getShipsAtLocation for traveling after InsertMany', function( done )
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

            if ( mockDataList[ 1 ].location.z )
            {
                assert.fail( "MockDataList[0] has defined z location so is not traveling" );
                done();
                return;                
            }
        
            shipDAO.getShipsAtLocation( mockDataList[ 1 ].location, function( err2, foundResults )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from shipDAO.getShipsAtLocation" );
                    done();
                    return;
                }

                assert.equal( foundResults.length , 1 );
                assert.deepEqual( foundResults[ 0 ].location, mockDataList[ 1 ].location );
                done();
            });
        });
    });

    it( 'test getShipsInSystemLocation after InsertMany', function( done )
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

            if ( mockDataList[ 1 ].location.z )
            {
                assert.fail( "MockDataList[0] has defined z location so is not traveling" );
                done();
                return;                
            }
        
            shipDAO.getShipsInSystemLocation( mockDataList[ 1 ].location.x, mockDataList[ 1 ].location.y, function( err2, foundResults )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from shipDAO.getShipsInSystemLocation" );
                    done();
                    return;
                }

                assert.equal( foundResults.length , mockDataList.length );
                done();
            });
        });
    });

    it( 'test getShipsOwnedBy after InsertMany', function( done )
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

            if ( mockDataList[ 1 ].companyId == mockDataList[ 0 ].companyId )
            {
                assert.fail( "MockDataList[0] has same owner as MockDataList[1]" );
                done();
                return;                
            }
        
            shipDAO.getShipsOwnedBy( mockDataList[ 0 ].companyId, function( err2, foundResults )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from shipDAO.getShipsOwnedBy" );
                    done();
                    return;
                }

                assert.equal( foundResults.length , 1 );
                assert.equal( foundResults[ 0 ].companyId, mockDataList[ 0 ].companyId );
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
