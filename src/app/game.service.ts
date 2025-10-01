import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  players: string[] = ['Junus', 'Katrin', 'Anna'];
  stack: string[] = [];
  playedcards: string[] = [];
  currentPlayer: number = 0;

  constructor() {
    this.initializeGame();
  }

  initializeGame() {
    this.stack = [];
    this.playedcards = [];
    this.players = ['Junus', 'Katrin', 'Anna'];
    this.currentPlayer = 0;
    
    for (let i = 1; i < 14; i++) {
      this.stack.push('spade_' + i);
      this.stack.push('hearts_' + i);
      this.stack.push('diamonds_' + i);
      this.stack.push('clubs_' + i);
    }
    shuffle(this.stack);
  }

  resetGame() {
    this.initializeGame();
  }
}

function shuffle(array:string[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}