import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-themed-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="themed-button">Click Me</button>
  `,
  styles: [`
    .themed-button {
      background-color: var(--primary-color);
      color: var(--text-color);
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
    }

    .themed-button:hover {
      background-color: var(--background-color);
    }
  `],
  encapsulation: ViewEncapsulation.None 
})
export class ThemedButtonComponent {}

