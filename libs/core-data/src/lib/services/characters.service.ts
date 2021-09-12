import { mapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '@got/api-interfaces';
import { environment } from '@env/environments';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private model = 'characters';
  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient.get<Character[]>(this.getApi(), {
      params: { limit: 5 },
    });
  }

  find($int32: string) {
    return this.httpClient.get<Character>(this.getApiById($int32));
  }

  create(character: Character) {
    return this.httpClient.post<Character>(this.getApi(), character);
  }

  update(character: Character) {
    return this.httpClient.patch<Character>(
      this.getApiById(character.$int32),
      character
    );
  }

  delete($int32: string) {
    return this.httpClient
      .delete<string>(this.getApiById($int32))
      .pipe(mapTo($int32));
  }

  private getApi() {
    return `${environment.apiUrl}${this.model}`;
  }

  private getApiById($int32: string) {
    return `${this.getApi()}/${$int32}`;
  }
}
