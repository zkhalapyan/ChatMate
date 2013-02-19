
chatmate.utils.Logger = (function () {
    "use strict";

    var formatOutput = function (namespace) {
        return namespace + ": ";
    };

    var log = function (namespace) {
        console.log(formatOutput(namespace));
    };

    var debug = function (namespace) {
        console.debug(formatOutput(namespace));
    };

    var warn = function (namespace) {
        console.warn(formatOutput(namespace), arguments);
    };

    var error = function (namespace) {
        console.error(formatOutput(namespace), arguments);
    };

    var info = function (namespace) {
        console.log(typeof arguments);
        console.log(arguments);
        console.log.apply(console, arguments);
        console.info(formatOutput(namespace), arguments);
    };

    return function (namespace) {
        var that = {};

        that.log = function () {
            log(namespace);
        };

        that.debug = function () {
            debug(namespace);
        };

        that.warn = function () {
            warn(namespace, arguments);
        };

        that.error = function () {
            error(namespace, arguments);
        };

        that.info = function () {
            info(arguments);
        };

        return that;
    };
}());