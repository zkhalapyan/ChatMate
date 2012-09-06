chatmate.models.ChatRoomModel = (function() {
    
    var chatRooms = {};
    
    return function( title ) {
        
        var that = {};
        
        var messages = [];
        
        that.getTitle = function(){
            return title;
        };
        
        that.setTitle = function( newTitle ) {
            that.deleteRoom();
            title = newTitle;
            that.save();
        };
        
        that.getAllChatRooms = function() {
            return chatRooms;
        };
        
        that.addMessage = function ( message ) {
            messages.push( message );
        };
        
        that.getMessages = function() {
            return messages;
        };
        
        that.save = function() {
            chatRooms[ title ] = that;
        };
        
        that.deleteRoom = function() {
            if( typeof( chatRooms[ title ] ) !== "undefined" ) {
                delete chatRooms[title];
            }
            
        };
        
        return that;
    };
    
}());