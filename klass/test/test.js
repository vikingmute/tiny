// the test cases are powered by mocha

var assert = require('assert');
var requirejs = require('requirejs');
var klass = requirejs('../src/klass.js');
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
        var kitty = new Cat('niuniu');
        result.push(kitty.speak());
        assert.deepEqual(result, ['niuniu']);    
    });
    it('should instanceof the right constructor', function (){
        var result = [];
        var Animal = klass(Object);
        var Cat = klass(Animal);
        var shark = new Animal();
        var kitty = new Cat();
        var check = (shark instanceof Animal);
        var check2 = (kitty instanceof Cat);
        var check3 = (kitty instanceof Animal);
        var check4 = (shark instanceof Cat);
        result = [check, check2, check3, check4];
        assert.deepEqual(result, [true, true, true, false]);
    });    
})
