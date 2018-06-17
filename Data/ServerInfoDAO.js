/*
Author: Dilan Jenkins
File: ServerInfoDAO.js
Info:
    This is a module for node js.
    It is used as a Data Access Object for the ServerInfos table.
*/

const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "ServerInfo" ];

const ObjectId = require('mongodb').ObjectID;
const dataAPI = require( './DataAPI' );

function createServerInfo( serverInfoObj , onFinish )
{
    dataAPI.insertOne( TABLE_NAME, serverInfoObj , onFinish );
}

function getAllServerInfos( onFinish )
{
    dataAPI.findAll( TABLE_NAME , onFinish );
}

function getServerInfo( serverInfoId , onFinish )
{
    dataAPI.findById( TABLE_NAME , serverInfoId , onFinish );
}

function updateServerInfo( serverInfoObj, onFinish )
{
    dataAPI.replaceOne( TABLE_NAME , serverInfoObj, onFinish );
}

function removeServerInfo( serverInfoObj, onFinish )
{
    dataAPI.removeOne( TABLE_NAME , serverInfoObj, onFinish );
}

//expose each of the functions to be called externally
exports.createServerInfo = createServerInfo;
exports.getAllServerInfos = getAllServerInfos;
exports.getServerInfo = getServerInfo;
exports.updateServerInfo = updateServerInfo;
exports.removeServerInfo = removeServerInfo;

