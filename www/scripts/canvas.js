var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var img = new Image();
img.onload = function () {
    ctx.drawImage(img, 0, 0, 300, 150);
}
img.src = "images/sale.png";