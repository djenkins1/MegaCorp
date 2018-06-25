const companyDAO = require( "../Data/CompanyDAO" );
const buildingDAO = require( "../Data/BuildingDAO" );
const shipDAO = require( "../Data/ShipDAO" );
const offerDAO = require( "../Data/OfferDAO" );
const transferDAO = require( "../Data/TransferDAO" );
const DEBUG_MODE = require('config').get('DebugModeBO');
const ID_KEY = require('config').get('ID_KEY');

//Changes the name of the company(NO UPDATE DB YET)
//returns the new name of the company or undefined if not changed
function changeName( companyObj , newName )
{
    DEBUG_MODE && console.log( "Calling changeName in CompanyBO, new name:" , newName );
    if ( typeof newName !== "string" )
    {
        DEBUG_MODE && console.log( "CompanyBO.changeName: newName is not string" );
        return undefined;
    }

    if ( companyObj.name == undefined )
    {
        DEBUG_MODE && console.log( "CompanyBO.changeName: old name is undefined" );
        return undefined;
    }

    companyObj.name = newName;
    DEBUG_MODE && console.log( "CompanyBO.changeName: changed name successfully" );
    return newName;
}

//Changes the logo of the company(NO UPDATE DB YET)
//returns the new logo of the company or undefined if not changed
function changeLogo( companyObj, newLogo )
{
    DEBUG_MODE && console.log( "Calling changeLogo in CompanyBO, new logo:" , newLogo );
    if ( typeof newLogo !== "string" )
    {
        DEBUG_MODE && console.log( "CompanyBO.changeLogo: newLogo is not string" );
        return undefined;
    }

    if ( companyObj.logo == undefined )
    {
        DEBUG_MODE && console.log( "CompanyBO.changeLogo: old logo is undefined" );
        return undefined;
    }  

    companyObj.logo = newLogo;
    DEBUG_MODE && console.log( "CompanyBO.changeLogo: changed logo successfully" );
    return newLogo;
}

//Adds money to the company(NO UPDATE DB YET)
//returns the new money amount of the company or undefined if not changed
function addMoney( companyObj, amount )
{
    DEBUG_MODE && console.log( "Calling addMoney in CompanyBO, add amount:" , amount );

    if ( amount == undefined )
    {
        DEBUG_MODE && console.log( "CompanyBO.addMoney: amount is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( amount ) )
    {
        DEBUG_MODE && console.log( "CompanyBO.addMoney: amount is not an integer" );
        return undefined;
    }

    amount = parseInt( amount, 10 );
    if ( amount <= 0 )
    {
        DEBUG_MODE && console.log( "CompanyBO.addMoney: amount must be greater than zero" );
        return undefined;
    }

    if ( companyObj.money == undefined )
    {
        DEBUG_MODE && console.log( "CompanyBO.addMoney: companyObj.money is undefined" );
        return undefined;
    }  

    if ( !Number.isInteger( companyObj.money ) )
    {
        DEBUG_MODE && console.log( "CompanyBO.addMoney: companyObj.money is not an integer" );
        return undefined;
    }

    companyObj.money += amount;
    DEBUG_MODE && console.log( "CompanyBO.addMoney: added money successfully" );
    return companyObj.money;
}

//Removes money from the company(NO UPDATE DB YET)
//returns the new money amount of the company or undefined if not changed
function removeMoney( companyObj, amount )
{
    DEBUG_MODE && console.log( "Calling removeMoney in CompanyBO, remove amount:" , amount );

    if ( amount == undefined )
    {
        DEBUG_MODE && console.log( "CompanyBO.removeMoney: amount is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( amount ) )
    {
        DEBUG_MODE && console.log( "CompanyBO.removeMoney: amount is not an integer" );
        return undefined;
    }

    amount = parseInt( amount, 10 );
    if ( amount <= 0 )
    {
        DEBUG_MODE && console.log( "CompanyBO.removeMoney: amount must be greater than zero" );
        return undefined;
    }

    if ( companyObj.money == undefined )
    {
        DEBUG_MODE && console.log( "CompanyBO.removeMoney: companyObj.money is undefined" );
        return undefined;
    }  

    if ( !Number.isInteger( companyObj.money ) )
    {
        DEBUG_MODE && console.log( "CompanyBO.removeMoney: companyObj.money is not an integer" );
        return undefined;
    }

    if ( companyObj.money - amount < 0 )
    {
        DEBUG_MODE && console.log( "CompanyBO.removeMoney: companyObj.money does not have enough to remove" );
        return undefined;
    }

    companyObj.money -= amount;
    DEBUG_MODE && console.log( "CompanyBO.removeMoney: removed money successfully" );
    return companyObj.money;
}

//Adds employees to the company(NO UPDATE DB YET)
//returns the new number of employees for the company or undefined if not changed
function addEmployees( companyObj, amount )
{
    DEBUG_MODE && console.log( "Calling addEmployees in CompanyBO, add amount:" , amount );

    if ( amount == undefined )
    {
        DEBUG_MODE && console.log( "CompanyBO.addEmployees: amount is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( amount ) )
    {
        DEBUG_MODE && console.log( "CompanyBO.addEmployees: amount is not an integer" );
        return undefined;
    }

    amount = parseInt( amount, 10 );
    if ( amount <= 0 )
    {
        DEBUG_MODE && console.log( "CompanyBO.addEmployees: amount must be greater than zero" );
        return undefined;
    }

    if ( companyObj.employees == undefined )
    {
        DEBUG_MODE && console.log( "CompanyBO.addEmployees: companyObj.employees is undefined" );
        return undefined;
    }  

    if ( !Number.isInteger( companyObj.employees ) )
    {
        DEBUG_MODE && console.log( "CompanyBO.addEmployees: companyObj.employees is not an integer" );
        return undefined;
    }

    companyObj.employees += amount;
    DEBUG_MODE && console.log( "CompanyBO.addEmployees: added employees successfully" );
    return companyObj.employees;    
}

//Removes employees from the company(NO UPDATE DB YET)
//returns the new number of employees for the company or undefined if not changed
function removeEmployees( companyObj, amount )
{
    DEBUG_MODE && console.log( "Calling removeEmployees in CompanyBO, add amount:" , amount );

    if ( amount == undefined )
    {
        DEBUG_MODE && console.log( "CompanyBO.removeEmployees: amount is undefined" );
        return undefined;
    }

    if ( !Number.isInteger( amount ) )
    {
        DEBUG_MODE && console.log( "CompanyBO.removeEmployees: amount is not an integer" );
        return undefined;
    }

    amount = parseInt( amount, 10 );
    if ( amount <= 0 )
    {
        DEBUG_MODE && console.log( "CompanyBO.removeEmployees: amount must be greater than zero" );
        return undefined;
    }

    if ( companyObj.employees == undefined )
    {
        DEBUG_MODE && console.log( "CompanyBO.removeEmployees: companyObj.employees is undefined" );
        return undefined;
    }  

    if ( !Number.isInteger( companyObj.employees ) )
    {
        DEBUG_MODE && console.log( "CompanyBO.removeEmployees: companyObj.employees is not an integer" );
        return undefined;
    }

    if ( companyObj.employees < amount )
    {
        DEBUG_MODE && console.log( "CompanyBO.removeEmployees: companyObj.employees does not have enough to remove" );
        return undefined;
    }

    companyObj.employees -= amount;
    DEBUG_MODE && console.log( "CompanyBO.removeEmployees: removed employees successfully" );
    return companyObj.employees;  
}

//Changes the headquarters of the company(NO UPDATE DB YET)
//returns the new planetHq of the company or undefined if not changed
function changeHq( companyObj, newHq )
{
    DEBUG_MODE && console.log( "Calling changeHQ in CompanyBO, newHq:" , newHq );

    if ( newHq == undefined )
    {
        DEBUG_MODE && console.log( "CompanyBO.changeHQ: newHq is undefined" );   
        return undefined; 
    }

    if ( typeof newHq != "string" )
    {
        DEBUG_MODE && console.log( "CompanyBO.changeHQ: newHq is not a string" );   
        return undefined;     
    }    

    companyObj.planetHq = newHq;
    DEBUG_MODE && console.log( "CompanyBO.changeHQ: changed planetHq successfully" );
    return companyObj.planetHq;
}

//returns a default object for a new company
function defaultObj()
{
    return {
        "name" : "",
        "logo" : "",
        "money" : 0,
        "employees" : 0,
        "planetHq" : ""
    };
}

//Saves any changes made to the company to the database
//when the changes have been saved the onFinish function is called
//this function ignores any other properties in the companyObj parameter
//  other then those which are in the defaultObj(as well as _id)
function saveCompany( companyObj, onFinish )
{
    //create a new company object
    var protoObj = defaultObj();

    //assign each of the properties to the one in companyObj parameter
    for ( var prop in protoObj )
    {
        protoObj[ prop ] = companyObj[ prop ];
    }
    
    //assign the id field of the new company object to the companyObj parameter id
    protoObj[ ID_KEY ] = companyObj[ ID_KEY ];

    companyDAO.updateCompany( protoObj , function( err , result )
    {
        onFinish( err , protoObj );
    });
}

//Passes along all buildings owned by the company to the onFinish function
function getAllBuildings( companyObj , onFinish )
{
    buildingDAO.getBuildingsOwnedBy( companyObj[ ID_KEY ] , onFinish );
}

//Passes along all ships owned by the company to the onFinish function
function getAllShips( companyObj, onFinish )
{
    shipDAO.getShipsOwnedBy( companyObj[ ID_KEY ] , onFinish );
}

//Passes along all companies in the database to the onFinish function
function allCompanies( onFinish )
{
    companyDAO.getAllCompanies( onFinish );
}


//Passes along all offers from the company to the onFinish function
function getAllOffers( companyObj, onFinish )
{
    offerDAO.getAllFromCompany( companyObj[ ID_KEY ] , onFinish );
}

//Passes along all transfers from the company to the onFinish function
function getAllTransfers( companyObj, onFinish )
{
    transferDAO.getAllFromCompany( companyObj[ ID_KEY ] , onFinish );
}

//Creates a new company and adds it to the database
function createCompany( companyObj , onFinish )
{
    //create a new company object
    var protoObj = defaultObj();

    //assign each of the properties to the one in companyObj parameter
    for ( var prop in protoObj )
    {
        protoObj[ prop ] = companyObj[ prop ];
    }
    
    //assign the id field of the new company object to the companyObj parameter id
    if ( companyObj[ ID_KEY ] )
    {
        protoObj[ ID_KEY ] = companyObj[ ID_KEY ];
    }

    companyDAO.createCompany( protoObj , onFinish );
}



exports.changeName = changeName;
exports.changeLogo = changeLogo;
exports.addMoney = addMoney;
exports.removeMoney = removeMoney;
exports.addEmployees = addEmployees;
exports.removeEmployees = removeEmployees;
exports.changeHq = changeHq;
exports.saveCompany = saveCompany;
exports.createCompany = createCompany;
//NO TESTING NEEDED:
exports.defaultObj = defaultObj;
exports.getAllBuildings = getAllBuildings;
exports.getAllShips = getAllShips;
exports.allCompanies = allCompanies;
exports.getAllOffers = getAllOffers;
exports.getAllTransfers = getAllTransfers;




