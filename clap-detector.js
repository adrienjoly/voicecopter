// Require the module
var clapDetector = require('clap-detector');

// Start clap detection
clapDetector.start();

// Register on clap event
clapDetector.onClap(function(history) {
  console.log('CLAP');
});
