// Socket.io server

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const pdrone = require('pdrone');
const drone = pdrone({ id: 'Team13', debug: true });

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, function () {
  console.log('open http://localhost:3000/');
});

// Drone control

drone.on('connected', async function () {
  console.log('drone connected');
  io.on('connection', function (socket) {
    console.log('connected to socket.io');
    socket.on('disconnect', function () {
      console.log('disconnected');
    });
    socket.on('message', async function (msg) {
      console.log('message: ' + msg);
        switch(msg) {
          case 'take off':
            console.log('received take off command');;
            drone.takeOff();
            break;
          case 'land':
            console.log('land');
            drone.land();
            break;
        }
      // });
      // drone.on('connected', async function () {
      //   // Get up a little bit
      //   drone.takeOff();
      //   await drone.wait(3000);
      //   drone.flatTrim();
      //   await drone.wait(1000);
      // });
    });
  });
});
