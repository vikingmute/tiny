/*
 * @file a simple event emitter like nodejs using in brwoser env
 * @author vikingmute
 * 
 */

if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {
    function Emitter() {
        this._events = {};
    }

    function toArray(obj) {
        if (typeof obj === 'object') {
            return Array.prototype.slice.call(obj);
        } else {
            return [];
        }
    }
    
    function alias(name) {
        return function () {
            this[name].apply(this, arguments);
        }
    }

    function indexOfListeners(haystack, needle) {
        for (var i = 0, len = haystack.length; i < len; i++) {
            if (haystack[i] == needle) {
                return i;
            }
        }
        return -1;
    }
    var fn = Emitter.prototype;
    
    fn._getEvents = function () {
        return this._events;
    }
    fn.getListeners = function (event) {
        var events = this._getEvents();
        var response;
        response = events[event] || [];
        return response;
    }
    fn.addListener = function (event, listener) {
        var events = this._getEvents();
        var eventsArray = this.getListeners(event);
        if (eventsArray.length == 0) {
            //create a new event
            events[event] = [listener];
        } else {
            events[event].push(listener);
        }
    }
    
    fn.on = alias('addListener');
    
    fn.removeListener = function (event, listener) {
        var eventsArray = this.getListeners(event);
        var index = indexOfListeners(eventsArray, listener);
        if (index != -1) {
            eventsArray.splice(index, 1);
        }
    };

    fn.off = alias('removeListener');
    fn.emit = function () {
        var args = toArray(arguments);
        var event = args.splice(0, 1);
        var cargs = args.slice();
        var eventsArray = this.getListeners(event);
        for (var i =0, len = eventsArray.length; i < len; i++) {
            var callback = eventsArray[i];
            if (cargs.length === 0) {
                callback.apply(this);
            } else {
                callback.apply(this, cargs);
            }
        }
    }
    return Emitter;        
});
