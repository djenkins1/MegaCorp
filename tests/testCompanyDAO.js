const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const companyDAO = require( '../Data/CompanyDAO' );
const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "Company" ];
var mockDataList = require( "../sampleData/testData/companiesAllSamePlanetHq.json" );
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
        assert.ok( mockDataList.length > totalCreated );
        var company = mockDataList[ totalCreated ];
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
        assert.ok( mockDataList.length > totalCreated );
        var company = mockDataList[ totalCreated ];
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
        assert.ok( mockDataList.length > totalCreated );
        var company = mockDataList[ totalCreated ];
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

            insertedObj.name = "Dream On";
            insertedObj.money = insertedObj.money * 2;

            companyDAO.updateCompany( insertedObj, function( err2, updateResult )
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
        assert.ok( mockDataList.length > totalCreated );
        var company = mockDataList[ totalCreated ];
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

    it( 'test getCompaniesByHq' , function( done )
    {
        const TEST_PLANET = "2";
        assert.ok( mockDataList.length > 0 );
        companyDAO.getCompaniesByHq( TEST_PLANET , function( err, results )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from companyDAO.getCompaniesByHq" );
                done();
                return;
            }

            assert.ok( results );
            assert.equal( results.length, totalCreated );
            for ( var i = 0; i < results.length; i++ )
            {
                assert.equal( results[ i ].planetHq, TEST_PLANET );
            }
            done();
        });
    });

    it( 'test getCompaniesByHq no results' , function( done )
    {
        const TEST_PLANET = "1";
        assert.ok( mockDataList.length > 0 );
        companyDAO.getCompaniesByHq( TEST_PLANET , function( err, results )
        {
            if ( err )
            {
                console.log( err );
                assert.fail( "Error occured from companyDAO.getCompaniesByHq" );
                done();
                return;
            }

            assert.ok( results );
            assert.equal( results.length, 0 );
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
