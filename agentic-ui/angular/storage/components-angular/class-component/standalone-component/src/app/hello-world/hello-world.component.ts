import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for Angular's core directives (like ngIf, ngFor).

@Component({
  selector: 'app-hello-world', // The component's selector (HTML tag name).
  standalone: true, // Mark the component as standalone.
  imports: [CommonModule], // Import CommonModule to use Angular's built-in directives like *ngIf and *ngFor.
  template: `
    <div>
      <h1>Hello, Standalone Component!</h1>
      <p>This component does not need any modules to work.</p>
    </div>
  `, // Template for the component.
  styles: [
    `
      h1 {
        color: #2c3e50;
      }
      p {
        font-size: 18px;
      }
    `, // Simple styles for the component.
  ],
})
export class HelloWorldComponent {}
