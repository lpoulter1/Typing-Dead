# Typing Dead

### [Live Link](https://ibltsandwich.github.io/Typing-Dead/)

## MVPs

Typing Dead is a typing game where waves of zombies spawn in from the left and have words attached to them, as the player character defends him/herself from the right. As words are properly typed by the player, the zombie with that word will die, keeping the player safe from harm.

 - Players will see zombies shuffle in from the left
 - Players will be able to type to kill zombies
 - Zombies should continuously spawn until the round ends or until the player loses

## Wireframes

![wireframe](https://i.imgur.com/dTvwb07.png)

## Architecture and Technologies

Javascript, HTML Canvas, and Google Firebase

## Gameplay

Zombies spawn in continuously from the left side of the screen, just outside the canvas's view limit.
Each zombie is dynamically generated and randomly spawned based on a game timer running in the background.
As time goes on, a round number increases and this round number determines the frequency of zombie spawns.  

Upon creation, each zombie is given an attached word and an 'alive' toggle. When the word attached to that zombie is typed correctly, the zombie will enter a death animation and it's 'alive' toggle will be changed to 'dead'.
In the case of multiple zombies with the same words, the one closest to the player character will die.

<img src="https://i.imgur.com/RtTZOoI.png" width="600">

Zombies start huddling towards the player when they get too close. Unfortunately, this means words can become hard to distinguish as they overlap. A list to the right side of the player lists the top 10 closest zombies that have crossed the halfway point and the words attached to them.


## Game Over

Upon reaching a high score (number of kills), you are greeted with this screen that allows you to submit your name.

<img src="https://i.imgur.com/9b3hvk7.png" width="500"/>

Doing so will include your name in the high score list on the game over screen, which shows the top 5 high scorers' names, kill counts, and words per minute.

<img src="https://i.imgur.com/YgvFB6Q.png" width="500"/>

## Implementation Timeline

**Day 1**
  Figure out how to get the elements I want on the screen, such as the typing form, zombies, player character, and health.  
  Set up a very basic outline of what I want the game to be.

**Day 2**
  Hopefully, get zombies to move across the screen with the words attached to them.  
  Figure out how to get them to die when the correct word is typed.  
  Get health to go down when zombies reach the player character.

**Day 3**
  Get artwork, music, and other assets into my project. Work out any bugs that might still exist or pop up.
