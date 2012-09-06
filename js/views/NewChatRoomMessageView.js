
chatmate.views.NewChatRoomMessageView = (function() {
    
    return function( chatRoomController ) {
        
        var that = {};
        
        var sendMessage = function() {
            
            var message = document.getElementById( "new-message" ).value;
            if( message.length === 0 ) {
                alert( "Sorry, no empty messages can be sent." );
            } else {
                chatRoomController.sendMessage( message );
                document.getElementById("new-message").value = "";
            }
        };
        
        
        that.render = function() {
            
            var form = mwf.decorator.Form( "New Message" );
            form.addLabel( "Your Message" );
            form.addTextBox( "New Message", "new-message" );
            form.addInputButton( "Send Away", sendMessage);
            
            $(form).submit(function(e){
               e.preventDefault();
               sendMessage();
            });
            
            return form;
        };
        
        return that;
       
    };
    
}());