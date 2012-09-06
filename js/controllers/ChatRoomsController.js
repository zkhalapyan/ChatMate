
chatmate.controllers.ChatRoomsController = (function() {
    return function() {
        
        var that = {};
        
        that.renderChatRoomList = function() {
            var chatRooms = chatmate.models.ChatRoomModel().getAllChatRooms();
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
            
            var chatRoomsMenuView = chatmate.views.ListView( "Chat Rooms Menu", chatRoomList, "No Chat Rooms Available").render();
            var container = document.createElement( 'div' );
            container.appendChild( chatRoomsMenuView );
            container.appendChild( mwf.decorator.SingleClickButton( "Create Room", chatmate.controllers.PageController.openNewChatRoomPage ));
            return container;
        };
        
        return that;
        
    };
}());