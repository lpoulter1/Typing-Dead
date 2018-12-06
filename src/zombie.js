class Zombie {
  constructor(ctx, word, x, y, dy, alive){
    this.ctx = ctx;
    this.word = word;
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.shift = 0;
    this.deadShift = 575;
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

  drawAttack() {
    const zombieImg = new Image();
    zombieImg.src = "../Typing-Dead/assets/zombie.png";
    this.ctx.drawImage(zombieImg,
                        this.deadShift, 178,
                        75, 90,
                        this.x, this.y,
                        55, 90);
  }

  drawText () {
    this.ctx.beginPath();
      this.ctx.fillStyle = "cyan";
      this.ctx.font = 'bold 18px "Roboto Slab"';
      this.ctx.fillText(this.word, this.x, this.y - 7);
      this.ctx.fill();
      // this.ctx.strokeStyle = "black";
      // this.ctx.strokeText(this.word, this.x-2, this.y - 7);
      // this.ctx.stroke();
    this.ctx.closePath();
  }

}

export default Zombie;