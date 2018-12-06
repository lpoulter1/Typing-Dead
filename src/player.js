
export const drawPlayer = (ctx) => {
  ctx.beginPath();
  ctx.rect(canvas.width - 150, canvas.height / 2, 35, 70);
  ctx.fillStyle = "#7FFF00";
  ctx.fill();
  ctx.closePath();
}

export const drawHealth = (ctx, health) => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = 'bold 18px "Roboto Slab"';
  ctx.fillText("Health: " + Math.floor(health).toString(), canvas.width - 100, 50);
  ctx.fill();
  ctx.closePath();
}

export const drawKillCount = (ctx, killCount) => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = 'bold 18px "Roboto Slab"';
  ctx.fillText("Kills: " + killCount.toString(), canvas.width - 210, 50);
  ctx.fill();
  ctx.closePath();
}

export const drawWordList = (zombies) => {
  let list = document.getElementById("word-list");
  list.innerHTML = "";
  Object.values(zombies).forEach(zombie => {
    if (zombie.x >= 0) {
      if (zombie.word.length > 0 && list.children.length < 10) {
        list.insertAdjacentHTML("beforeend", `<li>${zombie.word}</li>`);
      }
    }
  })
}

export const drawWPM = (ctx, timer, kills) => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = 'bold 18px "Roboto Slab"';
  if ((kills/(timer/60))) {
    ctx.fillText("WPM: " + (kills/(timer/60)).toFixed(2), 480, 50);
  } else {
    ctx.fillText("WPM: 0", 480, 50);
  }
  ctx.fill();
  ctx.closePath();
}