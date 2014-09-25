var jQuery = require('jquery');


jQuery(function () {
    console.log('WE ARE LOADED!!!!');
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var xSpaceship = 200;
    var ySpaceship = 200;

    var processInput = function () {
        console.log('processing input...');
    };

    var update = function() {
        xSpaceship = xSpaceship + 1;
    };

    var paint_spaceship_on_screen = function (ctx) {
        ctx.beginPath();
        ctx.arc(xSpaceship, ySpaceship, 10, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.fillStyle = "#000";
        ctx.fill();
    };

    var clear_screen = function (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 400, 400);
    };

    var render = function() {
        clear_screen(ctx);
        paint_spaceship_on_screen(ctx);
    };

    var oneTickProcess = function () {
        processInput();
        update();
        render();

        setTimeout(function () {
            oneTickProcess();
        }, 500);
    };

    oneTickProcess();
});
var controls = require('./controls');
