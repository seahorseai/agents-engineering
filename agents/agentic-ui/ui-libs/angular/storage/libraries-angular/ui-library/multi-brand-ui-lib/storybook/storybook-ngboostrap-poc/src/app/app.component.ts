import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgalertComponent } from "./ngalert/ngalert.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgalertComponent],
  template: `
  <app-ngalert></app-ngalert>
  <router-outlet />`
})
export class AppComponent {
  title = 'ngboostrap-storybook';
}
