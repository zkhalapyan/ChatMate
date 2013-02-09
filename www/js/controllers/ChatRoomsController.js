
chatmate.controllers.ChatRoomsController = (function () {
    "use strict";

    return function () {

        var that = {};

        var chatRoomsMenuView = null;

        var openChatRoomCallback = function (title) {
            return function () {
                chatmate.controllers.PageController.openChatRoomPage({
                    title : title
                });
            };
        };

        that.addChatRoom = function (chatRoomTitle) {
            console.log(chatRoomsMenuView);
            if (chatRoomsMenuView !== null) {
                chatRoomsMenuView.addItem(chatRoomTitle,  openChatRoomCallback(chatRoomTitle));
            }
        };

        that.renderChatRoomList = function () {
            var chatRooms = chatmate.models.ChatRoomModelFactory.getAllActiveChatRooms(),
                chatRoomList = [],
                title;

            for (title in chatRooms) {
                if (chatRooms.hasOwnProperty(title)) {
                    chatRoomList.push({
                        label    : title,
                        callback : openChatRoomCallback(title)
                    });
                }
            }

            chatRoomsMenuView = chatmate.views.ListView("Chat Rooms Menu", chatRoomList, "No Chat Rooms Available");
            var container = document.createElement('div');
            container.appendChild(chatRoomsMenuView.render());
            container.appendChild(mwf.decorator.SingleClickButton("Create Room", chatmate.controllers.PageController.openNewChatRoomPage));
            return container;
        };

        chatmate.services.ChatService.setOnMessageCallback(function (packet) {
            if (!chatmate.models.ChatRoomModelFactory.chatRoomExists(packet.room)) {
                that.addChatRoom(packet.room);
            }
        });

        return that;
    };
}());