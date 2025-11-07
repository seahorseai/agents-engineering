import { Component } from '@angular/core';

@Component({
  selector: 'app-for-directive',
  standalone: true,
  template: `
  <hr />

  <p>Click the button and see the difference!!!</p>

  <hr />
  <div>
    <h3>Countries List</h3>
    <ul>
      @for (country of countries; track $index) {
        <li>{{ country }}</li>
      } @empty {
        <li>No countries found</li>
      }
    </ul>
    <button (click)="countries = []">Delete Countries</button>
  </div>
  `,
})
export class ForDirectiveComponent {
  countries: string[] = ["Afghanistan", "Albania", "Algeria", "Andorra"];
}
