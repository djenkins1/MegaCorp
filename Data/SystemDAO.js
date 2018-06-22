/*
Author: Dilan Jenkins
File: SystemDAO.js
Info:
    This is a module for node js.
    It is used as a Data Access Object for the Systems table.
*/

const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "System" ];

const ObjectId = require('mongodb').ObjectID;
const dataAPI = require( './DataAPI' );

function createSystem( systemObj , onFinish )
{
    dataAPI.insertOne( TABLE_NAME, systemObj , onFinish );
}

function getAllSystems( onFinish )
{
    dataAPI.findAll( TABLE_NAME , onFinish );
}

function getSystem( systemId , onFinish )
{
    dataAPI.findById( TABLE_NAME , systemId , onFinish );
}

function updateSystem( systemObj, onFinish )
{
    dataAPI.replaceOne( TABLE_NAME , systemObj, onFinish );
}

function removeSystem( systemObj, onFinish )
{
    dataAPI.removeOne( TABLE_NAME , systemObj, onFinish );
}

//expose the table name
exports.tableName = TABLE_NAME;

//expose each of the functions to be called externally
exports.createSystem = createSystem;
exports.getAllSystems = getAllSystems;
exports.getSystem = getSystem;
exports.updateSystem = updateSystem;
exports.removeSystem = removeSystem;
