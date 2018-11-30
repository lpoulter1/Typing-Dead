import Zombie from "./zombie";
import { drawPlayer } from "./player";
import { randomWord } from "./dictionary";


document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const input = document.getElementById('typing-form');
  
  let zombies = {};
  let x = -100;
  let y = canvas.height / 2;
  let dx = .7;
  let health = 100;
  let zombieCount = 0;
  let counter = 0;
  const background = new Image();
  
  function renderGame() {
    background.src = "http://www.samskirrow.com/background.png";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let randomSpawn = Math.floor(Math.random() * 150) + 50;
    if (counter % randomSpawn === 0) {
      zombies[`zombie${zombieCount}`] = new Zombie(ctx, randomWord(), x, Math.floor(Math.random() * y) + 100);
      zombieCount += 1;
    }
    for (let zomb in zombies) {
      let {x, y, word} = zombies[zomb];
      zombies[zomb].draw()
      if (x < canvas.width - 200) {
        zombies[zomb].x+=dx;
      } else if (health > 0 && Object.keys(zombies).length) {
        health -= .3
        console.log(health)
      }
    }
    for (let zomb in zombies) {
      zombies[zomb].drawText()
    }
    counter += 1;
    console.log(counter)

    if (health > 0) {
      drawPlayer(ctx);
    }
  }

  input.addEventListener('keyup', handleZombie)
  function handleZombie (e) {
    if (e.keyCode === 13) {
      for (let zomb in zombies) {
        if (input.value === zombies[zomb].word) {
          delete zombies[zomb];
        }
      }
      console.log(input.value);
      input.value = "";
    } else {
      null
    }
  }

  if (canvas.className === "game-screen") {
    setInterval(renderGame, 10);
  } else {

  }
  // setInterval(renderZombies, 1000);
})
