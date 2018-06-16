/*
Author: Dilan Jenkins
File: TransferDAO.js
Info:
    This is a module for node js.
    It is used as a Data Access Object for the Transfers table.
*/

const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "Transfer" ];

const ObjectId = require('mongodb').ObjectID;
const dataAPI = require( './DataAPI' );

function createTransfer( transferObj , onFinish )
{
    dataAPI.insertOne( TABLE_NAME, transferObj , onFinish );
}

function getAllTransfers( onFinish )
{
    dataAPI.findAll( TABLE_NAME , onFinish );
}

function getTransfer( transferId , onFinish )
{
    dataAPI.findById( TABLE_NAME , transferId , onFinish );
}

function updateTransfer( transferObj, onFinish )
{
    dataAPI.replaceOne( TABLE_NAME , transferObj, onFinish );
}

function removeTransfer( transferObj, onFinish )
{
    dataAPI.removeOne( TABLE_NAME , transferObj, onFinish );
}

//expose each of the functions to be called externally
exports.createTransfer = createTransfer;
exports.getAllTransfers = getAllTransfers;
exports.getTransfer = getTransfer;
exports.updateTransfer = updateTransfer;
exports.removeTransfer = removeTransfer;

