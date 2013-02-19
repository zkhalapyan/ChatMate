
chatmate.init.ChatRooms = (function () {
    "use strict";
    return function () {
        var chatRoomsController = chatmate.controllers.ChatRoomsController();
        var page = chatmate.models.PageModel("Chat Rooms");
        page.setTopButton("Refresh", chatmate.controllers.PageController.openChatRoomsView);
        page.setPageContent(chatRoomsController.renderChatRoomList());
        chatmate.controllers.PageController.render(page);
    };
}());