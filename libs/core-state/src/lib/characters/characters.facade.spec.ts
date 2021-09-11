import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as CharactersActions from './characters.actions';
import { CharactersEffects } from './characters.effects';
import { CharactersFacade } from './characters.facade';
import { CharactersEntity } from './characters.models';
import {
  CHARACTERS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './characters.reducer';
import * as CharactersSelectors from './characters.selectors';

interface TestSchema {
  characters: State;
}

describe('CharactersFacade', () => {
  let facade: CharactersFacade;
  let store: Store<TestSchema>;
  const createCharactersEntity = (id: string, name = ''): CharactersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CHARACTERS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CharactersEffects]),
        ],
        providers: [CharactersFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(CharactersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allCharacters$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allCharacters$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadCharactersSuccess` to manually update list
     */
    it('allCharacters$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allCharacters$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        CharactersActions.loadCharactersSuccess({
          characters: [
            createCharactersEntity('AAA'),
            createCharactersEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allCharacters$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
