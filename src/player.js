
export const drawPlayer = (ctx) => {
  ctx.beginPath();
  ctx.rect(canvas.width - 150, canvas.height / 2, 35, 70);
  ctx.fillStyle = "#7FFF00";
  ctx.fill();
  ctx.closePath();
}

export const drawHealth = (ctx, health) => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = 'bold 18px "Roboto Slab"';
  ctx.fillText("Health: " + Math.floor(health).toString(), canvas.width - 120, 50);
  ctx.fill();
  ctx.closePath();
}

export const drawKillCount = (ctx, killCount) => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = 'bold 18px "Roboto Slab"';
  ctx.fillText("Kills: " + killCount.toString(), canvas.width - 210, 50);
  ctx.fill();
  ctx.closePath();
}