
chatmate.controllers.ChatRoomController = (function () {
    "use strict";

    return function (chatRoomModel) {

        var that = {};

        var chatRoomMessagesView = null;

        that.renderChatRoom = function () {
            var chatRoomView = chatmate.views.ChatRoomView(that);
            return chatRoomView.render();
        };

        that.renderChatRoomMessages = function () {
            chatRoomMessagesView = chatmate.views.ChatRoomMessagesView(that);
            return chatRoomMessagesView.render();
        };

        that.deleteChatRoomCallback = function () {
            chatRoomModel.deleteRoom();
            chatmate.controllers.PageController.openChatRoomsView();
        };

        that.saveChatRoomCallback = function () {
            chatmate.models.ChatRoomModelFactory.addChatRoomModel(chatRoomModel);
            chatmate.controllers.PageController.openChatRoomsView();
        };

        that.sendMessage = function (message) {
            chatmate.services.ChatService.sendMessage(chatRoomModel, message);
            that.addMessage(message);
        };

        that.addMessage = function (message) {
            if (chatRoomMessagesView !== null) {
                chatRoomMessagesView.addMessage(message);
            }
        };

        that.getChatRoomModel = function () {
            return chatRoomModel;
        };

        chatmate.services.ChatService.setOnMessageCallback(function (packet) {
            if (packet.room === chatRoomModel.getTitle()) {
                that.addMessage(packet.message);
            }
        });

        return that;

    };
}());