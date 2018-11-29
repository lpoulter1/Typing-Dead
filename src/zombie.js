
const frameWidth = 100;
const frameHeight = 144;

function animate(ctx, image, x, y, shift) {
  ctx.drawImage(image, shift, 165, frameWidth, frameHeight,
  x, 150, frameWidth, frameHeight)
}


export const drawZombie = (ctx, word, x, y, shift) => {

  const zombieImage = new Image();
  zombieImage.src = "../assets/zombie_sprite.png";

  animate(ctx, zombieImage, x, y, shift);

  ctx.beginPath();
  ctx.fillStyle = "#F8030F";
  ctx.fillRect(x, y, 35, 70);
  ctx.fillStyle = "black";
  ctx.font = "20pt sans-serif";
  ctx.fillText(word, x-8, y-5);
  ctx.closePath();
}

export const drawText = (ctx) => {
  ctx.beginPath();

  ctx.fillStyle = "red";
  ctx.fillRect(x, y, 35, 70);
  ctx.fillStyle = "black";
  ctx.font = "20pt sans-serif";
  ctx.fillText("word1", 145, canvas.height / 2 - 70);
}
