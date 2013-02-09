"use strict";

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'chatmate-server'

var webSocketsServerPort = 3000;
var clients = {};  
var nextClientId = 0;

var WebSocketServer = require('ws').Server;
var http = require('http');

var log = function( message ) {
    console.log((new Date()) + " " + message);
};

var server = http.createServer();
server.listen(webSocketsServerPort, function() {
    log("Server is listening on port " + webSocketsServerPort);
});


var wsServer = new WebSocketServer({
    server: server
});

wsServer.on('connection', function( ws ) {
    var clientId = nextClientId++;
    clients[ clientId ] = ws;
    log( "Accepted connection from client " + clientId + "." );
    
    ws.on( 'message', function( message ) {
        log( "Received messagge: " + message );
        for ( var id in clients ) {
            if( parseInt( id, 10) !== clientId ) {
                clients[ id ].send(message);
            }
        }
    });

    ws.on('close', function() {
        log( "Client " + clientId + " disconnected." );
        delete clients[ clientId ];
    });
});
