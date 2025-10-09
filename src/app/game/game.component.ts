import { Component, inject, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, collectionData, addDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';

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
export class GameComponent implements OnInit {
  game = inject(GameService);
  gamesCollection = collection(this.firestore, 'games');
  gameId: string = '';

  constructor(
    public dialog: MatDialog,
    private firestore: Firestore = inject(Firestore),
    private route: ActivatedRoute = inject(ActivatedRoute)
  ) { }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() || '';
      this.game.pickCardAnimation = true;
      this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedcards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 900);
    }
  }

  // CRUD: Create => addDoc, Read => collectionData, Update => updateDoc or setDoc, Delete => deleteDoc

  newGame() {
    this.game.resetGame();

    // addDoc(this.gamesCollection, {'Hallo': 'Welt'}).then(() => {
    //   console.log('Dokument erfolgreich hinzugefügt!');
    // }).catch((error) => {
    //   console.error('Fehler beim Hinzufügen des Dokuments:', error);
    // });

    addDoc(this.gamesCollection, this.game.toJson()).then(() => {
      console.log('Dokument erfolgreich hinzugefügt!');
    }).catch((error) => {
      console.error('Fehler beim Hinzufügen des Dokuments:', error);
    });
  }

  ngOnInit() {
    // this.newGame();
    this.route.params.subscribe(params => {
      console.log('Game ID from route:', params['id']);
      this.gameId = params['id'];
      if (this.gameId) {
        this.loadGameFromFirestore(this.gameId);
      } else {
        this.loadLocalData();
      }
    });
  }

  private loadGameFromFirestore(gameId: string) {
    try {
      // Referenz zum spezifischen Dokument erstellen
      const gameDocRef = doc(this.firestore, 'games', gameId);
      
      // Das spezifische Dokument laden
      docData(gameDocRef).subscribe({
        next: (gameData: any) => {
          if (gameData) {
            // Game-Daten aus Firestore in den Service laden
            this.game.currentPlayer = gameData.currentPlayer || 0;
            this.game.playedcards = gameData.playedcards || [];
            this.game.players = gameData.players || [];
            this.game.stack = gameData.stack || [];
            this.game.pickCardAnimation = gameData.pickCardAnimation || false;
            this.game.currentCard = gameData.currentCard || '';
            
            console.log('Spiel erfolgreich aus Firestore geladen:', gameData);
          } else {
            console.log('Kein Spiel mit dieser ID gefunden, verwende lokale Daten');
            this.loadLocalData();
          }
        },
        error: (error) => {
          console.error('Fehler beim Laden des Spiels aus Firestore:', error);
          this.loadLocalData();
        }
      });
    } catch (error) {
      console.log('Firestore connection failed, using local data:', error);
      this.loadLocalData();
    }
  }

  private loadLocalData() {
    // Fallback: Verwende lokale Daten oder starte ein neues Spiel
    console.log('Using local game data...');
    this.game.resetGame(); // Startet ein neues Spiel mit Standard-Werten
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame() {
    if (this.gameId) {
      const gameDocRef = doc(this.firestore, 'games', this.gameId);
      updateDoc(gameDocRef, this.game.toJson()).then(() => {
        console.log('Spiel erfolgreich gespeichert!');
      }).catch((error) => {
        console.error('Fehler beim Speichern des Spiels:', error);
      });
    } else {
      console.error('Keine Game-ID verfügbar zum Speichern');
    }
  }
}
