class StartScreen {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, 800, 450);
    this.ctx.fill();
    this.ctx.closePath();
  }
}