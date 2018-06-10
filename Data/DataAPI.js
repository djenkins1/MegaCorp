/*
Author: Dilan Jenkins
File: dataAPI.js
Info:
    This is a module for node js.
    It is used as an API for accessing the database.
*/

var ObjectId = require('mongodb').ObjectID;

//global singleton of the connection object
var _conn = undefined;

//global singleton of the connection client
var _client = undefined;

/*
function: getDefaultConn
info:
    Creates a mongo db connection object and connects to it.
    Stores that connection object as global singleton for future function calls.
parameters:
    onFinish, function, the function to be called when the mongo db connects
returns:
    nothing
*/
function getDefaultConn( onFinish )
{
    console.log( "Entering DataAPI function: getDefaultConn" );
    if ( _conn )
    {
        console.log( "getDefaultConn: _conn already exists,passing to onFinish" );
        onFinish( _conn );
        console.log( "Exiting DataAPI function: getDefaultConn from existing connection" );
        return;
    }

    console.log( "getDefaultConn: _conn does not exist,opening connection" );
    var dbConfig = require('config').get('DataSource');
    var mongoClient = require('mongodb').MongoClient; 
    var url = "mongodb://" + dbConfig["host"] + ":" + dbConfig[ "port" ];
    console.log( "getDefaultConn: connecting to database url," , url );
    mongoClient.connect(url, function(err, db) 
    {
        if (err) throw err;

        console.log( "getDefaultConn: setting _conn to now open connection" );
        _client = db;
        _conn = db.db( dbConfig["name"] );

        console.log( "getDefaultConn: passing new _conn to onFinish" );
        onFinish( _conn );
        console.log( "Exiting DataAPI function: getDefaultConn from new connection" );
    });
}

/*
function: _dropTable
info:
    This function tells the database to drop the collection with the given name.
    It returns a promise that resolves when the database drops the collection.
parameters:
    db, object, the database connection
    tableName, string, the name of the collection to drop
returns:
    promise object
*/
function _dropTable( db , tableName )
{
    console.log( "Entering DataAPI function: _dropTable for table" , tableName );
    return new Promise( function( resolve, reject) 
    {
        db.collection( tableName ).drop( tableName, function(err, delOK) 
        {
            if (err)
            {
                reject( err );
                console.log( "Exiting DataAPI function: _dropTable rejected for table" , tableName );
                return;
            }
            else
            {
                resolve( delOK );
                console.log( "Exiting DataAPI function: _dropTable resolved for table" , tableName );
            }
        });
    });
}

/*
function: _createTable
info:
    This function tells the database to create a collection with the given name.
    It returns a promise that resolves when the database creates the collection.
parameters:
    db, object, the database connection
    tableName, string, the name of the new collection
returns:
    promise object
*/
function _createTable( db, tableName )
{
    console.log( "Entering DataAPI function: _createTable for table" , tableName );
    return new Promise( function( resolve, reject) 
    {
        db.createCollection( tableName, function(err, res) 
        {
            if (err)
            {
                reject( err );
                console.log( "Exiting DataAPI function: _createTable rejected for table" , tableName );
                return;
            }

            console.log( "Created table: " + tableName );
            resolve( res );
            console.log( "Exiting DataAPI function: _createTable resolved for table" , tableName );
        });
    });
}

/*
function: setupDatabase
info:
    This function creates the database and sets up each of the collections if they do not exist.
parameters:
    onFinish, function, the function that is called when the database has been setup
returns:
    nothing
*/
function setupDatabase( onFinish )
{
    console.log( "Entering DataAPI function: setupDatabase" );
    var tableConfig = require('config').get('Tables');
    getDefaultConn( function( db )
    {
        var tablePromises = [];
        for ( var i = 0; i < tableConfig.listed.length; i++ )
        {
            var tableAlias = tableConfig.listed[ i ];
            var tableName = tableConfig[ tableAlias ];
            console.log( "setupDatabase: adding table to promises," , tableAlias , "with actual name," , tableName );
            tablePromises.push( _createTable( db, tableName ) );
        }

        Promise.all( tablePromises ).then( function()
        {
            //_setupIndexes( db, onFinish );
            console.log( "Exiting DataAPI function: setupDatabase with all promises resolved" );
            onFinish();
        }, 
        function(err) 
        {
            // error occurred
            if ( err ) throw err;
        });
    });
}

/*
function: cleanDatabase
info:
    This function clears out all collections that are in the database.
parameters:
    onFinish, function, the function to be called once the database has been cleared
returns:
    nothing
*/
function cleanDatabase( onFinish )
{
    console.log( "Entering DataAPI function: cleanDatabase" );
    var tableConfig = require('config').get('Tables');
    getDefaultConn( function( db )
    {
        var tablePromises = [];
        for ( var i = 0; i < tableConfig.listed.length; i++ )
        {
            var tableAlias = tableConfig.listed[ i ];
            var tableName = tableConfig[ tableAlias ];
            console.log( "cleanDatabase: adding table to promises," , tableAlias , "with actual name," , tableName );
            tablePromises.push( _dropTable( db, tableName ) );
        }

        Promise.all( tablePromises ).then( function()
        {
            console.log( "Exiting DataAPI function: cleanDatabase with all promises resolved" );
            onFinish();
        }, 
        function(err) 
        {
            // error occurred
            if ( err ) throw err;
        });
    });  
}

/*
function: closeConnection
info:
    This function closes the connection object and calls the onFinish function after.
parameters:
    onFinish, function, the function to be called once the database connection has been closed
returns:
    nothing    
*/
function closeConnection( onFinish )
{
    console.log( "Entering DataAPI function: closeConnection" );
    console.log( "closeConnection: Getting connection to close" );
    getDefaultConn( function( db ) 
    {
        console.log( "closeConnection: Connection received, closing connection" );
        _client.close();
        _conn = undefined;
        _client = undefined;
        if ( onFinish )
            onFinish();

        console.log( "Exiting DataAPI function: closeConnection after closed connection" );
    });
}

//expose each of the functions above for calling externally
exports.closeConnection = closeConnection;
exports.getDefaultConn = getDefaultConn;
exports.setupDatabase = setupDatabase;
exports.cleanDatabase = cleanDatabase;


