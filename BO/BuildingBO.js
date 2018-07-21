const buildingDAO = require( "../Data/BuildingDAO" );
const DEBUG_MODE = require('config').get('DebugModeBO');
const ID_KEY = require('config').get('ID_KEY');

/*
SumGoods,returns the sum total of all the goods in the building inventory(Not including @ goods)
ChangeCompany,change company that owns(NO UPDATE DB YET)
AddGoods,add goods to inventory(NO UPDATE DB YET)
RemoveGoods,remove goods from inventory(NO UPDATE DB YET)
ProduceGoods,add the goods that are produced to inventory(NO UPDATE DB YET)
AddDamage,add on damage(NO UPDATE DB YET)
FixDamage,remove damage(NO UPDATE DB YET)
UseNeeded,remove goods needed for producing(NO UPDATE DB YET)

IsFull,return true if inventory is filled to max space or false otherwise
HasNeeded,returns true if the building has the goods needed to produce goods
HasGoods,returns true if the building has the goods speciifed

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

exports.changeName = changeName;
