import Game from './game';
import StartScreen from "./start_screen";
import GameOverScreen from "./game_over_screen";

document.addEventListener('DOMContentLoaded', () => {
  const page = document.getElementById("page")
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const input = document.getElementById('typing-form');
  const wordList = document.getElementById('word-list');
  const scoreInput = document.getElementById('high-score-form');

  let highScores;
  firebase.database().ref("highScores").orderByChild('score').limitToLast(5).on("value", function (snapshot) {
    highScores = Object.values(snapshot.val()).sort((a, b) => b.score - a.score);
  });

  const startScreen = new StartScreen(ctx, canvas);
  const gameOverScreen = new GameOverScreen(ctx, canvas, input, scoreInput, wordList, highScores);
  const game = new Game(page, ctx, canvas, wordList, input, scoreInput, highScores)

  function highScoreAnimate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scoreInput.hidden = false;
    scoreInput.disabled = false;
    scoreInput.focus();
    scoreInput.addEventListener('keydown', handleHighScore)
    startScreen.draw();
    gameOverScreen.drawHighScoreInput(canvas);
  }

  function handleHighScore(e) {
    if (e.keyCode === 13) {
      highScoreName = scoreInput.value;
      firebase.database().ref("highScores").push({ "name": highScoreName, "score": killCount, 'WPM': wpm })
      clearInterval(window.highScoreInterval); 
      scoreInput.removeEventListener('keydown', handleHighScore);
      scoreInput.hidden = true;
      scoreInput.disabled = true;
      scoreInput.value = "";
      endCounter = 0;
      fade = 0;
      canvas.className = "game-over-screen";
      window.overInterval = setInterval(gameOverAnimate, 100);
    }
  }

  let endCounter = 0;
  let fade = 0;

  let highScoreName;
  function gameOver() {
    canvas.removeEventListener('click', input.focus())
    input.removeEventListener('keydown', handleZombie);
    input.removeEventListener('input', startTimer)
    wordList.innerHTML = "";
    input.value = "";
    input.disabled = true;
    input.style.display = "none";
    if (killCount > highScores[0].score || (highScores.length < 5 && killCount > 0)) {
      window.highScoreInterval = setInterval(highScoreAnimate, 100);
    } else {
      scoreInput.removeEventListener('keydown', handleHighScore);
      scoreInput.hidden = true;
      scoreInput.disabled = true;
      endCounter = 0;
      fade = 0;
      canvas.className = "game-over-screen";
      window.overInterval = setInterval(gameOverAnimate, 100);
    }
  }

  function gameOverAnimate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    startScreen.draw();
    gameOverScreen.drawGameOver(fade);
    
    fade += .05;
    endCounter += .5;
    if (fade >= 1) {
      fade = 1;
    }
    if (endCounter >= 10) {
      gameOverScreen.drawGameOverWPM(wpm);
    }
    if (endCounter >= 12.5) {
      gameOverScreen.drawGameOverKills(killCount);
    }
    if (endCounter >= 15) {
      gameOverScreen.drawHighScores(killCount);
    }
    if (endCounter >= 17.5) {
      canvas.addEventListener('click', startGame)
      page.addEventListener('keydown', startGame)
      if (endCounter % 10 >= 5) {
        gameOverScreen.drawRestartClick();
      } else {
        null;
      }
    }
  }

  
  function startGame(e) {
    if (e.keyCode === 13 || e.button === 0) {
      canvas.removeEventListener('click', startGame);
      page.removeEventListener('keydown', startGame);
      resetGame();
      clearInterval(window.startInterval);
      clearInterval(window.overInterval);
      canvas.className = "game-screen";
      requestAnimationFrame(renderGame)
      input.disabled = false;
      input.style.display = "block";
      input.focus();
    }
  }
  
  let titlepos = -60;
  let startCounter = 0;
  function titleDrop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    startScreen.draw();
    titlepos += 5;
    if (titlepos >= 140) {
      titlepos = 140;
      startCounter += .5;
      if (startCounter % 10 <= 6) {
        startScreen.drawStartClick();
      } else {
        null;
      }
      canvas.addEventListener('click', startGame)
      page.addEventListener('keydown', startGame)
    }
    startScreen.drawTitle(titlepos);
  }



  
  if (canvas.className === "start-screen") {
    startScreen.draw();
    input.style.display = "none";
    window.startInterval = setInterval(titleDrop, 70);
  }
})
