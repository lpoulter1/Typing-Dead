import Zombie from "./zombie";
import { drawPlayer, drawHealth, drawKillCount } from "./player";
import { randomWord } from "./dictionary";
import StartScreen from "./start_screen";

// 1160 x 90

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const input = document.getElementById('typing-form');

  let zombies = {};
  let dx = 3.5;
  let dy = 0;
  let health = 100;
  let zombieCount = 0;
  let counter = 0;
  let round = 1;
  let shift = 0;
  let deadShift = 575;
  let alive = true;
  let killCount = 0;
  
  function spawnZombies() {
    let x = -100;
    let y = Math.floor(Math.random() * (canvas.height-150)) + 50;
    let randomSpawn = Math.floor(Math.random() * 5) + (30 - round);

    // for (let zomb in zombies) {
    //   if (zombies[zomb].x <= 150) {
    //     while (y < zombies[zomb].y + 100 && y > zombies[zomb].y - 100) {
    //       y = Math.floor(Math.random() * (canvas.height-150)) + 50;
    //     }
    //   }
    // }

    // if (Object.values(zombies).length > 0) {
    //   let lastZombie = Object.values(zombies)[Object.values(zombies).length - 1]
    //   if (lastZombie.x <= 150) {
    //     while (y < lastZombie.y + 100 && y > lastZombie.y - 100) {
    //       y = Math.floor(Math.random() * (canvas.height - 150)) + 50;
    //     }
    //   }
    // }

    if (counter % randomSpawn === 0) {
      zombies[`zombie${zombieCount}`] = new Zombie(ctx, randomWord(), x, y, dy, shift, deadShift, alive);
      zombieCount += 1;
    }
    console.log(counter)
  }
  
  function renderGame() {
    debugger
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    spawnZombies();

    for (let zomb in zombies) {
      let { x, y, img, shift } = zombies[zomb];
      if (zombies[zomb].alive) {
        zombies[zomb].draw()
        if (x < canvas.width - 200) {
          zombies[zomb].x += dx;
          zombies[zomb].y += zombies[zomb].dy;
          zombies[zomb].shift += 100.75;
          if (zombies[zomb].shift >= 1155) {
            zombies[zomb].shift = 0;
          }
          Object.values(zombies).forEach((zombie, idx) => {
            if (idx < parseInt(zomb.slice(6))+2 && idx > parseInt(zomb.slice(6))) {
              if (zombies[zomb].x >= 30) {
                if (zombies[zomb].y < zombie.y && zombies[zomb].y > zombie.y - 30) {
                  zombies[zomb].dy = -1;
                } else if (zombies[zomb].y <= zombie.y + 30 && zombies[zomb].y >= zombie.y) {
                  zombies[zomb].dy = 1;
                } else {
                  zombies[zomb].dy = 0;
                }
              }
            }
          })
        } else if (health > 0) {
          health -= .1
          console.log(health)
        }
        if (zombies[zomb].x > 400) {
          if (zombies[zomb].y < canvas/2) {
            zombies[zomb].dy = 2;
          } else if (zombies[zomb].y > canvas/2) {
            zombies[zomb].dy = -2;
          } else {
            zombies[zomb].dy = 0;
          }
        }
      } else {
        zombies[zomb].drawDead();
        zombies[zomb].deadShift += 97;
        if (zombies[zomb].deadShift >= 1250) {
          zombies[zomb].deadShift = 1254;
        }
      }
    }

    for (let zomb in zombies) {
      if (zombies[zomb].alive) {
        zombies[zomb].drawText()
      } else {
        
      }
    }
    
    if (counter % 2000 === 0) {
      console.log(round)
      round += 1
    }
    counter += 10;

    if (health > 0) {
      drawPlayer(ctx);
    } else {
      health = 0;
    }
    drawHealth(ctx, health);
    drawKillCount(ctx, killCount);
  }

  input.addEventListener('keyup', handleZombie)
  function handleZombie(e) {
    if (e.keyCode === 13) {
      for (let zomb in zombies) {
        if (input.value === zombies[zomb].word) {
          killCount += 1;
          zombies[zomb].word = ""
          zombies[zomb].alive = false;
          break;
        }
      }
      console.log(input.value);
      input.value = "";
    } else {
      null
    }
  }

  if (canvas.className === "game-screen") {
    setInterval(renderGame, 100);
  } else if (canvas.className === "game-over-screen") {

  } else if (canvas.className === "start-screen") {
    StartScreen.draw();
  }
})
