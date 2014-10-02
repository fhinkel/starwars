var jQuery = require('jquery');

var Polygon = function (origin, angles) {
    this.origin = origin;
    this.angles = angles;
    this.dead = false;
    var direction = Math.floor(Math.random() * 4);
    this.movePolygon = function () {
        switch (direction) {
            case 0: // left
                this.origin[0] = this.origin[0] - 2;
                break;
            case 1: // right
                this.origin[0] = this.origin[0] + 2;
                break;
            case 2: // up
                this.origin[1] = this.origin[1] - 2;
                break;
            case 3: // down
                this.origin[1] = this.origin[1] + 2;
                break;
        }
    };

    this.draw = function (ctx) {
        this.movePolygon();

        var outOfBounds = function (x, y) {
            return (x > 400 || x < 0
                || y > 400 || y < 0);
        };

        if (outOfBounds(this.origin[0], this.origin[1])) {
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
    var hitCount = 0;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var xSpaceship = 200;
    var ySpaceship = 200;
    var radiusSpaceship = 10;
    var polygon1 = new Polygon([100, 0], [0, .1, .25, .35, .5, .65, .75, .9]);
    var polygon2 = new Polygon([200, 300], [0, .1, .25, .35, .5, .65, .75, .9]);
    var polygon3 = new Polygon([50, 250], [0, .1, .25, .35, .5, .65, .75, .9]);

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

    var calculateCollision = function (polygon) {
        var asteroidCenter = polygon.origin;
        var xA = asteroidCenter[0];
        var yA = asteroidCenter[1];
        var fakeAsteroidRadius = radiusSpaceship;

        var xDelta = Math.abs(xA - xSpaceship);
        var yDelta = Math.abs(yA - ySpaceship);

        var radiusSumSquare = (fakeAsteroidRadius + radiusSpaceship ) * (fakeAsteroidRadius + radiusSpaceship );
        return (xDelta * xDelta + yDelta * yDelta < radiusSumSquare)
    };

    var update = function () {
        var crashed = calculateCollision(polygon1)
            || calculateCollision(polygon2)
            || calculateCollision(polygon3);
        if (crashed) {
            hitCount = hitCount + 1;
            jQuery("#hitCount").text(hitCount);
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

    var redrawPolygonIfMovedOutsideOfScreen = function (polygon) {
        if (polygon.dead) {
            polygon = new Polygon([Math.floor(Math.random() * 400) + 1, 0], [0, .1, .25, .35, .5, .65, .75, .9]);
        }
        return polygon;
    };

    var render = function () {
        clear_screen(ctx);
        paint_spaceship_on_screen(ctx);
        polygon1.draw(ctx);
        polygon2.draw(ctx);
        polygon3.draw(ctx);
        polygon1 = redrawPolygonIfMovedOutsideOfScreen(polygon1);
        polygon2 = redrawPolygonIfMovedOutsideOfScreen(polygon2);
        polygon3 = redrawPolygonIfMovedOutsideOfScreen(polygon3);
    };

    var gameLoop = function () {
        processInput();
        update();
        render();

        setTimeout(function () {
            gameLoop();
        }, 20);
    };

    gameLoop();
});
var controls = require('./controls');

controls.startTracking(jQuery);