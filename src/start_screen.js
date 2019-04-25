class StartScreen {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  draw() {
    this.ctx.beginPath();
      this.ctx.rect(0, 0, canvas.width, canvas.height);
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      this.ctx.fill();
    this.ctx.closePath();
  }

  drawTitle(titlePos) {
    this.ctx.beginPath();
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      this.ctx.font = 'bold 72px "Roboto Slab"';
      this.ctx.textAlign = "center"; 
      this.ctx.fillText("Typing Dead", (canvas.width/2), titlePos);
      this.ctx.fill();
    this.ctx.closePath();
  }

  drawStartClick() {
    this.ctx.beginPath();
      this.ctx.fillStyle = "red";
      this.ctx.font = 'bold 36px "Roboto Slab"';
      this.ctx.textAlign = "center"; 
      this.ctx.fillText("Click or Press Enter to Start", (canvas.width / 2), 300);
      this.ctx.fill();
    this.ctx.closePath();
  }
}