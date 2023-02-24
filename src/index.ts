import { CustomWindow } from "./custom.window";
// @ts-ignore
import StartScreen from "./start_screen";
// @ts-ignore
import Game from "./game";

declare let window: CustomWindow;

document.addEventListener("DOMContentLoaded", () => {
  const page = document.getElementById("page") as HTMLBodyElement;
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const input = document.getElementById("typing-form") as HTMLInputElement;
  const wordList = document.getElementById("word-list") as HTMLUListElement;
  const scoreInput = document.getElementById(
    "high-score-form"
  ) as HTMLInputElement;

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
      startCounter += 0.5;
      if (startCounter % 10 <= 6) {
        startScreen.drawStartClick();
      } else {
        null;
      }
      canvas.addEventListener("click", game.startGame);
      page.addEventListener("keydown", game.startGame);
    }
    startScreen.drawTitle(titlepos);
  }

  if (canvas.className === "start-screen") {
    game.drawMenuBackground();

    input.style.display = "none";

    window.startInterval = setInterval(titleDrop, 70);
  }
});
