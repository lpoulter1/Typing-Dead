
export const drawPlayer = (ctx) => {
  ctx.beginPath();
  ctx.rect(canvas.width - 150, canvas.height/2 - 70, 35, 70);
  ctx.fillStyle = "#7FFF00";
  ctx.fill();
  ctx.closePath();
}
