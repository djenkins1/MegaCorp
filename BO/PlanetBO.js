const planetDAO = require( "../Data/PlanetDAO" );
const DEBUG_MODE = require('config').get('DebugModeBO');
const ID_KEY = require('config').get('ID_KEY');
const MAX_TAX_RATE = require('config').get('MAX_TAX_RATE');

/*
AddMoney,Adds money to the planet(NO UPDATE DB YET)
RemoveMoney,Removes money from the planet(NO UPDATE DB YET)
AddPopulation,Adds population to the planet(NO UPDATE DB YET)
RemovePopulation,Removes population from the planet(NO UPDATE DB YET)

DB:
GetDockedShips,Returns all ships that are docked on planet(Have Z in location that matches planet's Z)
GetAllBuildings,Returns all buildings that are on the planet
GetCompaniesByHQ,Returns all companies that have headquarters on planet
SavePlanet,Saves any changes to the planet to the database
AllPlanets,Returns all planets in the database
CreatePlanet,Creates a new planet and adds it to the database
DefaultObj,Returns the default prototype for a new object
*/

//ChangeTaxes,changes the tax rate of the planet(NO UPDATE DB YET)
//returns the new tax rate if updated or undefined otherwise
function changeTaxes( obj, newRate )
{
    DEBUG_MODE && console.log( "Calling changeTaxes in PlanetBO, new rate:" , newRate );
    if ( obj == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.changeTaxes: obj is undefined" );
        return undefined;
    }

    if ( newRate == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.changeTaxes: newRate is undefined" );
        return undefined;
    }

    if ( obj.taxes == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.changeTaxes: obj.taxes is undefined" );
        return undefined;
    }

    let newRateParsed = parseFloat( newRate );
    if ( newRateParsed < 0 || newRateParsed > MAX_TAX_RATE )
    {
        DEBUG_MODE && console.log( "PlanetBO.changeTaxes: newRate not in valid range" );
        return undefined;
    }

    obj.taxes = newRateParsed;
    DEBUG_MODE && console.log( "PlanetBO.changeTaxes: changed taxes successfully" );
    return newRateParsed;
}

//ChangeName,changes the name of the planet(NO UPDATE DB YET)
//returns the new name if updated or undefined otherwise
function changeName( obj , newName )
{
    DEBUG_MODE && console.log( "Calling changeName in PlanetBO, new name:" , newName );
    if ( obj == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.changeName: obj is undefined" );
        return undefined;
    }

    if ( newName == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.changeName: newName is undefined" );
        return undefined;
    }

    if ( obj.name == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.changeName: old name is undefined" );
        return undefined;
    }

    obj.name = newName;
    DEBUG_MODE && console.log( "PlanetBO.changeName: changed name successfully" );
    return newName;
}

exports.changeTaxes = changeTaxes;
exports.changeName = changeName;
