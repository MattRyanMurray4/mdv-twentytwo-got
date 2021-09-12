import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Character, emptyCharacter } from '@got/api-interfaces';
import { CharactersFacade } from '@got/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'got-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  characters$: Observable<Character[]> = this.charactersFacade.allCharacters$;
  selectedCharacter$: Observable<Character> =
    this.charactersFacade.selectedCharacters$;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private charactersFacade: CharactersFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.charactersFacade.loadCharacters();
    this.reset();
  }

  selectCharacter(character: Character) {
    this.charactersFacade.selectCharacter(character.$int32);
    this.form.patchValue(character);
  }

  reset() {
    this.selectCharacter(emptyCharacter);
    this.form.reset();
  }

  createCharacter(character: Character) {
    this.charactersFacade.createCharacter(character);
    this.reset();
  }

  updateCharacter(character: Character) {
    this.charactersFacade.updateCharacter(character);
    this.reset();
  }

  saveCharacter(character: Character) {
    character.$int32
      ? this.charactersFacade.updateCharacter(character)
      : this.charactersFacade.createCharacter(character);
    this.reset();
  }

  deleteCharacter(character: Character) {
    this.charactersFacade.deleteCharacter(character);
    this.reset();
  }

  cancel() {
    this.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      $int32: null,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fullName: ['', Validators.required],
      title: [''],
      family: [''],
      image: [''],
      imageUrl: [''],
    });
  }
}
