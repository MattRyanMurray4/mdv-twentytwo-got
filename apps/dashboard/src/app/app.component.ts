import { Component } from '@angular/core';

@Component({
  selector: 'got-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Game Of Thrones';
  links = [
    { path: '/', icon: 'home', title: 'Login' },
    { path: 'characters', icon: 'view_list', title: 'Characters' },
  ];
}
