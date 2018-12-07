
export const drawPlayer = (ctx, attack) => {
  const playerImg = new Image();
  playerImg.src = "../Typing-Dead/assets/player.png";
  if (attack) {
    ctx.drawImage(playerImg,
                  225, 239,
                  72, 81,
                  canvas.width - 150, canvas.height / 2,
                  72, 81);
  } else {
    ctx.drawImage(playerImg,
                  297, 240,
                  72, 81,
                  canvas.width - 150, canvas.height / 2,
                  72, 81);
  }
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
    if (zombie.x >= 0 && zombie.alive) {
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
    ctx.fillText("WPM: " + (kills/(timer/60)).toFixed(2), 490, 50);
  } else {
    ctx.fillText("WPM: 0", 490, 50);
  }
  ctx.fill();
  ctx.closePath();
}