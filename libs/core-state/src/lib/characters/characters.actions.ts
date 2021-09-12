import { Character } from '@got/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const init = createAction('[Characters Page] Init');

// all

export const loadCharacters = createAction('[Characters] Load All Characters');

export const loadCharactersSuccess = createAction(
  '[Characters] Loaded Characters Success',
  props<{ characters: Character[] }>()
);

export const loadCharactersFailure = createAction(
  '[Characters] Loaded Characters Failure',
  props<{ error: any }>()
);

// singular

export const loadCharacter = createAction(
  '[Character] Load A Character',
  props<{ $int32: string }>()
);
export const loadCharacterSuccess = createAction(
  '[Character] Loaded Character Success',
  props<{ character: Character }>()
);
export const loadCharacterFailure = createAction(
  '[Character] Loaded Character Failure',
  props<{ error: any }>()
);

// select

export const selectCharacter = createAction(
  '[Character] Select A Character',
  props<{ $int32: string }>()
);

// create

export const createCharacter = createAction(
  '[Character] Create A Character',
  props<{ character: Character }>()
);
export const createCharacterSuccess = createAction(
  '[Character] Created Character Success',
  props<{ character: Character }>()
);
export const createCharacterFailure = createAction(
  '[Character] Created Character Failure',
  props<{ error: any }>()
);

// update

export const updateCharacter = createAction(
  '[Character] Update A Character',
  props<{ character: Character }>()
);
export const updateCharacterSuccess = createAction(
  '[Character] Updated Character Success',
  props<{ character: Character }>()
);
export const updateCharacterFailure = createAction(
  '[Character] Updated Character Failure',
  props<{ error: any }>()
);

// delete

export const deleteCharacter = createAction(
  '[Character] Delete A Character',
  props<{ character: Character }>()
);
export const deleteCharacterSuccess = createAction(
  '[Character] Deleted Character Success',
  props<{ $int32: string }>()
);
export const deleteCharacterFailure = createAction(
  '[Character] Deleted Character Failure',
  props<{ error: any }>()
);
