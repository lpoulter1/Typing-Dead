
class Player {

  constructor(ctx) {
    this.ctx = ctx;
    this.playerImg = newImage();
    playerImg.src = "../../Typing-Dead/public/assets/player.png";
  }

  draw = (attack) => {
    if (attack) {
      this.ctx.drawImage(this.playerImg,
                    225, 239,
                    72, 81,
                    canvas.width - 150, canvas.height / 2,
                    72, 81);
    } else {
      this.ctx.drawImage(this.playerImg,
                    297, 240,
                    72, 81,
                    canvas.width - 150, canvas.height / 2,
                    72, 81);
    }
  }

  drawHealth = (health) => {
    this.ctx.beginPath();
      this.ctx.fillStyle = "white";
      this.ctx.font = 'bold 18px "Roboto Slab"';
      this.ctx.fillText("Health: " + Math.floor(health).toString(), canvas.width - 100, 50);
      this.ctx.fill();
    this.ctx.closePath();
  }

  drawKillCount = (killCount) => {
    this.ctx.beginPath();
      this.ctx.fillStyle = "white";
      this.ctx.font = 'bold 18px "Roboto Slab"';
      this.ctx.fillText("Kills: " + killCount.toString(), canvas.width - 210, 50);
      this.ctx.fill();
    this.ctx.closePath();
  }

  drawWordList = (zombies) => {
    let list = document.getElementById("word-list");
    list.innerHTML = "";

    Object.values(zombies).forEach(zombie => {
      if (zombie.x >= 350 && zombie.alive) {
        if (zombie.word.length > 0 && list.children.length < 10) {
          list.insertAdjacentHTML("beforeend", `<li>${zombie.word}</li>`);
        }
      }
    })
  }

  drawWPM = (wpm) => {
    this.ctx.beginPath();
      this.ctx.fillStyle = "white";
      this.ctx.font = 'bold 18px "Roboto Slab"';

      if (wpm) {
        this.ctx.fillText("WPM: " + wpm, 480, 50);
      } else {
        this.ctx.fillText("WPM: 0", 480, 50);
      }
      
      this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Player;