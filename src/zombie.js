
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
    this.zombieImg = new Image();
    zombieImg.src = "../Typing-Dead/assets/zombie.png";
  }
  
  draw() {
    this.ctx.drawImage(this.zombieImg, 
                        this.shift, 88, 
                        50, 90, 
                        this.x, this.y,
                        50, 90);
  }

  drawDead() {
    this.ctx.drawImage(this.zombieImg,
                        this.deadShift, 270,
                        50, 90,
                        this.x, this.y,
                        50, 90);
  }

  drawAttack() {
    this.ctx.drawImage(this.zombieImg,
                        this.deadShift, 178,
                        75, 90,
                        this.x, this.y,
                        55, 90);
  }

  drawText() {
    this.ctx.beginPath();
      // this.ctx.fillStyle = "rgba(100, 240, 255)";
      this.ctx.fillStyle = "cyan";
      this.ctx.font = 'bold 18px "Roboto Slab"';
      this.ctx.fillText(this.word, this.x, this.y - 7);
      this.ctx.fill();
      this.ctx.shadowBlur = 3;
      this.ctx.font = '19px "Roboto Slab"'
    this.ctx.closePath();
  }

}

export default Zombie;