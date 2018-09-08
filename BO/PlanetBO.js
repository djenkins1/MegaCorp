//dao imports
const planetDAO = require( "../Data/PlanetDAO" );
const shipDAO = require( "../Data/ShipDAO" );
const companyDAO = require( "../Data/CompanyDAO" );
const buildingDAO = require( "../Data/BuildingDAO" );
//constants
const DEBUG_MODE = require('config').get('DebugModeBO');
const ID_KEY = require('config').get('ID_KEY');
const MAX_TAX_RATE = require('config').get('MAX_TAX_RATE');

/*
DB(Modifications):
SavePlanet,Saves any changes to the planet to the database
CreatePlanet,Creates a new planet and adds it to the database
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

//AddPopulation,Adds population to the planet(NO UPDATE DB YET)
//returns the new population if updated or undefined otherwise
function addPopulation( obj, addAmount )
{
    DEBUG_MODE && console.log( "Calling addPopulation in PlanetBO, addAmount:" , addAmount );
    if ( obj == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.addPopulation: obj is undefined" );
        return undefined;
    }

    if ( obj.population == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.addPopulation: old population is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( obj.population ) )
    {
        DEBUG_MODE && console.log( "PlanetBO.addPopulation: old population is not an integer" );
        return undefined;
    }

    let oldAmountParsed = parseInt( obj.population, 10 );
    DEBUG_MODE && console.log( "PlanetBO.addPopulation: oldAmountParsed, " + str( oldAmountParsed ) );

    if ( oldAmountParsed < 0 )
    {
        DEBUG_MODE && console.log( "PlanetBO.addPopulation: old amount is negative" );
        return undefined;
    }

    if ( addAmount == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.addPopulation: addAmount is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( addAmount ) )
    {
        DEBUG_MODE && console.log( "PlanetBO.addPopulation: addAmount is not an integer" );
        return undefined;
    }

    let addAmountParsed = parseInt( addAmount, 10 );
    DEBUG_MODE && console.log( "PlanetBO.addPopulation: addAmountParsed, " + str( addAmountParsed ) );

    if ( addAmountParsed <= 0 )
    {
        DEBUG_MODE && console.log( "PlanetBO.addPopulation: addAmount must be > 0" );
        return undefined;
    }

    obj.population = oldAmountParsed + addAmountParsed;

    DEBUG_MODE && console.log( "PlanetBO.addPopulation: new population, " + str( obj.population ) );
    DEBUG_MODE && console.log( "PlanetBO.addPopulation: added population successfully" );
    return obj.population;
}

//RemovePopulation,Removes population from the planet(NO UPDATE DB YET)
//returns the new population if updated or undefined otherwise
function removePopulation( obj, removeAmount )
{
    DEBUG_MODE && console.log( "Calling removePopulation in PlanetBO, removeAmount: " , removeAmount );
    if ( obj == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.removePopulation: obj is undefined" );
        return undefined;
    }

    if ( obj.population == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.removePopulation: old population is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( obj.population ) )
    {
        DEBUG_MODE && console.log( "PlanetBO.removePopulation: old population is not an integer" );
        return undefined;
    }

    let oldAmountParsed = parseInt( obj.population, 10 );
    DEBUG_MODE && console.log( "PlanetBO.removePopulation: oldAmountParsed, " + str( oldAmountParsed ) );

    if ( oldAmountParsed < 0 )
    {
        DEBUG_MODE && console.log( "PlanetBO.removePopulation: old amount is negative" );
        return undefined;
    }

    if ( removeAmount == undefined )
    {
        DEBUG_MODE && console.log( "PlanetBO.removePopulation: removeAmount is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( removeAmount ) )
    {
        DEBUG_MODE && console.log( "PlanetBO.removePopulation: removeAmount is not an integer" );
        return undefined;
    }

    let removeAmountParsed = parseInt( removeAmount, 10 );
    DEBUG_MODE && console.log( "PlanetBO.removePopulation: removeAmountParsed, " + str( removeAmountParsed ) );

    if ( removeAmountParsed <= 0 )
    {
        DEBUG_MODE && console.log( "PlanetBO.removePopulation: removeAmount must be > 0" );
        return undefined;
    }

    if ( oldAmountParsed < removeAmountParsed )
    {
        DEBUG_MODE && console.log( "PlanetBO.removePopulation: removeAmount must be less than old amount" );
        return undefined;
    }

    obj.population = oldAmountParsed - removeAmountParsed;
    DEBUG_MODE && console.log( "PlanetBO.removePopulation: new population, " + str( obj.population ) );
    DEBUG_MODE && console.log( "PlanetBO.removePopulation: removed population successfully" );
    return obj.population;
}

//GetDockedShips,Returns all ships that are docked on planet(Have Z in location that matches planet's Z)
//passes along resulting list to onFinish function
function getDockedShips( obj, onFinish )
{
    DEBUG_MODE && console.log( "Calling getDockedShips in PlanetBO" );
    shipDAO.getShipsAtLocation( obj.location, onFinish );
}

//GetAllBuildings,Returns all buildings that are on the planet
//passes along resulting list to onFinish function
function getAllBuildings( obj, onFinish )
{
    DEBUG_MODE && console.log( "Calling getAllBuildings in PlanetBO" );
    buildingDAO.getBuildingsOnPlanet( obj[ ID_KEY ], onFinish );
}

//GetCompaniesByHQ,Returns all companies that have headquarters on planet
//passes along resulting list to onFinish function
function getCompaniesByHq( obj , onFinish )
{
    DEBUG_MODE && console.log( "Calling getCompaniesByHq in PlanetBO" );
    companyDAO.getCompaniesByHq( obj[ ID_KEY ], onFinish );
}

//AllPlanets,Returns all planets in the database
//passes along resulting list to onFinish function
function allPlanets( onFinish )
{
    planetDAO.getAllPlanets( onFinish );
}

//DefaultObj,Returns the default prototype for a new object
function defaultObj()
{
    return {
        "name" : "",
        "taxes" : 0.0,
        "money" : 0,
        "atmosphere" : "",
        "composition" : "",
        "systemId" : "",
        "population" : 0,
        "location" : {}
    };
}

exports.changeTaxes = changeTaxes;
exports.changeName = changeName;
exports.addMoney = addMoney;
exports.removeMoney = removeMoney;
exports.addPopulation = addPopulation;
exports.removePopulation = removePopulation;

//wrapper functions already tested in DAO tests
exports.getDockedShips = getDockedShips;
exports.getAllBuildings = getAllBuildings;
exports.getCompaniesByHq = getCompaniesByHq;
exports.allPlanets = allPlanets;

exports.defaultObj = defaultObj;
