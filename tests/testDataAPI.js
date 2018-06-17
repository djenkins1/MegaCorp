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


    //after() is run after all tests have completed.
    //close down the database connection
    after( function( done ) 
    {
        dataAPI.closeConnection( done );
    });
});

/*

exports.findById = findById;
exports.findAll = findAll;
exports.replaceOne = replaceOne;
exports.removeOne = removeOne;
exports.findOneLike = findOneLike;
exports.findManyLike = findManyLike;
*/
