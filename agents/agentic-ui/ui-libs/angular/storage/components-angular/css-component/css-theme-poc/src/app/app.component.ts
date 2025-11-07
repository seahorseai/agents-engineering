import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemedButtonComponent } from './themed-button/themed-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThemedButtonComponent, RouterOutlet],
  template: `
    <div>
      <h1>Themed Button</h1>
      <app-themed-button></app-themed-button>
    </div>
    <div>
    <button (click)="toggleTheme()">Toggle Theme</button>
    </div>
  `
})
export class AppComponent {
  toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }
}

