const pdrone = require('pdrone');
const drone = pdrone({id: 'Team13'});
drone.on('connected', function() {
  drone.land();
});
