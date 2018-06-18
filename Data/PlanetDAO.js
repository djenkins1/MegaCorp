/*
Author: Dilan Jenkins
File: PlanetDAO.js
Info:
    This is a module for node js.
    It is used as a Data Access Object for the Planets table.
*/

const tableConfig = require('config').get('Tables');
const TABLE_NAME = tableConfig[ "Planet" ];

const ObjectId = require('mongodb').ObjectID;
const dataAPI = require( './DataAPI' );

function createPlanet( planetObj , onFinish )
{
    dataAPI.insertOne( TABLE_NAME, planetObj , onFinish );
}

function getAllPlanets( onFinish )
{
    dataAPI.findAll( TABLE_NAME , onFinish );
}

function getPlanet( planetId , onFinish )
{
    dataAPI.findById( TABLE_NAME , planetId , onFinish );
}

function updatePlanet( planetObj, onFinish )
{
    dataAPI.replaceOne( TABLE_NAME , planetObj, onFinish );
}

function removePlanet( planetObj, onFinish )
{
    dataAPI.removeOne( TABLE_NAME , planetObj, onFinish );
}

function getPlanetsInSystem( systemId, onFinish )
{
    var queryObj = { "systemId" : systemId };
    dataAPI.findManyLike( TABLE_NAME, queryObj, onFinish );
}

//expose each of the functions to be called externally
exports.createPlanet = createPlanet;
exports.getAllPlanets = getAllPlanets;
exports.getPlanet = getPlanet;
exports.updatePlanet = updatePlanet;
exports.removePlanet = removePlanet;
exports.getPlanetsInSystem = getPlanetsInSystem;


