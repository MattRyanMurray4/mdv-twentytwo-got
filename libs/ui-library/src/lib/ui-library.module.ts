import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { WildComponent } from './wild/wild.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '@got/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [LoginComponent, WildComponent, ToolbarComponent],
  exports: [LoginComponent, ToolbarComponent, WildComponent],
})
export class UiLibraryModule {}
