import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyComponent } from 'my-lib'; // Import from the library

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MyComponent], // Import the standalone component
  template: `
    <h1>My App</h1>
    <my-component></my-component>
  `,
  styles: [`h1 { color: red; }`],
})
export class AppComponent {}