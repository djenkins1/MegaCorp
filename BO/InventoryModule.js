const DEBUG_MODE = require('config').get('DebugModeBO');

//returns the sum total of all the goods in the inventory given(Not including @ goods)
function sumGoodsInventory( inventory )
{
    DEBUG_MODE && console.log( "Calling sumGoodsInventory in InventoryModule, inventory:" , inventory );
    if ( inventory == undefined )
    {
        DEBUG_MODE && console.log( "InventoryModule.sumGoodsInventory: inventory undefined" );
        return undefined;
    }

    var good = undefined;
    var returnSum = 0;
    for ( good in inventory )
    {
        if ( good.charAt( 0 ) === "@" )
        {
            DEBUG_MODE && console.log( "InventoryModule.sumGoodsInventory: skipping over good" , good );
            continue;
        }

        let amount = inventory[ good ];
        DEBUG_MODE && console.log( "InventoryModule.sumGoodsInventory: adding" ,amount, "to sum for good" , good );
        returnSum += amount;
    }

    DEBUG_MODE && console.log( "InventoryModule.sumGoodsInventory: returning sum" , returnSum );
    return returnSum;
}

//returns true if the goods are valid or undefined otherwise
function checkValidGoods( goods )
{
    DEBUG_MODE && console.log( "Calling checkValidGoods in InventoryModule, goods:" , goods );
    if ( goods == undefined )
    {
        DEBUG_MODE && console.log( "InventoryModule.checkValidGoods: goods undefined" );
        return undefined;
    }

    var good = undefined;
    for ( good in goods )
    {
        if ( !Number.isInteger( goods[ good ] ) )
        {
            DEBUG_MODE && console.log( "InventoryModule.checkValidGoods: good " , good , "has non integer value" , goods[ good ] );
            return undefined;
        }
    }

    if ( good == undefined )
    {
        DEBUG_MODE && console.log( "InventoryModule.checkValidGoods: goods is empty" );
        return undefined;
    }

    DEBUG_MODE && console.log( "InventoryModule.checkValidGoods: returning true" );
    return true;
}

//returns true if the inventory has enough space for the goods specified or undefined otherwise
function hasSpaceForGoods( inventory, goods, maxGoods )
{
    DEBUG_MODE && console.log( "Calling hasSpaceForGoods in InventoryModule, goods:" , goods );

    if ( goods == undefined )
    {
        DEBUG_MODE && console.log( "InventoryModule.hasSpaceForGoods: goods is undefined" );
        return undefined;
    }

    if ( inventory == undefined )
    {
        DEBUG_MODE && console.log( "InventoryModule.hasSpaceForGoods: inventory is undefined" );
        return undefined;
    }

    if ( maxGoods == undefined )
    {
        DEBUG_MODE && console.log( "InventoryModule.hasSpaceForGoods: maxGoods is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( maxGoods ) )
    {
        DEBUG_MODE && console.log( "InventoryModule.hasSpaceForGoods: maxGoods is non-integer" );
        DEBUG_MODE && console.log( "InventoryModule.hasSpaceForGoods: maxGoods is"
            , maxGoods );
        return undefined;
    }

    if ( !checkValidGoods( goods ) )
    {
        DEBUG_MODE && console.log( "InventoryModule.hasSpaceForGoods: checkValidGoods returned false" );
        return undefined;
    }

    var currentInventorySum = sumGoodsInventory( inventory );
    let newGoodSum = sumGoodsInventory( goods );

    if ( maxGoods >= currentInventorySum + newGoodSum )
    {
        DEBUG_MODE && console.log( "InventoryModule.hasSpaceForGoods: returning true" );
        return true;
    }

    DEBUG_MODE && console.log( "InventoryModule.hasSpaceForGoods: returning undefined for sums" , currentInventorySum, "and", newGoodSum );
    return undefined;
}

exports.sumGoodsInventory = sumGoodsInventory;
exports.checkValidGoods = checkValidGoods;
exports.hasSpaceForGoods = hasSpaceForGoods;
