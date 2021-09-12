import { Character } from '@got/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as CharactersActions from './characters.actions';

export const CHARACTERS_FEATURE_KEY = 'characters';

export interface CharactersAction extends Action {
  error: string;
}

export interface CharacterState extends EntityState<Character> {
  selectedId?: string | number; // which Characters record has been selected
  loaded: boolean; // has the Characters list been loaded
  error?: string | null; // last known error (if any)
}

export interface CharactersPartialState {
  readonly [CHARACTERS_FEATURE_KEY]: CharacterState;
}

export const charactersAdapter: EntityAdapter<Character> =
  createEntityAdapter<Character>();

export const initialState: CharacterState = charactersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const setLoading = (state: CharacterState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (state: CharacterState, { error }: CharactersAction) => ({
  ...state,
  error,
});

const _charactersReducer = createReducer(
  initialState,
  on(
    CharactersActions.loadCharacter,
    CharactersActions.loadCharacters,
    CharactersActions.createCharacter,
    CharactersActions.updateCharacter,
    CharactersActions.deleteCharacter,
    setLoading
  ),
  on(
    CharactersActions.loadCharacterFailure,
    CharactersActions.loadCharactersFailure,
    CharactersActions.createCharacterFailure,
    CharactersActions.updateCharacterFailure,
    CharactersActions.deleteCharacterFailure,
    setFailure
  ),
  on(CharactersActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CharactersActions.loadCharactersSuccess, (state, { characters }) =>
    charactersAdapter.setAll(characters, { ...state, loaded: true })
  ),
  on(CharactersActions.loadCharactersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CharactersActions.loadCharacterSuccess, (state, { character }) =>
    charactersAdapter.upsertOne(character, { ...state, loaded: true })
  ),
  on(CharactersActions.selectCharacter, (state, { $int32 }) => ({
    ...state,
    selectedId: $int32,
  })),
  on(CharactersActions.createCharacterSuccess, (state, { character }) =>
    charactersAdapter.addOne(character, { ...state, loaded: true })
  ),
  on(
    CharactersActions.updateCharacterSuccess,
    (state, { character: { $int32, ...restCharacter } }) =>
      charactersAdapter.updateOne(
        { id: $int32, changes: { ...restCharacter } },
        { ...state, loaded: true }
      )
  ),
  on(CharactersActions.deleteCharacterSuccess, (state, { $int32 }) =>
    charactersAdapter.removeOne($int32, { ...state, loaded: true })
  )
);

export function charactersReducer(
  state: CharacterState | undefined,
  action: Action
) {
  return _charactersReducer(state, action);
}
