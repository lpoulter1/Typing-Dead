export const drawZombie = (ctx, word) => {
  ctx.beginPath();
  ctx.fillStyle = "#F8030F";
  ctx.fillRect(150, canvas.height / 2 - 70, 35, 70);
  ctx.fillStyle = "black";
  ctx.font = "20pt sans-serif";
  ctx.fillText(word, 150, canvas.height / 2 - 70);
  ctx.closePath();
}

export const drawText = (ctx) => {
  ctx.beginPath();

  ctx.fillStyle = "red";
  ctx.fillRect(150, canvas.height/2 - 70, 35, 70);
  ctx.fillStyle = "black";
  ctx.font = "20pt sans-serif";
  ctx.fillText("word1", 150, canvas.height / 2 - 70);
}
