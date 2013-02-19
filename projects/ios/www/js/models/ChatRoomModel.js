chatmate.models.ChatRoomModel = (function () {
    "use strict";

    return function (title) {

        var that = {};

        var messages = [];

        var deleted = false;

        that.getTitle = function () {
            return title;
        };

        that.setTitle = function (newTitle) {
            title = newTitle;
        };

        that.addMessage = function (message) {
            messages.push(message);
        };

        that.getMessages = function () {
            return messages;
        };

        that.isDeleted = function () {
            return deleted;
        };

        that.deleteRoom = function () {
            deleted = true;
        };

        return that;
    };

}());