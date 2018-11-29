import { drawZombie, drawText } from "./zombie.js";
import { drawPlayer } from "./player";

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const input = document.getElementById('typing-form');

  const words = ["hello"];
  drawZombie(ctx, "hello");
  drawPlayer(ctx);

  input.addEventListener('keyup', handleZombie)
  function handleZombie (e) {
    if (e.keyCode === 13 && words.includes(input.value)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log(input.value);
      input.value = "";
      drawPlayer(ctx);
    } else if (e.keycode === 13) {
      console.log(input.value);
      input.value = "";
    } else {
      null
    }
  }
  
  
})
