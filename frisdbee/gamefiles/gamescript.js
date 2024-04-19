let ctx, canvasWidth, canvasHeight;
const FPS = 60;
const interval = 1000 / FPS;
canvasHeight = 600;
canvasWidth = 800;

let sprite1; // Create a global variable for Sprite1
let sprite2Array = []; // Declare sprite2Array in the outer scope

function start() {
  sprite1 = new Sprite(30, 500, 0.05, 0, 40, 40, "../assets/frisbeepng.png");

  function spawnSprite2() {
    // Create multiple instances of sprite2 and add them to sprite2Array
    for (let i = 0; i < 5; i++) {
      // Adjust the number of instances as needed
      let sprite2Instance = new Sprite(
        800,
        Math.random() * canvasHeight,
        0,
        0,
        40,
        40,
        "../assets/static-sea-gull.png"
      );
      sprite2Array.push(sprite2Instance);
    }
  }

  setInterval(spawnSprite2, 2000); // Spawn a new sprite2 interval

  function gameloop(timestamp) {
    // ... rest of the game loop logic (unchanged)
    update(timestamp);
    draw();
    requestAnimationFrame(gameloop);
  }

  requestAnimationFrame(gameloop); // Start the game loop
}

function init() {
  const canvas = document.getElementById("gameCanvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx = canvas.getContext("2d");

  // ... rest of the init function (unchanged)
  start();
}

document.addEventListener("DOMContentLoaded", init);
let sprite1VelocityY = 0;
const spriteAcceleration = 400; // Adjust as needed
const maxVelocityY = 450; // Adjust as needed
const upwardAcceleration = -200;

document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    sprite1VelocityY = upwardAcceleration;
  }
});

let lastTimestamp = 0; // Variable to store the timestamp of the last frame

function update(timestamp) {
  // Calculate the time elapsed since the last frame
  const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert to seconds
  lastTimestamp = timestamp;

  // Apply acceleration to the velocity
  sprite1VelocityY += spriteAcceleration * deltaTime;

  // Limit the maximum velocity
  if (sprite1VelocityY > maxVelocityY) {
    sprite1VelocityY = maxVelocityY;
  }

  // Apply velocity to position
  sprite1.Y += sprite1VelocityY * deltaTime;

  // Keep the sprite within the canvas bounds
  if (sprite1.Y < 0) {
    sprite1.Y = 0;
    sprite1VelocityY = 0;
  } else if (sprite1.Y + sprite1.height > canvasHeight) {
    sprite1.Y = canvasHeight - sprite1.height;
    sprite1VelocityY = 0;
  }

  // Check for collisions between sprite1 and sprite2
  for (let i = 0; i < sprite2Array.length; i++) {
    const sprite2 = sprite2Array[i];

    // Check if the bounding boxes of sprite1 and sprite2 overlap
    if (
      sprite1.X < sprite2.X + sprite2.width &&
      sprite1.X + sprite1.width > sprite2.X &&
      sprite1.Y < sprite2.Y + sprite2.height &&
      sprite1.Y + sprite1.height > sprite2.Y
    ) {
      // Collision detected
      // Game over logic here
      gameOver();
       window.location.href = "gameover.html";
    }
  }

  // Update position of each sprite2 instance in sprite2Array
  for (let i = 0; i < sprite2Array.length; i++) {
    sprite2Array[i].X -= 200 * deltaTime; // Adjust the speed as needed (e.g., 200 pixels per second)

    // Remove sprite2 from the array if it moves out of the canvas
    if (sprite2Array[i].X + sprite2Array[i].width < 0) {
      sprite2Array.splice(i, 1); // Remove the sprite from the array
    } else {
      // Reset sprite2 position if it moves beyond the canvas width
      if (sprite2Array[i].X + sprite2Array[i].width < 0) {
        sprite2Array[i].X = canvasWidth;
        sprite2Array[i].Y = Math.random() * canvasHeight; // Reset Y position
      }
    }
  }

  // Check if sprite1 has reached halfway mark of the canvas
  if (sprite1.X >= canvasWidth / 2) {
    return; // Stop updating sprite2
  }

  sprite1.update(); // Update the existing Sprite1
}


function draw() {
  const backgroundImage = new Image();
  backgroundImage.src = "../assets/meeuw2.gif";
  ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

  sprite1.draw(); // Draw the existing Sprite1

  // Draw each sprite2 instance in sprite2Array
  for (let i = 0; i < sprite2Array.length; i++) {
    sprite2Array[i].draw();
  }

  if (sprite1.X > canvasWidth) {
    sprite1.X = 0; // Reset the position within draw function
  }
}
