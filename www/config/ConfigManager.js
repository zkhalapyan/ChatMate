
chatmate.config.ConfigManager = (function () {
    "use strict";
    var that = {};

    var configMap = LocalMap("config");

    /**
     * If set to true, will use test server for deployment.
     */
    var TEST_MODE = true;

    /**
     * List of available servers.
     */
    var WS_SERVERS = [

        //Test server.
        "localhost",

        //Prod server.
        "rocking-apps.com"
    ];

    /**
     * Configuration blueprint. To add new configuration value, add a new
     * property to this object and an accessor function will be generated. The
     * actual working values will be saved in a localStorage object.
     */
    var config = {

        /**
         * Server URL for communication.
         */
        WS_SERVER_ENDPOINT : WS_SERVERS[(TEST_MODE) ? 0 : 1],

        /**
         * URL for reading campaigns.
         */
        WS_PORT : 3000


    };

    that.reset = function () {
        configMap.importMap(config);
    };

    /**
     * Generic method for accessing any available property.
     */
    that.getProperty = function (propertyName) {
        return configMap.get(propertyName);
    };

    /**
     * Returns a list of available servers.
     */
    that.getServers = function () {
        return WS_SERVERS;
    };

    var camelCaseGetterName, camelCaseSetterName;

    var toCamelCase = function (g) {
        return g[1].toUpperCase();
    };

    /**
     * Creates a closure function to return the specified value. This is used
     * to iterate through all the config properties and create accessor
     * functions to return the configuration's value.
     */
    var addPropertyGetter = function (propertyName) {
        return function () {
            return that.getProperty(propertyName);
        };
    };

    var addPropertySetter = function (propertyName) {
        return function (newConfigValue) {
            configMap.set(propertyName, newConfigValue);
        };
    };

    //Initialize configuration manager.
    (function () {
        var property,
            key;
        for (property in config) {
            if (config.hasOwnProperty(property)) {

                //Convert CONSTANT_CASE to camelCase.
                camelCaseGetterName = ("get_" + property.toLowerCase()).replace(/_([a-z])/g, toCamelCase);
                camelCaseSetterName = ("set_" + property.toLowerCase()).replace(/_([a-z])/g, toCamelCase);

                //Create accessor functions to allow users to get and set config values.
                that[camelCaseGetterName] = addPropertyGetter(property);
                that[camelCaseSetterName] = addPropertySetter(property);
            }
        }

        //Transfer any values in config that have not been saved in localStorage.
        for (key in config) {
            if (config.hasOwnProperty(key)) {
                if (!configMap.isSet(key)) {
                    configMap.set(key, config[key]);
                }
            }
        }
    }());

    return that;
}());
