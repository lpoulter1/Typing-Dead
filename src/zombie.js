class Zombie {
  constructor(ctx, word, x, y, shift, img, alive){
    this.ctx = ctx;
    this.word = word;
    this.x = x;
    this.y = y;
    this.shift = shift;
    this.img = img;
    this.alive = alive;
  }
  draw () {
    const zombieImg = new Image();
    zombieImg.src = "../Typing-Dead/assets/zombie.png";
    this.ctx.drawImage(zombieImg, 
                        this.shift, 88, 
                        50, 90, 
                        this.x, this.y,
                        96.25, 90);
    // this.ctx.beginPath();
    //   this.ctx.fillStyle = "#F8030F";
    //   this.ctx.fillRect(this.x, this.y, 35, 70);
    // this.ctx.closePath();
  }

  drawDead () {
    const zombieImg = new Image();
    zombieImg.src = "../Typing-Dead/assets/zombie.png";
    this.ctx.drawImage(zombieImg,
      this.shift, 88,
      50, 90,
      this.x, this.y,
      96.25, 90);
  }
  

  drawText () {
    this.ctx.beginPath();
      this.ctx.fillStyle = "white";
      this.ctx.font = 'bold 23px "Roboto Slab"';
      this.ctx.fillText(this.word, this.x - 7, this.y - 5);
      this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Zombie;