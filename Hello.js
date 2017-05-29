var express = require('express');
var path = require('path');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};

app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('User is connected');

  socket.on('join', function(name) {
  	users[socket.id] = name;
  	io.emit('join', name);
  });

  socket.on('chat message', function(msg) {
    console.log('user message: ' + msg);
    io.emit('chat message', users[socket.id], msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});