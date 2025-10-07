import { Component, inject } from '@angular/core';
import { GameService } from '../game.service';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    DialogAddPlayerComponent,
    GameInfoComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  game = inject(GameService);
  pickCardAnimation: boolean = false;
  currentCard: string = '';

  constructor(
    public dialog: MatDialog,
    private firestore: Firestore = inject(Firestore)
  ) {}

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true;
      this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
      setTimeout(() => {
        this.game.playedcards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 900);
    }
  }

  newGame() {
    this.game.resetGame();
  }

  ngOnInit() {
    this.newGame();
    
    // Einfache Firestore-Verbindung - funktioniert meist ohne CORS-Probleme
    try {
      const gamesCollection = collection(this.firestore, 'games');
      collectionData(gamesCollection).subscribe(games => {
        console.log('Games from Firestore:', games);
      });
    } catch (error) {
      console.log('Firestore connection failed, using local data:', error);
      this.loadLocalData();
    }
  }

  private loadLocalData() {
    // Fallback: Verwende lokale Daten
    console.log('Using local game data...');
    // Hier können Sie lokale Daten laden oder Mock-Daten verwenden
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.game.players.push(name);
      }
    });
  }
}
