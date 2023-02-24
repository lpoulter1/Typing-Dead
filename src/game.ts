import { CustomWindow } from "./custom.window";
import Zombie from "./zombie";
// @ts-ignore
import Player from "./player";
import Dictionary from "./dictionary";
import GameOverScreen from "./game_over_screen";

declare let window: CustomWindow;

class Game {
  page: HTMLBodyElement;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  wordList: HTMLUListElement;
  input: HTMLInputElement;
  scoreInput: HTMLInputElement;
  player: any;
  dictionary: Dictionary;
  gameOverScreen: GameOverScreen;
  zombies: { [id: string]: Zombie };
  zombieCount: number;
  counter: number;
  round: number;
  alive: boolean;
  inputTimer: number;
  attackTimer: any;
  typeStart: number;
  typeEnd: number;
  then: number;

  constructor(
    page: HTMLBodyElement,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    wordList: HTMLUListElement,
    input: HTMLInputElement,
    scoreInput: HTMLInputElement
  ) {
    this.page = page;
    this.ctx = ctx;
    this.canvas = canvas;
    this.wordList = wordList;
    this.input = input;
    this.scoreInput = scoreInput;

    this.player = new Player(ctx, canvas);
    this.dictionary = new Dictionary();
    this.gameOverScreen = new GameOverScreen(ctx, canvas);

    this.zombies = {};
    this.zombieCount = 0;
    this.counter = 0;
    this.round = 1;
    this.alive = true;
    this.inputTimer = 0;
    this.attackTimer;
    this.typeStart = 0;
    this.typeEnd = 0;
    this.then = Date.now();

    this.drawMenuBackground = this.drawMenuBackground.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.spawnZombies = this.spawnZombies.bind(this);
    this.handleZombie = this.handleZombie.bind(this);
    this.separateHorde = this.separateHorde.bind(this);
    this.startGame = this.startGame.bind(this);
    this.render = this.render.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.gameOverAnimate = this.gameOverAnimate.bind(this);
    this.handleHighScore = this.handleHighScore.bind(this);
    this.highScoreAnimate = this.highScoreAnimate.bind(this);
  }

  drawMenuBackground() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.fill();
    this.ctx.closePath();
  }

  resetGame() {
    this.zombies = {};
    this.player.health = 100;
    this.zombieCount = 0;
    this.counter = 0;
    this.round = 1;
    this.alive = true;
    this.player.killCount = 0;
  }

  startTimer(e: Event) {
    // @ts-ignore
    if (this.typeStart === 0 && e.target?.value != " ") {
      this.typeStart = Date.now();
    }
  }

  spawnZombies() {
    console.log("this", this.zombies);
    let x = -100;
    let y = Math.floor(Math.random() * (this.canvas.height - 150)) + 50;

    for (let zomb in this.zombies) {
      if (this.zombies[zomb].x <= 150) {
        while (
          y < this.zombies[zomb].y + 100 &&
          y > this.zombies[zomb].y - 100
        ) {
          y = Math.floor(Math.random() * (this.canvas.height - 150)) + 50;
        }
      }
    }

    let randomSpawn = Math.floor(Math.random() * 2.5) + (250 - this.round);
    if (this.counter % randomSpawn < this.round) {
      this.zombies[`zombie${this.zombieCount}`] = new Zombie(
        this.ctx,
        this.canvas,
        this.dictionary.randomWord(),
        x,
        y,
        this.alive
      );
      this.zombieCount += 1;
    }
  }

  handleZombie(e: KeyboardEvent) {
    if (e.key === "32" || e.key === "Enter") {
      let value = this.input.value.trim();
      for (let zomb in this.zombies) {
        if (value === this.zombies[zomb].word) {
          this.attackTimer = this.counter;
          this.player.attack = true;
          this.player.killCount += 1;
          this.zombies[zomb].word = null;
          this.zombies[zomb].alive = false;
          break;
        }
      }
      this.input.value = "";
      if (this.typeStart > 0) {
        this.typeEnd = Date.now();
        this.inputTimer += (this.typeEnd - this.typeStart) / 1000;
      }
      this.typeStart = 0;
    }
  }

  separateHorde(zombieKey: string, currentZombie: Zombie) {
    Object.values(this.zombies).forEach((otherZombie, idx) => {
      if (
        idx < parseInt(zombieKey.slice(6)) + 8 &&
        idx > parseInt(zombieKey.slice(6))
      ) {
        if (currentZombie.x >= 20 && otherZombie.alive) {
          if (
            currentZombie.y < otherZombie.y &&
            currentZombie.y > otherZombie.y - 30
          ) {
            currentZombie.dy = -1;
          } else if (
            currentZombie.y <= otherZombie.y + 30 &&
            currentZombie.y >= otherZombie.y
          ) {
            currentZombie.dy = 1;
          } else if (currentZombie.y === otherZombie.y) {
            currentZombie.dy = 1;
          } else {
            currentZombie.dy = 0;
          }
        }
      }
    });
  }

  startGame(e: KeyboardEvent | MouseEvent) {
    if (
      (e instanceof MouseEvent && e.button === 0) ||
      (e instanceof KeyboardEvent && e.key === "Enter")
    ) {
      this.canvas.removeEventListener("click", this.startGame);
      this.page.removeEventListener("keydown", this.startGame);
      this.resetGame();
      clearInterval(window.startInterval);
      clearInterval(window.overInterval);
      this.canvas.className = "game-screen";
      requestAnimationFrame(this.render);
      this.input.disabled = false;
      this.input.style.display = "block";
      this.input.focus();
    }
  }

  render() {
    let request = requestAnimationFrame(this.render);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.addEventListener("click", () => this.input.focus());
    this.input.addEventListener("keydown", this.handleZombie);
    this.input.addEventListener("input", this.startTimer);

    let fps = 12;
    let interval = 1000 / fps;
    let now = Date.now();
    let delta = now - this.then;

    setInterval(() => {
      this.counter += 10;
    }, 5);

    if (this.counter % 10000 === 0) {
      this.round += 0.5;
    }

    if (this.player.killCount / (this.inputTimer / 60)) {
      this.player.wpm = (
        this.player.killCount /
        (this.inputTimer / 60)
      ).toFixed(2);
    } else {
      this.player.wpm = 0;
    }

    this.spawnZombies();
    this.player.drawWordList(this.zombies);
    this.player.drawWPM();
    this.player.drawKillCount();

    for (let zomb in this.zombies) {
      let { x } = this.zombies[zomb];

      if (this.zombies[zomb].alive) {
        if (x < this.canvas.width - 200) {
          this.zombies[zomb].draw();
          this.zombies[zomb].converge();

          if (delta > interval) {
            this.then = now - (delta % interval);
            this.zombies[zomb].animateMovement();
          }

          this.separateHorde(zomb, this.zombies[zomb]);
        } else {
          this.zombies[zomb].drawAttack();

          if (delta > interval) {
            this.then = now - (delta % interval);
            this.zombies[zomb].animateAttack();
            this.player.health -= 0.3;
          }
        }
      } else {
        this.zombies[zomb].drawDead();
        if (delta > interval) {
          this.then = now - (delta % interval);
          this.zombies[zomb].animateDead();
        }
      }
    }

    for (let zomb in this.zombies) {
      if (this.zombies[zomb].alive) {
        this.zombies[zomb].drawText();
      }
    }

    if (this.player.health > 0) {
      this.player.drawHealth();
      this.player.draw();
      if (this.counter - this.attackTimer > 4000) {
        this.player.attack = false;
      }
    } else if (this.player.health <= 0) {
      this.player.health = 0;
      this.player.drawHealth();
      clearInterval(window.intervalId);
      cancelAnimationFrame(request);
      this.gameOver();
    }
  }

  gameOver() {
    this.canvas.removeEventListener("click", () => this.input.focus());
    this.input.removeEventListener("keydown", this.handleZombie);
    this.input.removeEventListener("input", this.startTimer);
    this.wordList.innerHTML = "";
    this.input.value = "";
    this.input.disabled = true;
    this.input.style.display = "none";

    const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");

    if (
      highScores === null ||
      this.player.killCount > highScores[0].score ||
      (highScores.length < 5 && this.player.killCount > 0)
    ) {
      window.highScoreInterval = setInterval(this.highScoreAnimate, 100);
    } else {
      this.scoreInput.removeEventListener("keydown", this.handleHighScore);
      this.scoreInput.hidden = true;
      this.scoreInput.disabled = true;
      this.gameOverScreen.endCounter = 0;
      this.gameOverScreen.fade = 0;
      this.canvas.className = "game-over-screen";
      window.overInterval = setInterval(this.gameOverAnimate, 100);
    }
  }

  gameOverAnimate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawMenuBackground();
    this.gameOverScreen.drawGameOver();

    this.gameOverScreen.fade += 0.05;
    this.gameOverScreen.endCounter += 0.5;
    if (this.gameOverScreen.fade >= 1) {
      this.gameOverScreen.fade = 1;
    }
    if (this.gameOverScreen.endCounter >= 10) {
      this.gameOverScreen.drawGameOverWPM(this.player.wpm);
    }
    if (this.gameOverScreen.endCounter >= 12.5) {
      this.gameOverScreen.drawGameOverKills(this.player.killCount);
    }
    if (this.gameOverScreen.endCounter >= 15) {
      this.gameOverScreen.drawHighScores(this.player.killCount);
    }
    if (this.gameOverScreen.endCounter >= 17.5) {
      this.canvas.addEventListener("click", this.startGame);
      this.page.addEventListener("keydown", this.startGame);
      if (this.gameOverScreen.endCounter % 10 >= 5) {
        this.gameOverScreen.drawRestartClick();
      }
    }
  }

  highScoreAnimate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.scoreInput.hidden = false;
    this.scoreInput.disabled = false;
    this.scoreInput.focus();
    this.scoreInput.addEventListener("keydown", this.handleHighScore);
    this.drawMenuBackground();
    this.gameOverScreen.drawHighScoreInput();
  }

  handleHighScore(e: KeyboardEvent) {
    if (e.key === "Enter") {
      let highScoreName = this.scoreInput.value;

      const currentHighScores = JSON.parse(
        localStorage.getItem("highScores") || "[]"
      );
      localStorage.setItem(
        "highScores",
        JSON.stringify([
          ...currentHighScores,
          {
            name: highScoreName,
            score: this.player.killCount,
            wpm: this.player.wpm,
          },
          currentHighScores,
        ])
      );

      clearInterval(window.highScoreInterval);

      this.scoreInput.removeEventListener("keydown", this.handleHighScore);
      this.scoreInput.hidden = true;
      this.scoreInput.disabled = true;
      this.scoreInput.value = "";
      this.gameOverScreen.endCounter = 0;
      this.gameOverScreen.fade = 0;
      this.canvas.className = "game-over-screen";
      window.overInterval = setInterval(this.gameOverAnimate, 100);
    }
  }
}

export default Game;
