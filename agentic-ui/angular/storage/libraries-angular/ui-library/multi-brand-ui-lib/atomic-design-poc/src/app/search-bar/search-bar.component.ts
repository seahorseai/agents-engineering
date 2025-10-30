
import { Component } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
import { SearchButtonComponent } from '../search-button/search-button.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [SearchInputComponent, SearchButtonComponent],
  template: `
    <div class="search-bar">
      <app-search-input placeholder="Type to search..."></app-search-input>
      <app-search-button label="Go"></app-search-button>
    </div>
  `,
  styles: [`.search-bar { display: flex; gap: 8px; align-items: center; }`]
})
export class SearchBarComponent {}
