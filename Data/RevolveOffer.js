/*
Author: Dilan Jenkins
File: RevolveOfferDAO.js
Info:
    This is a module for node js.
    It is used as a Data Access Object for the RevolveOffers table.
*/

const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "RevolveOffer" ];

const ObjectId = require('mongodb').ObjectID;
const dataAPI = require( './DataAPI' );

function createRevolveOffer( revolveOfferObj , onFinish )
{
    dataAPI.insertOne( TABLE_NAME, revolveOfferObj , onFinish );
}

function getAllRevolveOffers( onFinish )
{
    dataAPI.findAll( TABLE_NAME , onFinish );
}

function getRevolveOffer( revolveOfferId , onFinish )
{
    dataAPI.findById( TABLE_NAME , revolveOfferId , onFinish );
}

function updateRevolveOffer( revolveOfferObj, onFinish )
{
    dataAPI.replaceOne( TABLE_NAME , revolveOfferObj, onFinish );
}

function removeRevolveOffer( revolveOfferObj, onFinish )
{
    dataAPI.removeOne( TABLE_NAME , revolveOfferObj, onFinish );
}

//expose each of the functions to be called externally
exports.createRevolveOffer = createRevolveOffer;
exports.getAllRevolveOffers = getAllRevolveOffers;
exports.getRevolveOffer = getRevolveOffer;
exports.updateRevolveOffer = updateRevolveOffer;
exports.removeRevolveOffer = removeRevolveOffer;

