var jQuery = require('jquery');

jQuery(function() {
  console.log('WE ARE LOADED!!!!');
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0,0,150,75);
});
