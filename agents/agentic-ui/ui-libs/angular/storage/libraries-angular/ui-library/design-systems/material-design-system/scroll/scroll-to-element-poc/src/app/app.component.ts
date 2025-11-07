import { Component } from '@angular/core';
import { ScrollToElementComponent } from './scroll-to-element/scroll-to-element.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScrollToElementComponent],
  template: `
      <app-scroll-to-element></app-scroll-to-element>
  `,
  styles: []
})
export class AppComponent {
  title = 'scroll-to-element-poc';
}
