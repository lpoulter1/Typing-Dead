import { drawZombie, drawText } from "./zombie.js";
import { drawPlayer } from "./player";

const words = ["hello", "word"];

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const input = document.getElementById('typing-form');
  
  let x = -100;
  let y = canvas.height / 2 - 70;
  let dx = 7;
  let zombieAlive = true;
  let health = 100;
  let shift = 0;
  const frameWidth = 100;
  let totalFrames = 12;
  let currentFrame = 0;

  function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (zombieAlive === true) {
      drawZombie(ctx, "hello", x, y, shift)
    }
    if (x < canvas.width - 200) {
      x+=dx;
      shift+=frameWidth + 1
      currentFrame += 1
      if (currentFrame === totalFrames) {
        shift = 0;
        currentFrame = 0;
      }
    } else if (health > 0) {
      health -= .5
      console.log(health)
    }

    if (health > 0) {
      drawPlayer(ctx);
    }
  }

  input.addEventListener('keyup', handleZombie)
  function handleZombie (e) {
    if (e.keyCode === 13 && words.includes(input.value)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log(input.value);
      input.value = "";
      zombieAlive = false;
      drawPlayer(ctx);
    } else if (e.keycode === 13) {
      console.log(input.value);
      input.value = "";
    } else {
      null
    }
  }
  
  setInterval(draw, 80);
})
