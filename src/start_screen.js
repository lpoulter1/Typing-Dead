// class StartScreen {
//   constructor(ctx) {
//     this.ctx = ctx;
//   }

  export const drawStartScreen = (ctx, canvas) => {
    ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fill();
    ctx.closePath();
  }

  export const drawTitle = (ctx, y) => {
    ctx.beginPath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.font = 'bold 72px "Roboto Slab"';
      ctx.fillText("Typing Dead", (canvas.width/2)-205, y);
      ctx.fill();
    ctx.closePath();
  }

  export const drawStartClick = (ctx) => {
    ctx.beginPath();
      ctx.fillStyle = "red";
      // ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.font = 'bold 36px "Roboto Slab"';
      ctx.fillText("Click to Start", (canvas.width / 2) - 105, 300);
      ctx.fill();
    ctx.closePath();
  }
// }