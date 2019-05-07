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
  const game = new Game(page, ctx, canvas, wordList, input, scoreInput, highScores)

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

  function startGame(e) {
    if (e.keyCode === 13 || e.button === 0) {
      canvas.removeEventListener('click', startGame);
      page.removeEventListener('keydown', startGame);
      game.resetGame();
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

  if (canvas.className === "start-screen") {
    startScreen.draw();
    input.style.display = "none";
    window.startInterval = setInterval(titleDrop, 70);
  }
})
