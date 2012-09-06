
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
    
    
    if( DeviceDetection.isDeviceAndroid() ) {
        
        var androidBackButtonCallback = function() {
            if( chatmate.controllers.PageController.canGoBack() ) {
                console.log("Go back!");
                chatmate.controllers.PageController.goBack();
            } else {
                navigator.app.exitApp();
            }
        };
        
        var setBackButtonHandling = function() {
            document.addEventListener("backbutton", androidBackButtonCallback, true);
        };
        
        document.addEventListener("deviceready", setBackButtonHandling, false);
    } else {
        // Init chat service.
        chatmate.services.ChatService.run();
    
    }


});
