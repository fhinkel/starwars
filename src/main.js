var jQuery = require('jquery');

var Polygon = function (origin, angles) {
    this.origin = origin;
    this.angles = angles;

    this.draw = function (ctx) {
        ctx.beginPath();
        for (var i = 0; i < this.angles.length; i++) {
            var x = 20 * Math.cos(2 * Math.PI * this.angles[i]);
            var y = 20 * Math.sin(2 * Math.PI * this.angles[i]);
            ctx.lineTo(this.origin[0] + x, this.origin[1] + y);
        }
        ctx.closePath();
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.fillStyle = "#000";
        ctx.fill();
    };
};

jQuery(function () {
    console.log('WE ARE LOADED!!!!');
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var xSpaceship = 200;
    var ySpaceship = 200;
    var polygon1 = new Polygon([100, 100], [0, .1, .25, .35, .5, .65, .75, .9]);

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
        polygon1.draw(ctx);
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
