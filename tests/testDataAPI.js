const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );

const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "Company" ];
var mockDataList = require("../sampleData/" + TABLE_NAME + ".json" );

describe('TestDataAPI', function() 
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


    it( 'test insertOne' , function( done )
    {
        assert.ok( mockDataList.length > 0 );
        var toInsert = mockDataList[ 0 ];
        dataAPI.insertOne( TABLE_NAME , toInsert, function( err , result )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from DataAPI.insertOne" );
                done();
                return;
            }
            assert.ok( result._id );
            assert.equal( toInsert.name , result.name );
            assert.equal( toInsert.money , result.money );
            done();
        });
    });

    it( 'test findById' , function( done )
    {
        assert.ok( mockDataList.length > 0 );
        var toInsert = mockDataList[ 0 ];
        dataAPI.insertOne( TABLE_NAME , toInsert, function( err , result )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from DataAPI.insertOne" );
                done();
                return;
            }
            assert.ok( result._id );
            assert.equal( toInsert.name , result.name );
            assert.equal( toInsert.money , result.money );
            dataAPI.findById( TABLE_NAME , result._id, function( err2, result2 )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from DataAPI.findById" );
                    done();
                    return;
                }

                assert.ok( result2._id );
                assert.equal( result2.name , toInsert.name );
                assert.equal( result2.money, toInsert.money );
                done();
            });
        });
    });

    it( 'test findAll after insertMany' , function( done )
    {
        assert.ok( mockDataList.length > 0 );
        dataAPI.insertMany( TABLE_NAME, mockDataList, function( err, resultsInsert )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from DataAPI.insertMany" );
                done();
                return;
            }   

            assert.ok( resultsInsert );
            assert.equal( resultsInsert.length, mockDataList.length );
            dataAPI.findAll( TABLE_NAME, function( err2, resultsFound )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from DataAPI.findAll" );
                    done();
                    return;
                }

                assert.ok( resultsFound );
                assert.equal( resultsFound.length, resultsInsert.length );
                done();
            });     
        });      
    });

    it( 'test replaceOne' , function( done )
    {
        assert.ok( mockDataList.length > 0 );
        var toInsert = mockDataList[ 0 ];
        dataAPI.insertOne( TABLE_NAME , toInsert, function( err , result )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from DataAPI.insertOne" );
                done();
                return;
            }

            assert.ok( result );
            assert.equal( result.name, toInsert.name );
            result.name = "Test Name";
            result.money = result.money * 3;
            dataAPI.replaceOne( TABLE_NAME, result, function( err2, updateResult )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from DataAPI.replaceOne" );
                    done();
                    return;
                }

                assert.ok( updateResult );
                assert.equal( updateResult.result.nModified , 1 );
                done();
            });
        });
    });

    it( 'test removeOne', function( done )
    {
        assert.ok( mockDataList.length > 0 );
        var toInsert = mockDataList[ 0 ];
        dataAPI.insertOne( TABLE_NAME , toInsert, function( err , result )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from DataAPI.insertOne" );
                done();
                return;
            }

            assert.ok( result );
            assert.equal( result.name, toInsert.name );
            dataAPI.removeOne( TABLE_NAME, result, function( err2, removeResult )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from DataAPI.removeOne" );
                    done();
                    return;
                }

                assert.ok( removeResult );
                assert.equal( removeResult.result.n , 1 );
                dataAPI.findById( TABLE_NAME, result._id, function( err3, findResult )
                {
                    if ( err3 )
                    {
                        console.log( err3 );
                        assert.fail( "Error occured from DataAPI.findById" );
                        done();
                        return;
                    }         

                    if ( findResult )
                    {
                        assert.fail( "Deleted Record should not have been returned" );
                    }

                    done();       
                });
            });
        });
    });

    it( 'test findOneLike after insertMany' , function( done )
    {
        assert.ok( mockDataList.length > 0 );
        dataAPI.insertMany( TABLE_NAME, mockDataList, function( err, resultsInsert )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from DataAPI.insertMany" );
                done();
                return;
            }   

            assert.ok( resultsInsert );
            assert.equal( resultsInsert.length, mockDataList.length );
            var likeQuery = { "planetHq" : "2" };
            dataAPI.findOneLike( TABLE_NAME, likeQuery, function( err2, resultFound )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from DataAPI.findOneLike" );
                    done();
                    return;
                }

                assert.ok( resultFound );
                assert.equal( resultFound.planetHq, likeQuery.planetHq );
                done();
            });     
        });      
    });

    it( 'test findManyLike after insertMany' , function( done )
    {
        var testMockDataList = require( "../sampleData/testData/companiesAllSamePlanetHq.json" );
        assert.ok( testMockDataList.length > 0 );
        dataAPI.insertMany( TABLE_NAME, testMockDataList, function( err, resultsInsert )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from DataAPI.insertMany" );
                done();
                return;
            }   

            assert.ok( resultsInsert );
            assert.equal( resultsInsert.length, testMockDataList.length );
            var likeQuery = { "planetHq" : "2" };
            dataAPI.findManyLike( TABLE_NAME, likeQuery, function( err2, resultsFound )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from DataAPI.findManyLike" );
                    done();
                    return;
                }

                assert.ok( resultsFound );
                assert.equal( resultsFound.length, resultsInsert.length );
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

