var http = require("http");
var url = require('url');
var dataAPI = require( "./Data/DataAPI" );

//grab the command line arguments
var myArgs = process.argv.slice(2);

//if there were no arguments
if ( myArgs.length == 0 )
{
    console.log( "You must enter a command option" );
}
else
{
    if ( myArgs[ 0 ] === "--serve" )
    {
        /*
        setupHandlers();
        http.createServer(function (request, response) 
        {
            urlHandler.handleUrl( request, response );
        }).listen(8081);//TODO: should get this from config
        */
        //console.log('Server running at http://127.0.0.1:8081/');
        console.log('Serve command not yet implemented');
    }
    else if ( myArgs[ 0 ] === "--clean" )
    {
        dataAPI.cleanDatabase( dataAPI.closeConnection );
        console.log( "Database cleaned" );
    }
    else if ( myArgs[ 0 ] === "--setup" )
    {
        dataAPI.setupDatabase( dataAPI.closeConnection );
        console.log( "Database setup finished" );
    }
    else
    {
        console.log( "Unknown command: ", myArgs[ 0 ] );
    }
}



