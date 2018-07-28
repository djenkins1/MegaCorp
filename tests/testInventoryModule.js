const assert = require('assert');
const inventoryMod = require( '../BO/InventoryModule' );

//This test file does not test database functionality
describe('TestInventoryModule', function()
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
    ============
    sumGoodsInventory testing begins
    ============
    */
    it( 'test sumGoodsInventory success multiple' , function( done )
    {
        const totalSize = 20;
        let testInventory = {
            "Hearts" : totalSize / 2
            ,"Spades" : totalSize / 2
        };

        let returnVal = inventoryMod.sumGoodsInventory( testInventory );
        assert.ok( returnVal );
        assert.equal( returnVal, totalSize );
        done();
    });

    it( 'test sumGoodsInventory success for @ goods' , function( done )
    {
        const totalSize = 20;
        let testInventory = {
            "Hearts" : totalSize / 2
            ,"@Spades" : totalSize / 2
        };

        let returnVal = inventoryMod.sumGoodsInventory( testInventory );
        assert.ok( returnVal );
        assert.equal( returnVal, totalSize / 2 );
        done();
    });

    it( 'test sumGoodsInventory success single @ good' , function( done )
    {
        const totalSize = 20;
        let testInventory = {
            "@Hearts" : totalSize
        };

        let returnVal = inventoryMod.sumGoodsInventory( testInventory );
        assert.equal( returnVal, 0 );
        done();
    });

    it( 'test sumGoodsInventory success inventory empty' , function( done )
    {
        const totalSize = 0;
        let testInventory = {};

        let returnVal = inventoryMod.sumGoodsInventory( testInventory );
        assert.equal( returnVal, totalSize );
        done();
    });

    it ( 'test sumGoodsInventory success single good' , function( done )
    {
        const totalSize = 20;
        let testInventory = {
            "Hearts" : totalSize
        };

        let returnVal = inventoryMod.sumGoodsInventory( testInventory );
        assert.ok( returnVal );
        assert.equal( returnVal, totalSize );
        done();
    });

    it( 'test sumGoodsInventory failure for undefined inventory' , function( done )
    {
        let testInventory = undefined;

        let returnVal = inventoryMod.sumGoodsInventory( testInventory );
        if ( returnVal )
        {
            assert.fail( "sumGoodsInventory returned for undefined inventory: " + returnVal );
        }
        done();
    });

    /*
    ============
    checkValidGoods testing begins
    ============
    */
    it( 'test checkValidGoods success for single good' , function( done )
    {
        let testInventory = {
            "Mad Hatter" : 5
        };

        assert.ok( inventoryMod.checkValidGoods( testInventory ) );
        done();
    });

    it( 'test checkValidGoods success for multiple goods' , function( done )
    {
        let testInventory = {
            "Mad Hatter" : 5
            ,"Crazy" : 10
        };

        assert.ok( inventoryMod.checkValidGoods( testInventory ) );
        done();
    });

    it( 'test checkValidGoods failure for single non-string' , function( done )
    {
        let testInventory = {
            "Mad Hatter" : "badstr"
        };

        let returnVal = inventoryMod.checkValidGoods( testInventory );
        if ( returnVal )
        {
            assert.fail( "checkValidGoods returned for non-string value: " + returnVal );
        }
        done();
    });

    it( 'test checkValidGoods failure for single non-string multiple' , function( done )
    {
        let testInventory = {
            "Mad Hatter" : "BadStr"
            ,"Crazy" : 10
        };

        let returnVal = inventoryMod.checkValidGoods( testInventory );
        if ( returnVal )
        {
            assert.fail( "checkValidGoods returned for non-string value: " + returnVal );
        }
        done();
    });

    it( 'test checkValidGoods failure for empty inventory' , function( done )
    {
        let testInventory = {};

        let returnVal = inventoryMod.checkValidGoods( testInventory );
        if ( returnVal )
        {
            assert.fail( "checkValidGoods returned for empty inventory: " + returnVal );
        }
        done();
    });

    it( 'test checkValidGoods failure for undefined inventory' , function( done )
    {
        let testInventory = undefined;

        let returnVal = inventoryMod.checkValidGoods( testInventory );
        if ( returnVal )
        {
            assert.fail( "checkValidGoods returned for undefined inventory: " + returnVal );
        }
        done();
    });

    /*
    ============
    hasSpaceForGoods testing begins
    ============
    */
    it( 'test hasSpaceForGoods success single same good' , function( done )
    {
        let maxGoods = 20;
        let testInventory = {
            "mgmt" : 10
        };
        let testGoods = {
            "mgmt" : 10
        };

        let returnVal = inventoryMod.hasSpaceForGoods( testInventory, testGoods , maxGoods );
        assert.ok( returnVal );
        done();
    });

    it( 'test hasSpaceForGoods success single different good' , function( done )
    {
        let maxGoods = 20;
        let testInventory = {
            "mgmt" : 10
        };
        let testGoods = {
            "pollen" : 10
        };

        let returnVal = inventoryMod.hasSpaceForGoods( testInventory, testGoods , maxGoods );
        assert.ok( returnVal );
        done();
    });

    it( 'test hasSpaceForGoods success multiple goods' , function( done )
    {
        let maxGoods = 40;
        let testInventory = {
            "mgmt" : 10,
            "pollen" : 10
        };
        let testGoods = {
            "pollen" : 10,
            "trees" : 5
        };

        let returnVal = inventoryMod.hasSpaceForGoods( testInventory, testGoods , maxGoods );
        assert.ok( returnVal );
        done();
    });

    it( 'test hasSpaceForGoods success empty inventory' , function( done )
    {
        let maxGoods = 40;
        let testInventory = {};
        let testGoods = {
            "pollen" : 10,
            "trees" : 5
        };

        let returnVal = inventoryMod.hasSpaceForGoods( testInventory, testGoods , maxGoods );
        assert.ok( returnVal );
        done();
    });

    it( 'test hasSpaceForGoods failure undefined goods' , function( done )
    {
        let maxGoods = 40;
        let testInventory = {
            "pollen" : 10
        };
        let testGoods = undefined;

        let returnVal = inventoryMod.hasSpaceForGoods( testInventory, testGoods , maxGoods );
        if ( returnVal )
        {
            assert.fail( "hasSpaceForGoods returned for undefined goods: " + returnVal );
        }
        done();
    });

    it( 'test hasSpaceForGoods failure undefined inventory' , function( done )
    {
        let maxGoods = 40;
        let testGoods = {
            "pollen" : 10
        };
        let testInventory = undefined;

        let returnVal = inventoryMod.hasSpaceForGoods( testInventory, testGoods , maxGoods );
        if ( returnVal )
        {
            assert.fail( "hasSpaceForGoods returned for undefined inventory: " + returnVal );
        }
        done();
    });

    it( 'test hasSpaceForGoods failure undefined maxGoods' , function( done )
    {
        let maxGoods = undefined;
        let testGoods = {
            "pollen" : 10
        };
        let testInventory = {
            "pollen" : 10
        };

        let returnVal = inventoryMod.hasSpaceForGoods( testInventory, testGoods , maxGoods );
        if ( returnVal )
        {
            assert.fail( "hasSpaceForGoods returned for undefined maxGoods: " + returnVal );
        }
        done();
    });

    it( 'test hasSpaceForGoods failure non-integer maxGoods' , function( done )
    {
        let maxGoods = "badstr";
        let testGoods = {
            "pollen" : 10
        };
        let testInventory = {
            "pollen" : 10
        };

        let returnVal = inventoryMod.hasSpaceForGoods( testInventory, testGoods , maxGoods );
        if ( returnVal )
        {
            assert.fail( "hasSpaceForGoods returned for non-integer maxGoods: " + returnVal );
        }
        done();
    });

    it( 'test hasSpaceForGoods failure empty goods' , function( done )
    {
        let maxGoods = 20;
        let testGoods = {};
        let testInventory = {
            "pollen" : 10
        };

        let returnVal = inventoryMod.hasSpaceForGoods( testInventory, testGoods , maxGoods );
        if ( returnVal )
        {
            assert.fail( "hasSpaceForGoods returned for empty goods: " + returnVal );
        }
        done();
    });

    it( 'test hasSpaceForGoods failure goods with string value' , function( done )
    {
        let maxGoods = 20;
        let testGoods = {
            "pollen" : "BadStr"
        };
        let testInventory = {
            "pollen" : 10
        };

        let returnVal = inventoryMod.hasSpaceForGoods( testInventory, testGoods , maxGoods );
        if ( returnVal )
        {
            assert.fail( "hasSpaceForGoods returned for string value in goods: " + returnVal );
        }
        done();
    });

    it( 'hasSpaceForGoods return undefined for more goods than space' , function( done )
    {
        let maxGoods = 20;
        let testGoods = {
            "pollen" : maxGoods
        };
        let testInventory = {
            "pollen" : 10
        };

        let returnVal = inventoryMod.hasSpaceForGoods( testInventory, testGoods , maxGoods );
        if ( returnVal )
        {
            assert.fail( "hasSpaceForGoods returned for too many goods: " + returnVal );
        }
        done();
    });

    it( 'hasSpaceForGoods return undefined for completely full inventory' , function( done )
    {
        let maxGoods = 20;
        let testInventory = {
            "pollen" : maxGoods
        };
        let testGoods = {
            "pollen" : 1
        };

        let returnVal = inventoryMod.hasSpaceForGoods( testInventory, testGoods , maxGoods );
        if ( returnVal )
        {
            assert.fail( "hasSpaceForGoods returned for full inventory: " + returnVal );
        }
        done();
    });

    /*
    ============
    addGoods testing begins
    ============
    */
    it( 'test addGoods success single same good' , function( done )
    {
        let maxGoods = 20;
        let testAdd = 2;
        let oldValue = 10;
        let testInventory = {
            "pollen" : oldValue
        };
        let testGoods = {
            "pollen" : testAdd
        };

        let returnVal = inventoryMod.addGoods( testInventory, testGoods, maxGoods );
        assert.ok( returnVal );
        assert.ok( returnVal[ "pollen" ] );
        assert.equal( returnVal[ "pollen" ] , oldValue + testAdd );
        done();
    });

    it( 'test addGoods success single different good' , function( done )
    {
        let maxGoods = 20;
        let testAdd = 2;
        let oldValue = 10;
        let testInventory = {
            "pollen" : oldValue
        };
        let testGoods = {
            "chicken" : testAdd
        };

        let returnVal = inventoryMod.addGoods( testInventory, testGoods, maxGoods );
        assert.ok( returnVal );
        assert.ok( returnVal[ "pollen" ] );
        assert.equal( returnVal[ "pollen" ] , oldValue );
        assert.equal( returnVal[ "chicken" ], testAdd );
        done();
    });

    it( 'test addGoods success multiple goods' , function( done )
    {
        let maxGoods = 20;
        let testAdd = 2;
        let oldValue = 10;
        let testInventory = {
            "pollen" : oldValue
        };
        let testGoods = {
            "chicken" : testAdd,
            "pork" : testAdd,
            "pollen" : testAdd
        };

        let returnVal = inventoryMod.addGoods( testInventory, testGoods, maxGoods );
        assert.ok( returnVal );
        assert.ok( returnVal[ "pollen" ] );
        assert.equal( returnVal[ "pollen" ] , oldValue + testAdd );
        assert.equal( returnVal[ "chicken" ], testAdd );
        assert.equal( returnVal[ "pork" ], testAdd );
        done();
    });

    it( 'test addGoods success with @goods in inventory' , function( done )
    {
        let maxGoods = 20;
        let testAdd = 2;
        let oldValue = maxGoods;
        let testInventory = {
            "@pollen" : maxGoods
        };
        let testGoods = {
            "chicken" : testAdd,
            "pork" : testAdd,
            "@pollen" : testAdd
        };

        let returnVal = inventoryMod.addGoods( testInventory, testGoods, maxGoods );
        assert.ok( returnVal );
        assert.ok( returnVal[ "@pollen" ] );
        assert.equal( returnVal[ "@pollen" ] , oldValue + testAdd );
        assert.equal( returnVal[ "chicken" ], testAdd );
        assert.equal( returnVal[ "pork" ], testAdd );
        done();
    });

    it( 'test addGoods failure inventory undefined' , function( done )
    {
        let maxGoods = 20;
        let testAdd = 2;
        let testInventory = undefined;
        let testGoods = {
            "chicken" : testAdd
        };

        let returnVal = inventoryMod.addGoods( testInventory, testGoods, maxGoods );
        if ( returnVal )
        {
            assert.fail( "addGoods returned for undefined inventory: " + returnVal );
        }
        done();
    });

    it( 'test addGoods failure goods undefined' , function( done )
    {
        let maxGoods = 20;
        let testAdd = 2;
        let testGoods = undefined;
        let testInventory = {
            "chicken" : testAdd
        };

        let returnVal = inventoryMod.addGoods( testInventory, testGoods, maxGoods );
        if ( returnVal )
        {
            assert.fail( "addGoods returned for undefined goods: " + returnVal );
        }
        done();
    });

    it( 'test addGoods failure maxGoods undefined' , function( done )
    {
        let maxGoods = undefined;
        let testAdd = 2;
        let testGoods = {
            "pork" : testAdd
        };
        let testInventory = {
            "chicken" : testAdd
        };

        let returnVal = inventoryMod.addGoods( testInventory, testGoods, maxGoods );
        if ( returnVal )
        {
            assert.fail( "addGoods returned for undefined maxGoods: " + returnVal );
        }
        done();
    });

    it( 'test addGoods failure maxGoods non-integer' , function( done )
    {
        let maxGoods = "badStr";
        let testAdd = 2;
        let testGoods = {
            "pork" : testAdd
        };
        let testInventory = {
            "chicken" : testAdd
        };

        let returnVal = inventoryMod.addGoods( testInventory, testGoods, maxGoods );
        if ( returnVal )
        {
            assert.fail( "addGoods returned for non-integer maxGoods: " + returnVal );
        }
        done();
    });

    it( 'test addGoods failure empty goods' , function( done )
    {
        let maxGoods = 20;
        let testAdd = 2;
        let testGoods = {};
        let testInventory = {
            "chicken" : testAdd
        };

        let returnVal = inventoryMod.addGoods( testInventory, testGoods, maxGoods );
        if ( returnVal )
        {
            assert.fail( "addGoods returned for empty goods: " + returnVal );
        }
        done();
    });

    it( 'test addGoods failure string value goods' , function( done )
    {
        let maxGoods = 20;
        let testAdd = 2;
        let testGoods = {
            "pork" : "badSTR"
        };
        let testInventory = {
            "chicken" : testAdd
        };

        let returnVal = inventoryMod.addGoods( testInventory, testGoods, maxGoods );
        if ( returnVal )
        {
            assert.fail( "addGoods returned for string value in goods: " + returnVal );
        }
        done();
    });

    it( 'test addGoods failure not enough space' , function( done )
    {
        let maxGoods = 20;
        let testAdd = 2;
        let oldValue = maxGoods;
        let testInventory = {
            "pollen" : maxGoods
        };
        let testGoods = {
            "chicken" : testAdd
        };

        let returnVal = inventoryMod.addGoods( testInventory, testGoods, maxGoods );
        if ( returnVal )
        {
            assert.fail( "addGoods returned for too many goods: " + returnVal );
        }
        done();
    });

    /*
    ============
    hasGoods testing begins
    ============
    */
    it( 'test hasGoods success for single good in inventory/goods' , function( done )
    {
        let testInventory = {
            "submarines" : 20
        };

        let testGoods = {
            "submarines" : 1
        };

        let result = inventoryMod.hasGoods( testInventory, testGoods );
        assert.ok( result );
        done();
    });

    it( 'test hasGoods success for single good in goods multiple in inventory' , function( done )
    {
        let testInventory = {
            "submarines" : 20,
            "hearts" : 10
        };

        let testGoods = {
            "submarines" : 1
        };

        let result = inventoryMod.hasGoods( testInventory, testGoods );
        assert.ok( result );
        done();
    });

    it( 'test hasGoods success for multiple goods in goods/inventory' , function( done )
    {
        let testInventory = {
            "submarines" : 20,
            "hearts" : 10,
            "spades" : 50
        };

        let testGoods = {
            "submarines" : 5,
            "hearts" : 2
        };

        let result = inventoryMod.hasGoods( testInventory, testGoods );
        assert.ok( result );
        done();
    });

    it( 'test hasGoods failure for single good missing in inventory' , function( done )
    {
        let testInventory = {
            "submarines" : 20,
            "hearts" : 10,
            "spades" : 50
        };

        let testGoods = {
            "submarines" : 5,
            "operator" : 2
        };

        let result = inventoryMod.hasGoods( testInventory, testGoods );
        if ( result )
        {
            assert.fail( "hasGoods returned for missing good: " + result );
        }
        done();
    });

    it( 'test hasGoods failure for multiple good missing in inventory' , function( done )
    {
        let testInventory = {
            "submarines" : 20,
            "hearts" : 10,
            "spades" : 50
        };

        let testGoods = {
            "marinos" : 5,
            "operator" : 2
        };

        let result = inventoryMod.hasGoods( testInventory, testGoods );
        if ( result )
        {
            assert.fail( "hasGoods returned for missing goods: " + result );
        }
        done();
    });

    it( 'test hasGoods failure for not enough good in inventory' , function( done )
    {
        let testInventory = {
            "submarines" : 20,
            "hearts" : 10,
            "spades" : 50
        };

        let testGoods = {
            "submarines" : 21
        };

        let result = inventoryMod.hasGoods( testInventory, testGoods );
        if ( result )
        {
            assert.fail( "hasGoods returned for not enough goods: " + result );
        }
        done();
    });

    it( 'test hasGoods failure inventory undefined' , function( done )
    {
        let testInventory = undefined;

        let testGoods = {
            "submarines" : 21
        };

        let result = inventoryMod.hasGoods( testInventory, testGoods );
        if ( result )
        {
            assert.fail( "hasGoods returned for not undefined inventory: " + result );
        }
        done();
    });

    it( 'test hasGoods failure goods undefined' , function( done )
    {
        let testInventory = {
            "submarines" : 20,
            "hearts" : 10,
            "spades" : 50
        };

        let testGoods = undefined;

        let result = inventoryMod.hasGoods( testInventory, testGoods );
        if ( result )
        {
            assert.fail( "hasGoods returned for undefined goods: " + result );
        }
        done();
    });

    it( 'test hasGoods failure goods empty' , function( done )
    {
        let testInventory = {
            "submarines" : 20,
            "hearts" : 10,
            "spades" : 50
        };

        let testGoods = {};

        let result = inventoryMod.hasGoods( testInventory, testGoods );
        if ( result )
        {
            assert.fail( "hasGoods returned for empty goods: " + result );
        }
        done();
    });

    it( 'test hasGoods failure goods string value' , function( done )
    {
        let testInventory = {
            "submarines" : 20,
            "hearts" : 10,
            "spades" : 50
        };

        let testGoods = {
            "submarines" : "badStr"
        };

        let result = inventoryMod.hasGoods( testInventory, testGoods );
        if ( result )
        {
            assert.fail( "hasGoods returned for string value in goods: " + result );
        }
        done();
    });

    /*
    ============
    isFull testing begins
    ============
    */
    it( 'test isFull success filled equal maxGoods' , function( done )
    {
        let maxGoods = 10;
        let testInventory = {
            "rings" : maxGoods
        };

        let result = inventoryMod.isFull( testInventory, maxGoods );
        assert.ok( result );
        done();
    });

    it( 'test isFull success not filled' , function( done )
    {
        let maxGoods = 10;
        let testInventory = {
            "rings" : maxGoods / 2
        };

        let result = inventoryMod.isFull( testInventory, maxGoods );
        if ( result )
        {
            assert.fail( "isFull returned for non full inventory: " + result );
        }
        done();
    });

    it( 'test isFull success not filled with @ goods' , function( done )
    {
        let maxGoods = 10;
        let testInventory = {
            "rings" : maxGoods / 2,
            "@sheep" : maxGoods
        };

        let result = inventoryMod.isFull( testInventory, maxGoods );
        if ( result )
        {
            assert.fail( "isFull returned for non full inventory with @goods: " + result );
        }
        done();
    });

    it( 'test isFull success not filled off by one' , function( done )
    {
        let maxGoods = 10;
        let testInventory = {
            "rings" : maxGoods - 1,
        };

        let result = inventoryMod.isFull( testInventory, maxGoods );
        if ( result )
        {
            assert.fail( "isFull returned for non full inventory: " + result );
        }
        done();
    });

    it( 'test isFull success not filled empty inventory' , function( done )
    {
        let maxGoods = 10;
        let testInventory = {};

        let result = inventoryMod.isFull( testInventory, maxGoods );
        if ( result )
        {
            assert.fail( "isFull returned for empty inventory: " + result );
        }
        done();
    });


    it( 'test isFull success filled with too many goods for max' , function( done )
    {
        let maxGoods = 10;
        let testInventory = {
            "rings" : maxGoods + 1
        };

        let result = inventoryMod.isFull( testInventory, maxGoods );
        assert.ok( result );
        done();
    });

    it( 'test isFull failure inventory undefined' , function( done )
    {
        let maxGoods = 10;
        let testInventory = undefined;

        let result = inventoryMod.isFull( testInventory, maxGoods );
        if ( result )
        {
            assert.fail( "isFull returned for undefined inventory: " + result );
        }
        done();
    });

    it( 'test isFull failure maxGoods undefined' , function( done )
    {
        let maxGoods = undefined;
        let testInventory = {
            "happiness" : 5
        };

        let result = inventoryMod.isFull( testInventory, maxGoods );
        if ( result )
        {
            assert.fail( "isFull returned for undefined maxGoods: " + result );
        }
        done();
    });

    it( 'test isFull failure maxGoods non integer' , function( done )
    {
        let maxGoods = "badStr";
        let testInventory = {
            "happiness" : 5
        };

        let result = inventoryMod.isFull( testInventory, maxGoods );
        if ( result )
        {
            assert.fail( "isFull returned for non-integer maxGoods: " + result );
        }
        done();
    });

    /*
    ============
    removeGoods testing begins
    ============
    */
    it( 'test removeGoods success single good' , function( done )
    {
        let testGoodName = "kings";
        let testGoodValue = 10;
        let testRemoveValue = 4;

        let testInventory = {};
        testInventory[ testGoodName ] = testGoodValue;

        let testGoods = {};
        testGoods[ testGoodName ] = testRemoveValue;

        let result = inventoryMod.removeGoods( testInventory, testGoods );
        assert.ok( result );
        assert.ok( result[ testGoodName ] );
        assert.equal( result[ testGoodName ] , testGoodValue - testRemoveValue );
        assert.equal( testInventory[ testGoodName ] , result[ testGoodName ] );
        done();
    });

    it( 'test removeGoods success single good multiple inventory' , function( done )
    {
        let testGoodName = "kings";
        let testOtherGood = "yards"
        let testGoodValue = 10;
        let testRemoveValue = 4;

        let testInventory = {};
        testInventory[ testGoodName ] = testGoodValue;
        testInventory[ testOtherGood ] = testGoodValue;

        let testGoods = {};
        testGoods[ testGoodName ] = testRemoveValue;

        let result = inventoryMod.removeGoods( testInventory, testGoods );
        assert.ok( result );
        assert.ok( result[ testGoodName ] );
        assert.equal( result[ testGoodName ] , testGoodValue - testRemoveValue );
        assert.equal( testInventory[ testGoodName ] , result[ testGoodName ] );
        assert.equal( testInventory[ testOtherGood ] , result[ testOtherGood ] );
        assert.equal( result[ testOtherGood ] , testGoodValue );
        done();
    });

    it( 'test removeGoods success multiple good multiple inventory' , function( done )
    {
        let testGoodName = "kings";
        let testOtherGood = "yards"
        let testGoodValue = 10;
        let testRemoveValue = 4;
        let testOtherRemoveValue = 2;

        let testInventory = {};
        testInventory[ testGoodName ] = testGoodValue;
        testInventory[ testOtherGood ] = testGoodValue;

        let testGoods = {};
        testGoods[ testGoodName ] = testRemoveValue;
        testGoods[ testOtherGood ] = testOtherRemoveValue;

        let result = inventoryMod.removeGoods( testInventory, testGoods );
        assert.ok( result );
        assert.ok( result[ testGoodName ] );
        assert.equal( result[ testGoodName ] , testGoodValue - testRemoveValue );
        assert.equal( testInventory[ testGoodName ] , result[ testGoodName ] );
        assert.equal( testInventory[ testOtherGood ] , result[ testOtherGood ] );
        assert.equal( result[ testOtherGood ] , testGoodValue - testOtherRemoveValue );
        done();
    });

    it( 'test removeGoods success remove all of one good multiple inventory' , function( done )
    {
        let testGoodName = "kings";
        let testOtherGood = "yards"
        let testGoodValue = 10;
        let testRemoveValue = testGoodValue;

        let testInventory = {};
        testInventory[ testGoodName ] = testGoodValue;
        testInventory[ testOtherGood ] = testGoodValue;

        let testGoods = {};
        testGoods[ testGoodName ] = testRemoveValue;

        let result = inventoryMod.removeGoods( testInventory, testGoods );
        assert.ok( result );
        if ( result[ testGoodName ] )
        {
            assert.fail( "Zero of good is still in inventory: " + result[ testGoodName ] );
        }
        assert.equal( testInventory[ testOtherGood ] , result[ testOtherGood ] );
        assert.equal( result[ testOtherGood ] , testGoodValue );
        done();
    });

    it( 'test removeGoods success remove entire inventory' , function( done )
    {
        let testInventory = {
            "grain" : 10,
            "widgets" : 5
        };

        let testGoods = testInventory;
        let result = inventoryMod.removeGoods( testInventory, testGoods );
        if ( result && result[ "grain" ] )
        {
            assert.fail( "removeGoods returned for remove entire inventory: " + result );
        }
        done();
    });

    it( 'test removeGoods failure not enough single good' , function( done )
    {
        let testInventory = {
            "grain" : 10,
            "widgets" : 5
        };

        let testGoods = {
            "grain" : 11
        };

        let result = inventoryMod.removeGoods( testInventory, testGoods );
        if ( result )
        {
            assert.fail( "removeGoods returned for not enough goods: " + result );
        }
        done();
    });

    it( 'test removeGoods failure not enough multiple goods' , function( done )
    {
        let testInventory = {
            "grain" : 10,
            "widgets" : 5
        };

        let testGoods = {
            "grain" : 11,
            "widgets" : 6
        };

        let result = inventoryMod.removeGoods( testInventory, testGoods );
        if ( result )
        {
            assert.fail( "removeGoods returned for not enough goods: " + result );
        }
        done();
    });

    it( 'test removeGoods failure inventory undefined' , function( done )
    {
        let testInventory = undefined;

        let testGoods = {
            "grain" : 11,
            "widgets" : 6
        };

        let result = inventoryMod.removeGoods( testInventory, testGoods );
        if ( result )
        {
            assert.fail( "removeGoods returned for undefined inventory: " + result );
        }
        done();
    });

    it( 'test removeGoods failure goods undefined' , function( done )
    {
        let testInventory = {
            "grain" : 11,
            "widgets" : 6
        };

        let testGoods = undefined;

        let result = inventoryMod.removeGoods( testInventory, testGoods );
        if ( result )
        {
            assert.fail( "removeGoods returned for undefined goods: " + result );
        }
        done();
    });

    it( 'test removeGoods failure goods empty' , function( done )
    {
        let testInventory = {
            "grain" : 11,
            "widgets" : 6
        };

        let testGoods = {};

        let result = inventoryMod.removeGoods( testInventory, testGoods );
        if ( result )
        {
            assert.fail( "removeGoods returned for empty goods: " + result );
        }
        done();
    });

    it( 'test removeGoods failure goods string value' , function( done )
    {
        let testInventory = {
            "grain" : 11,
            "widgets" : 6
        };

        let testGoods = {
            "grain" : "wall"
        };

        let result = inventoryMod.removeGoods( testInventory, testGoods );
        if ( result )
        {
            assert.fail( "removeGoods returned for string value in goods: " + result );
        }
        done();
    });

    //after() is run after all tests have completed.
    after( function( done )
    {
        done();
    });
});
