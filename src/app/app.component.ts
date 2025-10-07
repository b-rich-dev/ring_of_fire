import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from '../app/dialog-add-player/dialog-add-player.component';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    DialogAddPlayerComponent,
    MatCardModule,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ring_of_fire';
  firestore: Firestore = inject(Firestore);
  // items$: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'items')
    // this.items$ = collectionData(aCollection);
  }
}
