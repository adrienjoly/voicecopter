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

const defaultWaitTime = 100;

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
          case 'stop b****':
            console.log('land');
            drone.land();
            break;
          case 'go up':
            drone.fly({ gaz: 100 });
            await drone.wait(defaultWaitTime);
            drone.fly({ gaz: 0 });
            await drone.wait(defaultWaitTime);
            break;
          case 'flip left':
            drone.flip({direction: 'left'});
            break;
          case 'fire':
            drone.fire();
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
