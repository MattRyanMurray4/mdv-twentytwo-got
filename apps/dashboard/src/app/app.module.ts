import { RoutingModule } from './routing.module';
import { CoreDataModule } from '@got/core-data';
import { UiLibraryModule } from '@got/ui-library';
import { CoreStateModule } from '@got/core-state';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@got/material';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CharactersComponent } from './characters/characters.component';
import { CharactersListComponent } from './characters/characters-list/characters-list.component';
import { CharacterDetailsComponent } from './characters/character-details/character-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharactersListComponent,
    CharacterDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreDataModule,
    UiLibraryModule,
    CoreStateModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
