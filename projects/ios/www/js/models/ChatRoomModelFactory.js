
chatmate.models.ChatRoomModelFactory = (function () {
    "use strict";
    var that = {};

    var chatRoomModels = {};

    that.addChatRoomModel = function (chatRoomModel) {
        chatRoomModels[chatRoomModel.getTitle()] = chatRoomModel;
    };

    that.chatRoomExists = function (title) {
        return chatRoomModels[title] !== undefined;
    };

    that.getChatRoomModel = function (title) {
        if (!that.chatRoomExists(title)) {
            that.addChatRoomModel(chatmate.models.ChatRoomModel(title));
        }
        return chatRoomModels[title];
    };

    that.getAllActiveChatRooms = function () {
        var activeChatRooms = {},
            title;
        for (title in chatRoomModels) {
            if (chatRoomModels.hasOwnProperty(title)) {
                if (!chatRoomModels[title].isDeleted()) {
                    activeChatRooms[title] = chatRoomModels[title];
                }
            }
        }
        return activeChatRooms;
    };

    return that;

}());