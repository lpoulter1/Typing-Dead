class Zombie {
  constructor(ctx, word, x, y){
    this.ctx = ctx;
    this.word = word;
    this.x = x;
    this.y = y;
  }
  draw () {
    this.ctx.beginPath();
      this.ctx.fillStyle = "#F8030F";
      this.ctx.fillRect(this.x, this.y, 35, 70);
    this.ctx.closePath();
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