//projects/app/src/app.component.ts

import { Component } from '@angular/core';
import { ButtonComponent } from 'ui-lib';
import { ThemeService } from 'ui-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  template: `
  <div class="theme-controls">
      <button (click)="switchToThemeA()">Theme A</button>
      <button (click)="switchToThemeB()">Theme B</button>
  </div>
  <div class="content">
      <ui-button>Click Me</ui-button>
  </div>
 
  `
  ,
  styles: [`
    .theme-controls {
      margin-bottom: 20px;
    }
    .theme-controls button {
      margin-right: 10px;
      padding: 8px 16px;
      cursor: pointer;
    }
    .content {
      padding: 20px;
    }
  `]
})
export class AppComponent {

// app.component.ts
constructor(private themeService: ThemeService) {}

  switchToThemeB() {
    this.themeService.setTheme('theme-b');
  }

  switchToThemeA() {
    this.themeService.setTheme(''); // Default theme
  }
}