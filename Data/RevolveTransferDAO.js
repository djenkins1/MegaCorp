/*
Author: Dilan Jenkins
File: RevolveTransferDAO.js
Info:
    This is a module for node js.
    It is used as a Data Access Object for the RevolveTransfers table.
*/

const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "RevolveTransfer" ];

const ObjectId = require('mongodb').ObjectID;
const dataAPI = require( './DataAPI' );

function createRevolveTransfer( revolveTransferObj , onFinish )
{
    dataAPI.insertOne( TABLE_NAME, revolveTransferObj , onFinish );
}

function getAllRevolveTransfers( onFinish )
{
    dataAPI.findAll( TABLE_NAME , onFinish );
}

function getRevolveTransfer( revolveTransferId , onFinish )
{
    dataAPI.findById( TABLE_NAME , revolveTransferId , onFinish );
}

function updateRevolveTransfer( revolveTransferObj, onFinish )
{
    dataAPI.replaceOne( TABLE_NAME , revolveTransferObj, onFinish );
}

function removeRevolveTransfer( revolveTransferObj, onFinish )
{
    dataAPI.removeOne( TABLE_NAME , revolveTransferObj, onFinish );
}

//expose the table name
exports.tableName = TABLE_NAME;

//expose each of the functions to be called externally
exports.createRevolveTransfer = createRevolveTransfer;
exports.getAllRevolveTransfers = getAllRevolveTransfers;
exports.getRevolveTransfer = getRevolveTransfer;
exports.updateRevolveTransfer = updateRevolveTransfer;
exports.removeRevolveTransfer = removeRevolveTransfer;

