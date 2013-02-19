
chatmate.utils.Logger = (function () {
    "use strict";

    var formatOutput = function (namespace, message) {
        return namespace + ": " + message;
    };

    var log = function (namespace, message) {
        console.log(formatOutput(namespace, message));
    };

    var debug = function (namespace, message) {
        console.debug(formatOutput(namespace, message));
    };

    var warn = function (namespace, message) {
        console.warn(formatOutput(namespace, message));
    };

    var error = function (namespace, message) {
        console.error(formatOutput(namespace, message));
    };

    var info = function (namespace, message) {
        console.info(formatOutput(namespace, message));
    };

    return function (namespace) {
        var that = {};

        that.log = function (message) {
            log(namespace, message);
        };

        that.debug = function (message) {
            debug(namespace, message);
        };

        that.warn = function (message) {
            warn(namespace, message);
        };

        that.error = function (message) {
            error(namespace, message);
        };

        that.info = function (message) {
            info(namespace, message);
        };

        return that;
    };
}());