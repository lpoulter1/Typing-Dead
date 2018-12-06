export const drawGameOver = (ctx, fade) => {
  ctx.beginPath();
  ctx.fillStyle = `rgba(255, 0, 0, ${fade}`;
  ctx.font = 'bold 72px "Roboto Slab"';
  ctx.fillText("Game Over", (canvas.width / 2) - 180, 130);
  ctx.fill();
  ctx.closePath();
}

export const drawGameOverWPM = (ctx, kills, timer) => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = 'bold 20px "Roboto Slab"';
  if ((kills / (timer / 60))) {
    ctx.fillText("WPM: " + (kills / (timer / 60)).toFixed(2), (canvas.width / 2) - 160, 200);
  } else {
    ctx.fillText("WPM: 0", (canvas.width / 2) - 160, 200);
  }
  ctx.fill();
  ctx.closePath();
}

export const drawGameOverKills = (ctx, kills) => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = 'bold 20px "Roboto Slab"';
  ctx.fillText("Kills: " + `${kills}`, (canvas.width / 2)+95, 200);
  ctx.fill();
  ctx.closePath();
}

export const drawRestartClick = (ctx) => {
  ctx.beginPath();
  ctx.fillStyle = "lightgreen";
  // ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.font = 'bold 30px "Roboto Slab"';
  ctx.fillText("Click to Restart", (canvas.width / 2) - 105, 300);
  ctx.fill();
  ctx.closePath();
}