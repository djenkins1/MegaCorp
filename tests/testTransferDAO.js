const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const transferDAO = require( '../Data/TransferDAO' );
const TABLE_NAME = transferDAO.tableName;
var mockDataList = require( "../sampleData/testData/transfersSameCompany.json" );

describe('TestTransferDAO', function() 
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

    it( 'test getAllFromCompany same company after insertMany' , function( done )
    {
        assert.ok( mockDataList.length > 1 );
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
                assert.fail( "MockDataList[0] has different companyId then MockDataList[1]" );
                done();
                return;
            }

            transferDAO.getAllFromCompany( mockDataList[ 0 ].companyId, function( err2, foundResults )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from transferDAO.getAllFromCompany" );
                    done();
                    return;
                }

                assert.equal( foundResults.length, mockDataList.length );
                assert.equal( foundResults[ 0 ].companyId, mockDataList[ 0 ].companyId );
                done();
            });
        });
    });

    it( 'test getAllFromCompany different companies after insertMany' , function( done )
    {
        var diffMockDataList = require( "../sampleData/testData/transfersDiffCompanies.json" );
        assert.ok( diffMockDataList.length > 1 );
        dataAPI.insertMany( TABLE_NAME, diffMockDataList, function( err, insertResults )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from dataAPI.insertMany" );
                done();
                return;
            }

            if ( diffMockDataList[ 0 ].companyId == diffMockDataList[ 1 ].companyId )
            {
                assert.fail( "DiffMockDataList[0] has same companyId as DiffMockDataList[1]" );
                done();
                return;
            }

            transferDAO.getAllFromCompany( diffMockDataList[ 0 ].companyId, function( err2, foundResults )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from transferDAO.getAllFromCompany" );
                    done();
                    return;
                }

                assert.equal( foundResults.length, 1 );
                assert.equal( foundResults[ 0 ].companyId, diffMockDataList[ 0 ].companyId );
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

