const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const companyDAO = require( '../Data/CompanyDAO' );
var totalCreated = 0;

describe('TestCompanyDAO', function() 
{
    //The before() callback gets run before all tests in the suite.
    //Clean and setup the database. 
    before( function( done )
    {
        dataAPI.cleanDatabase( function()
        {
            dataAPI.setupDatabase( done );
        });
    });

    //The beforeEach() callback gets run before each test in the suite.
    beforeEach( function( done )
    {
        done();
    });

    it( 'test insert company' , function( done )
    {
        var company = { "name" : "New Relic" , "money" : 100000 };
        companyDAO.createCompany( company , function( err , insertedObj )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from companyDAO.createCompany" );
                done();
                return;
            }
            assert.ok( insertedObj._id );
            totalCreated++;
            assert.equal( company.name , insertedObj.name );
            assert.equal( company.money , insertedObj.money );
            done();
        });
    });

    it( 'test getCompany by id' , function( done )
    {
        var company = { "name" : "New Relic" , "money" : 100000 };
        companyDAO.createCompany( company , function( err , insertedObj )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from companyDAO.createCompany" );
                done();
                return;
            }

            assert.ok( insertedObj._id );
            totalCreated++;
            companyDAO.getCompany( insertedObj._id , function( err2 , result )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from companyDAO.getCompany" );
                    done();
                    return;
                }

                assert.ok( result );
                assert.equal( result[ "_id" ].toString() , insertedObj[ "_id" ].toString() );
                assert.equal( result[ "name" ] , company[ "name" ] );
                assert.equal( result[ "money" ] , company[ "money" ] );
                done();
            });
        });
    });

    it( 'test getAllCompanies' , function( done )
    {
        companyDAO.getAllCompanies( function( err, companyList )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from companyDAO.getAllCompanies" );
                done();
                return;
            }

            assert.ok( companyList );
            assert.equal( companyList.length, totalCreated );
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
