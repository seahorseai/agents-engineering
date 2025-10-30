import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-switch-directive',
  standalone: true,
  imports: [FormsModule],
  template: `
  <hr />

  <p>Change the select value and see the differences!!!</p>

  <hr />
  <div>
    <div>
      <select [(ngModel)]="userRole">
        <option value=''>Guest User</option>
        <option value="registered">Registered User</option>
        <option value="admin">Admin User</option>
      </select>
    </div>
    <div>
      @switch (userRole) {
        @case ('admin') {
          <h1>Welcome, Admin User!</h1>
        }
        @case ('registered') {
          <h1>Welcome, Registered User!</h1>
        }
        @default {
          <a href="/login">
            <h1>Login</h1>
          </a>
        }
      }
    </div>
  </div>
  `,
})
export class SwitchDirectiveComponent {
  userRole = '';
}
