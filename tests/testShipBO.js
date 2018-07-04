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
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].destination );

        assert.ok( shipBO.changeDestination( mockDataList[ 0 ] , mockDataList[ 1 ].destination ) );
        assert.deepEqual( mockDataList[ 0 ].destination, mockDataList[ 1 ].destination );
        done();
    });

    it( 'test changeDestination failure newDestination undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        let oldDestination = mockDataList[ 0 ].destination;
        let returnVal = shipBO.changeDestination( mockDataList[ 0 ] , undefined );
        if ( returnVal )
        {
            assert.fail( "changeDestination for undefined new destination returned: " + returnVal );
        }

        assert.deepEqual( mockDataList[ 0 ].destination , oldDestination );
        done();
    });

    it( 'test changeDestination failure newDestination invalid location' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        let oldDestination = mockDataList[ 0 ].destination;
        let newDestination = { "x" : 5 };

        let returnVal = shipBO.changeDestination( mockDataList[ 0 ] , newDestination );
        if ( returnVal )
        {
            assert.fail( "changeDestination for invalid new destination returned: " + returnVal );
        }

        assert.deepEqual( mockDataList[ 0 ].destination , oldDestination );
        done();
    });    

    it( 'test changeDestination failure old destination undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        let newDestination = { "x" : 5 , "y" : 5 };
        mockDataList[ 0 ].destination = undefined;

        let returnVal = shipBO.changeDestination( mockDataList[ 0 ] , newDestination );
        if ( returnVal )
        {
            assert.fail( "changeDestination for undefined old destination returned: " + returnVal );
        }

        done();
    }); 

    /*
    ===========
    MoveShip testing begins
    ===========
    */
    it( 'test moveShip to destination success without saving' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].destination );

        assert.ok( shipBO.moveShip( mockDataList[ 1 ] , mockDataList[ 1 ].destination ) );
        assert.deepEqual( mockDataList[ 1 ].location, mockDataList[ 1 ].destination );
        done();
    });

    it( 'test moveShip success without saving' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 0 ].location );

        assert.ok( shipBO.moveShip( mockDataList[ 1 ] , mockDataList[ 0 ].location ) );
        assert.deepEqual( mockDataList[ 1 ].location, mockDataList[ 0 ].location );
        done();
    });

    it( 'test moveShip failure shipObj undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].location );
        let returnVal = shipBO.moveShip( undefined , mockDataList[ 0 ].location );
        if ( returnVal )
        {
            assert.fail( "moveShip for undefined shipObj returned: " + returnVal );
        }

        done();
    });

    it( 'test moveShip failure new location undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        let oldLocation = mockDataList[ 0 ].location;
        let returnVal = shipBO.moveShip( mockDataList[ 0 ] , undefined );
        if ( returnVal )
        {
            assert.fail( "moveShip for undefined new location returned: " + returnVal );
        }

        assert.deepEqual( mockDataList[ 0 ].location , oldLocation );
        done();
    });

    it( 'test moveShip failure new location invalid' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        let oldLocation = mockDataList[ 0 ].location;
        let newLocation = { "x" : 5 };
        let returnVal = shipBO.moveShip( mockDataList[ 0 ] , newLocation );
        if ( returnVal )
        {
            assert.fail( "moveShip for undefined new location returned: " + returnVal );
        }

        assert.deepEqual( mockDataList[ 0 ].location , oldLocation );
        done();
    });

    it( 'test moveShip failure old location undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        let newLocation = { "x" : 5 , "y" : 5 };
        mockDataList[ 0 ].location = undefined;

        let returnVal = shipBO.moveShip( mockDataList[ 0 ] , newLocation );
        if ( returnVal )
        {
            assert.fail( "moveShip for undefined old location returned: " + returnVal );
        }

        done();
    }); 

    /*
    ===========
    ChangeName testing begins
    ===========
    */
    it( 'test changeName success without saving' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].name );

        const nameConst = "Red Rover";
        assert.equal( shipBO.changeName( mockDataList[ 0 ], nameConst ) , nameConst );
        assert.equal( mockDataList[ 0 ].name, nameConst );
        done(); 
    });

    it( 'test changeName failure shipObj undefined' , function( done )
    {
        const nameConst = "Red Rover";
        let returnVal = shipBO.changeName( undefined,  nameConst );
        if ( returnVal )
        {
            assert.fail( "changeName for undefined shipObj returned: " + returnVal );
        }

        done(); 
    });

    it( 'test changeName failure newName undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].name );

        let oldName = mockDataList[ 0 ].name;
        const nameConst = undefined;
        let returnVal = shipBO.changeName( mockDataList[ 0 ], nameConst );
        if ( returnVal )
        {
            assert.fail( "changeName for undefined new name returned: " + returnVal );
        }
        assert.equal( mockDataList[ 0 ].name, oldName );

        done(); 
    });

    it( 'test changeName failure old name undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].name = undefined;

        const nameConst = "Red Rover";
        let returnVal = shipBO.changeName( mockDataList[ 0 ], nameConst );
        if ( returnVal )
        {
            assert.fail( "changeName for undefined old name returned: " + returnVal );
        }

        done(); 
    });

    it( 'test changeName failure newName not string' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsDockedAndTravel.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].name );

        let oldName = mockDataList[ 0 ].name;
        const nameConst = 123.5;
        let returnVal = shipBO.changeName( mockDataList[ 0 ], nameConst );
        if ( returnVal )
        {
            assert.fail( "changeName for non-string new name returned: " + returnVal );
        }
        assert.equal( mockDataList[ 0 ].name, oldName );

        done(); 
    });

    //after() is run after all tests have completed.
    after( function( done ) 
    {
        done();
    });
});
