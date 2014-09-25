var gyro = require('./gyro');

gyro.startTracking(function(o) {
  // o.x, o.y, o.z for accelerometer
  // o.alpha, o.beta, o.gamma for gyro
  console.log(o);
});

//alert('devicemotion', gyro.hasFeature('devicemotion'));
//alert('deviceorientation', gyro.hasFeature('deviceorientation'));
alert('features:', JSON.stringify(gyro.getFeatures()));

function onChange() {}

module.exports = {onChange: onChange};
