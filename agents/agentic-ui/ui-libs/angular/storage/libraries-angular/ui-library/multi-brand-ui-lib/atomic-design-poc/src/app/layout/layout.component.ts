import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <app-header></app-header>
    <main><p>Welcome to the homepage!</p></main>
  `,
  styles: [`main { padding: 16px; }`]
})
export class LayoutComponent {}
