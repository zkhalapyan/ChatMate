
chatmate.views.ChatRoomMessagesView = (function() {
    
    return function( chatRoomController ) {
        var that = {};
        
        var chatRoomModel = chatRoomController.getChatRoomModel();
        
        var messagesMenu;
        
        var noMessagesAvailable = false;
        
        var addMessage = function( message ) {
            messagesMenu.addMenuLinkItem ( message.username, null, message.text );
        };
        
        that.render = function() {
            messagesMenu = mwf.decorator.Menu( chatRoomModel.getTitle() );
            var messages = chatRoomModel.getMessages();
            if( messages.length === 0 ) {
                messagesMenu.addMenuLinkItem( "No Messages Available" );   
                noMessagesAvailable = true;
            } else {
                for(var i = 0; i < messages.length; i++ ) { 
                    addMessage( messages[ i ] );
                }
            }
            var container = document.createElement('div');
            container.appendChild( messagesMenu );
            container.appendChild( chatmate.views.NewChatRoomMessageView( chatRoomController ).render() );
            container.appendChild( mwf.decorator.SingleClickButton( "Delete Room", chatRoomController.deleteChatRoomCallback ));
            return container;
        };
        
        that.addMessage = function( message ) {
            if( noMessagesAvailable ) {
                messagesMenu.removeMenuItemAt( 0 );
                noMessagesAvailable = false;
            }
            addMessage( message );
        };
        
        return that;
    };
    
}());