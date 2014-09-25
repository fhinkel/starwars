var jQuery = require('jquery');

var Polygon = function (origin, angles) {
    this.x = origin[0];
    this.y = origin[1];
    this.angles = angles;
    this.dead = false;

    this.draw = function (ctx) {
        this.y = this.y + 1;
        if (this.y > 400) {
            this.dead = true;
        }

        ctx.beginPath();
        for (var i = 0; i < this.angles.length; i++) {
            var x = 20 * Math.cos(2 * Math.PI * this.angles[i]);
            var y = 20 * Math.sin(2 * Math.PI * this.angles[i]);
            ctx.lineTo(this.x + x, this.y + y);
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
    var polygon = [];
    polygon[polygon.length] = new Polygon([100, 0], [0, .1, .25, .35, .5, .65, .75, .9]);
    polygon[polygon.length] = new Polygon([200, 0], [0, .1, .25, .35, .5, .65, .75, .9]);

    var processInput = function () {
    };

    console.log('blubb');
    jQuery(document).keyup(function (e) {
        var delta = 10;
        switch (e.which) {
            case 37: // left
                xSpaceship = xSpaceship - delta;
                break;

            case 38: // up
                ySpaceship = ySpaceship - delta;
                break;

            case 39: // right
                xSpaceship = xSpaceship + delta;
                break;

            case 40: // down
                ySpaceship = ySpaceship + delta;
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    var update = function () {
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

    var render = function () {
        clear_screen(ctx);
        paint_spaceship_on_screen(ctx);
        for (var i = 0; i < polygon.length; i++) {
            polygon[i].draw(ctx);
        }
        var polygon_new = [];
        for (var i = 0; i < polygon.length; i++) {
            if (polygon[i].dead) {
                var polygon1 = new Polygon([Math.floor(Math.random() * 400) + 1, 0], [0, .1, .25, .35, .5, .65, .75, .9]);
            } else {
                var polygon1 = polygon[i];
            }
            polygon_new[polygon_new.length] = polygon1;
        }
        polygon = polygon_new;
    };

    var oneTickProcess = function () {
        processInput();
        update();
        render();

        setTimeout(function () {
            oneTickProcess();
        }, 20);
    };

    oneTickProcess();
});
//var controls = require('./controls');
