/**
 * The class encapsulates and facilitates device detection based on the current
 * device's user agent string.
 *
 * @class DeviceDetection
 * @author Zorayr Khalapyan
 * @version 02/08/2013
 */
var DeviceDetection = (function () {
    "use strict";
    var that = {};

    var userAgent = navigator.userAgent;

    var documentURL = document.URL;

    var matchUserAgent = function (agentRegexp) {
        return userAgent.match(agentRegexp);
    };

    /**
     * Returns true if the user is on a mobile device.
     */
    that.isOnDevice = function () {
        return matchUserAgent(/(iPhone|iPod|iPad|Android|BlackBerry)/);
    };

    /**
     * Returns true if the user is currently on an iPhone, iPod, or an iPad.
     */
    that.isDeviceiOS = function () {
        return matchUserAgent(/(iPhone|iPod|iPad)/);
    };

    /**
     * Returns true if the user is currently on an Android device.
     */
    that.isDeviceAndroid = function () {
        return matchUserAgent(/(Android)/);
    };

    /**
     * Returns true if the current application is running on a Cordova build.
     */
    that.isNativeApplication = function () {
        return documentURL.indexOf('http://') === -1 &&
            documentURL.indexOf('https://') === -1;
    };

    /**
     * The method sets the current user agent string and can be used for agent
     * spoofing or for testing.
     */
    that.setUserAgent = function (newUserAgent) {
        userAgent = newUserAgent;
    };

    /**
     * The method sets the current document URL string and can be used for
     * testing native application detection.
     */
    that.setDocumentURL = function (newDocumentURL) {
        documentURL = newDocumentURL;
    };

    return that;

}());