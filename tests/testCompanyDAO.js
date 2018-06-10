const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const companyDAO = require( '../Data/CompanyDAO' );

describe('TestCompanyDAO', function() 
{
    //The before() callback gets run before all tests in the suite.
    //Clean and setup the database. 
    before( function( done )
    {
        dataAPI.cleanDatabase( function()
        {
            dataAPI.setupDatabase( done );
        } );
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
            assert.ok( insertedObj._id );
            assert.equal( company.name , insertedObj.name );
            assert.equal( company.money , insertedObj.money );
            done();
        });
    });

    //TODO: getCompany
    //TODO: getAllCompanies

    //after() is run after all tests have completed.
    //close down the database connection
    after( function( done ) 
    {
        dataAPI.closeConnection( done );
    });
});
