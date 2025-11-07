import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloWorldComponent } from './hello-world/hello-world.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HelloWorldComponent],
  template: `
   <app-hello-world></app-hello-world>
   <router-outlet />
  `, // Template for the component.
  styles: [
    `
  
    `, // Simple styles for the component.
  ],
})
export class AppComponent {
  title = 'hello-world-component';
}
