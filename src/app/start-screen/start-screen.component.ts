import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  private firestore: Firestore = inject(Firestore);

  constructor(private router: Router, private gameService: GameService) { }

  startGame() {
    let game = this.gameService;
    const gamesCollection = collection(this.firestore, 'games');
    addDoc(gamesCollection, game.toJson()).then((gameInfo: any) => {
      console.log('Dokument erfolgreich hinzugefügt!');
      this.router.navigateByUrl('/game/' + gameInfo.id);
    }).catch((error) => {
      console.error('Fehler beim Hinzufügen des Dokuments:', error);
    });
  }
}
