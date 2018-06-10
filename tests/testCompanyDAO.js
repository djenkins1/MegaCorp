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
        var company = { "name" : "Old Relic" , "money" : 100002 };
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

    it( 'test updateCompany' , function( done )
    {
        var company = { "name" : "Relic 2.0" , "money" : 200000 };
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

            var changedCompany = {};
            changedCompany.name = "Dream On";
            changedCompany.money = insertedObj.money * 2;
            changedCompany._id = insertedObj._id;

            companyDAO.updateCompany( changedCompany, function( err2, updateResult )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from companyDAO.updateCompany" );
                    done();
                    return;
                }

                assert.ok( updateResult );
                assert.equal( updateResult.result.nModified , 1 );
                done();      
            });
        });
    });

    it( 'test removeCompany' , function( done )
    {
        var company = { "name" : "Relic 3.0" , "money" : 125000 };
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

            companyDAO.removeCompany( insertedObj, function( err2, deleteResult )
            {
                if ( err2 )
                {
                    console.log( err2 );
                    assert.fail( "Error occured from companyDAO.removeCompany" );
                    done();
                    return;
                }           

                assert.ok( deleteResult );
                assert.equal( deleteResult.result.n , 1 );
                totalCreated--;

                companyDAO.getCompany( insertedObj._id , function( err3 , result )
                {
                    if ( err3 )
                    {
                        console.log( err3 );
                        assert.fail( "Error occured from companyDAO.getCompany" );
                        done();
                        return;
                    }

                    if ( result )
                    {
                        assert.fail( "Deleted Record should not have been returned" );
                    }

                    done();
                });
                     
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
