import { ActionReducerMap } from '@ngrx/store';
import {
  charactersReducer,
  CharacterState,
  CHARACTERS_FEATURE_KEY,
} from './characters/characters.reducer';

export interface AppState {
  [CHARACTERS_FEATURE_KEY]: CharacterState;
}

export const reducers: ActionReducerMap<AppState> = {
  [CHARACTERS_FEATURE_KEY]: charactersReducer,
};
