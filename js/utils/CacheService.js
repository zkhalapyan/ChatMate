/**
 * @class CacheService
 * @author Zorayr Khalapyan
 */
var CacheService = (function(){
    
    var DEFAULT_NAMESPACE = 'global';
    
    var cache = {};
    
    return function( namespace ) {
        
        var that = {};
        
        that.isSet = function( key ) {
            return typeof( cache[namespace][key] ) !== "undefined";
        };
        
        that.set = function( key, value ) {
            cache[namespace][key] = value;
        };
        
        that.remove = function ( key ) {
            if( that.isSet( key )) {
                delete cache[namespace][key];
            }
        };
        
        that.removeAll = function () {
            cache[namespace] = {};
        };
        
        //Initialize cache.
        (function(){
            if( typeof( namespace ) === "undefined" ) {
                namespace = DEFAULT_NAMESPACE;
            }

            if( typeof( cache[namespace] ) === "undefined" ) {
                cache[namespace] = {};
            }    
        }());
        
        return that;
    };
}());