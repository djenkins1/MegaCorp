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
    //TODO:
    addGoods
    hasGoods
    isFull
    removeGoods
    */

    //after() is run after all tests have completed.
    after( function( done )
    {
        done();
    });
});
