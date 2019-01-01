export const drawGameOver = (ctx, fade) => {
  ctx.beginPath();
  ctx.fillStyle = `rgba(255, 0, 0, ${fade}`;
  ctx.font = 'bold 72px "Roboto Slab"';
  ctx.textAlign = "center";
  ctx.fillText("Game Over", (canvas.width / 2), 110);
  ctx.fill();
  ctx.closePath();
}

export const drawGameOverWPM = (ctx, wpm) => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = 'bold 20px "Roboto Slab"';
  if (wpm) {
    ctx.fillText("WPM: " + wpm, (canvas.width / 2) - 120, 150);
  } else {
    ctx.fillText("WPM: 0", (canvas.width / 2) - 120, 150);
  }
  ctx.fill();
  ctx.closePath();
}

export const drawGameOverKills = (ctx, kills) => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = 'bold 20px "Roboto Slab"';
  ctx.fillText("Kills: " + `${kills}`, (canvas.width / 2)+110, 150);
  ctx.fill();
  ctx.closePath();
}

export const drawRestartClick = (ctx) => {
  ctx.beginPath();
  ctx.fillStyle = "lightgreen";
  ctx.textAlign = "center"; 
  // ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.font = 'bold 30px "Roboto Slab"';
  ctx.fillText("Click or Press Enter to Restart", (canvas.width / 2), 375);
  ctx.fill();
  ctx.closePath();
}

export const drawHighScores = (ctx, kills) => {
  let highScores;
  firebase.database().ref("highScores").orderByChild('score').limitToLast(5).on("value", function (snapshot) {
    highScores = Object.values(snapshot.val()).sort((a, b) => b.score - a.score);
  });
  ctx.beginPath();
  ctx.fillStyle = "lightgreen";
  ctx.textAlign = "center";
  ctx.font = "bold 20px 'Roboto Slab'";
  ctx.fillText("Your score was: " + `${kills}`, canvas.width/2, 180);
  ctx.fillText("High Scores: ", canvas.width/2, 210);
  let yPos = 240;
  ctx.font = "bold 16px 'Roboto Slab'";
  highScores.forEach(highScore => {
    ctx.textAlign = "left";
    ctx.fillText("Name: " + `${highScore.name}`, (canvas.width/2) - 180, yPos);
    ctx.textAlign = "center";
    ctx.fillText("Kills: " + `${highScore.score}`, canvas.width/2, yPos);
    ctx.textAlign = "left";
    ctx.fillText("WPM: " + `${highScore.WPM}`, canvas.width/2 + 80, yPos);
    yPos += 20;
  })
  ctx.fill();
  ctx.closePath();

}

export const drawHighScoreInput = (ctx, canvas) => {
  ctx.beginPath();
  ctx.fillStyle = "lightgreen";
  ctx.textAlign = "center";
  ctx.font = 'bold 44px "Roboto Slab"';
  ctx.fillText("You've reached a high score!", canvas.width/2, 150)
  ctx.font = 'bold 32px "Roboto Slab"';
  ctx.fillText("Type in your name: ", canvas.width/2, 200);
  ctx.fill();
  ctx.closePath();
}