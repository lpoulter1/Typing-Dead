import Zombie from "./zombie";
import { drawPlayer, drawHealth, drawKillCount, drawWordList, drawWPM } from "./player";
import { randomWord } from "./dictionary";
import { drawStartScreen, drawTitle, drawStartClick } from "./start_screen";
import { drawGameOver, drawGameOverWPM, drawGameOverKills, drawRestartClick, drawHighScores, drawHighScoreInput } from './game_over_screen';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.getElementById("page")
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const input = document.getElementById('typing-form');
  const wordList = document.getElementById('word-list');

  let zombies, dx, dy, health, zombieCount, counter, round, alive, killCount, timer, now, delta, attackTimer, wpm;
  let typeStart = 0;
  let typeEnd = 0;
  let playerAttack = false;
  let fps = 12;
  let then = Date.now();
  let interval = 1000 / fps;
  let interval2 = 1000 / 300;
  
  let highScores;
  firebase.database().ref("highScores").orderByChild('score').limitToLast(5).on("value", function (snapshot) {
    highScores = Object.values(snapshot.val()).sort((a, b) => a.score - b.score);
  });

  function resetGame () {
    zombies = {};
    dx = 2.5;
    dy = 0;
    health = 100;
    zombieCount = 0;
    counter = 0;
    round = 1;
    alive = true;
    killCount = 0;
    timer = 0;
  }

  function startTimer(e) {
    if (typeStart === 0 && e.target.value != " ") {
      typeStart = Date.now();
    }
  }

  function handleZombie(e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      let value = input.value.trim();
      for (let zomb in zombies) {
        if (value === zombies[zomb].word) {
          attackTimer = counter;
          playerAttack = true;
          killCount += 1;
          zombies[zomb].word = null;
          zombies[zomb].alive = false;
          break;
        }
      }
      input.value = "";
      if (typeStart > 0) {
        typeEnd = Date.now();
        timer += (typeEnd-typeStart)/1000;
      }
      typeStart = 0;
    } else {
      null
    }
  }
  
  function spawnZombies() {
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
      zombies[`zombie${zombieCount}`] = new Zombie(ctx, randomWord(), x, y, dy, alive);
      zombieCount += 1;
    }
  }

  function highScoreAnimate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scoreInput.hidden = false;
    scoreInput.disabled = false;
    scoreInput.focus();
    scoreInput.addEventListener('keydown', handleHighScore)
    drawStartScreen(ctx, canvas);
    drawHighScoreInput(ctx, canvas);
  }

  function handleHighScore(e) {
    if (e.keyCode === 13) {
      highScoreName = scoreInput.value;
      firebase.database().ref("highScores").push({ "name": highScoreName, "score": killCount, 'WPM': wpm })
      clearInterval(window.highScoreInterval); 
      scoreInput.removeEventListener('keydown', handleHighScore);
      scoreInput.hidden = true;
      scoreInput.disabled = true;
      scoreInput.value = "";
      endCounter = 0;
      fade = 0;
      canvas.className = "game-over-screen";
      window.overInterval = setInterval(gameOverAnimate, 100);
    }
  }
  
  function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener('click', input.focus())
    input.addEventListener('keydown', handleZombie);
    input.addEventListener('input', startTimer);
    let request = requestAnimationFrame(renderGame);
    
    now = Date.now();
    delta = now - then;
    
    if ((killCount / (timer / 60))) {
      wpm = (killCount / (timer / 60)).toFixed(2);
    } else {
      wpm = 0;
    }

    spawnZombies();
    drawWordList(zombies);
    drawWPM(ctx, wpm);
      
    if (delta > interval2) {
      then = now - (delta % interval);
      for (let zomb in zombies) {
        let { x } = zombies[zomb];
        if (zombies[zomb].alive) {
          if (x < canvas.width - 200) {
            zombies[zomb].draw()
            if (zombies[zomb].x > 350) {
              if (zombies[zomb].y < canvas.height / 2) {
                zombies[zomb].dy = 2;
              } else if (zombies[zomb].y > canvas.height / 2) {
                zombies[zomb].dy = -2;
              } else {
                zombies[zomb].dy = 0;
              }
            }
            if (delta > interval) {
              then = now - (delta % interval);
              zombies[zomb].x += dx;
              zombies[zomb].y += zombies[zomb].dy;
              zombies[zomb].shift += 100.75;
              if (zombies[zomb].shift >= 1155) {
                zombies[zomb].shift = 0;
              }
            }
            Object.values(zombies).forEach((zombie, idx) => {
              if (idx < parseInt(zomb.slice(6))+3 && idx > parseInt(zomb.slice(6))) {
                if (zombies[zomb].x >= 20) {
                  if (zombies[zomb].y < zombie.y && zombies[zomb].y > zombie.y - 30) {
                    zombies[zomb].dy = -1;
                  } else if (zombies[zomb].y <= zombie.y + 30 && zombies[zomb].y >= zombie.y) {
                    zombies[zomb].dy = 1;
                  } else if (zombies[zomb].y === zombie.y) {
                    zombies[zomb].dy = 1;
                  } else {
                    zombies[zomb].dy = 0;
                  }
                }
              }
            })
          } else {
            zombies[zomb].drawAttack();
            if (delta > interval) {
              then = now - (delta % interval);
              zombies[zomb].deadShift += 97;
              if (zombies[zomb].deadShift >= 1140) {
                zombies[zomb].deadShift = 0;
              }
              health -= .3
            }
          }
        } else {
          zombies[zomb].drawDead();
          if (delta > interval) {
            then = now - (delta % interval);
            zombies[zomb].deadShift += 97;
            if (zombies[zomb].deadShift >= 1250) {
              zombies[zomb].deadShift = 1254;
            }
          }
        }
      }
    }

    for (let zomb in zombies) {
      if (zombies[zomb].alive) {
        zombies[zomb].drawText()
      }
    }

    if (counter % 1000 === 0) {
      round += .5
    }
    counter += 10;

    drawKillCount(ctx, killCount);
    if (health > 0) {
      drawHealth(ctx, health);
      drawPlayer(ctx, playerAttack);
      if (counter - attackTimer > 50) {
        playerAttack = false;
      }
    } else if (health <= 0) {
      health = 0;
      drawHealth(ctx, health);
      clearInterval(window.intervalId);
      cancelAnimationFrame(request)
      gameOver();
    }
  }
  
  function startTimer(e) {
    if (typeStart === 0 && e.target.value != " ") {
      typeStart = Date.now();
    }
  }

  function handleZombie(e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      let value = input.value.trim();
      for (let zomb in zombies) {
        if (value === zombies[zomb].word) {
          attackTimer = counter;
          playerAttack = true;
          killCount += 1;
          zombies[zomb].word = null;
          zombies[zomb].alive = false;
          break;
        }
      }
      input.value = "";
      if (typeStart > 0) {
        typeEnd = Date.now();
        timer += (typeEnd-typeStart)/1000;
      }
      typeStart = 0;
    } else {
      null
    }
  }

  function resetGame () {
    zombies = {};
    dx = 2.5;
    dy = 0;
    health = 100;
    zombieCount = 0;
    counter = 0;
    round = 1;
    alive = true;
    killCount = 0;
    timer = 0;
  }

  let endCounter = 0;
  let fade = 0;
  const scoreInput = document.getElementById('high-score-form');

  let highScoreName;
  function gameOver() {
    canvas.removeEventListener('click', input.focus())
    input.removeEventListener('keydown', handleZombie);
    input.removeEventListener('input', startTimer)
    wordList.innerHTML = "";
    input.value = "";
    input.disabled = true;
    input.style.display = "none";
    if (killCount > highScores[0].score || (highScores.length < 5 && killCount > 0)) {
      window.highScoreInterval = setInterval(highScoreAnimate, 100);
    } else {
      scoreInput.removeEventListener('keydown', handleHighScore);
      scoreInput.hidden = true;
      scoreInput.disabled = true;
      endCounter = 0;
      fade = 0;
      canvas.className = "game-over-screen";
      window.overInterval = setInterval(gameOverAnimate, 100);
    }
  }

  function gameOverAnimate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStartScreen(ctx, canvas);
    drawGameOver(ctx, fade);
    
    fade += .05;
    endCounter += .5;
    if (fade >= 1) {
      fade = 1;
    }
    if (endCounter >= 10) {
      drawGameOverWPM(ctx, wpm);
    }
    if (endCounter >= 12.5) {
      drawGameOverKills(ctx, killCount);
    }
    if (endCounter >= 15) {
      drawHighScores(ctx, killCount);
    }
    if (endCounter >= 17.5) {
      canvas.addEventListener('click', startGame)
      page.addEventListener('keydown', startGame)
      if (endCounter % 10 >= 5) {
        drawRestartClick(ctx);
      } else {
        null;
      }
    }
  }

  
  function startGame(e) {
    if (e.keyCode === 13 || e.button === 0) {
      canvas.removeEventListener('click', startGame);
      page.removeEventListener('keydown', startGame);
      resetGame();
      clearInterval(window.startInterval);
      clearInterval(window.overInterval);
      canvas.className = "game-screen";
      requestAnimationFrame(renderGame)
      input.disabled = false;
      input.style.display = "block";
      input.focus();
    }
  }
  
  let titlepos = -60;
  let startCounter = 0;
  function titleDrop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStartScreen(ctx, canvas);
    titlepos += 5;
    if (titlepos >= 140) {
      titlepos = 140;
      startCounter += .5;
      if (startCounter % 10 <= 6) {
        drawStartClick(ctx);
      } else {
        null;
      }
      canvas.addEventListener('click', startGame)
      page.addEventListener('keydown', startGame)
    }
    drawTitle(ctx, titlepos);
  }
  if (canvas.className === "start-screen") {
    drawStartScreen(ctx, canvas);
    input.style.display = "none";
    window.startInterval = setInterval(titleDrop, 70);
  }
})
