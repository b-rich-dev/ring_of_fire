import { Component, Input } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input() name!: string;
  @Input() playerActive: boolean = false;

  constructor(public gameService: GameService) {}

  get players(): string[] {
    return this.gameService.players;
  }
}
