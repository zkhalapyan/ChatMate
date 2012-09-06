chatmate.models.ChatRoomModelFactory = (function() {
    
    var that = {};
    
    var chatRoomModels = {};
    
    that.getChatRoomModel = function( title ) {
        if( typeof( chatRoomModels[ title ] ) === "undefined") {
            var chatRoomModel = chatmate.models.ChatRoomModel( title );
            chatRoomModel.save();
            chatRoomModels[ title ] = chatRoomModel;
        }
        return chatRoomModels[ title ];
    };
    
    return that;
    
}());