var jQuery = require('jquery');

var Polygon = function (origin, angles) {
    this.origin = origin;
    this.angles = angles;
    this.dead = false;

    this.draw = function (ctx) {
        this.origin[1] = this.origin[1] + 2;
        if (this.origin[1] > 400) {
            this.dead = true;
        }

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
    var radiusSpaceship = 10;
    var polygon1 = new Polygon([100, 0], [0, .1, .25, .35, .5, .65, .75, .9]);

    var processInput = function () {
    };

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

    var calculateCollision = function ()
    {
        var asteroidCenter = polygon1.origin;
        var xA = asteroidCenter[0];
        var yA = asteroidCenter[1];
        var fakeAsteroidRadius = radiusSpaceship;

        var xDelta = Math.abs(xA-xSpaceship);
        var yDelta = Math.abs(yA-ySpaceship);

        var radiusSumSquare = (fakeAsteroidRadius + radiusSpaceship ) * (fakeAsteroidRadius + radiusSpaceship );
        return (xDelta * xDelta + yDelta *yDelta < radiusSumSquare)
    };

    var update = function () {
        var crashed = calculateCollision();
        if (crashed) {
            jQuery( "body" ).prepend( "<p>CrashBoom</p>" );
            xSpaceship = 200;
            ySpaceship = 200;
        }
    };

    var paint_spaceship_on_screen = function (ctx) {
        ctx.beginPath();
        ctx.arc(xSpaceship, ySpaceship, radiusSpaceship, 0, Math.PI * 2, false);
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
	polygon1.draw(ctx);
        if (polygon1.dead) {
            polygon1 = new Polygon([Math.floor(Math.random() * 400) + 1, 0], [0, .1, .25, .35, .5, .65, .75, .9]);
        }
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
