var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const pdrone = require('pdrone');
const drone = pdrone({ id: 'Team13', debug: false });

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, function () {
  console.log('open http://localhost:3000/');
});

// Clap-based drone contol

var clapDetector = require('clap-detector');
clapDetector.updateConfig({
  CLAP_ENERGY_THRESHOLD: 0.3,
  CLAP_AMPLITUDE_THRESHOLD: 0.9
});

// Voice-based drone control

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
          case 'enough':
            console.log('land');
            drone.land();
            break;
          case 'go up':
            drone.fly({ gaz: 100 });
            await drone.wait(defaultWaitTime);
            drone.fly({ gaz: 0 });
            await drone.wait(defaultWaitTime);
            break;
          case 'go up ten':
            drone.fly({ gaz: 100 });
            break;
          case 'flip left':
            drone.flip({direction: 'left'});
            break;
          case 'flip right':
            drone.flip({direction: 'right'});
            break;
          case 'flip front':
            drone.flip({direction: 'front'});
            break;
          case 'flip back':
            drone.flip({direction: 'back'});
            break;
          case 'fire':
            drone.fire();
            break;
          case 'turn left':
            drone.fly({yaw: -50});
            break;
          case 'turn right':
            drone.fly({ yaw: 50 });
            break;
          default:
            if (msg.match(/russian/ig)) {
              clapDetector.start();
              clapDetector.onClap(function (history) {
                console.log('CLAP => flip left');
                //drone.flip({direction: 'left'});
                drone.fire();
              });
              console.log('russian roulette MODE ON :gun:');
              drone.fly({yaw: -50});

              // if (Math.random() >= 0.5) {
                // drone.fire();
              // }
            }
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