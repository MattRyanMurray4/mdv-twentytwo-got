import { Character, emptyCharacter } from '@got/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CHARACTERS_FEATURE_KEY,
  CharacterState,
  charactersAdapter,
} from './characters.reducer';

// Lookup the 'Characters' feature state managed by NgRx
export const getCharactersState = createFeatureSelector<CharacterState>(
  CHARACTERS_FEATURE_KEY
);

const { selectAll, selectEntities } = charactersAdapter.getSelectors();

export const getCharactersLoaded = createSelector(
  getCharactersState,
  (state: CharacterState) => state.loaded
);

export const getCharactersError = createSelector(
  getCharactersState,
  (state: CharacterState) => state.error
);

export const getAllCharacters = createSelector(
  getCharactersState,
  (state: CharacterState) => selectAll(state)
);

export const getCharactersEntities = createSelector(
  getCharactersState,
  (state: CharacterState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCharactersState,
  (state: CharacterState) => state.selectedId
);

export const getSelected = createSelector(
  getCharactersEntities,
  getSelectedId,
  (entities, selectedId) =>
    (selectedId ? entities[selectedId] : emptyCharacter) as Character
);
