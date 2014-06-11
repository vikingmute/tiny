/*
 * @file 简单的klass实现
 * @author vikingmute
 */ 

define( function (require) {
    function klass(Parent, props) {
        var Child, Pimp;
        Child = function () {
            if (Child.uper && Child.uper.hasOwnProperty('_init')) {
                Child.uper._init.apply(this, arguments);
            }
            if (props.hasOwnProperty('_init')) {
                props._init.apply(this, arguments);
            }
        }
        //inherit 
        Parent = Parent || Object;
        Pimp = function () {
        
        }
        Pimp.prototype = Parent.prototype;
        Child.uper = Parent.prototype;
        Child.prototype = new Pimp();
        Child.prototype.constructor = Child;
        //loop the prototype
        for (var i in props) {
            if (props.hasOwnProperty(i)) {
                Child.prototype[i] = props[]
            }
        }

        return Child;
    }
    return klass;
});