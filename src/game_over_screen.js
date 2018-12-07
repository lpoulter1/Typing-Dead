export const drawGameOver = (ctx, fade) => {
  ctx.beginPath();
  ctx.fillStyle = `rgba(255, 0, 0, ${fade}`;
  ctx.font = 'bold 72px "Roboto Slab"';
  ctx.textAlign = "center";
  ctx.fillText("Game Over", (canvas.width / 2), 130);
  ctx.fill();
  ctx.closePath();
}

export const drawGameOverWPM = (ctx, kills, timer) => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = 'bold 20px "Roboto Slab"';
  if ((kills / (timer / 60))) {
    ctx.fillText("WPM: " + (kills / (timer / 60)).toFixed(2), (canvas.width / 2) - 120, 200);
  } else {
    ctx.fillText("WPM: 0", (canvas.width / 2) - 120, 200);
  }
  ctx.fill();
  ctx.closePath();
}

export const drawGameOverKills = (ctx, kills) => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = 'bold 20px "Roboto Slab"';
  ctx.fillText("Kills: " + `${kills}`, (canvas.width / 2)+110, 200);
  ctx.fill();
  ctx.closePath();
}

export const drawRestartClick = (ctx) => {
  ctx.beginPath();
  ctx.fillStyle = "lightgreen";
  ctx.textAlign = "center"; 
  // ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.font = 'bold 30px "Roboto Slab"';
  ctx.fillText("Click or Press Enter to Restart", (canvas.width / 2), 300);
  ctx.fill();
  ctx.closePath();
}

export const drawHighScores = (ctx, kills) => {
  let highScore;
  firebase.database().ref("highScores").on("value", function (snapshot) {
    highScore = snapshot.val();
  });
  ctx.beginPath();
  ctx.fillStyle = "lightgreen";
  ctx.textAlign = "center";
  ctx.font = "bold 14px 'Roboto Slab'";
  ctx.fillText("Your score was: " + `${kills}`, canvas.width/2, 230)
  ctx.fillText("High Score:" + `${highScore}`, canvas.width/2, 250)
  ctx.fill();
  ctx.closePath();

}