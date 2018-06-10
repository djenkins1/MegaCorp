/*
Author: Dilan Jenkins
File: ShipBluePrintDAO.js
Info:
    This is a module for node js.
    It is used as a Data Access Object for the ShipBluePrints table.
*/

const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "ShipBluePrint" ];

const ObjectId = require('mongodb').ObjectID;
const dataAPI = require( './DataAPI' );

function createShipBluePrint( shipBluePrintObj , onFinish )
{
    dataAPI.insertOne( TABLE_NAME, shipBluePrintObj , onFinish );
}

function getAllShipBluePrints( onFinish )
{
    dataAPI.findAll( TABLE_NAME , onFinish );
}

function getShipBluePrint( shipBluePrintId , onFinish )
{
    dataAPI.findById( TABLE_NAME , shipBluePrintId , onFinish );
}

function updateShipBluePrint( shipBluePrintObj, onFinish )
{
    dataAPI.replaceOne( TABLE_NAME , shipBluePrintObj, onFinish );
}

function removeShipBluePrint( shipBluePrintObj, onFinish )
{
    dataAPI.removeOne( TABLE_NAME , shipBluePrintObj, onFinish );
}

//expose each of the functions to be called externally
exports.createShipBluePrint = createShipBluePrint;
exports.getAllShipBluePrints = getAllShipBluePrints;
exports.getShipBluePrint = getShipBluePrint;
exports.updateShipBluePrint = updateShipBluePrint;
exports.removeShipBluePrint = removeShipBluePrint;

