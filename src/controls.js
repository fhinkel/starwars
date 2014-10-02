var gyro = require('./gyro');

function startTracking (jQuery) {
    console.log('starting to track');
    gyro.startTracking(function (o) {
        // o.x, o.y, o.z for accelerometer
        // o.alpha, o.beta, o.gamma for gyro
        //console.log(o);
        jQuery("#acc").text("x " + o.x + ", y " + o.y +", z " + o.z);
    });
}

//alert('devicemotion', gyro.hasFeature('devicemotion'));
//alert('deviceorientation', gyro.hasFeature('deviceorientation'));
//alert('features:', JSON.stringify(gyro.getFeatures()));

function onChange() {
}

module.exports = {onChange: onChange,
    startTracking: startTracking};
