import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonArgsComponent } from "./args/button-args.component";
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  ButtonArgsComponent],
  template: `
  <app-button-args></app-button-args>
    <router-outlet />
  `
})
export class AppComponent {
  title = 'multi-story-per-component-storybook';
}
