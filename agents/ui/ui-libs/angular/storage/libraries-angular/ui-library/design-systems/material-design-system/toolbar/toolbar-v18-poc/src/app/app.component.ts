import { Component } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToolbarComponent], // Include the ToolbarComponent in imports
  template: `
    <app-toolbar></app-toolbar>
  `,
})
export class AppComponent {
}