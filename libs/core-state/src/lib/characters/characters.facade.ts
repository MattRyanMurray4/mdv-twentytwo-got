import { Injectable } from '@angular/core';
import { Character } from '@got/api-interfaces';
import { select, Store, Action } from '@ngrx/store';

import * as CharactersActions from './characters.actions';
import * as CharactersFeature from './characters.reducer';
import * as CharactersSelectors from './characters.selectors';

@Injectable()
export class CharactersFacade {
  loaded$ = this.store.pipe(select(CharactersSelectors.getCharactersLoaded));
  allCharacters$ = this.store.pipe(
    select(CharactersSelectors.getAllCharacters)
  );
  selectedCharacters$ = this.store.pipe(
    select(CharactersSelectors.getSelected)
  );

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(CharactersActions.init());
  }

  loadCharacter(id: string) {
    return this.store.dispatch(CharactersActions.loadCharacter({ id }));
  }

  loadCharacters() {
    return this.store.dispatch(CharactersActions.loadCharacters());
  }

  selectCharacter(characterId: string) {
    return this.store.dispatch(
      CharactersActions.selectCharacter({ characterId })
    );
  }

  createCharacter(character: Character) {
    return this.store.dispatch(
      CharactersActions.createCharacter({ character })
    );
  }

  updateCharacter(character: Character) {
    return this.store.dispatch(
      CharactersActions.updateCharacter({ character })
    );
  }

  deleteCharacter(character: Character) {
    return this.store.dispatch(
      CharactersActions.deleteCharacter({ character })
    );
  }
  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}
