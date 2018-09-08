const assert = require('assert');
const dataAPI = require( '../Data/DataAPI' );
const bo = require( '../BO/PlanetBO' );
const MAX_TAX_RATE = require('config').get('MAX_TAX_RATE');

//This test file does not test database functionality
describe('TestPlanetBO', function()
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
    changeTaxes testing begins
    ===========
    */
    it( 'test changeTaxes success normal rate' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].taxes );

        let testObj = mockDataList[ 0 ];
        let testRate = 0.11;
        assert.ok( testRate <= MAX_TAX_RATE );

        let result = bo.changeTaxes( testObj , testRate );
        assert.ok( result );
        assert.equal( result, testRate );
        assert.equal( testObj.taxes, testRate );
        done();
    });

    it( 'test changeTaxes success for zero tax rate' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].taxes );

        let testObj = mockDataList[ 0 ];
        let testRate = 0.0;
        assert.ok( testRate <= MAX_TAX_RATE );

        let result = bo.changeTaxes( testObj , testRate );
        assert.equal( result, testRate );
        assert.equal( testObj.taxes, testRate );
        done();
    });

    it( 'test changeTaxes success for max tax rate' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].taxes );

        let testObj = mockDataList[ 0 ];
        let testRate = MAX_TAX_RATE;

        let result = bo.changeTaxes( testObj , testRate );
        assert.ok( result );
        assert.equal( result, testRate );
        assert.equal( testObj.taxes, testRate );
        done();
    });

    it( 'test changeTaxes failure for too high tax rate' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].taxes );

        let testObj = mockDataList[ 0 ];
        let testRate = MAX_TAX_RATE + 0.1;
        let oldRate = mockDataList[ 0 ].taxes;

        let result = bo.changeTaxes( testObj , testRate );
        assert.equal( testObj.taxes, oldRate );
        if ( result )
        {
            assert.fail( "changeTaxes returned for too high tax rate: " + result );
        }

        done();
    });

    it( 'test changeTaxes failure for negative tax rate' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].taxes );

        let testObj = mockDataList[ 0 ];
        let testRate = -0.1;
        let oldRate = mockDataList[ 0 ].taxes;

        let result = bo.changeTaxes( testObj , testRate );
        assert.equal( testObj.taxes, oldRate );
        if ( result )
        {
            assert.fail( "changeTaxes returned for negative tax rate: " + result );
        }

        done();
    });

    it( 'test changeTaxes failure for undefined obj' , function( done )
    {
        let testObj = undefined
        let testRate = 0.1;
        assert.ok( testRate <= MAX_TAX_RATE );

        let result = bo.changeTaxes( testObj , testRate );
        if ( result )
        {
            assert.fail( "changeTaxes returned for undefined obj: " + result );
        }

        done();
    });

    it( 'test changeTaxes failure for undefined newRate' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );
        assert.ok( mockDataList[ 0 ].taxes );

        let testObj = mockDataList[ 0 ];
        let testRate = undefined;

        let result = bo.changeTaxes( testObj , testRate );
        if ( result )
        {
            assert.fail( "changeTaxes returned for undefined newRate: " + result );
        }

        done();
    });

    it( 'test changeTaxes failure for undefined old rate' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        let testRate = 0.1;
        assert.ok( testRate <= MAX_TAX_RATE );
        mockDataList[ 0 ].taxes = undefined;

        let result = bo.changeTaxes( testObj , testRate );
        if ( result )
        {
            assert.fail( "changeTaxes returned for undefined old rate: " + result );
        }

        done();
    });

    /*
    ===========
    changeName testing begins
    ===========
    */
    it( 'test changeName success' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        let testName = "Ork";

        let result = bo.changeName( testObj, testName );
        assert.ok( result );
        assert.equal( result, testName );
        assert.equal( testObj.name, testName );
        done();
    });

    it( 'test changeName failure obj undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = undefined;
        let testName = "Ork";

        let result = bo.changeName( testObj, testName );
        if ( result )
        {
            assert.fail( "changeName returned for undefined obj: " + result );
        }
        done();
    });

    it( 'test changeName failure newName undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        let testName = undefined;

        let result = bo.changeName( testObj, testName );
        if ( result )
        {
            assert.fail( "changeName returned for undefined newName: " + result );
        }
        done();
    });

    it( 'test changeName failure old name undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        testObj.name = undefined;
        let testName = "Ork";

        let result = bo.changeName( testObj, testName );
        if ( result )
        {
            assert.fail( "changeName returned for undefined old name: " + result );
        }
        done();
    });


    /*
    ===========
    addMoney testing begins
    ===========
    */
    it( 'test addMoney success for non-zero' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        let oldAmount = testObj.money;
        let testAmount = 500;

        let result = bo.addMoney( testObj, testAmount );
        assert.ok( result );
        assert.equal( result, oldAmount + testAmount );
        assert.equal( testObj.money, result );
        done();
    });

    it( 'test addMoney success for zero' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        testObj.money = 0;
        let oldAmount = testObj.money;
        let testAmount = 500;

        let result = bo.addMoney( testObj, testAmount );
        assert.ok( result );
        assert.equal( result, oldAmount + testAmount );
        assert.equal( testObj.money, result );
        done();
    });

    it( 'test addMoney failure obj undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = undefined;
        let testAmount = 500;

        let result = bo.addMoney( testObj, testAmount );
        if ( result )
        {
            assert.fail( "addMoney returned for undefined obj: " + result );
        }
        done();
    });

    it( 'test addMoney failure old money undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        testObj.money = undefined;
        let testAmount = 500;

        let result = bo.addMoney( testObj, testAmount );
        if ( result )
        {
            assert.fail( "addMoney returned for undefined old money: " + result );
        }
        done();
    });

    it( 'test addMoney failure old money non-integer' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        testObj.money = "badStr";
        let testAmount = 500;

        let result = bo.addMoney( testObj, testAmount );
        if ( result )
        {
            assert.fail( "addMoney returned for non-integer old money: " + result );
        }
        done();
    });

    it( 'test addMoney failure old money negative' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        testObj.money = -128;
        let testAmount = 500;

        let result = bo.addMoney( testObj, testAmount );
        if ( result )
        {
            assert.fail( "addMoney returned for negative old money: " + result );
        }
        done();
    });

    it( 'test addMoney failure addAmount undefined' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        let oldAmount = testObj.money;
        let testAmount = undefined;

        let result = bo.addMoney( testObj, testAmount );
        if ( result )
        {
            assert.fail( "addMoney returned for undefined addAmount: " + result );
        }

        assert.equal( testObj.money, oldAmount );
        done();
    });

    it( 'test addMoney failure addAmount non-integer' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        let oldAmount = testObj.money;
        let testAmount = "badStr";

        let result = bo.addMoney( testObj, testAmount );
        if ( result )
        {
            assert.fail( "addMoney returned for non-integer addAmount: " + result );
        }

        assert.equal( testObj.money, oldAmount );
        done();
    });

    it( 'test addMoney failure addAmount negative' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        let oldAmount = testObj.money;
        let testAmount = -125;

        let result = bo.addMoney( testObj, testAmount );
        if ( result )
        {
            assert.fail( "addMoney returned for negative addAmount: " + result );
        }

        assert.equal( testObj.money, oldAmount );
        done();
    });

    it( 'test addMoney failure addAmount zero' , function( done )
    {
        let mockDataList = JSON.parse(JSON.stringify( require( "../sampleData/testData/planetsDifferentSystems.json" ) ) );
        assert.ok( mockDataList );
        assert.ok( mockDataList.length );
        assert.ok( mockDataList[ 0 ] );

        let testObj = mockDataList[ 0 ];
        let oldAmount = testObj.money;
        let testAmount = 0;

        let result = bo.addMoney( testObj, testAmount );
        if ( result )
        {
            assert.fail( "addMoney returned for zero addAmount: " + result );
        }

        assert.equal( testObj.money, oldAmount );
        done();
    });

    /*
    ===========
    _____ testing begins
    ===========
    */

    //after() is run after all tests have completed.
    after( function( done )
    {
        done();
    });
});
