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

    /*
    ===========
    CheckValidGoods testing begins
    ===========
    */
    it( 'test checkValidGoods success for valid single good' , function( done )
    {
        let sampleGoods = { "bread" : 10 };
        assert.ok( shipBO.checkValidGoods( sampleGoods ) );
        done();
    });

    it( 'test checkValidGoods success for valid multiple goods' , function( done )
    {
        let sampleGoods = { "bread" : 10 , "meat" : 20 };
        assert.ok( shipBO.checkValidGoods( sampleGoods ) );
        done();
    });

    it( 'test checkValidGoods failure for undefined goods' , function( done )
    {
        let sampleGoods = undefined;
        let returnVal = shipBO.checkValidGoods( sampleGoods );
        if ( returnVal )
        {
            assert.fail( "checkValidGoods returned for undefined goods: " + returnVal );
        }
        done();
    });

    it( 'test checkValidGoods failure for empty goods' , function( done )
    {
        let sampleGoods = {};
        let returnVal = shipBO.checkValidGoods( sampleGoods );
        if ( returnVal )
        {
            assert.fail( "checkValidGoods returned for empty goods: " + returnVal );
        }
        done();
    });

    it( 'test checkValidGoods failure for string value in goods' , function( done )
    {
        let sampleGoods = { "bread" : "bad" };
        let returnVal = shipBO.checkValidGoods( sampleGoods );
        if ( returnVal )
        {
            assert.fail( "checkValidGoods returned for invalid goods: " + returnVal );
        }
        done();
    });

    /*
    ===========
    HasSpaceForGoods testing begins
    ===========
    */
    it( 'test hasSpaceForGoods success' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        let sampleGoods = { "bread" : 10 };
        assert.ok( shipBO.hasSpaceForGoods( mockDataList[ 1 ], sampleGoods ) );
        done();
    });

    it( 'test hasSpaceForGoods failure shipObj undefined' , function( done )
    {
        let sampleGoods = { "bread" : 10 };
        if ( shipBO.hasSpaceForGoods( undefined, sampleGoods ) )
        {
            assert.fail( "hasSpaceForGoods returned true for undefined shipObj" );
        }
        done();
    });

    it( 'test hasSpaceForGoods failure inventory undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        mockDataList[ 1 ].inventory = undefined;

        let sampleGoods = { "bread" : 10 };
        if ( shipBO.hasSpaceForGoods( mockDataList[ 1 ], sampleGoods ) )
        {
            assert.fail( "hasSpaceForGoods returned true for undefined shipObj inventory" );
        }
        done();
    });

    it( 'test hasSpaceForGoods failure goods undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );

        let sampleGoods = undefined;
        if ( shipBO.hasSpaceForGoods( mockDataList[ 1 ], sampleGoods ) )
        {
            assert.fail( "hasSpaceForGoods returned true for undefined goods" );
        }
        done();
    });

    it( 'test hasSpaceForGoods failure blueprint undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        mockDataList[ 1 ].shipBluePrint = undefined;

        let sampleGoods = { "bread" : 10 };
        if ( shipBO.hasSpaceForGoods( mockDataList[ 1 ], sampleGoods ) )
        {
            assert.fail( "hasSpaceForGoods returned true for undefined shipBluePrint" );
        }
        done();
    });

    it( 'test hasSpaceForGoods failure maxInventory undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        mockDataList[ 1 ].shipBluePrint.maxInventory = undefined;

        let sampleGoods = { "bread" : 10 };
        if ( shipBO.hasSpaceForGoods( mockDataList[ 1 ], sampleGoods ) )
        {
            assert.fail( "hasSpaceForGoods returned true for undefined maxInventory" );
        }
        done();
    });

    it( 'test hasSpaceForGoods failure maxInventory non-integer' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        mockDataList[ 1 ].shipBluePrint.maxInventory = "str";

        let sampleGoods = { "bread" : 10 };
        if ( shipBO.hasSpaceForGoods( mockDataList[ 1 ], sampleGoods ) )
        {
            assert.fail( "hasSpaceForGoods returned true for non-integer maxInventory" );
        }
        done();
    });

    it( 'test hasSpaceForGoods failure invalid goods empty' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );

        let sampleGoods = {};
        if ( shipBO.hasSpaceForGoods( mockDataList[ 1 ], sampleGoods ) )
        {
            assert.fail( "hasSpaceForGoods returned true for empty goods" );
        }
        done();
    });

    it( 'test hasSpaceForGoods failure invalid goods with string value' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );

        let sampleGoods = { "bread" : "str" };
        if ( shipBO.hasSpaceForGoods( mockDataList[ 1 ], sampleGoods ) )
        {
            assert.fail( "hasSpaceForGoods returned true for goods with string value" );
        }
        done();
    });

    it( 'test hasSpaceForGoods failure not enough space' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].shipBluePrint );
        let sampleGoods = { "bread" : 10 };
        if ( shipBO.hasSpaceForGoods( mockDataList[ 0 ], sampleGoods ) )
        {
            assert.fail( "hasSpaceForGoods returned true but not enough space" );
        }
        done();
    });

    /*
    ===========
    AddGoods testing begins
    ===========
    */
    it( 'test addGoods success added new good to inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );

        const goodName = "Bread";
        let sampleGoods = {};
        sampleGoods[ goodName ] = 10;

        if ( mockDataList[ 1 ].inventory[ goodName ] )
        {
            assert.fail( goodName + " should not be inside ship inventory for this test" );
        }

        let returnVal = shipBO.addGoods( mockDataList[ 1 ], sampleGoods );
        assert.deepEqual( returnVal, mockDataList[ 1 ].inventory );
        assert.ok( mockDataList[ 1 ].inventory[ goodName ] );
        assert.equal( mockDataList[ 1 ].inventory[ goodName ], sampleGoods[ goodName ] );
        done();
    });

    it( 'test addGoods success added to existing good in inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        assert.ok( mockDataList[ 1 ].inventory );

        const goodName = "Food";
        assert.ok( mockDataList[ 1 ].inventory[ goodName ] );

        let oldValue = mockDataList[ 1 ].inventory[ goodName ];
        let sampleGoods = {};
        sampleGoods[ goodName ] = 10;

        let returnVal = shipBO.addGoods( mockDataList[ 1 ], sampleGoods );
        assert.deepEqual( returnVal, mockDataList[ 1 ].inventory );
        assert.equal( mockDataList[ 1 ].inventory[ goodName ], oldValue + sampleGoods[ goodName ] );
        done();
    });

    it( 'test addGoods success added multiple goods' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        assert.ok( mockDataList[ 1 ].inventory );

        const goodName = "Food";
        const otherGood = "Sheep";
        let oldValue = mockDataList[ 1 ].inventory[ goodName ];

        let sampleGoods = {};
        sampleGoods[ goodName ] = 10;
        sampleGoods[ otherGood ] = 20;

        let returnVal = shipBO.addGoods( mockDataList[ 1 ], sampleGoods );
        assert.deepEqual( returnVal, mockDataList[ 1 ].inventory );
        assert.equal( mockDataList[ 1 ].inventory[ goodName ], oldValue + sampleGoods[ goodName ] );
        assert.equal( mockDataList[ 1 ].inventory[ otherGood ] , sampleGoods[ otherGood ] );
        done();
    });

    it( 'test addGoods success added single good max out' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        assert.ok( mockDataList[ 1 ].inventory );

        const goodName = "Food";
        assert.ok( mockDataList[ 1 ].inventory[ goodName ] );
        let oldValue = mockDataList[ 1 ].inventory[ goodName ];
        let sampleGoods = {};
        sampleGoods[ goodName ] = 50;

        let returnVal = shipBO.addGoods( mockDataList[ 1 ], sampleGoods );
        assert.deepEqual( returnVal, mockDataList[ 1 ].inventory );
        assert.equal( mockDataList[ 1 ].inventory[ goodName ], oldValue + sampleGoods[ goodName ] );
        done();
    });

    it( 'test addGoods failure shipObj undefined' , function( done )
    {
        let sampleGoods = { "Bread" : 10 };
        let returnVal = shipBO.addGoods( undefined, sampleGoods );
        if ( returnVal )
        {
            assert.fail( "addGoods for undefined shipObj returned: " + returnVal );
        }
        done();
    });

    it( 'test addGoods failure goods undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        assert.ok( mockDataList[ 1 ].inventory );

        let sampleGoods = undefined;
        let returnVal = shipBO.addGoods( mockDataList[ 1 ], sampleGoods );
        if ( returnVal )
        {
            assert.fail( "addGoods for undefined goods returned: " + returnVal );
        }
        done();
    });

    it( 'test addGoods failure inventory undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        mockDataList[ 1 ].inventory = undefined;

        let sampleGoods = { "Bread" : 10 };
        let returnVal = shipBO.addGoods( mockDataList[ 1 ], sampleGoods );
        if ( returnVal )
        {
            assert.fail( "addGoods for undefined inventory returned: " + returnVal );
        }
        done();
    });

    it( 'test addGoods failure invalid goods empty' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        assert.ok( mockDataList[ 1 ].inventory );

        let sampleGoods = {};
        let returnVal = shipBO.addGoods( mockDataList[ 1 ], sampleGoods );
        if ( returnVal )
        {
            assert.fail( "addGoods for empty goods returned: " + returnVal );
        }
        done();
    });

    it( 'test addGoods failure invalid goods with string value' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        assert.ok( mockDataList[ 1 ].inventory );

        let sampleGoods = { "Bread" : "badStr" };
        let returnVal = shipBO.addGoods( mockDataList[ 1 ], sampleGoods );
        if ( returnVal )
        {
            assert.fail( "addGoods for invalid goods returned: " + returnVal );
        }
        done();
    });

    it( 'test addGoods failure not enough space' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        assert.ok( mockDataList[ 1 ].inventory );

        let sampleGoods = { "Bread" : 100 };
        let returnVal = shipBO.addGoods( mockDataList[ 1 ], sampleGoods );
        if ( returnVal )
        {
            assert.fail( "addGoods for not enough space returned: " + returnVal );
        }
        done();
    });

    it( 'test addGoods failure not enough space multiple goods' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        assert.ok( mockDataList[ 1 ].inventory );

        let sampleGoods = { "Bread" : 40 , "Eggs" : 40 , "Food" : 20 };
        let returnVal = shipBO.addGoods( mockDataList[ 1 ], sampleGoods );
        if ( returnVal )
        {
            assert.fail( "addGoods for multiple goods not enough space returned: " + returnVal );
        }
        done();
    });

    /*
    ===========
    HasGoods testing begins
    ===========
    */
    it( 'test hasGoods success single good' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].inventory );

        let goodName = "Food";
        assert.ok( mockDataList[ 1 ].inventory[ goodName ] );
        let sampleGoods = {};
        sampleGoods[ goodName ] = 10;
        assert.ok( mockDataList[ 1 ].inventory[ goodName ] >= sampleGoods[ goodName ] );

        assert.ok( shipBO.hasGoods( mockDataList[ 1 ] , sampleGoods ) );
        done();
    });

    it( 'test hasGoods success multiple goods' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].inventory );

        let sampleGoods = JSON.parse( JSON.stringify( mockDataList[ 1 ].inventory ) );
        assert.ok( shipBO.hasGoods( mockDataList[ 1 ] , sampleGoods ) );
        done();
    });

    it( 'test hasGoods success single good not enough' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].inventory );

        let goodName = "Food";
        assert.ok( mockDataList[ 1 ].inventory[ goodName ] );
        let sampleGoods = {};
        sampleGoods[ goodName ] = mockDataList[ 1 ].inventory[ goodName ] + 1;
        if ( shipBO.hasGoods( mockDataList[ 1 ] , sampleGoods ) )
        {
            assert.fail( "hasGoods returned true for too many goods" );
        }
        done();
    });

    it( 'test hasGoods failure multiple goods not enough' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].inventory );

        let goodName = "Food";
        assert.ok( mockDataList[ 1 ].inventory[ goodName ] );
        let sampleGoods = JSON.parse(JSON.stringify( mockDataList[ 1 ].inventory ) );
        sampleGoods[ goodName ] = mockDataList[ 1 ].inventory[ goodName ] + 1;
        if ( shipBO.hasGoods( mockDataList[ 1 ] , sampleGoods ) )
        {
            assert.fail( "hasGoods returned true for too many goods" );
        }
        done();
    });

    it( 'test hasGoods failure single good missing' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].inventory );

        let goodName = "Chow Mein";
        if ( mockDataList[ 1 ].inventory[ goodName ] )
        {
            assert.fail( goodName + " should not be within inventory for this test" );
        }

        let sampleGoods = {};
        sampleGoods[ goodName ] = 10;

        if ( shipBO.hasGoods( mockDataList[ 1 ] , sampleGoods ) )
        {
            assert.fail( "hasGoods returned true for missing good" );
        }
        done();
    });

    it( 'test hasGoods failure shipObj undefined' , function( done )
    {
        let goodName = "Chow Mein";
        let sampleGoods = {};
        sampleGoods[ goodName ] = 10;

        if ( shipBO.hasGoods( undefined , sampleGoods ) )
        {
            assert.fail( "hasGoods returned true for undefined shipObj" );
        }
        done();
    });

    it( 'test hasGoods failure goods undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].inventory );

        let sampleGoods = undefined;
        if ( shipBO.hasGoods( mockDataList , sampleGoods ) )
        {
            assert.fail( "hasGoods returned true for undefined goods" );
        }
        done();
    });

    it( 'test hasGoods failure inventory undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        mockDataList[ 1 ].inventory = undefined;

        let goodName = "Food";
        let sampleGoods = {};
        sampleGoods[ goodName ] = 10;

        if ( shipBO.hasGoods( mockDataList , sampleGoods ) )
        {
            assert.fail( "hasGoods returned true for undefined inventory" );
        }
        done();
    });

    it( 'test hasGoods failure invalid goods empty' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].inventory );

        let sampleGoods = {};
        if ( shipBO.hasGoods( mockDataList , sampleGoods ) )
        {
            assert.fail( "hasGoods returned true for empty goods" );
        }
        done();
    });

    it( 'test hasGoods failure invalid goods string value' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].inventory );

        let sampleGoods = { "Food" : "str" };
        if ( shipBO.hasGoods( mockDataList , sampleGoods ) )
        {
            assert.fail( "hasGoods returned true for string value in goods" );
        }
        done();
    });

    /*
    ===========
    HasFuel testing begins
    ===========
    */
    it( 'test hasFuel success' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        assert.ok( mockDataList[ 1 ].inventory );

        assert.ok( shipBO.hasFuel( mockDataList[ 1 ] ) );
        done();
    });



    it( 'test hasFuel failure shipObj undefined' , function( done )
    {
        if ( shipBO.hasFuel( undefined ) )
        {
            assert.fail( "hasFuel returned true for undefined shipObj" );
        }
        done();
    });

    it( 'test hasFuel failure inventory undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        mockDataList[ 1 ].inventory = undefined;

        if ( shipBO.hasFuel( mockDataList[ 1 ] ) )
        {
            assert.fail( "hasFuel returned true for undefined inventory" );
        }
        done();
    });

    it( 'test hasFuel failure shipBluePrint undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        mockDataList[ 1 ].shipBluePrint = undefined;

        if ( shipBO.hasFuel( mockDataList[ 1 ] ) )
        {
            assert.fail( "hasFuel returned true for undefined shipBluePrint" );
        }
        done();
    });

    it( 'test hasFuel failure fuelCost undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        mockDataList[ 1 ].shipBluePrint.fuelCost = undefined;

        if ( shipBO.hasFuel( mockDataList[ 1 ] ) )
        {
            assert.fail( "hasFuel returned true for undefined fuelCost" );
        }
        done();
    });

    it( 'test hasFuel failure invalid fuelCost empty' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        mockDataList[ 1 ].shipBluePrint.fuelCost = {};

        if ( shipBO.hasFuel( mockDataList[ 1 ] ) )
        {
            assert.fail( "hasFuel returned true for empty fuelCost" );
        }
        done();
    });

    it( 'test hasFuel failure invalid fuelCost string value' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length > 1 );
        assert.ok( mockDataList[ 1 ].shipBluePrint );
        mockDataList[ 1 ].shipBluePrint.fuelCost = { "Mid-Grade Fuel" : "str" };

        if ( shipBO.hasFuel( mockDataList[ 1 ] ) )
        {
            assert.fail( "hasFuel returned true for fuelCost with string value" );
        }
        done();
    });

    it( 'test hasFuel failure not enough fuel' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].shipBluePrint );
        assert.ok( mockDataList[ 0 ].inventory );

        let goodName = "Low-Grade Fuel";
        assert.ok( mockDataList[ 0 ].inventory[ goodName ] );
        mockDataList[ 0 ].shipBluePrint.fuelCost = {};
        mockDataList[ 0 ].shipBluePrint.fuelCost[ goodName ] = mockDataList[ 0 ].inventory[ goodName ] + 1;

        if ( shipBO.hasFuel( mockDataList[ 0 ] ) )
        {
            assert.fail( "hasFuel returned true for not enough fuel inventory" );
        }
        done();
    });

    /*
    ===========
    LocationFuelCost testing begins
    ===========
    */
    it( 'test locationFuelCost same location returns 0' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].location );
        let fuelCost = { "test" : 1 };

        let returnVal = shipBO.locationFuelCost( mockDataList[ 0 ].location, mockDataList[ 0 ].location , fuelCost );
        assert.ok( returnVal );
        assert.equal( returnVal[ "test" ] , 0 );
        done();
    });

    it( 'test locationFuelCost mock locations distance 1' , function( done )
    {
        let sampleLocation = { "x" : 1, "y" : 2 };
        let sampleDestination = { "x" : 2 , "y" : 2 };
        let fuelCost = { "test" : 1 };

        let returnVal = shipBO.locationFuelCost( sampleLocation, sampleDestination ,fuelCost );
        assert.ok( returnVal );
        assert.equal( returnVal[ "test" ] , 1 );
        done();
    });

    it( 'test locationFuelCost mock locations distance 1 multiple fuel cost' , function( done )
    {
        let sampleLocation = { "x" : 1, "y" : 2 };
        let sampleDestination = { "x" : 2 , "y" : 2 };
        let fuelCost = { "test" : 1 , "packing" : 1 };

        let returnVal = shipBO.locationFuelCost( sampleLocation, sampleDestination ,fuelCost );
        assert.ok( returnVal );
        assert.deepEqual( returnVal , fuelCost );
        done();
    });

    it( 'test locationFuelCost mock reversed locations distance 1' , function( done )
    {
        let sampleLocation = { "x" : 2, "y" : 2 };
        let sampleDestination = { "x" : 1 , "y" : 2 };
        let fuelCost = { "test" : 1 };

        let returnVal = shipBO.locationFuelCost( sampleLocation, sampleDestination ,fuelCost );
        assert.ok( returnVal );
        assert.equal( returnVal[ "test" ] , 1 );
        done();
    });


    it( 'test locationFuelCost mock locations distance 2' , function( done )
    {
        let sampleLocation = { "x" : 2, "y" : 2 };
        let sampleDestination = { "x" : 1 , "y" : 3 };
        let fuelCost = { "test" : 1 };

        let returnVal = shipBO.locationFuelCost( sampleLocation, sampleDestination ,fuelCost );
        assert.ok( returnVal );
        assert.equal( returnVal[ "test" ] , 2 );
        done();
    });

    it( 'test locationFuelCost mock locations distance 2 reversed' , function( done )
    {
        let sampleLocation = { "x" : 2, "y" : 3 };
        let sampleDestination = { "x" : 1 , "y" : 2 };
        let fuelCost = { "test" : 1 };

        let returnVal = shipBO.locationFuelCost( sampleLocation, sampleDestination ,fuelCost );
        assert.ok( returnVal );
        assert.equal( returnVal[ "test" ] , 2 );
        done();
    });

    it( 'test locationFuelCost mock locations negative distance 2' , function( done )
    {
        let sampleLocation = { "x" : -2, "y" : 2 };
        let sampleDestination = { "x" : 0 , "y" : 2 };
        let fuelCost = { "test" : 1 };

        let returnVal = shipBO.locationFuelCost( sampleLocation, sampleDestination ,fuelCost );
        assert.ok( returnVal );
        assert.equal( returnVal[ "test" ] , 2 );
        done();
    });

    it( 'test locationFuelCost failure invalid location' , function( done )
    {
        let sampleLocation = { "x" : 5 };
        let sampleDestination = { "x" : 0 , "y" : 2 };
        let fuelCost = { "test" : 1 };
        let returnVal = shipBO.locationFuelCost( sampleLocation, sampleDestination, fuelCost );
        if ( returnVal )
        {
            assert.fail( "locationFuelCost for invalid location returned: " + returnVal );
        }

        done();
    });

    it( 'test locationFuelCost failure invalid destination' , function( done )
    {
        let sampleLocation = { "x" : 5, "y" : 2};
        let sampleDestination = { "x" : 0  };
        let fuelCost = { "test" : 1 };
        let returnVal = shipBO.locationFuelCost( sampleLocation, sampleDestination, fuelCost );
        if ( returnVal )
        {
            assert.fail( "locationFuelCost for invalid destination returned: " + returnVal );
        }

        done();
    });

    it( 'test locationFuelCost failure invalid fuelCost empty' , function( done )
    {
        let sampleLocation = { "x" : 5, "y" : 2};
        let sampleDestination = { "x" : 0  };
        let fuelCost = {};
        let returnVal = shipBO.locationFuelCost( sampleLocation, sampleDestination, fuelCost );
        if ( returnVal )
        {
            assert.fail( "locationFuelCost for empty fuelCost returned: " + returnVal );
        }

        done();
    });

    /*
    ===========
    DestinationFuelCost testing begins
    ===========
    */
    it( 'test destinationFuelCost same location returns 0' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].location );
        assert.ok( mockDataList[ 0 ].shipBluePrint );
        let fuelCost = mockDataList[ 0 ].shipBluePrint.fuelCost;

        let returnVal = shipBO.destinationFuelCost( mockDataList[ 0 ], mockDataList[ 0 ].location );
        assert.ok( returnVal );
        for ( var fuelGood in fuelCost )
        {
            assert.equal( returnVal[ fuelGood ] , 0 );
        }

        let locationReturnVal = shipBO.locationFuelCost( mockDataList[ 0 ].location, mockDataList[ 0 ].location , fuelCost );
        for ( var fuelGood in fuelCost )
        {
            assert.equal( locationReturnVal[ fuelGood ] , 0 );
        }

        done();
    });

    it( 'test destinationFuelCost mock destination distance 1' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].location );
        assert.ok( mockDataList[ 0 ].shipBluePrint );

        let sampleDestination = {};
        sampleDestination.x = mockDataList[ 0 ].location.x + 1;
        sampleDestination.y = mockDataList[ 0 ].location.y;
        let fuelCost = mockDataList[ 0 ].shipBluePrint.fuelCost;

        let returnVal = shipBO.destinationFuelCost( mockDataList[ 0 ], sampleDestination );
        assert.deepEqual( returnVal , fuelCost );

        let locationReturnVal = shipBO.locationFuelCost( mockDataList[ 0 ].location, sampleDestination , fuelCost );
        assert.deepEqual( locationReturnVal , returnVal );

        done();
    });

    it( 'test destinationFuelCost mock destination reversed distance 1' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].location );
        assert.ok( mockDataList[ 0 ].shipBluePrint );

        let sampleDestination = {};
        sampleDestination.x = mockDataList[ 0 ].location.x;
        sampleDestination.y = mockDataList[ 0 ].location.y - 1;
        let fuelCost = mockDataList[ 0 ].shipBluePrint.fuelCost;

        let returnVal = shipBO.destinationFuelCost( mockDataList[ 0 ], sampleDestination );
        assert.deepEqual( returnVal , fuelCost );

        let locationReturnVal = shipBO.locationFuelCost( mockDataList[ 0 ].location, sampleDestination , fuelCost );
        assert.deepEqual( locationReturnVal , returnVal );

        done();
    });

    it( 'test destinationFuelCost mock destination reversed distance 2' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].location );
        assert.ok( mockDataList[ 0 ].shipBluePrint );

        let sampleDestination = {};
        sampleDestination.x = mockDataList[ 0 ].location.x + 1;
        sampleDestination.y = mockDataList[ 0 ].location.y - 1;
        let fuelCost = mockDataList[ 0 ].shipBluePrint.fuelCost;

        let returnVal = shipBO.destinationFuelCost( mockDataList[ 0 ], sampleDestination );
        for ( var fuelGood in fuelCost )
        {
            assert.equal( returnVal[ fuelGood ] , 2 * fuelCost[ fuelGood ] );
        }

        let locationReturnVal = shipBO.locationFuelCost( mockDataList[ 0 ].location, sampleDestination , fuelCost );
        assert.deepEqual( locationReturnVal , returnVal );

        done();
    });

    it( 'test destinationFuelCost mock destination distance 2' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].location );
        assert.ok( mockDataList[ 0 ].shipBluePrint );

        let sampleDestination = {};
        sampleDestination.x = mockDataList[ 0 ].location.x + 2;
        sampleDestination.y = mockDataList[ 0 ].location.y;
        let fuelCost = mockDataList[ 0 ].shipBluePrint.fuelCost;

        let returnVal = shipBO.destinationFuelCost( mockDataList[ 0 ], sampleDestination );
        for ( var fuelGood in fuelCost )
        {
            assert.equal( returnVal[ fuelGood ] , 2 * fuelCost[ fuelGood ] );
        }

        let locationReturnVal = shipBO.locationFuelCost( mockDataList[ 0 ].location, sampleDestination , fuelCost );
        assert.deepEqual( locationReturnVal , returnVal );

        done();
    });

    it( 'test destinationFuelCost failure shipObj undefined' , function( done )
    {
        let sampleDestination = { "x" : 0 , "y" : 5 };
        let returnVal = shipBO.destinationFuelCost( undefined, sampleDestination );
        if ( returnVal )
        {
            assert.fail( "destinationFuelCost for undefined shipObj returned: " + returnVal );
        }

        done();
    });

    it( 'test destinationFuelCost failure shipObj location undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].shipBluePrint );
        mockDataList[ 0 ].location = undefined;

        let sampleDestination = { "x" : 0 , "y" : 5 };
        let returnVal = shipBO.destinationFuelCost( mockDataList[ 0 ], sampleDestination );
        if ( returnVal )
        {
            assert.fail( "destinationFuelCost for undefined shipObj.location returned: " + returnVal );
        }

        done();
    });

    it( 'test destinationFuelCost failure shipBluePrint undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].shipBluePrint = undefined;

        let sampleDestination = { "x" : 0 , "y" : 5 };
        let returnVal = shipBO.destinationFuelCost( mockDataList[ 0 ], sampleDestination );
        if ( returnVal )
        {
            assert.fail( "destinationFuelCost for undefined shipObj.shipBluePrint returned: " + returnVal );
        }

        done();
    });

    it( 'test destinationFuelCost failure shipBluePrint fuelCost undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].shipBluePrint.fuelCost = undefined;

        let sampleDestination = { "x" : 0 , "y" : 5 };
        let returnVal = shipBO.destinationFuelCost( mockDataList[ 0 ], sampleDestination );
        if ( returnVal )
        {
            assert.fail( "destinationFuelCost for undefined shipBluePrint.fuelCost returned: " + returnVal );
        }

        done();
    });

    it( 'test destinationFuelCost failure invalid fuelCost empty' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].shipBluePrint.fuelCost = {};

        let sampleDestination = { "x" : 0 , "y" : 5 };
        let returnVal = shipBO.destinationFuelCost( mockDataList[ 0 ], sampleDestination );
        if ( returnVal )
        {
            assert.fail( "destinationFuelCost for empty shipBluePrint.fuelCost returned: " + returnVal );
        }

        done();
    });

    it( 'test destinationFuelCost failure invalid fuelCost string value' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].shipBluePrint.fuelCost = { "test" : "bad" };

        let sampleDestination = { "x" : 0 , "y" : 5 };
        let returnVal = shipBO.destinationFuelCost( mockDataList[ 0 ], sampleDestination );
        if ( returnVal )
        {
            assert.fail( "destinationFuelCost for string value in shipBluePrint.fuelCost returned: " + returnVal );
        }

        done();
    });

    it( 'test destinationFuelCost failure destination undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].location );

        let returnVal = shipBO.destinationFuelCost( mockDataList[ 0 ], undefined );
        if ( returnVal )
        {
            assert.fail( "destinationFuelCost for undefined destination returned: " + returnVal );
        }

        done();
    });

    it( 'test destinationFuelCost failure destination invalid' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].location );

        let sampleDestination = { "x" : 0 };
        let returnVal = shipBO.destinationFuelCost( mockDataList[ 0 ], sampleDestination );
        if ( returnVal )
        {
            assert.fail( "destinationFuelCost for invalid destination returned: " + returnVal );
        }

        done();
    });

    it( 'test destinationFuelCost failure location invalid' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].location );
        delete mockDataList[ 0 ].location.x;

        let sampleDestination = { "x" : 0 , "y" : 0 };
        let returnVal = shipBO.destinationFuelCost( mockDataList[ 0 ], sampleDestination );
        if ( returnVal )
        {
            assert.fail( "destinationFuelCost for invalid location returned: " + returnVal );
        }

        done();
    });

    /*
    ===========
    SumGoods testing begins
    ===========
    */
    it( 'test sumGoods success for single good inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].inventory = { "Test" : 10 };
        assert.equal( shipBO.sumGoods( mockDataList[ 0 ] ) , 10 );
        done();
    });

    it( 'test sumGoods success for multiple good inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].inventory = { "Test" : 10 , "Other" : 25 };
        assert.equal( shipBO.sumGoods( mockDataList[ 0 ] ) , 35 );
        done();
    });

    it( 'test sumGoods success for empty inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].inventory = {};
        assert.equal( shipBO.sumGoods( mockDataList[ 0 ] ) , 0 );
        done();
    });

    it( 'test sumGoods success for single @good' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].inventory = { "@Power" : 10 };
        assert.equal( shipBO.sumGoods( mockDataList[ 0 ] ) , 0 );
        done();
    });

    it( 'test sumGoods success for multiple and @good' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].inventory = { "@Power" : 10 , "Saddle" : 12 };
        assert.equal( shipBO.sumGoods( mockDataList[ 0 ] ) , 12 );
        done();
    });

    it( 'test sumGoods failure shipObj undefined' , function( done )
    {
        let returnVal = shipBO.sumGoods( undefined );
        if ( returnVal )
        {
            assert.fail( "sumGoods returned for undefined shipObj: " + returnVal );
        }
        done();
    });

    it( 'test sumGoods failure inventory undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].inventory = undefined;

        let returnVal = shipBO.sumGoods( mockDataList[ 0 ] );
        if ( returnVal )
        {
            assert.fail( "sumGoods returned for undefined inventory: " + returnVal );
        }
        done();
    });

    /*
    ===========
    SumGoodsInventory testing begins
    ===========
    */
    it( 'test sumGoodsInventory success for single good inventory' , function( done )
    {
        let inventory = { "Test" : 10 };
        assert.equal( shipBO.sumGoodsInventory( inventory ) , 10 );
        done();
    });

    it( 'test sumGoodsInventory success for multiple good inventory' , function( done )
    {
        let inventory = { "Test" : 10 , "Other" : 25 };
        assert.equal( shipBO.sumGoodsInventory( inventory ) , 35 );
        done();
    });

    it( 'test sumGoodsInventory success for empty inventory' , function( done )
    {
        let inventory = {};
        assert.equal( shipBO.sumGoodsInventory( inventory ) , 0 );
        done();
    });

    it( 'test sumGoodsInventory success for single @good' , function( done )
    {
        let inventory = { "@Power" : 10 };
        assert.equal( shipBO.sumGoodsInventory( inventory ) , 0 );
        done();
    });

    it( 'test sumGoodsInventory success for multiple and @good' , function( done )
    {
        let inventory = { "@Power" : 10 , "Saddle" : 12 };
        assert.equal( shipBO.sumGoodsInventory( inventory ) , 12 );
        done();
    });

    it( 'test sumGoodsInventory failure inventory undefiend' , function( done )
    {
        let returnVal = shipBO.sumGoodsInventory( undefined );
        if ( returnVal )
        {
            assert.fail( "sumGoodsInventory returned for undefined inventory: " + returnVal );
        }
        done();
    });

    /*
    ===========
    ChangeCompany testing begins
    ===========
    */

    it( 'test changeCompany success without saving', function(done)
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].companyId );
        let newId = "501";
        assert.equal( shipBO.changeCompany( mockDataList[ 0 ] , newId ) , newId );
        assert.equal( mockDataList[ 0 ].companyId , newId );
        done();
    });

    it( 'test changeCompany failure shipObj undefined', function(done)
    {
        let newId = "501";
        let returnVal = shipBO.changeCompany( undefined , newId );
        if ( returnVal )
        {
            assert.fail( "changeCompany returned for undefined shipObj: " + returnVal );
        }
        done();
    });

    it( 'test changeCompany failure newCompanyId undefined', function(done)
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].companyId );

        let newId = undefined;
        let returnVal = shipBO.changeCompany( mockDataList[ 0 ] , newId );
        if ( returnVal )
        {
            assert.fail( "changeCompany returned for undefined newCompanyId: " + returnVal );
        }
        done();
    });

    it( 'test changeCompany failure old companyId undefined', function(done)
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        mockDataList[ 0 ].companyId = undefined;

        let newId = "501";
        let returnVal = shipBO.changeCompany( mockDataList[ 0 ] , newId );
        if ( returnVal )
        {
            assert.fail( "changeCompany returned for undefined old companyId: " + returnVal );
        }
        done();
    });

    it( 'test changeCompany failure newCompanyId not string', function(done)
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].companyId );

        let newId = 105;
        let returnVal = shipBO.changeCompany( mockDataList[ 0 ] , newId );
        if ( returnVal )
        {
            assert.fail( "changeCompany returned for non-string newCompanyId: " + returnVal );
        }
        done();
    });

    it( 'test changeCompany failure old companyId same', function(done)
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/shipsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ].companyId );

        let newId = mockDataList[ 0 ].companyId;
        let returnVal = shipBO.changeCompany( mockDataList[ 0 ] , newId );
        if ( returnVal )
        {
            assert.fail( "changeCompany returned for same newCompanyId: " + returnVal );
        }
        done();
    });

    //after() is run after all tests have completed.
    after( function( done )
    {
        done();
    });
});
