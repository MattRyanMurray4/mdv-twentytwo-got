import { Injectable } from '@angular/core';
import {
  actionTypeNamePastTense,
  actionTypeNamePresentTense,
  CharacterService,
  getActionType,
  NotifyService,
} from '@got/core-data';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  createCharacter,
  createCharacterFailure,
  createCharacterSuccess,
  deleteCharacter,
  deleteCharacterFailure,
  deleteCharacterSuccess,
  loadCharacter,
  loadCharacterFailure,
  loadCharacters,
  loadCharactersFailure,
  loadCharactersSuccess,
  loadCharacterSuccess,
  updateCharacter,
  updateCharacterFailure,
  updateCharacterSuccess,
} from './characters.actions';

@Injectable()
export class CharactersEffects {
  loadCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharacter),
      switchMap(({ $int32 }) =>
        this.characterService.find($int32).pipe(
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
        this.characterService.delete(character.$int32).pipe(
          map(($int32) => deleteCharacterSuccess({ $int32 })),
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
