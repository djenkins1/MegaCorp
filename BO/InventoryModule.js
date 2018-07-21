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

        let amount = parseInt( inventory[ good ] , 10 );
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

//Adds goods to the inventory(NO UPDATE DB YET)
//returns the new inventory if updated or undefined otherwise
function addGoods( inventory, goods , maxGoods )
{
    DEBUG_MODE && console.log( "Calling addGoods in InventoryModule, goods:" , goods );
    if ( inventory == undefined )
    {
        DEBUG_MODE && console.log( "InventoryModule.addGoods: inventory is undefined" );
        return undefined;
    }

    if ( goods == undefined )
    {
        DEBUG_MODE && console.log( "InventoryModule.addGoods: goods is undefined" );
        return undefined;
    }

    if ( maxGoods == undefined )
    {
        DEBUG_MODE && console.log( "InventoryModule.addGoods: maxGoods is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( maxGoods ) )
    {
        DEBUG_MODE && console.log( "InventoryModule.addGoods: maxGoods is non-integer" );
        DEBUG_MODE && console.log( "InventoryModule.addGoods: maxGoods is"
            , maxGoods );
        return undefined;
    }

    if ( !checkValidGoods( goods ) )
    {
        DEBUG_MODE && console.log( "InventoryModule.addGoods: checkValidGoods returned false" );
        return undefined;
    }

    if ( !hasSpaceForGoods( inventory, goods, maxGoods ) )
    {
        DEBUG_MODE && console.log( "InventoryModule.addGoods: inventory does not have space for goods" );
        return undefined;
    }

    for ( good in goods )
    {
        if ( inventory[ good ] )
        {
            DEBUG_MODE && console.log( "InventoryModule.addGoods: adding" , goods[ good ], "of good"
                , good , "to existing amount" , inventory[ good ] );
            inventory[ good ] += goods[ good ];
        }
        else
        {
            DEBUG_MODE && console.log( "InventoryModule.addGoods: adding" , goods[ good ], "of good"
                , good , "to empty space" );
            inventory[ good ] = goods[ good ];
        }
    }

    DEBUG_MODE && console.log( "InventoryModule.addGoods: added goods successfully" );
    return inventory;
}

//Returns true if the inventory has the goods specified
function hasGoods( inventory, goods )
{
    DEBUG_MODE && console.log( "Calling hasGoods in InventoryModule, goods:" , goods );
    if ( inventory == undefined )
    {
        DEBUG_MODE && console.log( "InventoryModule.hasGoods: inventory is undefined" );
        return undefined;
    }

    if ( goods == undefined )
    {
        DEBUG_MODE && console.log( "InventoryModule.hasGoods: goods is undefined" );
        return undefined;
    }

    if ( !checkValidGoods( goods ) )
    {
        DEBUG_MODE && console.log( "InventoryModule.hasGoods: checkValidGoods returned false" );
        return undefined;
    }

    for ( good in goods )
    {
        if ( inventory[ good ] == undefined )
        {
            DEBUG_MODE && console.log( "InventoryModule.hasGoods: inventory does not contain any of" , good );
            return undefined;
        }

        if ( inventory[ good ] < goods[ good ] )
        {
            DEBUG_MODE && console.log( "InventoryModule.hasGoods: inventory does not contain enough of" , good
                , "has" , inventory[ good ] , "/" , goods[ good ] );
            return undefined;
        }
    }

    DEBUG_MODE && console.log( "InventoryModule.hasGoods: inventory has enough of all goods specified" );
    return true;
}

//Returns true if the inventory is completely maxed out or false if not
//returns undefined if inventory is undefined or not valid
function isFull( inventory , maxGoods )
{
    DEBUG_MODE && console.log( "Calling isFull in InventoryModule, maxGoods:" , maxGoods );
    if ( inventory == undefined )
    {
        DEBUG_MODE && console.log( "InventoryModule.isFull: inventory is undefined" );
        return undefined;
    }

    if ( maxGoods == undefined )
    {
        DEBUG_MODE && console.log( "InventoryModule.isFull: maxGoods is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( maxGoods ) )
    {
        DEBUG_MODE && console.log( "InventoryModule.isFull: maxGoods is not an integer" );
        return undefined;
    }

    maxGoods = parseInt( maxGoods , 10 );
    let totalGoods = sumGoodsInventory( inventory );
    DEBUG_MODE && console.log( "InventoryModule.isFull: maxGoods is" , maxGoods );
    DEBUG_MODE && console.log( "InventoryModule.isFull: totalGoods is" , totalGoods );
    if ( totalGoods >= maxGoods )
    {
        DEBUG_MODE && console.log( "InventoryModule.isFull: returning true for full inventory" );
        return true;
    }
    else
    {
        DEBUG_MODE && console.log( "InventoryModule.isFull: returning false as still has inventory space" );
        return false;
    }
}

//Remove goods from the inventory
//returns the new inventory or undefined otherwise
function removeGoods( inventory , goods )
{
    DEBUG_MODE && console.log( "Calling removeGoods in InventoryModule, goods:" , goods );
    if ( inventory == undefined )
    {
        DEBUG_MODE && console.log( "InventoryModule.removeGoods: inventory is undefined" );
        return undefined;
    }

    if ( goods == undefined )
    {
        DEBUG_MODE && console.log( "InventoryModule.removeGoods: goods is undefined" );
        return undefined;
    }

    if ( !checkValidGoods( goods ) )
    {
        DEBUG_MODE && console.log( "InventoryModule.removeGoods: checkValidGoods for goods returned false" );
        return undefined;
    }

    if ( !hasGoods( inventory, goods ) )
    {
        DEBUG_MODE && console.log( "InventoryModule.removeGoods: hasGoods for goods returned false" );
        return undefined;
    }

    //remove the goods from the inventory
    for ( good in goods )
    {
        DEBUG_MODE && console.log( "InventoryModule.removeGoods: removing" , goods[ good ], "of good"
            , good , "from existing amount" , inventory[ good ] );
        inventory[ good ] -= goods[ good ];

        //if the leftover good is 0 then remove that key from the inventory
        if ( inventory[ good ] == 0 )
        {
            DEBUG_MODE && console.log( "InventoryModule.removeGoods:"
                , good, "is now empty,removing key" );
            delete inventory[ good ];
        }
    }

    DEBUG_MODE && console.log( "InventoryModule.removeGoods: removed goods successfully" );
    return inventory;
}

exports.sumGoodsInventory = sumGoodsInventory;
exports.checkValidGoods = checkValidGoods;
exports.hasSpaceForGoods = hasSpaceForGoods;
exports.addGoods = addGoods;
exports.hasGoods = hasGoods;
exports.isFull = isFull;
exports.removeGoods = removeGoods;
