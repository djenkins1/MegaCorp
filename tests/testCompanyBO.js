const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const companyDAO = require( '../Data/CompanyDAO' );
const companyBO = require( '../BO/CompanyBO' );
const TABLE_NAME = companyDAO.tableName;

describe('TestCompanyBO', function() 
{
    //The before() callback gets run before all tests in the suite.
    before( function( done )
    {
        done();
    });

    //The beforeEach() callback gets run before each test in the suite.
    //Clean and setup the database. 
    beforeEach( function( done )
    {
        /*
        dataAPI.cleanDatabase( function()
        {
            dataAPI.setupDatabase( done );
        });
        */
        done();
    });

    it( 'test changeName success without saving' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var newTestName = "New Company";
        if ( newTestName == mockDataList[ 0 ].name )
        {
            assert.fail( "mockDataList[0] already has test name: " + newTestName );
            done();
            return;
        }

        assert.equal( companyBO.changeName( mockDataList[ 0 ] , newTestName ) , newTestName );
        assert.equal( mockDataList[ 0 ].name, newTestName );
        done();
    });

    it( 'test changeName failure newName not string' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var newTestName = 104;
        var oldName = mockDataList[ 0 ].name;
        if ( newTestName == oldName )
        {
            assert.fail( "mockDataList[0] already has test name: " + newTestName );
            done();
            return;
        }

        var resultName = companyBO.changeName( mockDataList[ 0 ] , newTestName );
        if ( resultName )
        {
            assert.fail( "mockDataList[0] changed name to non string value: " + resultName );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].name, oldName );
        done();
    });

    it( 'test changeName failure old name undefined' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var newTestName = "New Company";
        if ( newTestName == mockDataList[ 0 ].name )
        {
            assert.fail( "mockDataList[0] already has test name: " + newTestName );
            done();
            return;
        }

        mockDataList[ 0 ].name = undefined;
        var resultName = companyBO.changeName( mockDataList[ 0 ] , newTestName );
        if ( resultName )
        {
            assert.fail( "mockDataList[0] changed name for undefined old name: " + resultName );
            done();
            return;
        }

        if ( mockDataList[ 0 ].name )
        {
            assert.fail( "mockDataList[0] now has defined name: " + mockDataList[ 0 ].name );
        }

        done();
    });

    it( 'test changeLogo success without saving' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var newTestLogo = "aviato";
        if ( newTestLogo == mockDataList[ 0 ].logo )
        {
            assert.fail( "mockDataList[0] already has test logo: " + newTestLogo );
            done();
            return;
        }

        assert.equal( companyBO.changeLogo( mockDataList[ 0 ] , newTestLogo ) , newTestLogo );
        assert.equal( mockDataList[ 0 ].logo, newTestLogo );
        done();
    });

    it( 'test changeLogo failure newLogo not string' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var newTestLogo = 104;
        var oldLogo = mockDataList[ 0 ].logo;
        if ( newTestLogo == oldLogo )
        {
            assert.fail( "mockDataList[0] already has test logo: " + newTestLogo );
            done();
            return;
        }

        var resultLogo = companyBO.changeLogo( mockDataList[ 0 ] , newTestLogo );
        if ( resultLogo )
        {
            assert.fail( "mockDataList[0] changed logo to non string value: " + resultLogo );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].logo, oldLogo );
        done();
    });

    it( 'test changeLogo failure old logo undefined' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var newTestLogo = "aviato";
        if ( newTestLogo == mockDataList[ 0 ].logo )
        {
            assert.fail( "mockDataList[0] already has test logo: " + newTestLogo );
            done();
            return;
        }

        mockDataList[ 0 ].logo = undefined;
        var resultLogo = companyBO.changeLogo( mockDataList[ 0 ] , newTestLogo );
        if ( resultLogo )
        {
            assert.fail( "mockDataList[0] changed logo to non string value: " + resultLogo );
            done();
            return;
        }

        if ( mockDataList[ 0 ].logo )
        {
            assert.fail( "mockDataList[0] now has defined logo: " + mockDataList[ 0 ].logo );
        }
        done();
    });

    it( 'test addMoney success without saving' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var amountToAdd = 5;
        var oldAmount = mockDataList[ 0 ].money;
        var resultMoney = companyBO.addMoney( mockDataList[ 0 ] , amountToAdd );
        assert.equal( resultMoney, amountToAdd + oldAmount );
        assert.equal( mockDataList[ 0 ].money, resultMoney );
        done();
    });

    it( 'test addMoney failure addAmount undefined' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var amountToAdd = undefined;
        var oldAmount = mockDataList[ 0 ].money;
        var resultMoney = companyBO.addMoney( mockDataList[ 0 ] , amountToAdd );
        if ( resultMoney )
        {
            assert.fail( "Attempt to add undefined to money returned: " + resultMoney );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].money, oldAmount );
        done();
    });

    it( 'test addMoney failure addAmount not integer' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var amountToAdd = "str";
        var oldAmount = mockDataList[ 0 ].money;
        var resultMoney = companyBO.addMoney( mockDataList[ 0 ] , amountToAdd );
        if ( resultMoney )
        {
            assert.fail( "Attempt to add non integer to money returned: " + resultMoney );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].money, oldAmount );
        done();
    });

    it( 'test addMoney failure addAmount negative' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var amountToAdd = -5;
        var oldAmount = mockDataList[ 0 ].money;
        var resultMoney = companyBO.addMoney( mockDataList[ 0 ] , amountToAdd );
        if ( resultMoney )
        {
            assert.fail( "Attempt to add negative integer to money returned: " + resultMoney );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].money, oldAmount );
        done();
    });

    it( 'test addMoney failure addAmount zero' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var amountToAdd = 0;
        var oldAmount = mockDataList[ 0 ].money;
        var resultMoney = companyBO.addMoney( mockDataList[ 0 ] , amountToAdd );
        if ( resultMoney )
        {
            assert.fail( "Attempt to add zero to money returned: " + resultMoney );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].money, oldAmount );
        done();
    });

    it( 'test addMoney failure oldAmount undefined' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var amountToAdd = 5;
        mockDataList[ 0 ].money = undefined;
        var resultMoney = companyBO.addMoney( mockDataList[ 0 ] , amountToAdd );
        if ( resultMoney )
        {
            assert.fail( "Attempt to add to undefined money returned: " + resultMoney );
            done();
            return;
        }

        if ( mockDataList[ 0 ].money )
        {
            assert.fail( "Attempt to add to undefined money resulted in money: " + mockDataList[ 0 ].money );
            done();
            return;
        }
        done();
    });

    it( 'test addMoney failure oldAmount non integer' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var amountToAdd = 5;
        var badMoney = "bad";
        mockDataList[ 0 ].money = badMoney;
        var resultMoney = companyBO.addMoney( mockDataList[ 0 ] , amountToAdd );
        if ( resultMoney )
        {
            assert.fail( "Attempt to add to non integer money returned: " + resultMoney );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].money, badMoney );
        done();
    });

    it( 'test removeMoney success without saving' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var amountToAdd = 5;
        var oldAmount = mockDataList[ 0 ].money;
        var resultMoney = companyBO.removeMoney( mockDataList[ 0 ] , amountToAdd );
        assert.equal( resultMoney, oldAmount - amountToAdd );
        assert.equal( mockDataList[ 0 ].money, resultMoney );
        done();
    });

    it( 'test removeMoney failure addAmount undefined' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var amountToAdd = undefined;
        var oldAmount = mockDataList[ 0 ].money;
        var resultMoney = companyBO.removeMoney( mockDataList[ 0 ] , amountToAdd );
        if ( resultMoney )
        {
            assert.fail( "Attempt to remove undefined to money returned: " + resultMoney );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].money, oldAmount );
        done();
    });

    it( 'test removeMoney failure addAmount not integer' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var amountToAdd = "str";
        var oldAmount = mockDataList[ 0 ].money;
        var resultMoney = companyBO.removeMoney( mockDataList[ 0 ] , amountToAdd );
        if ( resultMoney )
        {
            assert.fail( "Attempt to remove non integer to money returned: " + resultMoney );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].money, oldAmount );
        done();
    });

    it( 'test removeMoney failure addAmount negative' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var amountToAdd = -5;
        var oldAmount = mockDataList[ 0 ].money;
        var resultMoney = companyBO.removeMoney( mockDataList[ 0 ] , amountToAdd );
        if ( resultMoney )
        {
            assert.fail( "Attempt to remove negative integer to money returned: " + resultMoney );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].money, oldAmount );
        done();
    });

    it( 'test removeMoney failure addAmount zero' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var amountToAdd = 0;
        var oldAmount = mockDataList[ 0 ].money;
        var resultMoney = companyBO.removeMoney( mockDataList[ 0 ] , amountToAdd );
        if ( resultMoney )
        {
            assert.fail( "Attempt to remove zero to money returned: " + resultMoney );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].money, oldAmount );
        done();
    });

    it( 'test removeMoney failure oldAmount undefined' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var amountToAdd = 5;
        mockDataList[ 0 ].money = undefined;
        var resultMoney = companyBO.removeMoney( mockDataList[ 0 ] , amountToAdd );
        if ( resultMoney )
        {
            assert.fail( "Attempt to remove to undefined money returned: " + resultMoney );
            done();
            return;
        }

        if ( mockDataList[ 0 ].money )
        {
            assert.fail( "Attempt to remove to undefined money resulted in money: " + mockDataList[ 0 ].money );
            done();
            return;
        }
        done();
    });

    it( 'test removeMoney failure oldAmount non integer' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var amountToAdd = 5;
        var badMoney = "bad";
        mockDataList[ 0 ].money = badMoney;
        var resultMoney = companyBO.removeMoney( mockDataList[ 0 ] , amountToAdd );
        if ( resultMoney )
        {
            assert.fail( "Attempt to remove to non integer money returned: " + resultMoney );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].money, badMoney );
        done();
    });

    it( 'test removeMoney failure oldAmount not enough' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );
        var amountToAdd = mockDataList[ 0 ].money + 1;
        var oldAmount = mockDataList[ 0 ].money;
        var resultMoney = companyBO.removeMoney( mockDataList[ 0 ] , amountToAdd );
        if ( resultMoney )
        {
            assert.fail( "Attempt to remove to too much money returned: " + resultMoney );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].money, oldAmount );
        done();
    });

    it( 'test addEmployees success without saving' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        var amountToAdd = 10;
        var oldAmount = mockDataList[ 0 ].employees;
        assert.ok( oldAmount );

        var resultEmployees = companyBO.addEmployees( mockDataList[ 0 ], amountToAdd );
        assert.equal( resultEmployees, oldAmount + amountToAdd );
        assert.equal( mockDataList[ 0 ].employees, resultEmployees );
        done();
    });

    it( 'test addEmployees failure amount undefined' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        var amountToAdd = undefined;
        var oldAmount = mockDataList[ 0 ].employees;
        assert.ok( oldAmount );

        var resultEmployees = companyBO.addEmployees( mockDataList[ 0 ], amountToAdd );
        if ( resultEmployees )
        {
            assert.fail( 'Attempt to add employees for undefined amount returned: ' + resultEmployees );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].employees, oldAmount );
        done();        
    });

    it( 'test addEmployees failure amount not integer' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        var amountToAdd = "str";
        var oldAmount = mockDataList[ 0 ].employees;
        assert.ok( oldAmount );

        var resultEmployees = companyBO.addEmployees( mockDataList[ 0 ], amountToAdd );
        if ( resultEmployees )
        {
            assert.fail( 'Attempt to add employees for non integer amount returned: ' + resultEmployees );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].employees, oldAmount );
        done();        
    });

    it( 'test addEmployees failure amount negative' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        var amountToAdd = -5;
        var oldAmount = mockDataList[ 0 ].employees;
        assert.ok( oldAmount );

        var resultEmployees = companyBO.addEmployees( mockDataList[ 0 ], amountToAdd );
        if ( resultEmployees )
        {
            assert.fail( 'Attempt to add employees for negative amount returned: ' + resultEmployees );
            done();
            return;
        }

        assert.equal( mockDataList[ 0 ].employees, oldAmount );
        done();        
    });

    it( 'test addEmployees failure old employees undefined' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        var amountToAdd = 5;
        mockDataList[ 0 ].employees = undefined;

        var resultEmployees = companyBO.addEmployees( mockDataList[ 0 ], amountToAdd );
        if ( resultEmployees )
        {
            assert.fail( 'Attempt to add employees for undefined employees returned: ' + resultEmployees );
        }

        if ( mockDataList[ 0 ].employees )
        {
            assert.fail( 'Attempt to add employees for undefined employees resulted in change: ' + mockDataList[ 0 ].employees );
        }

        done();        
    });    

    it( 'test addEmployees failure old employees not integer' , function( done )
    {
        //clone the object list from the json file so as to not have problems with cached requires
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/companiesAllSamePlanetHq.json" ) ) );

        var amountToAdd = 5;
        var testValue = "str";
        mockDataList[ 0 ].employees = testValue;

        var resultEmployees = companyBO.addEmployees( mockDataList[ 0 ], amountToAdd );
        if ( resultEmployees )
        {
            assert.fail( 'Attempt to add employees for non integer employees returned: ' + resultEmployees );
        }

        assert.equal( mockDataList[ 0 ].employees, testValue );
        done();        
    }); 

    //after() is run after all tests have completed.
    //close down the database connection
    after( function( done ) 
    {
        dataAPI.closeConnection( done );
    });
});
