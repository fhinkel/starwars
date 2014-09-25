var gyro = require('./gyro');

gyro.startTracking(function(o) {
  // o.x, o.y, o.z for accelerometer
  // o.alpha, o.beta, o.gamma for gyro
  console.log(o);
});
