const buildingDAO = require( "../Data/BuildingDAO" );
const DEBUG_MODE = require('config').get('DebugModeBO');
const ID_KEY = require('config').get('ID_KEY');

/*
FixDamage,remove damage(NO UPDATE DB YET)

InventoryModule reuse:
    SumGoods,returns the sum total of all the goods in the building inventory(Not including @ goods)
    AddGoods,add goods to inventory(NO UPDATE DB YET)
    RemoveGoods,remove goods from inventory(NO UPDATE DB YET)
    IsFull,return true if inventory is filled to max space or false otherwise
    HasGoods,returns true if the building has the goods specified

After InventoryModule:
    ProduceGoods,add the goods that are produced to inventory(NO UPDATE DB YET)
    UseNeeded,remove goods needed for producing(NO UPDATE DB YET)
    HasNeeded,returns true if the building has the goods needed to produce goods

Database:
    SaveBuilding,save the changes made to the building object to the database
    AllBuildings,return all buildings in the database
    CreateBuilding,insert a new building into database
    DefaultObj,Returns the default prototype for a new object
*/

//ChangeName,changes name of the building(NO UPDATE DB YET)
//returns the new name of the building or undefined otherwise
function changeName( obj, newName )
{
    DEBUG_MODE && console.log( "Calling changeName in BuildingBO, new name:" , newName );
    if ( obj == undefined )
    {
        DEBUG_MODE && console.log( "BuildingBO.changeName: obj is undefined" );
        return undefined;
    }

    if ( obj.name == undefined )
    {
        DEBUG_MODE && console.log( "BuildingBO.changeName: old name is undefined" );
        return undefined;
    }

    if ( newName == undefined )
    {
        DEBUG_MODE && console.log( "BuildingBO.changeName: newName is undefined" );
        return undefined;
    }

    if ( typeof newName != "string" )
    {
        DEBUG_MODE && console.log( "BuildingBO.changeName: newName is not a string" );
        return undefined;
    }

    obj.name = newName;
    DEBUG_MODE && console.log( "BuildingBO.changeName: changed name successfully" );
    return newName;
}

//ChangeCompany,change company that owns(NO UPDATE DB YET)
//returns the new companyId if updated or undefined otherwise
function changeCompany( obj, newCompanyId )
{
    DEBUG_MODE && console.log( "Calling changeCompany in BuildingBO, new company:" , newCompanyId );
    if ( obj == undefined )
    {
        DEBUG_MODE && console.log( "BuildingBO.changeCompany: obj is undefined" );
        return undefined;
    }

    if ( newCompanyId == undefined )
    {
        DEBUG_MODE && console.log( "BuildingBO.changeCompany: newCompanyId is undefined" );
        return undefined;
    }

    if ( obj.companyId == undefined )
    {
        DEBUG_MODE && console.log( "BuildingBO.changeCompany: old companyId is undefined" );
        return undefined;
    }

    DEBUG_MODE && console.log( "BuildingBO.changeCompany: changed companyId successfully" );
    obj.companyId = newCompanyId;
    return newCompanyId;
}

//AddDamage,add on damage(NO UPDATE DB YET)
//returns total damage or undefined if not successful
function addDamage( obj, damageToAdd )
{
    DEBUG_MODE && console.log( "Calling addDamage in BuildingBO, damageToAdd:" , damageToAdd );
    if ( obj == undefined )
    {
        DEBUG_MODE && console.log( "BuildingBO.addDamage: obj is undefined" );
        return undefined;
    }

    if ( obj.damage == undefined )
    {
        DEBUG_MODE && console.log( "BuildingBO.addDamage: oldDamage is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( obj.damage ) )
    {
        DEBUG_MODE && console.log( "BuildingBO.addDamage: oldDamage is not an integer" );
        return undefined;
    }

    if ( obj.buildingBluePrint == undefined )
    {
        DEBUG_MODE && console.log( "BuildingBO.addDamage: obj.buildingBluePrint is undefined" );
        return undefined;
    }

    if ( obj.buildingBluePrint.maxDamage == undefined )
    {
        DEBUG_MODE && console.log( "BuildingBO.addDamage: buildingBluePrint.maxDamage is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( obj.buildingBluePrint.maxDamage ) )
    {
        DEBUG_MODE && console.log( "BuildingBO.addDamage: buildingBluePrint.maxDamage is not an integer" );
        return undefined;
    }

    if ( damageToAdd == undefined )
    {
        DEBUG_MODE && console.log( "BuildingBO.addDamage: damageToAdd is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( damageToAdd ) )
    {
        DEBUG_MODE && console.log( "BuildingBO.addDamage: damageToAdd is not an integer" );
        return undefined;
    }

    let currentDamage = parseInt( obj.damage , 10 );
    let damageAddInt = parseInt( damageToAdd, 10 );
    let maxDamage = parseInt( obj.buildingBluePrint.maxDamage, 10 );
    DEBUG_MODE && console.log( "BuildingBO.addDamage: maxDamage," , maxDamage );
    DEBUG_MODE && console.log( "BuildingBO.addDamage: damageAddInt," , damageAddInt );
    DEBUG_MODE && console.log( "BuildingBO.addDamage: currentDamage," , currentDamage );

    if ( maxDamage < currentDamage + damageAddInt )
    {
        DEBUG_MODE && console.log( "BuildingBO.addDamage: Cannot add damage beyond maxDamage value" );
        return undefined;
    }

    obj.damage = currentDamage + damageAddInt;
    DEBUG_MODE && console.log( "BuildingBO.addDamage: added damage successfully" );
    return obj.damage;
}

exports.changeName = changeName;
exports.changeCompany = changeCompany;
exports.addDamage = addDamage;
