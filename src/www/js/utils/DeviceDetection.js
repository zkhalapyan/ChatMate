/**
 * The class encapsulates and facilitates device detection based on the current
 * devices user agent string.
 * 
 * @class DeviceDetection 
 * @author Zorayr Khalapyan
 * @version 8/8/2012
 */
var DeviceDetection = (function(){
    
    var that = {};
    
    var userAgent = navigator.userAgent;
    
    var matchUserAgent = function (agentRegexp) {
        return userAgent.match(agentRegexp);
    };
    
    that.isOnDevice = function () {
        return matchUserAgent( /(iPhone|iPod|iPad|Android|BlackBerry)/ );
    };

    that.isDeviceiOS = function () {
        return matchUserAgent( /(iPhone|iPod|iPad)/ );
    };

    that.isDeviceAndroid = function() {
        return matchUserAgent( /(Android)/ );
    };
    
    /**
     * @visibleForTesting
     */
    that.setUserAgent = function( newUserAgent ) {
        userAgent = newUserAgent;
    };

    return that;
    
}());