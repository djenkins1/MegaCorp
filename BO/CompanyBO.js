const companyDAO = require( "../Data/CompanyDAO" );
const DEBUG_MODE = require('config').get('DebugModeBO');
/*
        RemoveEmployees,Removes employees from the company(NO UPDATE DB YET)
        ChangeHQ,Changes the headquarters of the company(NO UPDATE DB YET)
        GetAllBuildings,Returns all buildings owned by the company
        GetAllShips,Returns all ships owned by the company
        GetAllOffers,Returns all offers from the company
        GetAllTransfers,Returns all transfers from the company
        SaveCompany,Saves any changes made to the company to the database
        AllCompanies,Returns all companies in the database
        CreateCompany,Creates a new company and adds it to the database
*/

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

exports.changeName = changeName;
exports.changeLogo = changeLogo;
exports.addMoney = addMoney;
exports.removeMoney = removeMoney;
exports.addEmployees = addEmployees;


