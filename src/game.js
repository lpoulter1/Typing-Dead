import Zombie from './zombie';
import Player from './player';
import Dictionary from './dictionary';

class Game {
  constructor(page, ctx, canvas, wordList, input) {
    this.page = page;
    this.ctx = ctx;
    this.canvas = canvas;
    this.wordList = wordList;
    this.input = input;

    this.player = new Player(this.ctx);
    this.dictionary = new Dictionary();

    this.zombies = {};
    this.dx = 2.5;
    this.dy = 0;
    this.health = 100;
  }

  resetGame() {
    zombies = {};
    dx = 2.5;
    dy = 0;
    health = 100;
    zombieCount = 0;
    counter = 0;
    round = 1;
    alive = true;
    killCount = 0;
    timer = 0;
  }

  spawnZombies() {
    let x = -100;
    let y = Math.floor(Math.random() * (canvas.height-150)) + 50;
    
    for (let zomb in this.zombies) {
      if (this.zombies[zomb].x <= 150) {
        while (y < this.zombies[zomb].y + 100 && y > this.zombies[zomb].y - 100) {
          y = Math.floor(Math.random() * (canvas.height-150)) + 50;
        }
      }
    }
    let randomSpawn = Math.floor(Math.random() * 2.5) + (250 - round);
    if (counter % randomSpawn <= 2) {
      this.zombies[`zombie${zombieCount}`] = new Zombie(ctx, dictionary.randomWord(), 
                                                        x, y, this.dy, this.alive);
      this.zombieCount += 1;
    }
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener('click', input.focus())
    input.addEventListener('keydown', handleZombie);
    input.addEventListener('input', startTimer);
    let request = requestAnimationFrame(renderGame);
    
    now = Date.now();
    delta = now - then;
    
    if ((killCount / (timer / 60))) {
      wpm = (killCount / (timer / 60)).toFixed(2);
    } else {
      wpm = 0;
    }

    spawnZombies();
    this.player.drawWordList(zombies);
    this.player.drawWPM(wpm);
      
    if (delta > interval2) {
      then = now - (delta % interval);
      for (let zomb in zombies) {
        let { x } = zombies[zomb];
        if (zombies[zomb].alive) {
          if (x < canvas.width - 200) {
            zombies[zomb].draw()
            if (zombies[zomb].x > 350) {
              if (zombies[zomb].y < canvas.height / 2) {
                zombies[zomb].dy = 2;
              } else if (zombies[zomb].y > canvas.height / 2) {
                zombies[zomb].dy = -2;
              } else {
                zombies[zomb].dy = 0;
              }
            }
            if (delta > interval) {
              then = now - (delta % interval);
              zombies[zomb].x += dx;
              zombies[zomb].y += zombies[zomb].dy;
              zombies[zomb].shift += 100.75;
              if (zombies[zomb].shift >= 1155) {
                zombies[zomb].shift = 0;
              }
            }
            Object.values(zombies).forEach((zombie, idx) => {
              if (idx < parseInt(zomb.slice(6))+3 && idx > parseInt(zomb.slice(6))) {
                if (zombies[zomb].x >= 20) {
                  if (zombies[zomb].y < zombie.y && zombies[zomb].y > zombie.y - 30) {
                    zombies[zomb].dy = -1;
                  } else if (zombies[zomb].y <= zombie.y + 30 && zombies[zomb].y >= zombie.y) {
                    zombies[zomb].dy = 1;
                  } else if (zombies[zomb].y === zombie.y) {
                    zombies[zomb].dy = 1;
                  } else {
                    zombies[zomb].dy = 0;
                  }
                }
              }
            })
          } else {
            zombies[zomb].drawAttack();
            if (delta > interval) {
              then = now - (delta % interval);
              zombies[zomb].deadShift += 97;
              if (zombies[zomb].deadShift >= 1140) {
                zombies[zomb].deadShift = 0;
              }
              this.health -= .3;
              this.player.health -= .3;
            }
          }
        } else {
          zombies[zomb].drawDead();
          if (delta > interval) {
            then = now - (delta % interval);
            zombies[zomb].deadShift += 97;
            if (zombies[zomb].deadShift >= 1250) {
              zombies[zomb].deadShift = 1254;
            }
          }
        }
      }
    }

    for (let zomb in zombies) {
      if (zombies[zomb].alive) {
        zombies[zomb].drawText()
      }
    }

    if (counter % 1000 === 0) {
      round += .5
    }

    setInterval(() => {
      counter += 10
    }, 500)

    this.player.drawKillCount(killCount);
    if (this.health > 0) {
      this.player.drawHealth();
      this.player.draw(playerAttack);
      if (counter - attackTimer > 50) {
        playerAttack = false;
      }
    } else if (this.health <= 0) {
      this.health = 0;
      this.player.drawHealth();
      clearInterval(window.intervalId);
      cancelAnimationFrame(request)
      gameOver();
    }
  }
}

export default Game;