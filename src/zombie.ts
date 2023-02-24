import zombieImageUrl from "./images/zombie.png";

class Zombie {
  ctx: any;
  canvas: any;
  word: string | null;
  x: number;
  y: number;
  dx: number;
  dy: number;
  shift: number;
  deadShift: number;
  alive: boolean;
  zombieImg: HTMLImageElement;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    word: string,
    x: number,
    y: number,
    alive: boolean
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.word = word;
    this.x = x;
    this.y = y;
    this.dx = 2.5;
    this.dy = 0;
    this.shift = 0;
    this.deadShift = 575;
    this.alive = alive;

    this.zombieImg = new Image();
    this.zombieImg.src = zombieImageUrl;
  }

  draw() {
    this.ctx.drawImage(
      this.zombieImg,
      this.shift,
      88,
      50,
      90,
      this.x,
      this.y,
      50,
      90
    );
  }

  drawDead() {
    this.ctx.drawImage(
      this.zombieImg,
      this.deadShift,
      270,
      50,
      90,
      this.x,
      this.y,
      50,
      90
    );
  }

  drawAttack() {
    this.ctx.drawImage(
      this.zombieImg,
      this.deadShift,
      178,
      75,
      90,
      this.x,
      this.y,
      55,
      90
    );
  }

  drawText() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#13ffde";
    this.ctx.font = 'bold 18px "Roboto Slab"';
    this.ctx.fillText(this.word, this.x + 20, this.y - 7);
    this.ctx.fill();
    this.ctx.shadowBlur = 3;
    this.ctx.font = '19px "Roboto Slab"';
    this.ctx.closePath();
  }

  converge() {
    if (this.x > 350) {
      if (this.y < this.canvas.height / 2) {
        this.dy = 2;
      } else if (this.y > this.canvas.height / 2) {
        this.dy = -2;
      } else {
        this.dy = 0;
      }
    }
  }

  animateMovement() {
    this.x += this.dx;
    this.y += this.dy;
    this.shift += 100.75;
    if (this.shift >= 1155) {
      this.shift = 0;
    }
  }

  animateAttack() {
    this.deadShift += 97;
    if (this.deadShift >= 1140) {
      this.deadShift = 0;
    }
  }

  animateDead() {
    this.deadShift += 97;
    if (this.deadShift >= 1250) {
      this.deadShift = 1254;
    }
  }
}

export default Zombie;
