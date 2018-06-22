/*
Author: Dilan Jenkins
File: BuildingDAO.js
Info:
    This is a module for node js.
    It is used as a Data Access Object for the Buildings table.
*/

const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "Building" ];

const ObjectId = require('mongodb').ObjectID;
const dataAPI = require( './DataAPI' );

function createBuilding( buildingObj , onFinish )
{
    dataAPI.insertOne( TABLE_NAME, buildingObj , onFinish );
}

function getAllBuildings( onFinish )
{
    dataAPI.findAll( TABLE_NAME , onFinish );
}

function getBuilding( buildingId , onFinish )
{
    dataAPI.findById( TABLE_NAME , buildingId , onFinish );
}

function updateBuilding( buildingObj, onFinish )
{
    dataAPI.replaceOne( TABLE_NAME , buildingObj, onFinish );
}

function removeBuilding( buildingObj, onFinish )
{
    dataAPI.removeOne( TABLE_NAME , buildingObj, onFinish );
}

function getBuildingsOwnedBy( companyId, onFinish )
{
    var query = { "companyId" : companyId };
    dataAPI.findManyLike( TABLE_NAME , query, onFinish );    
}

function getBuildingsOnPlanet( planetId, onFinish )
{
    var query = { "planetId" : planetId };
    dataAPI.findManyLike( TABLE_NAME , query, onFinish ); 
}

//expose the table name
exports.tableName = TABLE_NAME;

//expose each of the functions to be called externally
exports.createBuilding = createBuilding;
exports.getAllBuildings = getAllBuildings;
exports.getBuilding = getBuilding;
exports.updateBuilding = updateBuilding;
exports.removeBuilding = removeBuilding;
exports.getBuildingsOwnedBy = getBuildingsOwnedBy;
exports.getBuildingsOnPlanet = getBuildingsOnPlanet;



