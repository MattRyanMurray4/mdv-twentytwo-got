import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '@got/api-interfaces';

@Component({
  selector: 'got-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent {
  @Input() characters: Character[] | null;
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
