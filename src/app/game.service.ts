import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public players: string[] = [];
  public stack: string[] = [];
  public playedcards: string[] = [];
  public currentPlayer: number = 0;
  public pickCardAnimation: boolean = false;
  public currentCard: string = '';

  constructor() {
    this.initializeGame();
  }

  public toJson() {
    return {
      players: this.players,
      stack: this.stack,
      playedcards: this.playedcards,
      currentPlayer: this.currentPlayer,
      pickCardAnimation: this.pickCardAnimation,
      currentCard: this.currentCard
    };
  }

  initializeGame() {
    this.stack = [];
    this.playedcards = [];
    this.players = ['Alice', 'Bob', 'Charlie'];
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

function shuffle(array: string[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}