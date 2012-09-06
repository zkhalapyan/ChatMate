
chatmate.controllers.ChatRoomsController = (function() {
    return function() {
        
        var that = {};
        
        var chatRoomsMenuView = null;
        
        that.addChatRoom = function( chatRoomTitle ) {
            console.log(chatRoomsMenuView);
            if ( chatRoomsMenuView !== null ) {
                chatRoomsMenuView.addItem( chatRoomTitle );
            }
        };
        
        that.renderChatRoomList = function() {
            var chatRooms = chatmate.models.ChatRoomModelFactory.getAllActiveChatRooms();
            var chatRoomList = [];
            var openChatRoomCallback = function( title ) {
                return function() {
                    chatmate.controllers.PageController.openChatRoomPage( {
                        title : title
                    });
                };
            };
            for( var title in chatRooms) {
                chatRoomList.push ( {
                    label    : title,
                    callback : openChatRoomCallback( title )
                });
            } 
            
            chatRoomsMenuView = chatmate.views.ListView( "Chat Rooms Menu", chatRoomList, "No Chat Rooms Available");
            var container = document.createElement( 'div' );
            container.appendChild( chatRoomsMenuView.render() );
            container.appendChild( mwf.decorator.SingleClickButton( "Create Room", chatmate.controllers.PageController.openNewChatRoomPage ));
            return container;
        };
        
        chatmate.services.ChatService.setOnMessageCallback(function( packet ){
           that.addChatRoom(packet.room);
        });
        
        
        return that;
        
    };
}());