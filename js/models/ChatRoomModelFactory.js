chatmate.models.ChatRoomModelFactory = (function() {
    
    var that = {};
    
    var chatRoomModels = {};
    
    that.addChatRoomModel = function( chatRoomModel ) {
        chatRoomModels[ chatRoomModel.getTitle() ] = chatRoomModel;
    };
    
    that.chatRoomExists = function( title ) {
        return typeof( chatRoomModels[ title ] ) !== "undefined";
    };
    
    that.getChatRoomModel = function( title ) {
        if( !that.chatRoomExists( title ) ) {
            that.addChatRoomModel( chatmate.models.ChatRoomModel( title ) );
        }
        return chatRoomModels[ title ];
    };
            
    that.getAllActiveChatRooms = function() {
        var activeChatRooms = {};
        for( var title in chatRoomModels ) {
            if( !chatRoomModels[ title ].isDeleted() ) {
                activeChatRooms[ title ] = chatRoomModels[ title ];
            }
        }
        return activeChatRooms;
    };
    
    return that;
    
}());