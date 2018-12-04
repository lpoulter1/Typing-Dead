import Zombie from "./zombie";
import { drawPlayer, drawHealth } from "./player";
import { randomWord } from "./dictionary";

// 1160 x 90

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const input = document.getElementById('typing-form');

  let zombies = {};
  let dx = 7;
  let health = 100;
  let zombieCount = 0;
  let counter = 0;
  let round = 1;
  let shift = 0;
  let alive = true;

  function spawnZombies() {
    let x = -100;
    let y = Math.floor(Math.random() * (canvas.height-150)) + 50;
    let randomSpawn = Math.floor(Math.random() * 20) + 50;

    for (let zomb in zombies) {
      if (zombies[zomb].x <= 150) {
        if (y < zombies[zomb].y + 100 && y > zombies[zomb].y - 100) {
          y = Math.floor(Math.random() * (canvas.height-150)) + 50;
        }
      }
    }

    if (counter % randomSpawn === 0) {
      zombies[`zombie${zombieCount}`] = new Zombie(ctx, randomWord(), x, y, shift, alive);
      zombieCount += 1;
    }
    console.log(counter)
  }
  
  
  function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    spawnZombies();

    for (let zomb in zombies) {
      let { x, y, img, shift } = zombies[zomb];
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
    }
    for (let zomb in zombies) {
      zombies[zomb].drawText()
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
    setInterval(renderGame, 90);
  } else if (canvas.className === "game-over-screen") {

  }
})
