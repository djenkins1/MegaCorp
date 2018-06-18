const companyDAO = require( "../Data/CompanyDAO" );
const DEBUG_MODE = require('config').get('DebugModeBO');
/*
        AddMoney,Adds money to the company(NO UPDATE DB YET)
        RemoveMoney,Removes money from the company(NO UPDATE DB YET)
        AddEmployees,Adds employees to the company(NO UPDATE DB YET)
        RemoveEmployees,Removes employees from the company(NO UPDATE DB YET)
        ChangeHQ,Changes the headquarters of the company(NO UPDATE DB YET)
        GetAllBuildings,Returns all buildings owned by the company
        GetAllShips,Returns all ships owned by the company
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
/*
//TODO: uncomment when tests are written for it in testCompanyBO.js
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
*/

exports.changeName = changeName;
//exports.changeLogo = changeLogo;

