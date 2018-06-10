/*
Author: Dilan Jenkins
File: WeaponBluePrintDAO.js
Info:
    This is a module for node js.
    It is used as a Data Access Object for the WeaponBluePrints table.
*/

const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "WeaponBluePrint" ];

const ObjectId = require('mongodb').ObjectID;
const dataAPI = require( './DataAPI' );

function createWeaponBluePrint( weaponBluePrintObj , onFinish )
{
    dataAPI.insertOne( TABLE_NAME, weaponBluePrintObj , onFinish );
}

function getAllWeaponBluePrints( onFinish )
{
    dataAPI.findAll( TABLE_NAME , onFinish );
}

function getWeaponBluePrint( weaponBluePrintId , onFinish )
{
    dataAPI.findById( TABLE_NAME , weaponBluePrintId , onFinish );
}

function updateWeaponBluePrint( weaponBluePrintObj, onFinish )
{
    dataAPI.replaceOne( TABLE_NAME , weaponBluePrintObj, onFinish );
}

function removeWeaponBluePrint( weaponBluePrintObj, onFinish )
{
    dataAPI.removeOne( TABLE_NAME , weaponBluePrintObj, onFinish );
}

//expose each of the functions to be called externally
exports.createWeaponBluePrint = createWeaponBluePrint;
exports.getAllWeaponBluePrints = getAllWeaponBluePrints;
exports.getWeaponBluePrint = getWeaponBluePrint;
exports.updateWeaponBluePrint = updateWeaponBluePrint;
exports.removeWeaponBluePrint = removeWeaponBluePrint;

