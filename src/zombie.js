class Zombie {
  constructor(ctx, word, x, y, dy, shift, deadShift, alive){
    this.ctx = ctx;
    this.word = word;
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.shift = shift;
    this.deadShift = deadShift;
    this.alive = alive;
  }
  
  draw () {
    const zombieImg = new Image();
    zombieImg.src = "../Typing-Dead/assets/zombie.png";
    this.ctx.drawImage(zombieImg, 
                        this.shift, 88, 
                        50, 90, 
                        this.x, this.y,
                        50, 90);
  }

  drawDead () {
    const zombieImg = new Image();
    zombieImg.src = "../Typing-Dead/assets/zombie.png";
    this.ctx.drawImage(zombieImg,
      this.deadShift, 270,
      50, 90,
      this.x, this.y,
      50, 90);
  }

  drawText () {
    this.ctx.beginPath();
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      this.ctx.font = 'bold 18px "Roboto Slab"';
      this.ctx.fillText(this.word, this.x, this.y - 7);
      this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Zombie;