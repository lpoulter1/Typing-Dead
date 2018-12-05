// class StartScreen {
//   constructor(ctx) {
//     this.ctx = ctx;
//   }

  export const drawStartScreen = (ctx) => {
    ctx.beginPath();
      ctx.rect(0, 0, 800, 450);
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fill();
    ctx.closePath();
  }
// }