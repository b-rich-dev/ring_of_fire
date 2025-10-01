import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})
export class GameInfoComponent {
  cardActions: { title: string, description: string }[] = [
    { title: 'Wasserfall', description: 'Jeder trinkt, solange der Vorgänger trinkt' },
    { title: 'Du', description: 'Du entscheidest, wer trinkt' },
    { title: 'Ich', description: 'Glückswunsch, du darfst trinken' },
    { title: 'Kategorie', description: 'Suche eine Kategorie (z.B. Farben). Jeder muss etwas aus dieser Kategorie nennen. Wer nicht mehr weiß oder zögert, muss trinken' },
    { title: 'Daumenmeister', description: 'Lege deinen Daumen auf den Tisch, der letzte muss trinken' },
    { title: 'Frage', description: 'Stelle eine Frage an einen Mitspieler, dieser muss sofort eine andere Person fragen. Wer zögert oder lacht, muss trinken' },
    { title: 'Reim', description: 'Sage ein Wort. Reihum muss jeder ein Wort sagen, das sich reimt. Wer nicht mehr weiß oder zögert, muss trinken' },
    { title: 'Regel', description: 'Lege eine Regel fest, die die Spieler bis zum Ende des Spiels befolgen müssen' },
    { title: 'Pfeife', description: 'Du darfst jederzeit pfeifen. Wer es bemerkt, muss trinken' },
    { title: 'Bube', description: 'Du bist der Bube! Wann immer du möchtest, darfst du jemanden zum Trinken auffordern' },
    { title: 'Dame', description: 'Du bist die Dame! Du darfst eine neue Regel aufstellen' },
    { title: 'König', description: 'Gieße etwas von deinem Getränk in den Königspokal in der Tischmitte. Der Spieler, der den letzten König zieht, muss den Pokal austrinken' },
    { title: 'Alle Frauen trinken', description: 'Alle Frauen am Tisch müssen trinken' }
  ];

  title: string = '';
  description: string = '';

  @Input() card!: string;

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.card) {
      console.log('current card is', this.card);
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardActions[cardNumber - 1].title;
      this.description = this.cardActions[cardNumber - 1].description;
    }

  }
}