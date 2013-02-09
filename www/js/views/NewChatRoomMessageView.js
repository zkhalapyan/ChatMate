
chatmate.views.NewChatRoomMessageView = (function() {
    
    return function( chatRoomController ) {
        
        var that = {};
        
        var user = LocalMap("user");
        
        var hideKeyboard = function() {
            document.activeElement.blur();
            $("input").blur();
        };

        var sendMessage = function() {
            var username = document.getElementById( "username" ).value;
            var message = document.getElementById( "new-message" ).value;
            if( username.length === 0 ) {
                alert( "Please enter your username." );
            } else if( message.length === 0 ) {
                alert( "Sorry, no empty messages can be sent." );
            } else {
                chatRoomController.sendMessage({
                    text     : message, 
                    username :username
                });
                user.set("username", username);
                document.getElementById("new-message").value = "";
                hideKeyboard();
            }
        };
        
        
        that.render = function() {
           
            var form = mwf.decorator.Form( "New Message" );
            form.addLabel( "Username", "username" );
            form.addTextBox( "username", "username", user.get("username"));
            form.addLabel( "Your Message" );
            form.addTextBox( "New Message", "new-message" );
            form.addSubmitButton( "Send Away");
            
            
            $(form).submit(function(e){
               e.preventDefault();
               sendMessage();
            });
            
            return form;
        };
        
        return that;
       
    };
    
}());