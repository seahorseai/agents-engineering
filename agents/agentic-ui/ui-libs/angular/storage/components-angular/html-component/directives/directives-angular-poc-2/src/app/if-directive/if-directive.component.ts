import { Component } from '@angular/core';

@Component({
  selector: 'app-if-directive',
  standalone: true,
  template: `
    <hr />

    <p>Click the button and see the difference!!!</p>

    <hr />
    <div>
      @if (username) {
        <h1>Welcome, {{ username }}</h1>
      } @else {
        <a href="/login">
          <h1>Login</h1>
        </a>
      }
      <button (click)="username = ''">Delete User</button>
    </div>
  `,
})
export class IfDirectiveComponent {
  username = 'Lyonel';
}
