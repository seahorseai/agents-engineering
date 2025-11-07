import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent],
  template: `
    <header class="header">
      <h1>My App</h1>
      <app-search-bar></app-search-bar>
    </header>
  `,
  styles: [`.header { display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #f8f9fa; }`]
})
export class HeaderComponent {}
