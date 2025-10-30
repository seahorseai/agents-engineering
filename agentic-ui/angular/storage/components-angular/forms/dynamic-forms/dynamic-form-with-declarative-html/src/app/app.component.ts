
import { Component } from '@angular/core';
import { DynamicFormComponent } from './dynamic-html-form/dynamic-html-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <div class="container">
      <h1>Dynamic Form Example</h1>
      <app-dynamic-form-declararive-html></app-dynamic-form-declararive-html>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }
  `]
})
export class AppComponent {}