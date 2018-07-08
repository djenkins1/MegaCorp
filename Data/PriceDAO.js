/*
Author: Dilan Jenkins
File: PriceDAO.js
Info:
    This is a module for node js.
    It is used as a Data Access Object for the Prices table.
*/

const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "Price" ];

const ObjectId = require('mongodb').ObjectID;
const dataAPI = require( './DataAPI' );

function createPrice( priceObj , onFinish )
{
    dataAPI.insertOne( TABLE_NAME, priceObj , onFinish );
}

function getAllPrices( onFinish )
{
    dataAPI.findAll( TABLE_NAME , onFinish );
}

function getPrice( priceId , onFinish )
{
    dataAPI.findById( TABLE_NAME , priceId , onFinish );
}

function updatePrice( priceObj, onFinish )
{
    dataAPI.replaceOne( TABLE_NAME , priceObj, onFinish );
}

function removePrice( priceObj, onFinish )
{
    dataAPI.removeOne( TABLE_NAME , priceObj, onFinish );
}

function getPriceByGood( goodName, planetId, onFinish )
{
    var queryObj = { "good" : goodName , "planetId" : planetId };
    dataAPI.findOneLike( TABLE_NAME, queryObj, onFinish );
}

//expose the table name
exports.tableName = TABLE_NAME;

//expose each of the functions to be called externally
exports.createPrice = createPrice;
exports.getAllPrices = getAllPrices;
exports.getPrice = getPrice;
exports.updatePrice = updatePrice;
exports.removePrice = removePrice;
exports.getPriceByGood = getPriceByGood;
