import Zombie from "./zombie";
import { drawPlayer, drawHealth } from "./player";
import { randomWord } from "./dictionary";

// 1160 x 90

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const input = document.getElementById('typing-form');

  let zombies = {};
  let dx = 5;
  let health = 100;
  let zombieCount = 0;
  let counter = 0;
  let round = 1;
  let shift = 0;
  let deadShift = 575;
  let alive = true;
  
  function spawnZombies() {
    let x = -100;
    let y = Math.floor(Math.random() * (canvas.height-150)) + 50;
    let randomSpawn = Math.floor(Math.random() * 5) + 28;

    for (let zomb in zombies) {
      if (zombies[zomb].x <= 150) {
        if (y < zombies[zomb].y + 100 && y > zombies[zomb].y - 100) {
          y = Math.floor(Math.random() * (canvas.height-150)) + 50;
        }
      }
    }

    if (counter % randomSpawn === 0) {
      zombies[`zombie${zombieCount}`] = new Zombie(ctx, randomWord(), x, y, shift, deadShift, alive);
      zombieCount += 1;
    }
    console.log(counter)
  }
  
  function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    spawnZombies();

    for (let zomb in zombies) {
      let { x, y, img, shift } = zombies[zomb];
      if (zombies[zomb].alive) {
        zombies[zomb].draw()
        if (x < canvas.width - 200) {
          zombies[zomb].x += dx;
          zombies[zomb].shift += 100.75;
          if (zombies[zomb].shift >= 1155) {
            zombies[zomb].shift = 0;
          }
        } else if (health > 0 && Object.keys(zombies).length >= 1) {
          health -= .1
          console.log(health)
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
    counter += 10;

    if (health > 0) {
      drawPlayer(ctx);
    } else {
      health = 0;
    }
    drawHealth(ctx, health)
  }

  input.addEventListener('keyup', handleZombie)
  function handleZombie(e) {
    if (e.keyCode === 13) {
      for (let zomb in zombies) {
        if (input.value === zombies[zomb].word) {
          // delete zombies[zomb];
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
    setInterval(renderGame, 150);
  } else if (canvas.className === "game-over-screen") {

  }
})
