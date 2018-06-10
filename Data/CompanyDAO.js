/*
Author: Dilan Jenkins
File: CompanyDAO.js
Info:
    This is a module for node js.
    It is used as a Data Access Object for the Companies table.
*/

var tableConfig = require('config').get('Tables');

const TABLE_NAME = tableConfig[ "Company" ];

var ObjectId = require('mongodb').ObjectID;

var dataAPI = require( './DataAPI' );

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

//expose each of the functions to be called externally
exports.createCompany = createCompany;
exports.getAllCompanies = getAllCompanies;
exports.getCompany = getCompany;


