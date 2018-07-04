const shipDAO = require( "../Data/ShipDAO" );
const DEBUG_MODE = require('config').get('DebugModeBO');
const ID_KEY = require('config').get('ID_KEY');
/*
MoveShip,Move the ship to the location given(NO UPDATE DB YET)
UseFuel,Remove the fuel needed to travel 1 square(NO UPDATE DB YET)
RemoveGoods,Remove goods from the ships inventory(NO UPDATE DB YET)
AddGoods,Adds goods to the ships inventory(NO UPDATE DB YET)
ChangeName,Change the name of the ship(NO UPDATE DB YET)
ChangeCompany,Change the company that owns the ship(NO UPDATE DB YET)
AddDamage,Add damage to the ship(NO UPDATE DB YET)
FixDamage,Remove damage from the ship(NO UPDATE DB YET)
IsDocked,Returns true if the ship is docked on a planet(If location Has Z coordinate)
IsFull,Returns true if the ship's inventory is completely maxed out
HasFuel,Returns true if the ship has the fuel needed to travel 1 square
LocationFuelCost,returns the amount of fuel needed to travel to the location given
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
        DEBUG_MODE && console.log( "ShipBO.changeDestination: new destination is not a valid destination" );
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

exports.isValidLocation = isValidLocation;
exports.clearDestination = clearDestination;
exports.changeDestination = changeDestination;


