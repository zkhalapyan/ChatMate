
$( document ).ready( function() {

    // Page initializer for the home icon.
    chatmate.controllers.PageController.register( "HomePage",  chatmate.init.ChatRooms );
    
    chatmate.controllers.PageController.register( "NewChatRoomPage",  chatmate.init.NewChatRoom );
    chatmate.controllers.PageController.register( "ChatRoomsView",    chatmate.init.ChatRooms );
    chatmate.controllers.PageController.register( "ChatRoomPage",     chatmate.init.ChatRoomMessages );
    chatmate.controllers.PageController.register( "NewChatRoomPage",  chatmate.init.NewChatRoom );

    chatmate.models.ChatRoomModelFactory.getChatRoomModel("OPT Tech Talk");
    chatmate.models.ChatRoomModelFactory.getChatRoomModel("MWF Friends");
    
    chatmate.controllers.PageController.openChatRoomsView();
    
    // Init chat service.
    chatmate.services.ChatService.run();


});
