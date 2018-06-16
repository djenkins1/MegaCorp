/*
Author: Dilan Jenkins
File: OfferDAO.js
Info:
    This is a module for node js.
    It is used as a Data Access Object for the Offers table.
*/

const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "Offer" ];

const ObjectId = require('mongodb').ObjectID;
const dataAPI = require( './DataAPI' );

function createOffer( offerObj , onFinish )
{
    dataAPI.insertOne( TABLE_NAME, offerObj , onFinish );
}

function getAllOffers( onFinish )
{
    dataAPI.findAll( TABLE_NAME , onFinish );
}

function getOffer( offerId , onFinish )
{
    dataAPI.findById( TABLE_NAME , offerId , onFinish );
}

function updateOffer( offerObj, onFinish )
{
    dataAPI.replaceOne( TABLE_NAME , offerObj, onFinish );
}

function removeOffer( offerObj, onFinish )
{
    dataAPI.removeOne( TABLE_NAME , offerObj, onFinish );
}

//expose each of the functions to be called externally
exports.createOffer = createOffer;
exports.getAllOffers = getAllOffers;
exports.getOffer = getOffer;
exports.updateOffer = updateOffer;
exports.removeOffer = removeOffer;

