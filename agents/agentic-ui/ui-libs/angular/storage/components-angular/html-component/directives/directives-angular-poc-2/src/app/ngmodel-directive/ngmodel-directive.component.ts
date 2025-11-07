import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ngmodel-attribute',
  standalone: true,
  imports: [FormsModule],
  template: `
    <hr />

    <p>Change the value of the input and see the difference!!!</p>

    <hr />
    <div>
      <input type="text" [(ngModel)]="username">
      <p>
        Your username is: {{ username }}
      </p>
    </div>
  `,
})
export class NgmodelDirectiveComponent {
  username = 'Lyonel';
}
