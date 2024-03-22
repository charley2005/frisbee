let ctx, canvasWidth, canvasHeight;
const FPS = 60;
const interval = 1000 / FPS;
canvasHeight = 600;
canvasWidth = 800;

function start() {
  let volgende;
  (function gameloop(timestamp) {
    if (volgende === undifined) {
      volgende = timestamp;
    }
    const verschil = timestamp - volgende;
    if (verschil > interval) {
      volgende = timestamp - (verschil % interval);
      update();
      draw();
    }

    requestAnimationFrame(gameloop);
  })();

  function init() {
    const canvas = document.getElementById("gameCanvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d");
    ctx.clearRact(0, 0, canvasWidth, canvasHeight);

    image = new Image();
    image.src = "../assets/frisbeepng.png";
    ctx.drawImage(image, 30, 50, 40, 40);

    start();
  }

  document.addEventListener("DOMContentLoaded", init);

  function update() {
    Sprite1.update();
  }

  function draw() {
    ctx.clearReact(0, 0, canvasWidth, canvasHeight);
    Sprite1.draw();
    if (Sprite1.X > canvasWidth) {
      Sprite1.X = 0;
    }
  }
}
