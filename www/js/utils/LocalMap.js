/**
 * The class is designed to facilitate flexible permanent storage of key value 
 * pairs utilizing HTML5 localStorage.
 *  
 * @class LocalMap
 * @author Zorayr Khalapyan
 * @version 7/30/2012
 */
var LocalMap = function (name) {
    "use strict";

    var that = {};

    //Prevent compatibility issues in different execution environments.
    if (localStorage === undefined) {
        var localStorage = {};
    }

    if (localStorage[name] === undefined) {
        localStorage[name] = JSON.stringify({});
    }

    var setMap = function (map) {
        localStorage[name] = JSON.stringify(map);
    };

    that.getMap = function () {
        return JSON.parse(localStorage[name]);
    };

    that.set = function (name, object) {
        var map = that.getMap();
        map[name] = object;
        setMap(map);
    };

    that.importMap = function (object) {
        var map = that.getMap(),
            key;
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                map[key] = object[key];
            }
        }
        setMap(map);
    };

    that.get = function (name) {
        var map = that.getMap();
        return map[name] !== undefined ? map[name] : null;
    };

    that.length = function () {
        var map = that.getMap(),
            size = 0,
            key;
        for (key in map) {
            if (map.hasOwnProperty(key)) {
                size += 1;
            }
        }
        return size;
    };

    that.erase = function () {
        localStorage[name] = JSON.stringify({});
    };

    that.isSet = function (name) {
        return that.get(name) !== null;
    };

    that.release = function (name) {
        var map = that.getMap();
        if (map[name]) {
            delete map[name];
        }
        setMap(map);
    };

    return that;

};

LocalMap.destroy = function () {
    "use strict";
    var item;
    for (item in localStorage) {
        if (localStorage.hasOwnProperty(item)) {
            delete localStorage[item];
        }
    }
};

LocalMap.exists = function (name) {
    "use strict";
    return (localStorage[name]) ? true : false;
};
