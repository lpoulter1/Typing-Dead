import StartScreen from "./start_screen";
import Game from './game';

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
  const game = new Game(page, ctx, canvas, wordList, input, scoreInput);

  let titlepos = -60;
  let startCounter = 0;

  function titleDrop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.drawMenuBackground();
    titlepos += 5;
    if (titlepos >= 140) {
      titlepos = 140;
      startCounter += .5;
      if (startCounter % 10 <= 6) {
        startScreen.drawStartClick();
      } else {
        null;
      }
      canvas.addEventListener('click', game.startGame)
      page.addEventListener('keydown', game.startGame)
    }
    startScreen.drawTitle(titlepos);
  }

  if (canvas.className === "start-screen") {
    game.drawMenuBackground();

    input.style.display = "none";
    window.startInterval = setInterval(titleDrop, 70);
  }
})
