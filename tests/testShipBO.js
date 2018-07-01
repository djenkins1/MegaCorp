const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const shipDAO = require( '../Data/ShipDAO' );
const shipBO = require( '../BO/ShipBO' );
const TABLE_NAME = shipDAO.tableName;

//This test file does not test database functionality

describe('TestShipBO', function() 
{
    //The before() callback gets run before all tests in the suite.
    before( function( done )
    {
        done();
    });

    //The beforeEach() callback gets run before each test in the suite.
    beforeEach( function( done )
    {
        done();
    });

    /*
    ===========
    IsValidLocation testing begins
    ===========
    */
    it( 'test isValidLocation success' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( shipBO.isValidLocation( mockDataList[ 0 ].location ) );
        done();
    });

    it( 'test isValidLocation success z undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        if ( mockDataList[ 1 ].location.z )
        {
            assert.fail( "mockDataList[ 1 ].location.z is defined and should not be for test" );
        }

        assert.ok( shipBO.isValidLocation( mockDataList[ 1 ].location ) );
        done();
    });

    it( 'test isValidLocation failure location undefined' , function( done )
    {
        var location = undefined;
        if ( shipBO.isValidLocation( location ) )
        {
            assert.fail( "isValidLocation returned true for undefined location" );
        }
        done();
    });

    it( 'test isValidLocation failure x undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].location.x = undefined;

        if ( shipBO.isValidLocation( mockDataList[ 0 ].location ) )
        {
            assert.fail( "isValidLocation returned true for undefined location.x" );
        }

        done();
    });

    it( 'test isValidLocation failure x not integer' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].location.x = "str";

        if ( shipBO.isValidLocation( mockDataList[ 0 ].location ) )
        {
            assert.fail( "isValidLocation returned true for location.x non integer" );
        }

        done();
    });

    it( 'test isValidLocation failure y undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].location.y = undefined;

        if ( shipBO.isValidLocation( mockDataList[ 0 ].location ) )
        {
            assert.fail( "isValidLocation returned true for location.y undefined" );
        }

        done();
    });

    it( 'test isValidLocation failure y not integer' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].location.y = "str";

        if ( shipBO.isValidLocation( mockDataList[ 0 ].location ) )
        {
            assert.fail( "isValidLocation returned true for location.y non integer" );
        }

        done();
    });

    it( 'test isValidLocation failure z not integer' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].location.z = "str";

        if ( shipBO.isValidLocation( mockDataList[ 0 ].location ) )
        {
            assert.fail( "isValidLocation returned true for location.z non integer" );
        }

        done();
    });

    /*
    ===========
    ClearDestination testing begins
    ===========
    */
    it( 'test clearDestination success without saving' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].destination );
        assert.ok( shipBO.clearDestination( mockDataList[ 1 ] ) );
        done();
    });

    it( 'test clearDestination failure shipObj undefined' , function( done )
    {
        if ( shipBO.clearDestination( undefined ) )
        {
            assert.fail( "clearDestination returned true for undefined shipObj" );
        }
        
        done();
    });

    /*
    ===========
    ChangeDestination testing begins
    ===========
    */
    it( 'test changeDestination success without saving' , function( done )
    {
        //TODO:
        done();
    });

    it( 'test changeDestination failure newDestination undefined' , function( done )
    {
        //TODO:
        done();
    });

    it( 'test changeDestination failure newDestination invalid location' , function( done )
    {
        //TODO:
        done();
    });    

    it( 'test changeDestination failure old destination undefined' , function( done )
    {
        //TODO:
        done();
    }); 

    //after() is run after all tests have completed.
    after( function( done ) 
    {
        done();
    });
});
