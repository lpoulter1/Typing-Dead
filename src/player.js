
export const drawPlayer = (ctx) => {
  ctx.beginPath();
  ctx.rect(canvas.width - 150, canvas.height / 2 - 70, 35, 70);
  ctx.fillStyle = "#7FFF00";
  ctx.fill();
  ctx.closePath();
}

export const drawHealth = (ctx, health) => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = 'bold 23px "Roboto Slab"';
  ctx.fillText("Health: " + Math.floor(health).toString(), canvas.width - 150, 50);
  ctx.fill();
  ctx.closePath();
}