
chatmate.services.ChatService = (function() {
    
    var that = {};
    
    var serviceURL = "ws://shocking-apps.com:3000";
    
    var messageQueue = [];
    var socket = null; 
    var onMessageCallback;
    var isSocketOpen = false;

    var onOpenHandler = function( e ) {
        console.log( "ChatService: Opened connection.");
        isSocketOpen = true;
    };

    var onMessageHandler = function( e ) {
        var packet = $.parseJSON( e.data );
        console.log( "ChatService: Received message: " + e.data );
        
        var chatRoomModel = chatmate.models.ChatRoomModelFactory.getChatRoomModel( packet.room );
        chatRoomModel.addMessage( packet.message );
        
        if( typeof( onMessageCallback ) === "function" ) {
            onMessageCallback( packet );
        }
    };

    var onCloseHandler = function ( e ) {
        isSocketOpen = false;
    };
    
    that.setOnMessageCallback = function( newOnMessageCallback ) {
        onMessageCallback = newOnMessageCallback;
    };

    that.run = function() {
        if( socket === null ) {
            console.log("ChatService: Starting WebSocket.")
            socket = new WebSocket( serviceURL );  
        } 
        
        socket.onerror = function(e){
            console.log("ChatService: Error occured with the socket.")
            console.log(e);
        };
        
        socket.onmessage = onMessageHandler;
        socket.onopen    = onOpenHandler;
        socket.onclose   = onCloseHandler;
    };

    that.sendMessage = function( chatRoomModel, message ) {
        chatRoomModel.addMessage( message );
        var packet = {
            room    : chatRoomModel.getTitle(),
            message : message
        };
        if( isSocketOpen ) {
            console.log( "ChatService: Sent message: ", packet);
            socket.send( JSON.stringify( packet ) );
        } else {
            messageQueue.push( message );
        }
    };

    return that;

}());