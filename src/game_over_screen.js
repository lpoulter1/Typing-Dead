class GameOverScreen {
  constructor(page, ctx, canvas, wordList, input, scoreInput, highScores) {
    this.page = page;
    this.ctx = ctx;
    this.canvas = canvas;
    this.input = input;
    this.scoreInput = scoreInput;
    this.wordList = wordList;
    this.highScores = highScores;

    this.fade = 0;
    this.endCounter = 0;
    this.killCount;
    this.wpm;
    this.highScoreName;

    this.drawGameOver = this.drawGameOver.bind(this);
    this.drawGameOverWPM = this.drawGameOverWPM.bind(this);
    this.drawGameOverKills = this.drawGameOverKills.bind(this);
    this.drawHighScores = this.drawHighScores.bind(this);
    this.drawRestartClick = this.drawRestartClick.bind(this);
    this.drawHighScoreInput = this.drawHighScoreInput.bind(this);
  }

  drawGameOver() {
    this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(255, 0, 0, ${this.fade}`;
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

  drawHighScores() {
    this.ctx.beginPath();
      this.ctx.fillStyle = "lightgreen";
      this.ctx.textAlign = "center";
      this.ctx.font = "bold 20px 'Roboto Slab'";
      this.ctx.fillText("Your score was: " + `${this.killCount}`, this.canvas.width/2, 180);
      this.ctx.fillText("High Scores: ", this.canvas.width/2, 210);

      let yPos = 240;
      this.ctx.font = "bold 16px 'Roboto Slab'";
      this.highScores.forEach(highScore => {
        this.ctx.textAlign = "left";
        this.ctx.fillText("Name: " + `${highScore.name}`, (this.canvas.width/2) - 180, yPos);
        this.ctx.textAlign = "center";
        this.ctx.fillText("Kills: " + `${highScore.score}`, this.canvas.width/2, yPos);
        this.ctx.textAlign = "left";
        this.ctx.fillText("WPM: " + `${highScore.WPM}`, this.canvas.width/2 + 80, yPos);
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




  gameOver(wpm, killCount) {
    this.canvas.removeEventListener('click', this.input.focus())
    this.input.removeEventListener('keydown', this.handleZombie);
    this.input.removeEventListener('input', this.startTimer)
    this.wordList.innerHTML = "";
    this.input.value = "";
    this.input.disabled = true;
    this.input.style.display = "none";
    this.killCount = killCount;
    this.wpm = wpm;

    debugger
    console.log(highScores[0])
    if (killCount > this.highScores[0].score || (this.highScores.length < 5 && killCount > 0)) {
      window.highScoreInterval = setInterval(this.highScoreAnimate, 100);
    } else {
      this.scoreInput.removeEventListener('keydown', handleHighScore);
      this.scoreInput.hidden = true;
      this.scoreInput.disabled = true;
      this.endCounter = 0;
      this.fade = 0;
      this.canvas.className = "game-over-screen";
      window.overInterval = setInterval(this.gameOverAnimate, 100);
    }
  }

  gameOverAnimate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    startScreen.draw();
    this.drawGameOver();
    
    this.fade += .05;
    this.endCounter += .5;
    if (this.fade >= 1) {
      this.fade = 1;
    }
    if (this.endCounter >= 10) {
      this.drawGameOverWPM(this.wpm);
    }
    if (this.endCounter >= 12.5) {
      this.drawGameOverKills(this.killCount);
    }
    if (this.endCounter >= 15) {
      this.drawHighScores(this.killCount);
    }
    if (this.endCounter >= 17.5) {
      this.canvas.addEventListener('click', startGame)
      this.page.addEventListener('keydown', startGame)
      if (endCounter % 10 >= 5) {
        this.drawRestartClick();
      } else {
        null;
      }
    }
  }


  highScoreAnimate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.scoreInput.hidden = false;
    this.scoreInput.disabled = false;
    this.scoreInput.focus();
    this.scoreInput.addEventListener('keydown', this.handleHighScore)
    startScreen.draw();
    this.drawHighScoreInput();
  }


  handleHighScore(e) {
    if (e.keyCode === 13) {
      this.highScoreName = this.scoreInput.value;

      firebase.database().ref("highScores").push({ "name": highScoreName, "score": killCount, 'WPM': wpm })
      clearInterval(window.highScoreInterval); 

      this.scoreInput.removeEventListener('keydown', this.handleHighScore);
      this.scoreInput.hidden = true;
      this.scoreInput.disabled = true;
      this.scoreInput.value = "";
      this.endCounter = 0;
      this.fade = 0;
      this.canvas.className = "game-over-screen";
      window.overInterval = setInterval(this.gameOverAnimate, 100);
    }
  }

}

export default GameOverScreen;