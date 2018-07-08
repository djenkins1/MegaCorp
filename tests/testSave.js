const assert = require('assert');
const ID_KEY = require('config').get('ID_KEY');

function testValueUpdates( useFuncs, obj, updateCommands, onFinish )
{
    useFuncs.create( obj , function( err , insertedObj )
    {
        if ( err )
        {
            console.log( err );
            assert.fail( "Error occured from shipDAO.createShip" );
            onFinish();
            return;
        }

        assert.ok( insertedObj._id );
        assert.deepEqual( insertedObj, obj );
        for ( var i = 0; i < updateCommands.length; i++ )
        {
            let updateFunc = updateCommands[ i ].updateFunc;
            let updateKey = updateCommands[ i ].updateKey;
            let updateValue = updateCommands[ i ].updateValue;
            var resultValue = updateFunc( insertedObj , updateValue );
            assert.ok( resultValue );
            //check against the updateValue parameter if isOverwrite is true
            if ( updateCommands[ i ].isOverwrite )
            {
                assert.deepEqual( insertedObj[ updateKey ] , updateValue );
            }
            else
            {
                //otherwise check against the return value
                assert.deepEqual( insertedObj[ updateKey ] , resultValue );
            }

        }

        useFuncs.save( insertedObj, function( err2, updatedObj )
        {
            if ( err2 )
            {
                console.log( err2 );
                assert.fail( "Error occured from shipBO.saveShip" );
                onFinish();
                return;
            }

            assert.ok( updatedObj );
            assert.deepEqual( updatedObj, insertedObj );
            useFuncs.searchDB( updatedObj[ ID_KEY ] , function( err3, foundResult )
            {
                if ( err3 )
                {
                    console.log( err3 );
                    assert.fail( "Error occured from shipDAO.getShip" );
                    onFinish();
                    return;
                }

                assert.deepEqual( foundResult, insertedObj );
                onFinish();
            });
        });
    });
}

function testValueUpdate( useFuncs, obj, updateKey, updateValue, updateFunc, onFinish )
{
    let updateCommands = [];
    updateCommands[ 0 ] = { "updateKey" : updateKey, "updateValue" : updateValue, "updateFunc" : updateFunc };
    updateCommands[ 0 ].isOverwrite = true;
    testValueUpdates( useFuncs, obj, updateCommands, onFinish );
}

function testValueIncrement( useFuncs, obj, updateKey, updateValue, updateFunc, onFinish )
{
    let updateCommands = [];
    updateCommands[ 0 ] = { "updateKey" : updateKey, "updateValue" : updateValue, "updateFunc" : updateFunc };
    updateCommands[ 0 ].isOverwrite = false;
    testValueUpdates( useFuncs, obj, updateCommands, onFinish );
}

exports.testValueUpdate = testValueUpdate;
exports.testValueUpdates = testValueUpdates;
exports.testValueIncrement = testValueIncrement;
