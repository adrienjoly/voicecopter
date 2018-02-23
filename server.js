var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('open http://localhost:3000/');
});

io.on('connection', function(socket){
  console.log('connected');
  socket.on('disconnect', function(){
    console.log('disconnected');
  });
  socket.on('message', function(msg){
    console.log('message: ' + msg);
  });
});
