
chatmate.views.ChatRoomView = (function() {
    return function( chatRoomController ) {
        
        var that = {};
        
        var chatRoomModel = chatRoomController.getChatRoomModel();
        
        var saveChatRoomCallback = function() {
            
            var newTitle = document.getElementById("chat-room-title-input").value;
            if( newTitle.length === 0 ) {
                alert( "Sorry, no invalid titles. ")
            } else {
                chatRoomModel.setTitle( newTitle );
                chatRoomController.saveChatRoomCallback();
            }
        };
   
        
        that.render = function() {
            
            var chatRoomFormView = mwf.decorator.Form("Chat Room Information");
            chatRoomFormView.addLabel("Title", "chat-room-title-input");
            var inputBox = chatRoomFormView.addTextBox("chat-room-title-input", "chat-room-title-input");
            inputBox.value = chatRoomModel.getTitle();
            
            var container = document.createElement('div');
            container.appendChild(chatRoomFormView);
            container.appendChild(mwf.decorator.DoubleClickButton("Cancel", chatmate.controllers.PageController.openChatRoomsView, "Save", saveChatRoomCallback));
            return container;
        };
        
        return that;
       
    };
    
}());