var jQuery = require('jquery');

var paint_spaceship_on_screen = function(ctx) {
    ctx.beginPath();
    ctx.arc(200, 200, 10, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.fillStyle = "#000";
    ctx.fill();
}

jQuery(function() {
  console.log('WE ARE LOADED!!!!');
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0,0,150,75);

    paint_spaceship_on_screen(ctx);
});
