import playerImageUrl from "./images/player.png";

class Player {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.health = 100;
    this.wpm;
    this.killCount = 0;
    this.attack = false;

    this.playerImg = new Image();
    this.playerImg.src = playerImageUrl;
  }

  draw() {
    if (this.attack) {
      this.ctx.drawImage(
        this.playerImg,
        225,
        239,
        72,
        81,
        canvas.width - 150,
        canvas.height / 2,
        72,
        81
      );
    } else {
      this.ctx.drawImage(
        this.playerImg,
        297,
        240,
        72,
        81,
        canvas.width - 150,
        canvas.height / 2,
        72,
        81
      );
    }
  }

  drawHealthText() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.font = 'bold 18px "Roboto Slab"';
    this.ctx.fillText("Health: ", this.canvas.width - 100, 50);
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawHealth() {
    this.ctx.beginPath();
    this.drawHealthText();
    if (this.health > 30) {
      this.ctx.fillStyle = "#29ff6a";
    } else {
      this.ctx.fillStyle = "red";
    }
    this.ctx.font = 'bold 20px "Roboto Slab"';
    this.ctx.fillText(
      Math.floor(this.health).toString(),
      this.canvas.width - 50,
      50
    );
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawKillCount() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.font = 'bold 18px "Roboto Slab"';
    this.ctx.fillText(
      "Kills: " + this.killCount.toString(),
      this.canvas.width - 210,
      50
    );
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawWordList(zombies) {
    let list = document.getElementById("word-list");
    list.innerHTML = "";

    Object.values(zombies).forEach((zombie) => {
      if (zombie.x >= 350 && zombie.alive) {
        if (zombie.word.length > 0 && list.children.length < 10) {
          list.insertAdjacentHTML("beforeend", `<li>${zombie.word}</li>`);
        }
      }
    });
  }

  drawWPM() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.font = 'bold 18px "Roboto Slab"';

    if (this.wpm) {
      this.ctx.fillText("WPM: " + this.wpm, 480, 50);
    } else {
      this.ctx.fillText("WPM: 0", 480, 50);
    }

    this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Player;
