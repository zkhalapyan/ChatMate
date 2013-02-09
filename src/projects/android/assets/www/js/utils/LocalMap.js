/**
 * The class is designed to facilitate flexible permanent storage of key value 
 * pairs utilzing HTML5 localStorage.
 *  
 * @class LocalMap
 * @author Zorayr Khalapyan
 * @version 7/30/2012
 */
var LocalMap = function (name) {
    var that = {};

    //Prevent compatability issues in different execution environments.
    if (typeof (localStorage) === "undefined") {
        localStorage = {};
    }

    if (typeof (localStorage[name]) === "undefined") {
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
        var map = that.getMap();
        var key;
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                map[key] = object[key];
            }
        }
        setMap(map);
    };

    that.get = function (name) {
        var map = that.getMap();
        return typeof(map[name]) !== "undefined" ? map[name] : null;
    };
    
    that.length = function () {
        var map = that.getMap();
        var size = 0, key;
        for (key in map) {
            if (map.hasOwnProperty(key)) size++;
        }
        return size;
    };

    that.erase = function () {
        localStorage[name] = JSON.stringify({});
    };

    that.isSet = function (name) {
        return that.get(name) != null;
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
    for (var item in localStorage) {
        if (localStorage.hasOwnProperty(item)) {
            delete localStorage[item];    
        }
    }    
};

LocalMap.exists = function (name) {
    return (localStorage[name]) ? true : false;
};
