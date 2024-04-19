class Sprite {
    constructor(posX, posY, speedX, speedY, width, height, url) {
      this.X = posX;
      this.Y = posY;
      this.speedX = speedX;
      this.speedY = speedY;
      this.width = width;
      this.height = height;
      this.url = url;
      this.image = new Image();
      if (typeof url === "string") {
        this.image.src = url;
      }
    }
  
    update() {
      this.X += this.speedX;
      this.Y += this.speedY;
    }
  
    draw() {
      ctx.drawImage(this.image, this.X, this.Y, this.width, this.height);
    }
  }
  