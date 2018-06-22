/*
Author: Dilan Jenkins
File: BuildingBluePrintDAO.js
Info:
    This is a module for node js.
    It is used as a Data Access Object for the BuildingBluePrints table.
*/

const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "BuildingBluePrint" ];

const ObjectId = require('mongodb').ObjectID;
const dataAPI = require( './DataAPI' );

function createBuildingBluePrint( buildingBluePrintObj , onFinish )
{
    dataAPI.insertOne( TABLE_NAME, buildingBluePrintObj , onFinish );
}

function getAllBuildingBluePrints( onFinish )
{
    dataAPI.findAll( TABLE_NAME , onFinish );
}

function getBuildingBluePrint( buildingBluePrintId , onFinish )
{
    dataAPI.findById( TABLE_NAME , buildingBluePrintId , onFinish );
}

function updateBuildingBluePrint( buildingBluePrintObj, onFinish )
{
    dataAPI.replaceOne( TABLE_NAME , buildingBluePrintObj, onFinish );
}

function removeBuildingBluePrint( buildingBluePrintObj, onFinish )
{
    dataAPI.removeOne( TABLE_NAME , buildingBluePrintObj, onFinish );
}

//expose the table name
exports.tableName = TABLE_NAME;

//expose each of the functions to be called externally
exports.createBuildingBluePrint = createBuildingBluePrint;
exports.getAllBuildingBluePrints = getAllBuildingBluePrints;
exports.getBuildingBluePrint = getBuildingBluePrint;
exports.updateBuildingBluePrint = updateBuildingBluePrint;
exports.removeBuildingBluePrint = removeBuildingBluePrint;

