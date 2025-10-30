import { Component } from '@angular/core';
import { ScrollComponent } from './scroll/scroll.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScrollComponent],
  template: `
          <app-scroll></app-scroll>
  `,
  styles: []
})
export class AppComponent {
  title = 'angular-commons-viewport-scroller-poc';
}
