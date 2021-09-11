import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private notify: MatSnackBar) {}

  notification(message: string, action = 'dismiss') {
    this.notify.open(message, action, {
      duration: 3000,
    });
  }
}
