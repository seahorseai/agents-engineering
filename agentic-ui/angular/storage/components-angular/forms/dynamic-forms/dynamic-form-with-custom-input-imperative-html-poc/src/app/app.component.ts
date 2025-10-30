// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { DynamicFormComponent, FormFieldConfig } from './dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  template: `
    <div class="container">
      <h1>User Registration</h1>
      
      <app-dynamic-form
        [config]="formConfig"
        [initialValues]="initialFormValues"
        submitButtonText="Register"
      ></app-dynamic-form>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    h1 {
      margin-bottom: 24px;
      color: #333;
    }
  `]
})
export class AppComponent {
  formConfig: FormFieldConfig[] = [
    {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name',
      validators: [Validators.required],
      errorMessages: {
        required: 'First name is required'
      }
    },
    {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      validators: [Validators.required],
      errorMessages: {
        required: 'Last name is required'
      }
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'your.email@example.com',
      validators: [
        Validators.required,
        Validators.email
      ],
      errorMessages: {
        required: 'Email address is required',
        email: 'Please enter a valid email address'
      }
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Create a secure password',
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ],
      errorMessages: {
        required: 'Password is required',
        minlength: 'Password must be at least 8 characters long',
        pattern: 'Password must contain uppercase, lowercase, number and special character'
      }
    },
    {
      name: 'birthDate',
      label: 'Date of Birth',
      type: 'date',
      validators: [Validators.required],
      errorMessages: {
        required: 'Date of birth is required'
      }
    }
  ];
  
  initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDate: ''
  };
}
