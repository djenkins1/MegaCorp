const planetDAO = require( "../Data/PlanetDAO" );
const DEBUG_MODE = require('config').get('DebugModeBO');
const ID_KEY = require('config').get('ID_KEY');
const MAX_TAX_RATE = require('config').get('MAX_TAX_RATE');

/*
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

//AddMoney,Adds money to the planet(NO UPDATE DB YET)
//returns the new amount of money if updated or undefined otherwise
function addMoney( obj, addAmount )
{
    DEBUG_MODE && console.log( "Calling addMoney in PlanetBO, addAmount:" , addAmount );
    if ( obj == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.addMoney: obj is undefined" );
        return undefined;
    }

    if ( obj.money == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.addMoney: old money is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( obj.money ) )
    {
        DEBUG_MODE && console.log( "PlanetBO.addMoney: old money is not an integer" );
        return undefined;
    }

    let oldAmountParsed = parseInt( obj.money, 10 );
    DEBUG_MODE && console.log( "PlanetBO.addMoney: oldAmountParsed, " + str( oldAmountParsed ) );

    if ( oldAmountParsed < 0 )
    {
        DEBUG_MODE && console.log( "PlanetBO.addMoney: old amount is negative" );
        return undefined;
    }

    if ( addAmount == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.addMoney: addAmount is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( addAmount ) )
    {
        DEBUG_MODE && console.log( "PlanetBO.addMoney: addAmount is not an integer" );
        return undefined;
    }

    let addAmountParsed = parseInt( addAmount, 10 );
    DEBUG_MODE && console.log( "PlanetBO.addMoney: addAmountParsed, " + str( addAmountParsed ) );

    if ( addAmountParsed <= 0 )
    {
        DEBUG_MODE && console.log( "PlanetBO.addMoney: addAmount must be > 0" );
        return undefined;
    }

    obj.money = oldAmountParsed + addAmountParsed;

    DEBUG_MODE && console.log( "PlanetBO.addMoney: new money, " + str( obj.money ) );
    DEBUG_MODE && console.log( "PlanetBO.addMoney: added money successfully" );
    return obj.money;
}

//RemoveMoney,Removes money from the planet(NO UPDATE DB YET)
//returns the new amount if updated or undefined otherwise
function removeMoney( obj, removeAmount )
{
    DEBUG_MODE && console.log( "Calling removeMoney in PlanetBO, removeAmount: " , removeAmount );
    if ( obj == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.removeMoney: obj is undefined" );
        return undefined;
    }

    if ( obj.money == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.removeMoney: old money is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( obj.money ) )
    {
        DEBUG_MODE && console.log( "PlanetBO.removeMoney: old money is not an integer" );
        return undefined;
    }

    let oldAmountParsed = parseInt( obj.money, 10 );
    DEBUG_MODE && console.log( "PlanetBO.removeMoney: oldAmountParsed, " + str( oldAmountParsed ) );

    if ( oldAmountParsed < 0 )
    {
        DEBUG_MODE && console.log( "PlanetBO.removeMoney: old amount is negative" );
        return undefined;
    }

    if ( removeAmount == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.removeMoney: removeAmount is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( removeAmount ) )
    {
        DEBUG_MODE && console.log( "PlanetBO.removeMoney: removeAmount is not an integer" );
        return undefined;
    }

    let removeAmountParsed = parseInt( removeAmount, 10 );
    DEBUG_MODE && console.log( "PlanetBO.removeMoney: removeAmountParsed, " + str( removeAmountParsed ) );

    if ( removeAmountParsed <= 0 )
    {
        DEBUG_MODE && console.log( "PlanetBO.removeMoney: removeAmount must be > 0" );
        return undefined;
    }

    if ( oldAmountParsed < removeAmountParsed )
    {
        DEBUG_MODE && console.log( "PlanetBO.removeMoney: removeAmount must be less than old amount" );
        return undefined;
    }

    obj.money = oldAmountParsed - removeAmountParsed;
    DEBUG_MODE && console.log( "PlanetBO.removeMoney: new money, " + str( obj.money ) );
    DEBUG_MODE && console.log( "PlanetBO.removeMoney: removed money successfully" );
    return obj.money;
}

exports.changeTaxes = changeTaxes;
exports.changeName = changeName;
exports.addMoney = addMoney;
exports.removeMoney = removeMoney;
