import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from '.';
import { CharactersEffects } from './characters/characters.effects';
import { CharactersFacade } from './characters/characters.facade';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true,
  },
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([CharactersEffects]),
    StoreDevtoolsModule.instrument({ name: 'Game-Of-Thrones' }),
  ],
  providers: [CharactersFacade],
})
export class CoreStateModule {}
