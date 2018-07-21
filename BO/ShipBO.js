const shipDAO = require( "../Data/ShipDAO" );
const DEBUG_MODE = require('config').get('DebugModeBO');
const ID_KEY = require('config').get('ID_KEY');
const inventoryMod = require( './InventoryModule');

//returns the sum total of all the goods in the inventory given(Not including @ goods)
function sumGoodsInventory( inventory )
{
    DEBUG_MODE && console.log( "Calling sumGoodsInventory in ShipBO, inventory:" , inventory );
    return inventoryMod.sumGoodsInventory( inventory );
}

//returns the sum total of all the goods in the ship inventory(Not including @ goods)
function sumGoods( shipObj )
{
    DEBUG_MODE && console.log( "Calling sumGoods in ShipBO, shipObj:" , shipObj );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.sumGoods: shipObj undefined" );
        return undefined;
    }

    if ( shipObj.inventory == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.sumGoods: inventory undefined" );
        return undefined;
    }

    DEBUG_MODE && console.log( "ShipBO.sumGoods: returning from sumGoodsInventory call"  );
    return sumGoodsInventory( shipObj.inventory );
}

function isValidLocation( location )
{
    DEBUG_MODE && console.log( "Calling isValidLocation in ShipBO, location:" , location );
    if ( location == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.isValidLocation: location is undefined" );
        return false;
    }

    if ( location.x == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.isValidLocation: location.x is undefined" );
        return false;
    }

    if ( location.y == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.isValidLocation: location.y is undefined" );
        return false;
    }

    if ( !Number.isInteger( location.x ) )
    {
        DEBUG_MODE && console.log( "ShipBO.isValidLocation: location.x is not an integer" );
        return false;
    }

    if ( !Number.isInteger( location.y ) )
    {
        DEBUG_MODE && console.log( "ShipBO.isValidLocation: location.y is not an integer" );
        return false;
    }

    if ( location.z && !Number.isInteger( location.z ) )
    {
        DEBUG_MODE && console.log( "ShipBO.isValidLocation: location.z is defined but not an integer" );
        return false;
    }

    DEBUG_MODE && console.log( "ShipBO.isValidLocation: location is valid" );
    return true;
}

//Changes the destination of the ship to empty location
//returns true if successfully cleared
function clearDestination( shipObj )
{
    DEBUG_MODE && console.log( "Calling clearDestination in ShipBO"  );

    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.clearDestination: ship is undefined" );
        return false;
    }

    DEBUG_MODE && console.log( "ShipBO.clearDestination: old destination" , shipObj.destination );
    shipObj.destination = {};

    DEBUG_MODE && console.log( "ShipBO.clearDestination: destination cleared successfully" );
    return true;
}

//Change the destination of the ship(NO UPDATE DB YET)
//Returns new destination if updated successfully or undefined otherwise
function changeDestination( shipObj, newDestination )
{
    DEBUG_MODE && console.log( "Calling changeDestination in ShipBO, new destination:" , newDestination );
    if ( newDestination == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.changeDestination: new destination is undefined" );
        return undefined;
    }

    if ( !isValidLocation( newDestination ) )
    {
        DEBUG_MODE && console.log( "ShipBO.changeDestination: new destination is not a valid location" );
        return undefined;
    }

    if ( shipObj.destination == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.changeDestination: old destination is undefined" );
        return undefined;
    }

    shipObj.destination = newDestination;
    DEBUG_MODE && console.log( "ShipBO.changeDestination: changed destination successfully" );
    return newDestination;
}

//MoveShip,Move the ship to the location given(NO UPDATE DB YET)
//Returns new location if updated successfully or undefined otherwise
function moveShip( shipObj, newLocation )
{
    DEBUG_MODE && console.log( "Calling moveShip in ShipBO, new location:" , newLocation );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.moveShip: shipObj is undefined" );
        return undefined;
    }

    if ( newLocation == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.moveShip: new location is undefined" );
        return undefined;
    }

    if ( !isValidLocation( newLocation ) )
    {
        DEBUG_MODE && console.log( "ShipBO.moveShip: new location is not a valid location" );
        return undefined;
    }

    if ( shipObj.location == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.moveShip: old location is undefined" );
        return undefined;
    }

    shipObj.location = newLocation;
    DEBUG_MODE && console.log( "ShipBO.moveShip: changed location successfully" );
    return newLocation;
}

//ChangeName,Change the name of the ship(NO UPDATE DB YET)
//Returns new name if updated successfully or undefined otherwise
function changeName( shipObj, newName )
{
    DEBUG_MODE && console.log( "Calling changeName in ShipBO, new name:" , newName );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.changeName: shipObj is undefined" );
        return undefined;
    }

    if ( newName == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.changeName: newName is undefined" );
        return undefined;
    }

    if ( shipObj.name == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.changeName: old name is undefined" );
        return undefined;
    }

    if ( typeof newName != 'string' )
    {
        DEBUG_MODE && console.log( "ShipBO.changeName: newName is not a string" );
        return undefined;
    }

    shipObj.name = newName;
    DEBUG_MODE && console.log( "ShipBO.changeName: changed name successfully" );
    return newName;
}

//LocationFuelCost,returns the amount of fuel needed to travel to the location given
//returns the amount of fuel needed or undefined if not able to calculate
//uses taxicab distance and ignores z coordinate(inner system travel costs no fuel)
function locationFuelCost( currentLocation, destination, fuelCostBySquare )
{
    DEBUG_MODE && console.log( "Calling locationFuelCost in ShipBO, currentLocation:" , currentLocation , "destination:" , destination );
    if ( !isValidLocation( currentLocation ) )
    {
        DEBUG_MODE && console.log( "ShipBO.locationFuelCost: currentLocation is not a valid location" );
        return undefined;
    }

    if ( !isValidLocation( destination ) )
    {
        DEBUG_MODE && console.log( "ShipBO.locationFuelCost: destination is not a valid location" );
        return undefined;
    }

    if ( !checkValidGoods( fuelCostBySquare ) )
    {
        DEBUG_MODE && console.log( "ShipBO.locationFuelCost: checkValidGoods returned false for" , fuelCostBySquare );
        return undefined;
    }

    let xDist = Math.abs( destination.x - currentLocation.x );
    let yDist = Math.abs( destination.y - currentLocation.y );
    let totalDist = xDist + yDist;
    let totalFuelCost = {};
    for ( var fuelGood in fuelCostBySquare )
    {
        totalFuelCost[ fuelGood ] = fuelCostBySquare[ fuelGood ] * totalDist;
    }

    DEBUG_MODE && console.log( "ShipBO.locationFuelCost: total distance," , totalDist, "and calculated fuel cost," , totalFuelCost );
    return totalFuelCost;
}

//DestinationFuelCost,returns the amount of fuel needed to travel to the location given
//shorthand function for shipObj passed
function destinationFuelCost( shipObj, destination )
{
    DEBUG_MODE && console.log( "Calling destinationFuelCost in ShipBO, destination:" , destination );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.destinationFuelCost: shipObj is undefined" );
        return undefined;
    }

    if ( shipObj.location == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.destinationFuelCost: shipObj.location is undefined" );
        return undefined;
    }

    if ( shipObj.shipBluePrint == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.destinationFuelCost: shipObj.shipBluePrint is undefined" );
        return undefined;
    }

    if ( shipObj.shipBluePrint.fuelCost == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.destinationFuelCost: shipBluePrint.fuelCost is undefined" );
        return undefined;
    }

    if ( destination == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.destinationFuelCost: destination undefined" );
        return undefined;
    }

    DEBUG_MODE && console.log( "ShipBO.destinationFuelCost: returning value from locationFuelCost call" );
    return locationFuelCost( shipObj.location , destination, shipObj.shipBluePrint.fuelCost );
}

//returns true if the goods are valid or undefined otherwise
function checkValidGoods( goods )
{
    DEBUG_MODE && console.log( "Calling checkValidGoods in ShipBO, goods:" , goods );
    return inventoryMod.checkValidGoods( goods );
}

//returns true if the ship has enough inventory space for the goods specified or undefined otherwise
function hasSpaceForGoods( shipObj, goods )
{
    DEBUG_MODE && console.log( "Calling hasSpaceForGoods in ShipBO, goods:" , goods );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.hasSpaceForGoods: shipObj is undefined" );
        return undefined;
    }

    if ( goods == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.hasSpaceForGoods: goods is undefined" );
        return undefined;
    }

    if ( shipObj.inventory == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.hasSpaceForGoods: shipObj.inventory is undefined" );
        return undefined;
    }

    if ( shipObj.shipBluePrint == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.hasSpaceForGoods: shipObj.shipBluePrint is undefined" );
        return undefined;
    }

    if ( shipObj.shipBluePrint.maxInventory == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.hasSpaceForGoods: shipObj.shipBluePrint.maxInventory is undefined" );
        return undefined;
    }

    DEBUG_MODE && console.log( "ShipBO.hasSpaceForGoods: returning InventoryModule.hasSpaceForGoods" );
    return inventoryMod.hasSpaceForGoods( shipObj.inventory, goods, shipObj.shipBluePrint.maxInventory );
}

//Adds goods to the ships inventory(NO UPDATE DB YET)
//returns the new inventory of the ship if updated or undefined otherwise
function addGoods( shipObj, goods )
{
    DEBUG_MODE && console.log( "Calling addGoods in ShipBO, goods:" , goods );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.addGoods: shipObj is undefined" );
        return undefined;
    }

    if ( goods == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.addGoods: goods is undefined" );
        return undefined;
    }

    if ( shipObj.inventory == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.addGoods: shipObj.inventory is undefined" );
        return undefined;
    }

    if ( !checkValidGoods( goods ) )
    {
        DEBUG_MODE && console.log( "ShipBO.addGoods: checkValidGoods returned false" );
        return undefined;
    }

    if ( !hasSpaceForGoods( shipObj, goods ) )
    {
        DEBUG_MODE && console.log( "ShipBO.addGoods: ship does not have space for goods" );
        return undefined;
    }

    for ( good in goods )
    {
        if ( shipObj.inventory[ good ] )
        {
            DEBUG_MODE && console.log( "ShipBO.addGoods: adding" , goods[ good ], "of good"
                , good , "to existing amount" , shipObj.inventory[ good ] );
            shipObj.inventory[ good ] += goods[ good ];
        }
        else
        {
            DEBUG_MODE && console.log( "ShipBO.addGoods: adding" , goods[ good ], "of good"
                , good , "to empty space" );
            shipObj.inventory[ good ] = goods[ good ];
        }
    }

    DEBUG_MODE && console.log( "ShipBO.addGoods: added goods successfully" );
    return shipObj.inventory;
}

//Returns true if the ship has the goods specified
function hasGoods( shipObj, goods )
{
    DEBUG_MODE && console.log( "Calling hasGoods in ShipBO, goods:" , goods );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.hasGoods: shipObj is undefined" );
        return undefined;
    }

    if ( goods == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.hasGoods: goods is undefined" );
        return undefined;
    }

    if ( shipObj.inventory == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.hasGoods: shipObj.inventory is undefined" );
        return undefined;
    }

    if ( !checkValidGoods( goods ) )
    {
        DEBUG_MODE && console.log( "ShipBO.hasGoods: checkValidGoods returned false" );
        return undefined;
    }

    for ( good in goods )
    {
        if ( shipObj.inventory[ good ] == undefined )
        {
            DEBUG_MODE && console.log( "ShipBO.hasGoods: inventory does not contain any of" , good );
            return undefined;
        }

        if ( shipObj.inventory[ good ] < goods[ good ] )
        {
            DEBUG_MODE && console.log( "ShipBO.hasGoods: inventory does not contain enough of" , good
                , "has" , shipObj.inventory[ good ] , "/" , goods[ good ] );
            return undefined;
        }
    }

    DEBUG_MODE && console.log( "ShipBO.hasGoods: ship has enough of all goods specified" );
    return true;
}

//Returns true if the ship has the fuel needed to travel 1 square
function hasFuel( shipObj )
{
    DEBUG_MODE && console.log( "Calling hasFuel in ShipBO, shipObj:" , shipObj );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.hasFuel: shipObj is undefined" );
        return undefined;
    }

    if ( shipObj.inventory == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.hasFuel: shipObj.inventory is undefined" );
        return undefined;
    }

    if ( shipObj.shipBluePrint == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.hasFuel: shipObj.shipBluePrint is undefined" );
        return undefined;
    }

    if ( shipObj.shipBluePrint.fuelCost == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.hasFuel: shipBluePrint.fuelCost is undefined" );
        return undefined;
    }

    DEBUG_MODE && console.log( "ShipBO.hasFuel: calling hasGoods with shipBluePrint.fuelCost as goods" );
    return hasGoods( shipObj, shipObj.shipBluePrint.fuelCost );
}

//Change the company that owns the ship(NO UPDATE DB YET)
//returns the id of the new owner or undefined otherwise
function changeCompany( shipObj , newCompanyId )
{
    DEBUG_MODE && console.log( "Calling changeCompany in ShipBO, newCompanyId:" , newCompanyId );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.changeCompany: shipObj is undefined" );
        return undefined;
    }

    if ( newCompanyId == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.changeCompany: newCompanyId is undefined" );
        return undefined;
    }

    if ( shipObj.companyId == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.changeCompany: shipObj.companyId is undefined" );
        return undefined;
    }

    if ( typeof newCompanyId != "string" )
    {
        DEBUG_MODE && console.log( "ShipBO.changeCompany: newCompanyId is not a string" );
        return undefined;
    }

    if ( newCompanyId == shipObj.companyId )
    {
        DEBUG_MODE && console.log( "ShipBO.changeCompany: newCompanyId is same as old" );
        return undefined;
    }

    DEBUG_MODE && console.log( "ShipBO.changeCompany: changing companyId to" , newCompanyId , "from" , shipObj.companyId );
    shipObj.companyId = newCompanyId;
    return newCompanyId;
}

//Returns true if the ship's inventory is completely maxed out or false if not
//returns undefined if shipObj is undefined or not valid
function isFull( shipObj )
{
    DEBUG_MODE && console.log( "Calling isFull in ShipBO, shipObj:" , shipObj );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.isFull: shipObj is undefined" );
        return undefined;
    }

    if ( shipObj.inventory == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.isFull: shipObj.inventory is undefined" );
        return undefined;
    }

    if ( shipObj.shipBluePrint == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.isFull: shipObj.shipBluePrint is undefined" );
        return undefined;
    }

    if ( shipObj.shipBluePrint.maxInventory == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.isFull: shipBluePrint.maxInventory is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( shipObj.shipBluePrint.maxInventory ) )
    {
        DEBUG_MODE && console.log( "ShipBO.isFull: shipBluePrint.maxInventory is not an integer" );
        return undefined;
    }

    let maxGoods = parseInt( shipObj.shipBluePrint.maxInventory , 10 );
    let totalGoods = sumGoodsInventory( shipObj.inventory );
    DEBUG_MODE && console.log( "ShipBO.isFull: maxGoods is" , maxGoods );
    DEBUG_MODE && console.log( "ShipBO.isFull: totalGoods is" , totalGoods );
    if ( totalGoods >= maxGoods )
    {
        DEBUG_MODE && console.log( "ShipBO.isFull: returning true as ship has full inventory" );
        return true;
    }
    else
    {
        DEBUG_MODE && console.log( "ShipBO.isFull: returning false as ship still has inventory space" );
        return false;
    }
}

//Remove goods from the ships inventory(NO UPDATE DB YET)
//returns the new inventory or undefined otherwise
function removeGoods( shipObj , goods )
{
    DEBUG_MODE && console.log( "Calling removeGoods in ShipBO, goods:" , goods );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.removeGoods: shipObj is undefined" );
        return undefined;
    }

    if ( shipObj.inventory == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.removeGoods: shipObj.inventory is undefined" );
        return undefined;
    }

    if ( goods == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.removeGoods: goods is undefined" );
        return undefined;
    }

    if ( !checkValidGoods( goods ) )
    {
        DEBUG_MODE && console.log( "ShipBO.removeGoods: checkValidGoods for goods returned false" );
        return undefined;
    }

    if ( !hasGoods( shipObj, goods ) )
    {
        DEBUG_MODE && console.log( "ShipBO.removeGoods: hasGoods for goods returned false" );
        return undefined;
    }

    //remove the goods from the inventory
    for ( good in goods )
    {
        DEBUG_MODE && console.log( "ShipBO.removeGoods: removing" , goods[ good ], "of good"
            , good , "from existing amount" , shipObj.inventory[ good ] );
        shipObj.inventory[ good ] -= goods[ good ];

        //if the leftover good is 0 then remove that key from the inventory
        if ( shipObj.inventory[ good ] == 0 )
        {
            DEBUG_MODE && console.log( "ShipBO.removeGoods:"
                , good, "is now empty,removing key" );
            delete shipObj.inventory[ good ];
        }
    }

    DEBUG_MODE && console.log( "ShipBO.removeGoods: removed goods successfully" );
    return shipObj.inventory;
}

//Remove the fuel needed to travel 1 square(NO UPDATE DB YET)
//returns the new inventory of the ship or undefined otherwise
function useFuel( shipObj )
{
    DEBUG_MODE && console.log( "Calling useFuel in ShipBO, shipObj:" , shipObj );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.useFuel: shipObj is undefined" );
        return undefined;
    }

    if ( shipObj.inventory == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.useFuel: shipObj.inventory is undefined" );
        return undefined;
    }

    if ( shipObj.shipBluePrint == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.useFuel: shipObj.shipBluePrint is undefined" );
        return undefined;
    }

    if ( shipObj.shipBluePrint.fuelCost == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.useFuel: shipBluePrint.fuelCost is undefined" );
        return undefined;
    }

    if ( !hasFuel( shipObj ) )
    {
        DEBUG_MODE && console.log( "ShipBO.useFuel: hasFuel returned false" );
        return undefined;
    }

    DEBUG_MODE && console.log( "ShipBO.useFuel: calling remove goods for fuel" );
    return removeGoods( shipObj, shipObj.shipBluePrint.fuelCost );
}

//Returns true if the ship is docked on a planet(If location Has Z coordinate)
function isDocked( shipObj )
{
    DEBUG_MODE && console.log( "Calling isDocked in ShipBO, shipObj:" , shipObj );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.isDocked: shipObj is undefined" );
        return undefined;
    }

    if ( shipObj.location == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.isDocked: shipObj.location is undefined" );
        return undefined;
    }

    if ( !isValidLocation( shipObj.location ) )
    {
        DEBUG_MODE && console.log( "ShipBO.isDocked: isValidLocation returned false" );
        return undefined;
    }

    if ( shipObj.location.z )
    {
        DEBUG_MODE && console.log( "ShipBO.isDocked: returning true as ship is docked" );
        return true;
    }
    else
    {
        DEBUG_MODE && console.log( "ShipBO.isDocked: returning false as ship is not docked" );
        return false;
    }
}

//Remove damage from the ship(NO UPDATE DB YET)
//returns the total damage or undefined otherwise
function fixDamage( shipObj, fixAmount )
{
    DEBUG_MODE && console.log( "Calling fixDamage in ShipBO, shipObj:" , shipObj );
    DEBUG_MODE && console.log( "ShipBO.fixDamage: fixAmount is" , fixAmount );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.fixDamage: shipObj is undefined" );
        return undefined;
    }

    if ( shipObj.damage == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.fixDamage: shipObj.damage is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( shipObj.damage ) )
    {
        DEBUG_MODE && console.log( "ShipBO.fixDamage: shipObj.damage is not an integer" );
        return undefined;
    }

    if ( fixAmount == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.fixDamage: fixAmount is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( fixAmount ) )
    {
        DEBUG_MODE && console.log( "ShipBO.fixDamage: fixAmount is not an integer" );
        return undefined;
    }

    if ( parseInt( fixAmount ) <= 0 )
    {
        DEBUG_MODE && console.log( "ShipBO.fixDamage: fixAmount should be > 0" );
        return undefined;
    }

    if ( parseInt( fixAmount ) > parseInt( shipObj.damage ) )
    {
        DEBUG_MODE && console.log( "ShipBO.fixDamage: fixAmount is more than existing damage" );
        return undefined;
    }

    shipObj.damage = parseInt( shipObj.damage ) - parseInt( fixAmount );
    DEBUG_MODE && console.log( "ShipBO.fixDamage: fixed damage successfully" );
    return shipObj.damage;
}

//returns true if the ship has the maximum possible damage
function isMaxDamaged( shipObj )
{
    DEBUG_MODE && console.log( "Calling isMaxDamaged in ShipBO, shipObj:" , shipObj );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.isMaxDamaged: shipObj is undefined" );
        return undefined;
    }

    if ( shipObj.damage == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.isMaxDamaged: shipObj.damage is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( shipObj.damage ) )
    {
        DEBUG_MODE && console.log( "ShipBO.isMaxDamaged: shipObj.damage is not an integer" );
        return undefined;
    }

    if ( shipObj.shipBluePrint == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.isMaxDamaged: shipObj.shipBluePrint is undefined" );
        return undefined;
    }

    if ( shipObj.shipBluePrint.maxDamage == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.isMaxDamaged: shipBluePrint.maxDamage is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( shipObj.shipBluePrint.maxDamage ) )
    {
        DEBUG_MODE && console.log( "ShipBO.isMaxDamaged: shipBluePrint.maxDamage is not an integer" );
        return undefined;
    }

    if ( parseInt( shipObj.shipBluePrint.maxDamage ) <= 0 )
    {
        DEBUG_MODE && console.log( "ShipBO.isMaxDamaged: shipBluePrint.maxDamage must be > 0" );
        return undefined;
    }

    let currentDamage = parseInt( shipObj.damage );
    let maxDamage = parseInt( shipObj.shipBluePrint.maxDamage );
    DEBUG_MODE && console.log( "ShipBO.isMaxDamaged: current damage is" , currentDamage );
    DEBUG_MODE && console.log( "ShipBO.isMaxDamaged: max damage is" , maxDamage );
    if ( currentDamage >= maxDamage )
    {
        DEBUG_MODE && console.log( "ShipBO.isMaxDamaged: returning true as ship is damaged to the max" );
        return true;
    }
    else
    {
        DEBUG_MODE && console.log( "ShipBO.isMaxDamaged: returning false as ship is not fully damaged" );
        return false;
    }
}

//Add damage to the ship(NO UPDATE DB YET)
//returns total damage or undefined if not successful
function addDamage( shipObj, addAmount )
{
    DEBUG_MODE && console.log( "Calling addDamage in ShipBO, shipObj:" , shipObj );
    if ( shipObj == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.addDamage: shipObj is undefined" );
        return undefined;
    }

    if ( addAmount == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.addDamage: addAmount is undefined" );
        return undefined;
    }

    if ( shipObj.damage == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.addDamage: shipObj.damage is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( shipObj.damage ) )
    {
        DEBUG_MODE && console.log( "ShipBO.addDamage: shipObj.damage is not an integer" );
        return undefined;
    }

    if ( shipObj.shipBluePrint == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.addDamage: shipObj.shipBluePrint is undefined" );
        return undefined;
    }

    if ( shipObj.shipBluePrint.maxDamage == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.addDamage: shipBluePrint.maxDamage is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( shipObj.shipBluePrint.maxDamage ) )
    {
        DEBUG_MODE && console.log( "ShipBO.addDamage: shipBluePrint.maxDamage is not an integer" );
        return undefined;
    }

    if ( !Number.isInteger( addAmount ) )
    {
        DEBUG_MODE && console.log( "ShipBO.addDamage: addAmount is not an integer" );
        return undefined;
    }

    if ( parseInt( addAmount ) <= 0 )
    {
        DEBUG_MODE && console.log( "ShipBO.addDamage: addAmount must be > 0" );
        return undefined;
    }

    let currentDamage = parseInt( shipObj.damage );
    let maxDamage = parseInt( shipObj.shipBluePrint.maxDamage );
    DEBUG_MODE && console.log( "ShipBO.addDamage: current damage is" , currentDamage );
    DEBUG_MODE && console.log( "ShipBO.addDamage: max damage is" , maxDamage );
    if ( currentDamage + addAmount > maxDamage )
    {
        DEBUG_MODE && console.log( "ShipBO.addDamage: cannot damage beyond max damage" );
        return undefined;
    }

    shipObj.damage = currentDamage + addAmount;
    DEBUG_MODE && console.log( "ShipBO.addDamage: successfully added damage" );
    return shipObj.damage;
}

//Returns the default prototype for a new ship object
function defaultObj()
{
    return {
        "name" : "",
        "companyId" : "",
        "damage" : 0,
        "shipTypeName" : "",
        "shipBluePrint" : {},
        "location" : {},
        "destination" : {},
        "inventory" : {}
    };
}

//Saves any changes made to the ship to the database
//when the changes have been saved the onFinish function is called
//this function ignores any other properties in the shipObj parameter
//  other then those which are in the defaultObj(as well as _id)
function saveShip( shipObj, onFinish )
{
    //create a new ship object
    var protoObj = defaultObj();

    //assign each of the properties to the one in shipObj parameter
    for ( var prop in protoObj )
    {
        protoObj[ prop ] = shipObj[ prop ];
    }

    //assign the id field of the new ship object to the shipObj parameter id
    protoObj[ ID_KEY ] = shipObj[ ID_KEY ];

    shipDAO.updateShip( protoObj , function( err , result )
    {
        onFinish( err , protoObj );
    });
}

//Passes along all ships in the database to the onFinish function
function allShips( onFinish )
{
    shipDAO.getAllShips( onFinish );
}

//creates a new ship and adds it to the database
function createShip( shipObj , onFinish )
{
    //create a new company object
    var protoObj = defaultObj();

    //assign each of the properties to the one in shipObj parameter
    for ( var prop in protoObj )
    {
        protoObj[ prop ] = shipObj[ prop ];
    }

    //assign the id field of the new ship object to the shipObj parameter id
    if ( shipObj[ ID_KEY ] )
    {
        protoObj[ ID_KEY ] = shipObj[ ID_KEY ];
    }

    shipDAO.createShip( protoObj , onFinish );
}

exports.isValidLocation = isValidLocation;
exports.clearDestination = clearDestination;
exports.changeDestination = changeDestination;
exports.moveShip = moveShip;
exports.changeName = changeName;
exports.locationFuelCost = locationFuelCost;
exports.destinationFuelCost = destinationFuelCost;
exports.checkValidGoods = checkValidGoods;
exports.hasSpaceForGoods = hasSpaceForGoods;
exports.addGoods = addGoods;
exports.removeGoods = removeGoods;
exports.hasGoods = hasGoods;
exports.hasFuel = hasFuel;
exports.sumGoods = sumGoods;
exports.sumGoodsInventory = sumGoodsInventory;
exports.changeCompany = changeCompany;
exports.isFull = isFull;
exports.useFuel = useFuel;
exports.isDocked = isDocked;
exports.fixDamage = fixDamage;
exports.isMaxDamaged = isMaxDamaged;
exports.addDamage = addDamage;
exports.saveShip = saveShip;
exports.defaultObj = defaultObj;
exports.allShips = allShips;
exports.createShip = createShip;
