//this test case is powered by mocha
var assert = require('assert');
var requirejs = require('requirejs');
var Emitter = requirejs('../src/emitter.js');
describe('Emitter', function () {
    describe('test addListener aka on', function () {
        it('should equal emit results', function () {
            var result = [];
            var emitter = new Emitter();
            emitter.on('one', function (value) {
                result.push(value);
            });
            emitter.on('one', function (value) {
                result.push(value);
            });
            emitter.emit('one', 'viking');
            var arr = ['viking', 'viking'];
            assert.deepEqual(result, arr);    
        });
    });
    describe('test removeListener aka off', function () {
        it('should remove listener on the emit', function () {
            var result = [];
            var emitter = new Emitter();
            var test = function (value) {
                result.push(value);
            }
            emitter.on('one', test);
            emitter.off('one', test);
            emitter.on('one', function (value) {
                result.push(value);
            });
            emitter.emit('one', 'viking');
            var arr = ['viking'];
            assert.deepEqual(result, arr);    
        });
    });
    describe('test getListener', function () {
        it('should return the functions bind on the event', function () {
            var result = [];
            var emitter = new Emitter();
            var test = function (value) {
                result.push(value);
            }
            var test2 = function () {
                console.log(2);
            }
            result.push(test);
            result.push(test2);
            emitter.on('one', test);
            emitter.on('one', test2);
            
            var result2 = emitter.getListeners('one');
            assert.deepEqual(result, result2);
             
        });
    });
})
