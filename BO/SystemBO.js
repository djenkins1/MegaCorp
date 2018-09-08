//dao imports
const planetDAO = require( "../Data/PlanetDAO" );
const shipDAO = require( "../Data/ShipDAO" );
const systemDAO = require( "../Data/SystemDAO" );
//constants
const DEBUG_MODE = require('config').get('DebugModeBO');
const ID_KEY = require('config').get('ID_KEY');

/*
DB(Reads):
    GetPlanets,Returns all planets that are part of the system
        planetDAO.getPlanetsInSystem( systemId, onFinish )
    GetShipsTraveling,Returns all ships that are In System but not docked
        shipDAO.getShipsAtLocation( locationObj , onFinish )
    GetAllShips,Returns all ships that are In System traveling or docked
        shipDAO.getShipsInSystemLocation( x , y , onFinish )
    AllSystems,Returns all systems in the database
        systemDAO.getAllSystems( onFinish )
DB(Modification):
    CreateSystem,Creates a new system and adds it to the database

    DefaultObj,Returns the default prototype for a new object
*/
