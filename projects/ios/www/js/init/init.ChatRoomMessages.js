
chatmate.init.ChatRoomMessages = (function () {
    "use strict";
    return function (params) {
        var page = chatmate.models.PageModel("Chat Room Messages");
        var chatRoomModel = chatmate.models.ChatRoomModelFactory.getChatRoomModel(params.title);
        var chatRoomController = chatmate.controllers.ChatRoomController(chatRoomModel);
        page.setTopButton("Chat Rooms", chatmate.controllers.PageController.openChatRoomsView);
        page.setPageContent(chatRoomController.renderChatRoomMessages());
        chatmate.controllers.PageController.render(page);
    };
}());