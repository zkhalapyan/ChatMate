
chatmate.init.NewChatRoom = (function() {

    return function() {
        var newChatRoomModel = chatmate.models.ChatRoomModel("");
        var chatRoomController = chatmate.controllers.ChatRoomController(newChatRoomModel);
        var page = chatmate.models.PageModel("Create New Chat Room");
        page.setTopButton("Chat Rooms", chatmate.controllers.PageController.openChatRoomsView);
        page.setPageContent( chatRoomController.renderChatRoom() );
        chatmate.controllers.PageController.render(page);
    };

}());