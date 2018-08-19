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

    /*
    ===========
    fixDamage testing begins
    ===========
    */
    it( 'test fixDamage success less than total damage' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.maxDamage );

        let testDamage = 2;
        let testFix = 1;
        let testObj = mockDataList[ 0 ];
        testObj.damage = testDamage;

        let result = bo.fixDamage( testObj, testFix );
        assert.equal( result, testDamage - testFix );
        assert.equal( testObj.damage, result );
        done();
    });

    it( 'test fixDamage success equal total damage' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.maxDamage );

        let testDamage = 2;
        let testFix = testDamage;
        let testObj = mockDataList[ 0 ];
        testObj.damage = testDamage;

        let result = bo.fixDamage( testObj, testFix );
        assert.equal( result, testDamage - testFix );
        assert.equal( testObj.damage, result );
        done();
    });

    it( 'test fixDamage failure more than total damage' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.maxDamage );

        let testDamage = 2;
        let testFix = testDamage + 1;
        let testObj = mockDataList[ 0 ];
        testObj.damage = testDamage;

        let result = bo.fixDamage( testObj, testFix );
        if ( result )
        {
            assert.fail( "fixDamage returned for too much damageToFix: " + result );
        }
        done();
    });

    it( 'test fixDamage failure obj undefined' , function( done )
    {
        let testDamage = 2;
        let testFix = testDamage - 1;
        let testObj = undefined;

        let result = bo.fixDamage( testObj, testFix );
        if ( result )
        {
            assert.fail( "fixDamage returned for undefined obj: " + result );
        }
        done();
    });

    it( 'test fixDamage failure obj.damage undefined' , function( done )
    {
        let testDamage = 2;
        let testFix = testDamage - 1;
        let testObj = {};

        let result = bo.fixDamage( testObj, testFix );
        if ( result )
        {
            assert.fail( "fixDamage returned for undefined obj.damage: " + result );
        }
        done();
    });

    it( 'test fixDamage failure obj.damage non-integer' , function( done )
    {
        let testDamage = 2;
        let testFix = testDamage - 1;
        let testObj = {};
        testObj.damage = 1.5;

        let result = bo.fixDamage( testObj, testFix );
        if ( result )
        {
            assert.fail( "fixDamage returned for non-integer obj.damage: " + result );
        }
        done();
    });

    it( 'test fixDamage failure damageToFix undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.maxDamage );

        let testDamage = 2;
        let testFix = undefined;
        let testObj = mockDataList[ 0 ];
        testObj.damage = testDamage;

        let result = bo.fixDamage( testObj, testFix );
        if ( result )
        {
            assert.fail( "fixDamage returned for undefined damageToFix: " + result );
        }
        done();
    });

    it( 'test fixDamage failure damageToFix non-integer' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.maxDamage );

        let testDamage = 2;
        let testFix = 1.75;
        let testObj = mockDataList[ 0 ];
        testObj.damage = testDamage;

        let result = bo.fixDamage( testObj, testFix );
        if ( result )
        {
            assert.fail( "fixDamage returned for non-integer damageToFix: " + result );
        }
        done();
    });

    it( 'test fixDamage failure damageToFix negative' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.maxDamage );

        let testDamage = 2;
        let testFix = -1;
        let testObj = mockDataList[ 0 ];
        testObj.damage = testDamage;

        let result = bo.fixDamage( testObj, testFix );
        if ( result )
        {
            assert.fail( "fixDamage returned for negative damageToFix: " + result );
        }
        done();
    });

    it( 'test fixDamage failure damageToFix zero' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.maxDamage );

        let testDamage = 2;
        let testFix = 0;
        let testObj = mockDataList[ 0 ];
        testObj.damage = testDamage;

        let result = bo.fixDamage( testObj, testFix );
        if ( result )
        {
            assert.fail( "fixDamage returned for zero damageToFix: " + result );
        }
        done();
    });

    /*
    ===========
    sumGoods testing begins
    ===========
    */
    it( 'test sumGoods success single good' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            "diamond" : testSum
        };

        let result = bo.sumGoods( testObj );
        assert.ok( result );
        assert.equal( result, testSum );
        done();
    });

    it( 'test sumGoods success multiple goods' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let otherValue = 2;
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            "diamond" : testSum - otherValue,
            "spade" : otherValue
        };

        let result = bo.sumGoods( testObj );
        assert.ok( result );
        assert.equal( result, testSum );
        done();
    });

    it( 'test sumGoods success single @good return zero' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            "@diamond" : testSum
        };

        let result = bo.sumGoods( testObj );
        assert.equal( result, 0 );
        done();
    });

    it( 'test sumGoods success multiple goods with @good' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let otherValue = 2;
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            "@diamond" : otherValue,
            "spade" : testSum
        };

        let result = bo.sumGoods( testObj );
        assert.ok( result );
        assert.equal( result, testSum );
        done();
    });

    it( 'test sumGoods success returns zero for empty inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let otherValue = 2;
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {};

        let result = bo.sumGoods( testObj );
        assert.equal( result, 0 );
        done();
    });

    it( 'test sumGoods failure undefined obj' , function( done )
    {
        let testObj = undefined;

        let result = bo.sumGoods( testObj );
        if ( result )
        {
            assert.fail( "sumGoods returned for undefined obj: " + JSON.stringify( result ) );
        }
        done();
    });

    it( 'test sumGoods failure undefined inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        testObj.inventory = undefined;

        let result = bo.sumGoods( testObj );
        if ( result )
        {
            assert.fail( "sumGoods returned for undefined inventory: " + JSON.stringify( result ) );
        }
        done();
    });

    /*
    ===========
    hasGoods testing begins
    ===========
    */
    it( 'test hasGoods returns true for single good in single inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testValue = 2;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum
        };

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.hasGoods( testObj, testGoods );
        assert.ok( result );
        done();
    });

    it( 'test hasGoods returns true for single good in multiple inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testValue = 2;
        let testGoodName = "diamond"
        let otherGoodName = "circus";
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum,
            [otherGoodName] : testSum
        };

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.hasGoods( testObj, testGoods );
        assert.ok( result );
        done();
    });

    it( 'test hasGoods returns true for multiple goods in multiple inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testValue = 2;
        let testGoodName = "diamond"
        let otherGoodName = "circus";
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum,
            [otherGoodName] : testSum
        };

        let testGoods = {
            [testGoodName] : testValue,
            [otherGoodName] : testValue
        };

        let result = bo.hasGoods( testObj, testGoods );
        assert.ok( result );
        done();
    });

    it( 'test hasGoods returns false for not enough single good' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testValue = testSum + 1;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum
        };

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.hasGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "hasGoods returned for not enough single good: " + result );
        }
        done();
    });

    it( 'test hasGoods returns undefined for undefined obj' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testValue = testSum + 1;
        let testGoodName = "diamond"
        let testObj = undefined;

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.hasGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "hasGoods returned for undefined obj: " + result );
        }
        done();
    });

    it( 'test hasGoods returns undefined for undefined inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testValue = testSum + 1;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = undefined;

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.hasGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "hasGoods returned for undefined inventory: " + result );
        }
        done();
    });

    it( 'test hasGoods returns undefined for undefined goods' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testValue = testSum + 1;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum
        };

        let testGoods = undefined;

        let result = bo.hasGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "hasGoods returned for undefined goods: " + result );
        }
        done();
    });

    /*
    ===========
    addGoods testing begins
    ===========
    */
    it( 'test addGoods success single good in single inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testValue = 2;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum
        };
        testObj.buildingBluePrint.maxInventory = testSum * 10;

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.addGoods( testObj, testGoods );
        assert.ok( result );
        assert.deepEqual( result, testObj.inventory );
        assert.equal( result[ testGoodName ] , testSum + testValue );
        done();
    });

    it( 'test addGoods success single good in multiple inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testValue = 2;
        let testGoodName = "diamond";
        let otherGoodName = "spade";
        let testObj = mockDataList[ 0 ];
        testObj.buildingBluePrint.maxInventory = testSum * 10;
        testObj.inventory = {
            [testGoodName] : testSum,
            [otherGoodName] : testSum
        };

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.addGoods( testObj, testGoods );
        assert.ok( result );
        assert.deepEqual( result, testObj.inventory );
        assert.equal( result[ testGoodName ] , testSum + testValue );
        assert.equal( result[ otherGoodName ] , testSum );
        done();
    });

    it( 'test addGoods success multiple good in multiple inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testValue = 2;
        let testGoodName = "diamond";
        let otherGoodName = "spade";
        let testObj = mockDataList[ 0 ];
        testObj.buildingBluePrint.maxInventory = testSum * 10;
        testObj.inventory = {
            [testGoodName] : testSum,
            [otherGoodName] : testSum
        };

        let testGoods = {
            [testGoodName] : testValue,
            [otherGoodName] : testValue
        };

        let result = bo.addGoods( testObj, testGoods );
        assert.ok( result );
        assert.deepEqual( result, testObj.inventory );
        assert.equal( result[ testGoodName ] , testSum + testValue );
        assert.equal( result[ otherGoodName ] , testSum + testValue );
        done();
    });

    it( 'test addGoods failure single good max inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testValue = 2;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum
        };
        testObj.buildingBluePrint.maxInventory = testSum;

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.addGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "addGoods returned for too much good: " + JSON.stringify( result ) );
        }
        done();
    });

    it( 'test addGoods failure obj undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testValue = 2;
        let testGoodName = "diamond"
        let testObj = undefined;

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.addGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "addGoods returned undefined obj: " + JSON.stringify( result ) );
        }
        done();
    });

    it( 'test addGoods failure inventory undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testValue = 2;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = undefined;
        testObj.buildingBluePrint.maxInventory = testSum * 10;

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.addGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "addGoods returned for undefined inventory: " + JSON.stringify( result ) );
        }
        done();
    });

    it( 'test addGoods failure buildingBluePrint undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testValue = 2;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum
        };
        testObj.buildingBluePrint = undefined;

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.addGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "addGoods returned for undefined buildingBluePrint: " + JSON.stringify( result ) );
        }
        done();
    });

    it( 'test addGoods failure maxInventory undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testValue = 2;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum
        };
        testObj.buildingBluePrint.maxInventory = undefined;

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.addGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "addGoods returned for undefined maxInventory: " + JSON.stringify( result ) );
        }
        done();
    });

    it( 'test addGoods failure maxInventory non-integer' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testValue = 2;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum
        };
        testObj.buildingBluePrint.maxInventory = "nonIntegerStringValue";

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.addGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "addGoods returned for non-integer maxInventory: " + JSON.stringify( result ) );
        }
        done();
    });

    it( 'test addGoods failure goods undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testValue = 2;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum
        };
        testObj.buildingBluePrint.maxInventory = testSum * 10;

        let testGoods = undefined;

        let result = bo.addGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "addGoods returned for undefined goods: " + JSON.stringify( result ) );
        }
        done();
    });

    it( 'test addGoods failure goods empty' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testValue = 2;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum
        };
        testObj.buildingBluePrint.maxInventory = testSum * 10;

        let testGoods = {};

        let result = bo.addGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "addGoods returned for empty goods: " + JSON.stringify( result ) );
        }
        done();
    });

    /*
    ===========
    isFull testing begins
    ===========
    */
    it( 'test isFull returns true for single good full inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum
        };
        testObj.buildingBluePrint.maxInventory = testSum;

        let result = bo.isFull( testObj );
        assert.ok( result );
        done();
    });

    it( 'test isFull returns false for single good not full inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum
        };
        testObj.buildingBluePrint.maxInventory = testSum * 2;

        let result = bo.isFull( testObj );
        if ( result )
        {
            assert.fail( "isFull returned for non full inventory: " + result );
        }
        done();
    });

    it( 'test isFull returns true for multiple goods full inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testGoodName = "diamond";
        let otherGoodName = "spade";
        let testObj = mockDataList[ 0 ];
        testObj.buildingBluePrint.maxInventory = testSum * 2;
        testObj.inventory = {
            [testGoodName] : testSum,
            [otherGoodName] : testSum
        };

        let result = bo.isFull( testObj );
        assert.ok( result );
        done();
    });

    it( 'test isFull returns false for multiple goods not full inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testGoodName = "diamond";
        let otherGoodName = "spade";
        let testObj = mockDataList[ 0 ];
        testObj.buildingBluePrint.maxInventory = testSum * 10;
        testObj.inventory = {
            [testGoodName] : testSum,
            [otherGoodName] : testSum
        };

        let result = bo.isFull( testObj );
        if ( result )
        {
            assert.fail( "isFull returned for non full inventory: " + result );
        }
        done();
    });

    it( 'test isFull failure undefined obj' , function( done )
    {
        let testObj = undefined;

        let result = bo.isFull( testObj );
        if ( result )
        {
            assert.fail( "isFull returned for undefined obj: " + result );
        }
        done();
    });

    it( 'test isFull failure undefined inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = undefined;
        testObj.buildingBluePrint.maxInventory = testSum * 2;

        let result = bo.isFull( testObj );
        if ( result )
        {
            assert.fail( "isFull returned for undefined inventory: " + result );
        }
        done();
    });

    it( 'test isFull failure undefined buildingBluePrint' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum
        };
        testObj.buildingBluePrint = undefined;

        let result = bo.isFull( testObj );
        if ( result )
        {
            assert.fail( "isFull returned for undefined buildingBluePrint: " + result );
        }
        done();
    });

    it( 'test isFull failure undefined maxInventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum
        };
        testObj.buildingBluePrint.maxInventory = undefined;

        let result = bo.isFull( testObj );
        if ( result )
        {
            assert.fail( "isFull returned for undefined maxInventory: " + result );
        }
        done();
    });

    it( 'test isFull failure non-integer maxInventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testSum = 10;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        testObj.inventory = {
            [testGoodName] : testSum
        };
        testObj.buildingBluePrint.maxInventory = "3oh3";

        let result = bo.isFull( testObj );
        if ( result )
        {
            assert.fail( "isFull returned for non-integer maxInventory: " + result );
        }
        done();
    });

    /*
    ===========
    removeGoods testing begins
    ===========
    */
    it( 'test removeGoods success single good single inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        let testValue = 2;
        testObj.inventory = {
            [testGoodName] : testSum
        };

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.removeGoods( testObj, testGoods );
        assert.ok( result );
        assert.deepEqual( result, testObj.inventory );
        assert.equal( result[ testGoodName ] , testSum - testValue );
        done();
    });

    it( 'test removeGoods success single good multiple inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testGoodName = "diamond";
        let otherGoodName = "spade";
        let testObj = mockDataList[ 0 ];
        let testValue = 2;
        testObj.inventory = {
            [testGoodName] : testSum,
            [otherGoodName] : testSum
        };

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.removeGoods( testObj, testGoods );
        assert.ok( result );
        assert.deepEqual( result, testObj.inventory );
        assert.equal( result[ testGoodName ] , testSum - testValue );
        assert.equal( result[ otherGoodName ] , testSum );
        done();
    });

    it( 'test removeGoods success single good single inventory all' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        let testValue = testSum;
        testObj.inventory = {
            [testGoodName] : testSum
        };

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.removeGoods( testObj, testGoods );
        assert.deepEqual( result, testObj.inventory );
        if ( result[ testGoodName ] )
        {
            assert.fail( "removeGoods: good was not entirely removed," + JSON.stringify( result ) );
        }
        done();
    });

    it( 'test removeGoods failure single good not enough single inventory' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        let testValue = testSum + 2;
        testObj.inventory = {
            [testGoodName] : testSum
        };

        let testGoods = {
            [testGoodName] : testValue
        };

        let result = bo.removeGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "removeGoods returned for not enough goods: " + JSON.stringify( result ) );
        }
        done();
    });

    it( 'test removeGoods failure obj undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testGoodName = "diamond"
        let testObj = undefined;

        let testGoods = {
            [testGoodName] : testSum
        };

        let result = bo.removeGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "removeGoods returned for undefined obj: " + JSON.stringify( result ) );
        }
        done();
    });

    it( 'test removeGoods failure inventory undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        let testValue = testSum;
        testObj.inventory = undefined;

        let testGoods = {
            [testGoodName] : testSum
        };

        let result = bo.removeGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "removeGoods returned for undefined inventory: " + JSON.stringify( result ) );
        }
        done();
    });

    it( 'test removeGoods failure goods undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        let testValue = testSum;
        testObj.inventory = {
                [testGoodName] : testSum
        };

        let testGoods = undefined;

        let result = bo.removeGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "removeGoods returned for undefined goods: " + JSON.stringify( result ) );
        }
        done();
    });

    it( 'test removeGoods failure goods empty' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testSum = 10;
        let testGoodName = "diamond"
        let testObj = mockDataList[ 0 ];
        let testValue = testSum;
        testObj.inventory = {
                [testGoodName] : testSum
        };

        let testGoods = {};

        let result = bo.removeGoods( testObj, testGoods );
        if ( result )
        {
            assert.fail( "removeGoods returned for empty goods: " + JSON.stringify( result ) );
        }
        done();
    });

    /*
    ===========
    hasNeeded testing begins
    ===========
    */
    it( 'test hasNeeded returns true inventory matches needed' , function( done )
    {
        let mockDataList = JSON.parse( JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.productionCost );

        let testObj = mockDataList[ 0 ];
        testObj.inventory = JSON.parse( JSON.stringify( testObj.buildingBluePrint.productionCost ) );

        let result = bo.hasNeeded( testObj );
        assert.ok( result );
        done();
    });

    it( 'test hasNeeded returns true inventory more than needed' , function( done )
    {
        let mockDataList = JSON.parse( JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.productionCost );

        let testObj = mockDataList[ 0 ];
        testObj.inventory = JSON.parse( JSON.stringify( testObj.buildingBluePrint.productionCost ) );
        mockDataList[ 0 ].buildingBluePrint.maxInventory = 1000;
        for ( var good in testObj.inventory )
        {
            testObj.inventory[ good ] *= 2;
        }

        let result = bo.hasNeeded( testObj );
        assert.ok( result );
        done();
    });

    it( 'test hasNeeded returns false inventory less than needed' , function( done )
    {
        let mockDataList = JSON.parse( JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.productionCost );

        let testObj = mockDataList[ 0 ];
        testObj.inventory = JSON.parse( JSON.stringify( testObj.buildingBluePrint.productionCost ) );
        mockDataList[ 0 ].buildingBluePrint.maxInventory = 1000;
        for ( var good in testObj.inventory )
        {
            testObj.inventory[ good ] -= 2;
        }

        let result = bo.hasNeeded( testObj );
        if ( result )
        {
            assert.fail( "hasNeeded returned for not enough goods: " + result );
        }
        done();
    });

    it( 'test hasNeeded returns false inventory empty' , function( done )
    {
        let mockDataList = JSON.parse( JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.productionCost );

        let testObj = mockDataList[ 0 ];
        testObj.inventory = {};

        let result = bo.hasNeeded( testObj );
        if ( result )
        {
            assert.fail( "hasNeeded returned for empty inventory: " + result );
        }
        done();
    });

    it( 'test hasNeeded failure obj undefined' , function( done )
    {
        let mockDataList = JSON.parse( JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.productionCost );

        let testObj = undefined;

        let result = bo.hasNeeded( testObj );
        if ( result )
        {
            assert.fail( "hasNeeded returned for undefined obj: " + result );
        }
        done();
    });

    it( 'test hasNeeded failure inventory undefined' , function( done )
    {
        let mockDataList = JSON.parse( JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.productionCost );

        let testObj = mockDataList[ 0 ];
        testObj.inventory = undefined;

        let result = bo.hasNeeded( testObj );
        if ( result )
        {
            assert.fail( "hasNeeded returned for undefined inventory: " + result );
        }
        done();
    });

    it( 'test hasNeeded failure buildingBluePrint undefined' , function( done )
    {
        let mockDataList = JSON.parse( JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.productionCost );

        let testObj = mockDataList[ 0 ];
        testObj.inventory = JSON.parse( JSON.stringify( testObj.buildingBluePrint.productionCost ) );
        mockDataList[ 0 ].buildingBluePrint = undefined;

        let result = bo.hasNeeded( testObj );
        if ( result )
        {
            assert.fail( "hasNeeded returned for undefined buildingBluePrint: " + result );
        }
        done();
    });

    it( 'test hasNeeded failure productionCost undefined' , function( done )
    {
        let mockDataList = JSON.parse( JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.productionCost );

        let testObj = mockDataList[ 0 ];
        testObj.inventory = JSON.parse( JSON.stringify( testObj.buildingBluePrint.productionCost ) );
        mockDataList[ 0 ].buildingBluePrint.productionCost = undefined;

        let result = bo.hasNeeded( testObj );
        if ( result )
        {
            assert.fail( "hasNeeded returned for undefined productionCost: " + result );
        }
        done();
    });

    it( 'test hasNeeded failure productionCost empty' , function( done )
    {
        let mockDataList = JSON.parse( JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );
        assert.ok( mockDataList[ 0 ].buildingBluePrint.productionCost );

        let testObj = mockDataList[ 0 ];
        testObj.inventory = JSON.parse( JSON.stringify( testObj.buildingBluePrint.productionCost ) );
        mockDataList[ 0 ].buildingBluePrint.productionCost = {};

        let result = bo.hasNeeded( testObj );
        if ( result )
        {
            assert.fail( "hasNeeded returned for empty productionCost: " + result );
        }
        done();
    });

    /*
    ===========
    produceGoods testing begins
    ===========
    */
    /*
    it( 'test produceGoods success single good empty inventory' , function( done )
    {
        let mockDataList = JSON.parse( JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testObj = mockDataList[ 0 ];
        let testGood = "Keys";
        let testValue = 10;

        testObj.buildingBluePrint.produces = {
            [testGood] : testValue
        };

        testObj.inventory = {};
        testObj.buildingBluePrint.maxInventory = 100;

        let result = bo.produceGoods( testObj );
        assert.ok( result );
        assert.deepEqual( result, testObj.inventory );
        assert.equal( testObj.inventory[ testGood ] , testValue );
        done();
    });

    it( 'test produceGoods success multiple goods empty inventory' , function( done )
    {
        let mockDataList = JSON.parse( JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testObj = mockDataList[ 0 ];
        let testGood = "Keys";
        let otherTestGood = "Water";
        let testValue = 10;
        let otherTestValue = 15;
        testObj.buildingBluePrint.produces = {
            [testGood] : testValue,
            [otherTestGood] : otherTestValue
        };

        testObj.inventory = {};
        testObj.buildingBluePrint.maxInventory = 100;

        let result = bo.produceGoods( testObj );
        assert.ok( result );
        assert.deepEqual( result, testObj.inventory );
        assert.equal( testObj.inventory[ testGood ] , testValue );
        assert.equal( testObj.inventory[ otherTestGood ] , otherTestValue );
        done();
    });

    it( 'test produceGoods success single good partial inventory' , function( done )
    {
        let mockDataList = JSON.parse( JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testObj = mockDataList[ 0 ];
        let testGood = "Keys";
        let otherTestGood = "Water";
        let otherTestValue = 15;
        let testValue = 10;

        testObj.buildingBluePrint.produces = {
            [testGood] : testValue
        };

        testObj.inventory = {
            [testGood] : testValue,
            [otherTestGood] : otherTestValue
        };
        testObj.buildingBluePrint.maxInventory = 100;

        let result = bo.produceGoods( testObj );
        assert.ok( result );
        assert.deepEqual( result, testObj.inventory );
        assert.equal( testObj.inventory[ testGood ] , testValue * 2 );
        assert.equal( testObj.inventory[ otherTestGood ] , otherTestValue );
        done();
    });

    it( 'test produceGoods success multiple goods partial inventory' , function( done )
    {
        let mockDataList = JSON.parse( JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testObj = mockDataList[ 0 ];
        let testGood = "Keys";
        let otherTestGood = "Water";
        let otherTestValue = 15;
        let testValue = 10;

        testObj.buildingBluePrint.produces = {
            [testGood] : testValue,
            [otherTestGood] : otherTestValue
        };

        testObj.inventory = {
            [testGood] : testValue,
            [otherTestGood] : otherTestValue
        };
        testObj.buildingBluePrint.maxInventory = 100;

        let result = bo.produceGoods( testObj );
        assert.ok( result );
        assert.deepEqual( result, testObj.inventory );
        assert.equal( testObj.inventory[ testGood ] , testValue * 2 );
        assert.equal( testObj.inventory[ otherTestGood ] , otherTestValue * 2 );
        done();
    });

    it( 'test produceGoods failure not enough space' , function( done )
    {
        let mockDataList = JSON.parse( JSON.stringify( require( "../sampleData/testData/buildingsWithBluePrints.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].buildingBluePrint );

        let testObj = mockDataList[ 0 ];
        let testGood = "Keys";
        let testValue = 10;
        testObj.buildingBluePrint.produces = {
            [testGood] : testValue
        };

        testObj.inventory = {};
        testObj.buildingBluePrint.maxInventory = testValue - 2;

        let result = bo.produceGoods( testObj );
        if ( result )
        {
            assert.fail( "produceGoods returned for not enough space: " + result );
        }
        done();
    });

    it( 'test produceGoods failure obj undefined' , function( done )
    {
        let testObj = undefined;

        let result = bo.produceGoods( testObj );
        if ( result )
        {
            assert.fail( "produceGoods returned undefined obj: " + result );
        }
        done();
    });

    xit( 'test produceGoods failure inventory undefined' , function( done )
    {
        done();
    });

    xit( 'test produceGoods failure buildingBluePrint undefined' , function( done )
    {
        done();
    });

    xit( 'test produceGoods failure produces undefined' , function( done )
    {
        done();
    });

    xit( 'test produceGoods failure produces invalid empty' , function( done )
    {
        done();
    });
    */

    //after() is run after all tests have completed.
    after( function( done )
    {
        done();
    });
});
