import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadCharacter,
  loadCharacterFailure,
  loadCharacterSuccess,
  loadCharacters,
  loadCharactersFailure,
  loadCharactersSuccess,
  createCharacter,
  createCharacterFailure,
  createCharacterSuccess,
  updateCharacter,
  updateCharacterFailure,
  updateCharacterSuccess,
  deleteCharacter,
  deleteCharacterFailure,
  deleteCharacterSuccess,
} from './characters.actions';
import {
  actionTypeNamePastTense,
  actionTypeNamePresentTense,
  CharacterService,
  getActionType,
  NotifyService,
} from '@got/core-data';
import * as CharactersActions from './characters.actions';
import * as CharactersFeature from './characters.reducer';

@Injectable()
export class CharactersEffects {
  loadCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharacter),
      switchMap(({ id }) =>
        this.characterService.find(id).pipe(
          map((character) => loadCharacterSuccess({ character })),
          catchError((error) => of(loadCharacterFailure({ error })))
        )
      )
    )
  );

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharacters),
      switchMap(() =>
        this.characterService.all().pipe(
          map((characters) => loadCharactersSuccess({ characters })),
          catchError((error) => of(loadCharactersFailure({ error })))
        )
      )
    )
  );

  createCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCharacter),
      switchMap(({ character }) =>
        this.characterService.create(character).pipe(
          map((character) => loadCharacterSuccess({ character })),
          catchError((error) => of(loadCharacterFailure({ error })))
        )
      )
    )
  );

  updateCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCharacter),
      switchMap(({ character }) =>
        this.characterService.update(character).pipe(
          map((character) => updateCharacterSuccess({ character })),
          catchError((error) => of(updateCharacterFailure({ error })))
        )
      )
    )
  );

  deleteCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCharacter),
      switchMap(({ character }) =>
        this.characterService.delete(character.id).pipe(
          map((id) => deleteCharacterSuccess({ id })),
          catchError((error) => of(deleteCharacterFailure({ error })))
        )
      )
    )
  );

  characterSuccessNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          updateCharacterSuccess,
          createCharacterSuccess,
          deleteCharacterSuccess
        ),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Character ${actionTypeNamePastTense[actionType]} Successfully!`
          );
        })
      ),
    { dispatch: false }
  );

  characterFailureNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          updateCharacterFailure,
          createCharacterFailure,
          deleteCharacterFailure
        ),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Failed to ${actionTypeNamePresentTense[actionType]} Character. Please try again.`
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private characterService: CharacterService,
    private notify: NotifyService
  ) {}
}
