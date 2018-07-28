const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const dao = require( '../Data/BuildingDAO' );
const bo = require( '../BO/BuildingBO' );
const TABLE_NAME = dao.tableName;

//This test file does not test database functionality
describe('TestBuildingBO', function()
{
    //The before() callback gets run before all tests in the suite.
    before( function( done )
    {
        done();
    });

    //The beforeEach() callback gets run before each test in the suite.
    beforeEach( function( done )
    {
        done();
    });

    /*
    ===========
    changeName testing begins
    ===========
    */
    it( 'test changeName success' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsAllSameCompany.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].name );

        let testObj = mockDataList[ 0 ];
        let testName = "Test Building";

        let result = bo.changeName( testObj , testName );
        assert.ok( result );
        assert.equal( result, testName );
        assert.equal( testObj.name, testName );
        done();
    });

    it( 'test changeName failure obj undefined' , function( done )
    {
        let testObj = undefined;
        let testName = "Test Building";
        let result = bo.changeName( testObj, testName );
        if ( result )
        {
            assert.fail( "changeName returned for undefined obj: " + result );
        }
        done();
    });

    it( 'test changeName failure obj.name undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsAllSameCompany.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        testObj.name = undefined;
        let testName = "Test Building";

        let result = bo.changeName( testObj, testName );
        if ( result )
        {
            assert.fail( "changeName returned for undefined old name: " + result );
        }
        done();

    });

    it( 'test changeName failure newName undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsAllSameCompany.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].name );

        let testObj = mockDataList[ 0 ];
        let testName = undefined;

        let result = bo.changeName( testObj, testName );
        if ( result )
        {
            assert.fail( "changeName returned for undefined new name: " + result );
        }
        done();

    });

    it( 'test changeName failure newName not a string' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsAllSameCompany.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].name );

        let testObj = mockDataList[ 0 ];
        let testName = 1.5;

        let result = bo.changeName( testObj, testName );
        if ( result )
        {
            assert.fail( "changeName returned for non-string new name: " + result );
        }
        done();

    });

    /*
    ===========
    changeCompany testing begins
    ===========
    */
    it( 'test changeCompany success' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsAllSameCompany.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].companyId );

        let testObj = mockDataList[ 0 ];
        let testCompany = "1";

        let result = bo.changeCompany( testObj, testCompany );
        assert.ok( result );
        assert.equal( result, testCompany );
        assert.equal( testObj.companyId, testCompany );
        done();
    });

    it( 'test changeCompany failure obj undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsAllSameCompany.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].companyId );

        let testObj = undefined;
        let testCompany = "1";

        let result = bo.changeCompany( testObj, testCompany );
        if ( result )
        {
            assert.fail( "changeCompany returned for undefined obj: " + result );
        }
        done();
    });

    it( 'test changeCompany failure newCompanyId undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsAllSameCompany.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].companyId );

        let testObj = mockDataList[ 0 ];
        let testCompany = undefined;

        let result = bo.changeCompany( testObj, testCompany );
        if ( result )
        {
            assert.fail( "changeCompany returned for undefined newCompanyId: " + result );
        }
        done();
    });

    it( 'test changeCompany failure old companyId undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsAllSameCompany.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].companyId );

        let testObj = mockDataList[ 0 ];
        mockDataList[ 0 ].companyId = undefined;
        let testCompany = "1";

        let result = bo.changeCompany( testObj, testCompany );
        if ( result )
        {
            assert.fail( "changeCompany returned for undefined old companyId: " + result );
        }
        done();
    });

    /*
    ===========
    addDamage testing begins
    ===========
    */
    it( 'test addDamage success less than maxDamage' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.maxDamage );

        let testObj = mockDataList[ 0 ];
        let oldDamage = testObj.damage;
        let testDamage = 5;

        let result = bo.addDamage( testObj, testDamage );
        assert.equal( result, oldDamage + testDamage );
        assert.equal( testObj.damage, result );
        done();
    });

    it( 'test addDamage success equal maxDamage' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.maxDamage );

        let testObj = mockDataList[ 0 ];
        testObj.damage = 0;
        let oldDamage = testObj.damage;
        let testDamage = testObj.buildingBluePrint.maxDamage;

        let result = bo.addDamage( testObj, testDamage );
        assert.equal( result, oldDamage + testDamage );
        assert.equal( testObj.damage, result );
        done();
    });

    it( 'test addDamage failure more than maxDamage without damage' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.maxDamage );

        let testObj = mockDataList[ 0 ];
        testObj.damage = 0;
        let oldDamage = testObj.damage;
        let testDamage = testObj.buildingBluePrint.maxDamage + 1;

        let result = bo.addDamage( testObj, testDamage );
        if ( result )
        {
            assert.fail( "addDamage returned for too much damage: " + result );
        }
        assert.equal( testObj.damage, oldDamage );
        done();
    });

    it( 'test addDamage failure more than maxDamage with damage' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.maxDamage );

        let testObj = mockDataList[ 0 ];
        testObj.damage = testObj.buildingBluePrint.maxDamage - 1;
        let oldDamage = testObj.damage;
        let testDamage = 2;

        let result = bo.addDamage( testObj, testDamage );
        if ( result )
        {
            assert.fail( "addDamage returned for too much damage: " + result );
        }
        assert.equal( testObj.damage, oldDamage );
        done();
    });

    it( 'test addDamage failure obj undefined' , function( done )
    {
        let testObj = undefined;
        let testDamage = 2;

        let result = bo.addDamage( testObj, testDamage );
        if ( result )
        {
            assert.fail( "addDamage returned for undefined obj: " + result );
        }
        done();
    });

    it( 'test addDamage failure old damage undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.maxDamage );

        let testObj = mockDataList[ 0 ];
        testObj.damage = undefined;
        let testDamage = 2;

        let result = bo.addDamage( testObj, testDamage );
        if ( result )
        {
            assert.fail( "addDamage returned for undefined old damage: " + result );
        }
        done();
    });

    it( 'test addDamage failure old damage non integer' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.maxDamage );

        let testObj = mockDataList[ 0 ];
        testObj.damage = "badStr";
        let testDamage = 2;

        let result = bo.addDamage( testObj, testDamage );
        if ( result )
        {
            assert.fail( "addDamage returned for non-integer old damage: " + result );
        }
        done();
    });

    it( 'test addDamage failure buildingBluePrint undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        testObj.damage = 0;
        testObj.buildingBluePrint = undefined;
        let testDamage = 2;

        let result = bo.addDamage( testObj, testDamage );
        if ( result )
        {
            assert.fail( "addDamage returned for undefined buildingBluePrint: " + result );
        }
        done();
    });

    it( 'test addDamage failure maxDamage undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testObj = mockDataList[ 0 ];
        testObj.damage = 0;
        testObj.buildingBluePrint.maxDamage = undefined;
        let testDamage = 2;

        let result = bo.addDamage( testObj, testDamage );
        if ( result )
        {
            assert.fail( "addDamage returned for undefined maxDamage: " + result );
        }
        done();
    });

    it( 'test addDamage failure maxDamage non-integer' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testObj = mockDataList[ 0 ];
        testObj.damage = 0;
        testObj.buildingBluePrint.maxDamage = "badStr";
        let testDamage = 2;

        let result = bo.addDamage( testObj, testDamage );
        if ( result )
        {
            assert.fail( "addDamage returned for non-integer maxDamage: " + result );
        }
        done();
    });

    it( 'test addDamage failure damageToAdd undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.maxDamage );

        let testObj = mockDataList[ 0 ];
        testObj.damage = 0;
        let testDamage = undefined;

        let result = bo.addDamage( testObj, testDamage );
        if ( result )
        {
            assert.fail( "addDamage returned for undefined damageToAdd: " + result );
        }
        done();
    });

    it( 'test addDamage failure damageToAdd non-integer' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.maxDamage );

        let testObj = mockDataList[ 0 ];
        testObj.damage = 0;
        let testDamage = "hello";

        let result = bo.addDamage( testObj, testDamage );
        if ( result )
        {
            assert.fail( "addDamage returned for non-integer damageToAdd: " + result );
        }
        done();
    });

    //after() is run after all tests have completed.
    after( function( done )
    {
        done();
    });
});
