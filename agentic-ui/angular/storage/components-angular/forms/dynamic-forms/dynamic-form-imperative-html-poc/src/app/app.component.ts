
import { RouterOutlet } from '@angular/router';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, RouterOutlet],
  template: `
    <h1>Angular Dynamic Form</h1>
    <app-dynamic-form [initialFields]="fields"></app-dynamic-form>
    <router-outlet />
  `,
  styles: [`
    h1 {
      text-align: center;
    }
  `],
})
export class AppComponent {
  fields = [
    { label: 'Name', type: 'text', value: '' },
    { label: 'Email', type: 'email', value: '' },
    { label: 'Age', type: 'number', value: '' },
  ];
}
