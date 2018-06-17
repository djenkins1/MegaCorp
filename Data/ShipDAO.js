/*
Author: Dilan Jenkins
File: ShipDAO.js
Info:
    This is a module for node js.
    It is used as a Data Access Object for the Ships table.
*/

const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "Ship" ];

const ObjectId = require('mongodb').ObjectID;
const dataAPI = require( './DataAPI' );

function createShip( shipObj , onFinish )
{
    dataAPI.insertOne( TABLE_NAME, shipObj , onFinish );
}

function getAllShips( onFinish )
{
    dataAPI.findAll( TABLE_NAME , onFinish );
}

function getShip( shipId , onFinish )
{
    dataAPI.findById( TABLE_NAME , shipId , onFinish );
}

function updateShip( shipObj, onFinish )
{
    dataAPI.replaceOne( TABLE_NAME , shipObj, onFinish );
}

function removeShip( shipObj, onFinish )
{
    dataAPI.removeOne( TABLE_NAME , shipObj, onFinish );
}

function getShipsAtLocation( locationObj , onFinish )
{
    var query = { "location" : locationObj };
    dataAPI.findManyLike( TABLE_NAME , query, onFinish );
}

function getShipsInSystemLocation( x , y , onFinish )
{
    var query = { "location.x" : x, "location.y" : y };
    dataAPI.findManyLike( TABLE_NAME , query, onFinish );
}

function getShipsOwnedBy( companyId, onFinish )
{
    var query = { "companyId" : companyId };
    dataAPI.findManyLike( TABLE_NAME , query, onFinish );
}

//expose each of the functions to be called externally
exports.createShip = createShip;
exports.getAllShips = getAllShips;
exports.getShip = getShip;
exports.updateShip = updateShip;
exports.removeShip = removeShip;
exports.getShipsAtLocation = getShipsAtLocation;
exports.getShipsInSystemLocation = getShipsInSystemLocation;
exports.getShipsOwnedBy = getShipsOwnedBy;


