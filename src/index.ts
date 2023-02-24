import { CustomWindow } from "./custom.window";
import StartScreen from "./start_screen";
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
  canvas.addEventListener("click", game.startGame);
  page.addEventListener("keydown", game.startGame);

  let titlepos = -60;
  let lastTimestamp = 0;
  function titleDrop(timestamp: number) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.drawMenuBackground();
    startScreen.drawTitle(titlepos);
    const hideStartClickDelay = 500;
    const showStartClickDelay = 1500;
    if (titlepos >= 140) {
      if (timestamp - lastTimestamp > hideStartClickDelay) {
        startScreen.drawStartClick();
        if (timestamp - lastTimestamp > showStartClickDelay) {
          lastTimestamp = timestamp;
        }
      }
    } else {
      titlepos += 5;
    }

    requestAnimationFrame(titleDrop);
  }

  if (canvas.className === "start-screen") {
    game.drawMenuBackground();

    input.style.display = "none";

    requestAnimationFrame(titleDrop);
  }
});
