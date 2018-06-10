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

var DEBUG_MODE = require('config').get('DebugMode');

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
    DEBUG_MODE && console.log( "Entering DataAPI function: getDefaultConn" );
    if ( _conn )
    {
        DEBUG_MODE && console.log( "DataAPI.getDefaultConn: _conn already exists,passing to onFinish" );
        onFinish( _conn );
        DEBUG_MODE && console.log( "Exiting DataAPI function: getDefaultConn from existing connection" );
        return;
    }

    DEBUG_MODE && console.log( "DataAPI.getDefaultConn: _conn does not exist,opening connection" );

    var dbConfig = require('config').get('DataSource');
    var mongoClient = require('mongodb').MongoClient; 
    var url = "mongodb://" + dbConfig["host"] + ":" + dbConfig[ "port" ];
    DEBUG_MODE && console.log( "DataAPI.getDefaultConn: connecting to database url," , url );

    mongoClient.connect(url, function(err, db) 
    {
        if (err) throw err;

        DEBUG_MODE && console.log( "DataAPI.getDefaultConn: setting _conn to now open connection" );
        _client = db;
        _conn = db.db( dbConfig["name"] );

        DEBUG_MODE && console.log( "DataAPI.getDefaultConn: passing new _conn to onFinish" );
        onFinish( _conn );
        DEBUG_MODE && console.log( "Exiting DataAPI function: getDefaultConn from new connection" );
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
    DEBUG_MODE && console.log( "Entering DataAPI function: _dropTable for table" , tableName );
    return new Promise( function( resolve, reject) 
    {
        db.collection( tableName ).drop( tableName, function(err, delOK) 
        {
            if (err)
            {
                reject( err );
                DEBUG_MODE && console.log( "Exiting DataAPI function: _dropTable rejected for table" , tableName );
                return;
            }
            else
            {
                resolve( delOK );
                DEBUG_MODE && console.log( "Exiting DataAPI function: _dropTable resolved for table" , tableName );
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
    DEBUG_MODE && console.log( "Entering DataAPI function: _createTable for table" , tableName );
    return new Promise( function( resolve, reject) 
    {
        db.createCollection( tableName, function(err, res) 
        {
            if (err)
            {
                reject( err );
                DEBUG_MODE && console.log( "Exiting DataAPI function: _createTable rejected for table" , tableName );
                return;
            }

            DEBUG_MODE && console.log( "DataAPI._createTable: Created table: " + tableName );
            resolve( res );
            DEBUG_MODE && console.log( "Exiting DataAPI function: _createTable resolved for table" , tableName );
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
    DEBUG_MODE && console.log( "Entering DataAPI function: setupDatabase" );
    var tableConfig = require('config').get('Tables');
    getDefaultConn( function( db )
    {
        var tablePromises = [];
        for ( var i = 0; i < tableConfig.listed.length; i++ )
        {
            var tableAlias = tableConfig.listed[ i ];
            var tableName = tableConfig[ tableAlias ];
            DEBUG_MODE && console.log( "DataAPI.setupDatabase: adding table to promises," , tableAlias , "with actual name," , tableName );
            tablePromises.push( _createTable( db, tableName ) );
        }

        Promise.all( tablePromises ).then( function()
        {
            //_setupIndexes( db, onFinish );
            DEBUG_MODE && console.log( "Exiting DataAPI function: setupDatabase with all promises resolved" );
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
    DEBUG_MODE && console.log( "Entering DataAPI function: cleanDatabase" );
    var tableConfig = require('config').get('Tables');
    getDefaultConn( function( db )
    {
        var tablePromises = [];
        for ( var i = 0; i < tableConfig.listed.length; i++ )
        {
            var tableAlias = tableConfig.listed[ i ];
            var tableName = tableConfig[ tableAlias ];
            DEBUG_MODE && console.log( "DataAPI.cleanDatabase: adding table to promises," , tableAlias , "with actual name," , tableName );
            tablePromises.push( _dropTable( db, tableName ) );
        }

        Promise.all( tablePromises ).then( function()
        {
            DEBUG_MODE && console.log( "Exiting DataAPI function: cleanDatabase with all promises resolved" );
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
    DEBUG_MODE && console.log( "Entering DataAPI function: closeConnection" );
    DEBUG_MODE && console.log( "DataAPI.closeConnection: Getting connection to close" );
    getDefaultConn( function( db ) 
    {
        DEBUG_MODE && console.log( "DataAPI.closeConnection: Connection received, closing connection" );
        _client.close();
        _conn = undefined;
        _client = undefined;
        if ( onFinish )
            onFinish();

        DEBUG_MODE && console.log( "Exiting DataAPI function: closeConnection after closed connection" );
    });
}


/*
function: findAll
info:
    This function passes along all of the records that are in the table with the name provided.
parameters:
    tableName, string, the table to find the records in
    onFinish, function, the function that is called after the records are found
returns:
    nothing
*/
function findAll( tableName, onFinish )
{
    DEBUG_MODE && console.log( "Entering DataAPI function: findAll for table", tableName );
    getDefaultConn( function( db ) 
    {
        db.collection( tableName ).find( {} ).toArray( function(err, results )
        {
            DEBUG_MODE && console.log( "DataAPI.findAll: number of records found," , results.length );

            onFinish( err, results );

            DEBUG_MODE && console.log( "Exiting DataAPI function: findAll for table" , tableName );            
        });

    });

}

/*
function: findById
info:
    This function passes along the record that is identified by the recordId given.
parameters:
    tableName, string, the table to find the records in
    recordId, string/ObjectID, the id of the record to be found
    onFinish, function, the function that is called after the record is found
returns:
    nothing
*/
function findById( tableName , recordId , onFinish )
{
    DEBUG_MODE && console.log( "Entering DataAPI function: findById for table" , tableName );

    var query = { "_id" : recordId };
    DEBUG_MODE && console.log( "DataAPI.findById: id is," , query._id );

    if ( typeof recordId === "string" )
    {
        query._id = ObjectId( recordId );
        DEBUG_MODE && console.log( "DataAPI.findById: id is a string changed to ObjectId," , query._id );
    }

    getDefaultConn( function( db ) 
    {
        db.collection( tableName ).findOne( query, function( err , result )
        {
            onFinish( err , result );
            DEBUG_MODE && console.log( "Exiting DataAPI function: findById for table", tableName );
        });
    });
}

/*
function: insertOne
info:
    This function inserts the object given and passes it along to the onFinish function.
parameters:
    tableName, string, the table to find the records in
    insertObj, Object, the record to be inserted
    onFinish, function, the function that is called after the company is inserted
returns:
    nothing
*/
function insertOne( tableName , insertObj, onFinish )
{
    DEBUG_MODE && console.log( "Entering DataAPI function: insertOne for table" , tableName );
    getDefaultConn( function( db ) 
    {
        db.collection( tableName ).insertOne( insertObj, function(err, result ) 
        {
            if (err) 
            {
                DEBUG_MODE && console.log( "DataAPI.insertOne: error occurred, passing along error and exiting for table" , tableName );
                onFinish( err , insertObj );
                return;
            }

            insertObj._id = result.insertedId;
            DEBUG_MODE && console.log( "DataAPI.insertOne: id of record inserted," , insertObj._id );

            onFinish( err , insertObj );
            DEBUG_MODE && console.log( "Exiting DataAPI function: insertOne for table" , tableName );
        });
    });
}

function replaceOne( tableName, updateObj, onFinish )
{
    DEBUG_MODE && console.log( "Entering DataAPI function: replaceOne for table" , tableName );
    var query = { "_id" : updateObj._id  };
    if ( typeof updateObj._id === "string" )
    {
        query._id = ObjectId( updateObj._id );
        updateObj._id = ObjectId( updateObj._id );
    }

    getDefaultConn( function( db ) 
    {
        db.collection( tableName ).replaceOne( query , updateObj, function( err, resultObj )
        {
            onFinish( err, resultObj );
            DEBUG_MODE && console.log( "Exiting DataAPI function: replaceOne for table" , tableName );
        });
    });    
}

function removeOne( tableName, removeObj, onFinish )
{
    DEBUG_MODE && console.log( "Entering DataAPI function: removeOne for table" , tableName );
    var query = { "_id" : removeObj._id  };
    if ( typeof removeObj._id === "string" )
    {
        query._id = ObjectId( removeObj._id );
        removeObj._id = ObjectId( removeObj._id );
    }    

    getDefaultConn( function( db ) 
    {
        db.collection( tableName ).deleteOne( query, function( err, deleteResult )
        {
            onFinish( err, deleteResult );
            DEBUG_MODE && console.log( "Exiting DataAPI function: removeOne for table" , tableName );
        }); 
    });
}

//expose each of the functions above for calling externally
exports.closeConnection = closeConnection;
exports.getDefaultConn = getDefaultConn;
exports.setupDatabase = setupDatabase;
exports.cleanDatabase = cleanDatabase;
exports.insertOne = insertOne;
exports.findById = findById;
exports.findAll = findAll;
exports.replaceOne = replaceOne;
exports.removeOne = removeOne;




