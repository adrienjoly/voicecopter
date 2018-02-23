// Socket.io server

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

// Drone control

const readline = require('readline');
const pdrone = require('pdrone');
const drone = pdrone({ id: 'Team13', debug: false });

drone.on('sensor', function({name, value}) {
  // console.log(name, value);
});

drone.on('connected', async function() {
  // Get up a little bit
  drone.takeOff();
  await drone.wait(3000);
  drone.flatTrim();
  await drone.wait(1000);

});
const defaultWaitTime = 100;


process.stdin.on('keypress', async (str, key) => {
  if (key.ctrl && key.name === 'c') {
    drone.land();
    await drone.wait(5000);
    process.exit();
  } else {

    console.log(key.name);
    switch(key.name) {
    case "left":
        drone.fly({ yaw: -50 });
        await drone.wait(defaultWaitTime);
        drone.fly({ yaw: 0 });
        break;
    case "right":
        drone.fly({ yaw: 50 });
        await drone.wait(defaultWaitTime);
        drone.fly({ yaw: 0 });
        break;
    case "up":
        drone.fly({ gaz: 100 });
        await drone.wait(defaultWaitTime);
        drone.fly({ gaz: 0 });
        await drone.wait(defaultWaitTime);
        break;
    case "down":
        drone.fly({ gaz: -100 });
        await drone.wait(defaultWaitTime);
        drone.fly({ gaz: 0 });
        await drone.wait(defaultWaitTime);
        break;
    case "w":
        drone.fly({ pitch: 50 });
        await drone.wait(defaultWaitTime);
        drone.fly({ pitch: 0 });
        await drone.wait(defaultWaitTime);
        break;
    case "s":
        drone.fly({ pitch: -50 });
        await drone.wait(defaultWaitTime);
        drone.fly({ pitch: 0 });
        await drone.wait(defaultWaitTime);
        break;
    case "i":
        await drone.wait(defaultWaitTime);
        drone.flip({direction: 'front'})
        await drone.wait(defaultWaitTime);
        break;
    case "j":
        await drone.wait(defaultWaitTime);
        drone.flip({direction: 'left'})
        await drone.wait(defaultWaitTime);
        break;
    case "k":
        await drone.wait(defaultWaitTime);
        drone.flip({direction: 'back'})
        await drone.wait(defaultWaitTime);
        break;
    case "l":
        await drone.wait(defaultWaitTime);
        drone.flip({direction: 'right'})
        await drone.wait(defaultWaitTime);
        break;
    case "p":
        drone.land();
        await drone.wait(5000);
        process.exit();
        break;
    case "z":
        for (var i = 0; i < 8; ++i) {
          drone.fly({ gaz: 100 });
          await drone.wait(defaultWaitTime * 6);
          drone.fly({ gaz: 0 });
          await drone.wait(defaultWaitTime);
          drone.fly({ gaz: -100 });
          await drone.wait(defaultWaitTime * 6);
          drone.fly({ gaz: 0 });
          await drone.wait(defaultWaitTime);
        }
        break;
    default:
        console.log(key);
    }
  }
});

process.on('unhandledRejection', err => {
  console.log("Caught unhandled rejection");
  console.log(err);

  drone.safeLandingAndExit();
});

process.on('SIGINT', function() {
  console.log("Caught interrupt signal, landing if needed");

  drone.safeLandingAndExit();
});

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', async (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  }
});
