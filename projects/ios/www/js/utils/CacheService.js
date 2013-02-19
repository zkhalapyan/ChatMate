/**
 * Memoization construct for caching namespace:key->value objects.
 *
 * @constructor CacheService
 * @author Zorayr Khalapyan
 */
chatmate.utils.CacheService = (function () {
    "use strict";

    var DEFAULT_NAMESPACE = 'global';

    var cache = {};

    return function (namespace) {

        var that = {};

        that.isSet = function (key) {
            return cache[namespace][key] !== undefined;
        };

        that.set = function (key, value) {
            cache[namespace][key] = value;
        };

        that.remove = function (key) {
            if (that.isSet(key)) {
                delete cache[namespace][key];
            }
        };

        that.removeAll = function () {
            cache[namespace] = {};
        };

        //Initialize cache.
        (function () {
            if (namespace === undefined) {
                namespace = DEFAULT_NAMESPACE;
            }

            if (cache[namespace] === undefined) {
                cache[namespace] = {};
            }

        }());

        return that;
    };
}());