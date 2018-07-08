const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const priceDAO = require( '../Data/PriceDAO' );
const TABLE_NAME = priceDAO.tableName;
var mockDataList = require( "../sampleData/prices.json" );

describe('TestPriceDAO', function()
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

    it( 'test getPriceByGood after insertMany' , function( done )
    {
        assert.ok( mockDataList.length > 0 );
        assert.ok( mockDataList[ 0 ].good );
        assert.ok(mockDataList[ 0 ].planetId );
        dataAPI.insertMany( TABLE_NAME, mockDataList, function( err, insertResults )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from dataAPI.insertMany" );
                done();
                return;
            }

            if ( mockDataList[ 0 ].good == mockDataList[ 1 ].good )
            {
                assert.fail( "MockDataList[0] has same good name as MockDataList[1]" );
                done();
                return;
            }

            priceDAO.getPriceByGood( mockDataList[ 0 ].good, mockDataList[ 0 ].planetId, function( err2, foundResult )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from priceDAO.getPriceByGood" );
                    done();
                    return;
                }

                assert.ok( foundResult );
                assert.equal( foundResult.good, mockDataList[ 0 ].good );
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
