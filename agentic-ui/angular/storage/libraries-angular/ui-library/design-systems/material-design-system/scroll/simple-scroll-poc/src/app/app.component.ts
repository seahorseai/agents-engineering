import { Component } from '@angular/core';
import { FiniteScrollComponent } from './finite-scroll/finite-scroll.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FiniteScrollComponent], // Include the ToolbarComponent in imports
  template: `
        <app-infinite-scroll></app-infinite-scroll>
  `,
})
export class AppComponent {
}