// the test cases are powered by mocha

var assert = require('assert');
var klass = require('../src/klass');
describe('Klass', function () {
    it('should create a new object and invoke its method', function () {
        var result = [];
        var Person = klass(Object, {
            _init: function(name) {
                this.name = name;
            },
            speak: function() {
                return this.name;
            }    
        });
        var viking = new Person('viking');
        result.push(viking.speak());
        assert.deepEqual(result, ['viking']);    
    });
    it('should inherit parent method', function () {
        var result = [];
        var Animal = klass(Object, {
            _init: function(name) {
                this.name = name;
            },
            speak: function() {
                return this.name;
            }    
        });
        var Cat = klass(Animal);
        var kitty = new Cat('niuniu', {});
        result.push(kitty.speak());
        assert.deepEqual(result, ['niuniu']);    
    });    
})
