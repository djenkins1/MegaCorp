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
    //TODO:
    hasSpaceForGoods
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
