import { mapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '@got/api-interfaces';

export const BASE_URL = '';
// https://warm-river-13356.herokuapp.com/

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private model = 'characters';
  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient.get<Character[]>(this.getUrl());
  }

  find(id: string) {
    return this.httpClient.get<Character>(this.getUrlById(id));
  }

  create(character: Character) {
    return this.httpClient.post<Character>(this.getUrl(), character);
  }

  update(character: Character) {
    return this.httpClient.patch<Character>(
      this.getUrlById(character.id),
      character
    );
  }

  delete(characterId: string) {
    return this.httpClient
      .delete<string>(this.getUrlById(characterId))
      .pipe(mapTo(characterId));
  }

  private getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  private getUrlById(id: string) {
    return `${this.getUrl()}/${id}`;
  }
}
