const shipDAO = require( "../Data/ShipDAO" );
const DEBUG_MODE = require('config').get('DebugModeBO');
const ID_KEY = require('config').get('ID_KEY');
const FUEL_PER_SQUARE = require('config').get('fuelPerSquare');
/*
UseFuel,Remove the fuel needed to travel 1 square(NO UPDATE DB YET)
RemoveGoods,Remove goods from the ships inventory(NO UPDATE DB YET)
AddGoods,Adds goods to the ships inventory(NO UPDATE DB YET)
ChangeCompany,Change the company that owns the ship(NO UPDATE DB YET)
AddDamage,Add damage to the ship(NO UPDATE DB YET)
FixDamage,Remove damage from the ship(NO UPDATE DB YET)
IsDocked,Returns true if the ship is docked on a planet(If location Has Z coordinate)
IsFull,Returns true if the ship's inventory is completely maxed out
HasFuel,Returns true if the ship has the fuel needed to travel 1 square
HasGoods,Returns true if the ship has the goods specified
SaveShip,Saves the changes made to the ship into the database
AllShips,Returns all ships in the database
CreateShip,Creates a new ship and adds it to the database
DefaultObj,Returns the default prototype for a new object
*/

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
function locationFuelCost( currentLocation, destination )
{
    DEBUG_MODE && console.log( "Calling locationFuelCost in ShipBO, currentLocation:" , newName , "destination:" , destination );
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

    let xDist = Math.abs( destination.x - currentLocation.x );
    let yDist = Math.abs( destination.y - currentLocation.y );
    let totalDist = xDist + yDist;
    let totalCost = totalDist * FUEL_PER_SQUARE;

    DEBUG_MODE && console.log( "ShipBO.locationFuelCost: total distance," , totalDist, "and calculated fuel cost," , totalCost );
    return totalCost;
}

//DestinationFuelCost,returns the amount of fuel needed to travel to the location given
//shorthand function for shipObj passed
//TODO: uncomment after tests written
/*
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

    if ( destination == undefined )
    {
        DEBUG_MODE && console.log( "ShipBO.destinationFuelCost: destination undefined" );
        return undefined;
    }

    DEBUG_MODE && console.log( "ShipBO.destinationFuelCost: returning value from locationFuelCost call" );
    return locationFuelCost( shipObj.location , destination );
}
*/

exports.isValidLocation = isValidLocation;
exports.clearDestination = clearDestination;
exports.changeDestination = changeDestination;
exports.moveShip = moveShip;
exports.changeName = changeName;
exports.locationFuelCost = locationFuelCost;
//TODO: uncomment after tests written: exports.destinationFuelCost = destinationFuelCost;


