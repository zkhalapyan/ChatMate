"use strict";

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'chatmate-server'

// Port where we'll run the websocket server
var webSocketsServerPort = 3000;

// List of currently connected clients (users)
var clients = [ ];  

var WebSocketServer = require('ws').Server;
var http = require('http');


/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server.
});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

// create the server
var wsServer = new WebSocketServer({
    server: server
});

wsServer.on('connection', function( ws ) {
    var index = clients.length;
    console.log((new Date()) + " Accepted connection from client.");
    clients.push(ws);
    
    ws.on('message', function( message ) {
        console.log((new Date()) + "Received messagge: " + message);
        for(var i = 0; i < clients.length; i++){
            if( i !== index ) {
                clients[i].send(message);
            }
        }
    });

    ws.on('close', function() {
        console.log((new Date()) + " Client disconnected.");
        clients.splice(index, 1);
        console.log((new Date()) + " Current client count: " + clients.length );
    });
});
