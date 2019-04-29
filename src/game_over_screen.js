class GameOverScreen {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  drawGameOver(fade) {
    this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(255, 0, 0, ${fade}`;
      this.ctx.font = 'bold 72px "Roboto Slab"';
      this.ctx.textAlign = "center";
      this.ctx.fillText("Game Over", (canvas.width / 2), 110);
      this.ctx.fill();
    this.ctx.closePath();
  }

  drawGameOverWPM(wpm) {
    this.ctx.beginPath();
      this.ctx.fillStyle = "white";
      this.ctx.font = 'bold 20px "Roboto Slab"';
      if (wpm) {
        this.ctx.fillText("WPM: " + wpm, (canvas.width / 2) - 120, 150);
      } else {
        this.ctx.fillText("WPM: 0", (canvas.width / 2) - 120, 150);
      }
      this.ctx.fill();
    this.ctx.closePath();
  }

  drawGameOverKills(killCount) {
    this.ctx.beginPath();
      this.ctx.fillStyle = "white";
      this.ctx.font = 'bold 20px "Roboto Slab"';
      this.ctx.fillText("Kills: " + `${killCount}`, (canvas.width / 2)+110, 150);
      this.ctx.fill();
    this.ctx.closePath();
  }

  drawRestartClick() {
    this.ctx.beginPath();
      this.ctx.fillStyle = "lightgreen";
      this.ctx.textAlign = "center"; 
      this.ctx.font = 'bold 30px "Roboto Slab"';
      this.ctx.fillText("Click or Press Enter to Restart", (canvas.width / 2), 375);
      this.ctx.fill();
    this.ctx.closePath();
  }

  drawHighScores(killCount) {
    let highScores;
    firebase.database().ref("highScores").orderByChild('score').limitToLast(5).on("value", function (snapshot) {
      highScores = Object.values(snapshot.val()).sort((a, b) => b.score - a.score);
    });

    this.ctx.beginPath();
      this.ctx.fillStyle = "lightgreen";
      this.ctx.textAlign = "center";
      this.ctx.font = "bold 20px 'Roboto Slab'";
      this.ctx.fillText("Your score was: " + `${killCount}`, canvas.width/2, 180);
      this.ctx.fillText("High Scores: ", canvas.width/2, 210);

      let yPos = 240;
      this.ctx.font = "bold 16px 'Roboto Slab'";
      highScores.forEach(highScore => {
        this.ctx.textAlign = "left";
        this.ctx.fillText("Name: " + `${highScore.name}`, (canvas.width/2) - 180, yPos);
        this.ctx.textAlign = "center";
        this.ctx.fillText("Kills: " + `${highScore.score}`, canvas.width/2, yPos);
        this.ctx.textAlign = "left";
        this.ctx.fillText("WPM: " + `${highScore.WPM}`, canvas.width/2 + 80, yPos);
        yPos += 20;
      })
      this.ctx.fill();
    this.ctx.closePath();

  }

  drawHighScoreInput() {
    this.ctx.beginPath();
      this.ctx.fillStyle = "lightgreen";
      this.ctx.textAlign = "center";
      this.ctx.font = 'bold 44px "Roboto Slab"';
      this.ctx.fillText("You've reached a high score!", this.canvas.width/2, 150)
      this.ctx.font = 'bold 32px "Roboto Slab"';
      this.ctx.fillText("Type in your name: ", this.canvas.width/2, 200);
      this.ctx.fill();
    this.ctx.closePath();
  }

}

export default GameOverScreen;