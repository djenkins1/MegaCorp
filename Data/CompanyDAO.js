/*
Author: Dilan Jenkins
File: CompanyDAO.js
Info:
    This is a module for node js.
    It is used as a Data Access Object for the Companies table.
*/

const tableConfig = require('config').get('Tables');

const TABLE_NAME = tableConfig[ "Company" ];

const ObjectId = require('mongodb').ObjectID;

const dataAPI = require( './DataAPI' );

function createCompany( companyObj , onFinish )
{
    dataAPI.insertOne( TABLE_NAME, companyObj , onFinish );
}

function getAllCompanies( onFinish )
{
    dataAPI.findAll( TABLE_NAME , onFinish );
}

function getCompany( companyId , onFinish )
{
    dataAPI.findById( TABLE_NAME , companyId , onFinish );
}

function updateCompany( companyObj, onFinish )
{
    dataAPI.replaceOne( TABLE_NAME , companyObj, onFinish );
}

function removeCompany( companyObj, onFinish )
{
    dataAPI.removeOne( TABLE_NAME , companyObj, onFinish );
}

function getCompaniesByHq( planetId, onFinish )
{
    var queryObj = { "planetHq" : planetId };
    dataAPI.findManyLike( TABLE_NAME, queryObj, onFinish );
}

//expose each of the functions to be called externally
exports.createCompany = createCompany;
exports.getAllCompanies = getAllCompanies;
exports.getCompany = getCompany;
exports.updateCompany = updateCompany;
exports.removeCompany = removeCompany;
exports.getCompaniesByHq = getCompaniesByHq;



