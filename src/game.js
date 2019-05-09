import Zombie from './zombie';
import Player from './player';
import Dictionary from './dictionary';
import GameOverScreen from './game_over_screen';

class Game {
  constructor(page, ctx, canvas, wordList, input, scoreInput) {
    this.page = page;
    this.ctx = ctx;
    this.canvas = canvas;
    this.wordList = wordList;
    this.input = input;
    this.scoreInput = scoreInput;

    this.player = new Player(ctx, canvas);
    this.dictionary = new Dictionary();
    this.gameOverScreen = new GameOverScreen(page, ctx, canvas, wordList, input, scoreInput);

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
  }

  drawMenuBackground() {
    this.ctx.beginPath();
      this.ctx.rect(0, 0, canvas.width, canvas.height);
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
  
  startTimer(e) {
    if (this.typeStart === 0 && e.target.value != " ") {
      this.typeStart = Date.now();
    }
  }

  spawnZombies() {
    let x = -100;
    let y = Math.floor(Math.random() * (this.canvas.height-150)) + 50;
    
    // for (let zomb in this.zombies) {
      if(this.zombieCount > 0) {
        if (this.zombies[`zombie${this.zombieCount - 1}`].x <= 150) {
          while (y < this.zombies[`zombie${this.zombieCount - 1}`].y + 100 && 
                 y > this.zombies[`zombie${this.zombieCount - 1}`].y - 100) {
            y = Math.floor(Math.random() * (this.canvas.height-150)) + 50;
          }
        }
      }
    // }

    let randomSpawn = Math.floor(Math.random() * 5) + (250 - this.round);
    debugger
    if (this.counter % randomSpawn <= 2) {
      this.zombies[`zombie${this.zombieCount}`] = new Zombie(this.ctx, this.canvas, this.dictionary.randomWord(), 
                                                             x, y, this.alive, this.player);
      this.zombieCount += 1;
    }
  }

  handleZombie(e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
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
        this.inputTimer += (this.typeEnd - this.typeStart)/1000;
      }
      this.typeStart = 0;
    } 
  }

  separateHorde() {
    for (let zomb in this.zombies) {
      Object.values(this.zombies).forEach((zombie, idx) => {
        if (idx < parseInt(zomb.slice(6))+3 && idx > parseInt(zomb.slice(6))) {
          if (this.zombies[zomb].x >= 20) {
            if (this.zombies[zomb].y < zombie.y && this.zombies[zomb].y > zombie.y - 30) {
              this.zombies[zomb].dy = -1;
            } else if (this.zombies[zomb].y <= zombie.y + 30 && this.zombies[zomb].y >= zombie.y) {
              this.zombies[zomb].dy = 1;
            } else if (this.zombies[zomb].y === zombie.y) {
              this.zombies[zomb].dy = 1;
            } else {
              this.zombies[zomb].dy = 0;
            }
          }
        }
      })
    }
  }

  startGame(e) {
    if (e.keyCode === 13 || e.button === 0) {
      this.canvas.removeEventListener('click', this.startGame);
      this.page.removeEventListener('keydown', this.startGame);
      this.resetGame();
      clearInterval(window.startInterval);
      clearInterval(window.overInterval);
      this.canvas.className = "game-screen";
      requestAnimationFrame(this.render)
      this.input.disabled = false;
      this.input.style.display = "block";
      this.input.focus();
    }
  }

  render() {
    let request = requestAnimationFrame(this.render);
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.addEventListener('click', this.input.focus())
    this.input.addEventListener('keydown', this.handleZombie);
    this.input.addEventListener('input', this.startTimer);

    let fps = 12;
    let interval = 1000 / fps;
    let now = Date.now();
    let delta = now - this.then;

    setInterval(() => {
      this.counter += 10
    }, 5)

    if (this.counter % 1000 === 0) {
      this.round += .5
    }
    
    if ((this.player.killCount / (this.inputTimer / 60))) {
      this.player.wpm = (this.player.killCount / (this.inputTimer / 60)).toFixed(2);
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
          this.zombies[zomb].draw()
          this.zombies[zomb].converge();
          if (delta > interval) {
            this.then = now - (delta % interval);
            this.zombies[zomb].animateMovement();
          }
          this.separateHorde();
        } else {
          this.zombies[zomb].drawAttack();
          if (delta > interval) {
            this.then = now - (delta % interval);
            this.zombies[zomb].animateAttack();
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
        this.zombies[zomb].drawText()
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
      this.gameOverScreen.gameOver(this.player.wpm, this.player.killCount);
    }
  }
}

export default Game;