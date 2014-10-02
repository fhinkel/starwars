var gyro = require('./gyro');

function startTracking (jQuery, spaceship) {
    console.log('starting to track');
    gyro.startTracking(function (o) {
        // o.x, o.y, o.z for accelerometer
        // o.alpha, o.beta, o.gamma for gyro
        //console.log(o);
        jQuery("#acc").text("x " + o.x + ", y " + o.y +", z " + o.z);
        jQuery("#gyro").text("alpha " + o.alpha + ", beta " + o.beta);

        spaceship.x = spaceship.x + 200/15 * o.x;
        spaceship.y = spaceship.y - 200/15 * o.y;

    });
}

function onChange() {
}

module.exports = {onChange: onChange,
    startTracking: startTracking};
