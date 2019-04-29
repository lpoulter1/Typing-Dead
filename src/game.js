import Zombie from './zombie';

class Game {
  constructor(page, ctx, canvas, wordList, input, player, dictionary) {
    this.page = page;
    this.ctx = ctx;
    this.canvas = canvas;
    this.wordList = wordList;
    this.input = input;
    this.player = player;
    this.dictionary = dictionary;
  }

  spawnZombies() {
    let x = -100;
    let y = Math.floor(Math.random() * (canvas.height-150)) + 50;
    
    for (let zomb in zombies) {
      if (zombies[zomb].x <= 150) {
        while (y < zombies[zomb].y + 100 && y > zombies[zomb].y - 100) {
          y = Math.floor(Math.random() * (canvas.height-150)) + 50;
        }
      }
    }
    let randomSpawn = Math.floor(Math.random() * 2.5) + (250 - round);
    if (counter % randomSpawn <= 2) {
      zombies[`zombie${zombieCount}`] = new Zombie(ctx, dictionary.randomWord(), x, y, dy, alive);
      zombieCount += 1;
    }
  }



  render() {

  }
}

export default Game;