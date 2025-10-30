// dynamic-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, ValidatorFn } from '@angular/forms';
import { InputComponent } from '../input/input.component';

export interface FormFieldConfig {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date';
  placeholder?: string;
  validators?: ValidatorFn[];
  errorMessages?: { [key: string]: string };
  defaultValue?: any;
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ng-container *ngFor="let field of config">
        <app-input
          [formControlName]="field.name"
          [label]="field.label"
          [placeholder]="field.placeholder || ''"
          [type]="field.type || 'text'"
          [showError]="isFieldInvalid(field.name)"
          [errorMessage]="getErrorMessage(field.name)"
        ></app-input>
      </ng-container>
      
      <div class="form-actions">
        <button 
          type="submit" 
          [disabled]="form.invalid || isSubmitting"
          class="submit-button"
        >
          {{ submitButtonText }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    form {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }
    
    .form-actions {
      margin-top: 24px;
      display: flex;
      justify-content: flex-end;
    }
    
    .submit-button {
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    
    .submit-button:hover {
      background-color: #0069d9;
    }
    
    .submit-button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
  `]
})
export class DynamicFormComponent implements OnInit {
  @Input() config: FormFieldConfig[] = [];
  @Input() submitButtonText = 'Submit';
  @Input() initialValues: { [key: string]: any } = {};
  
  form!: FormGroup;
  isSubmitting = false;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.createForm();
  }
  
  private createForm() {
    const formGroupConfig: { [key: string]: any } = {};
    
    this.config.forEach(field => {
      const initialValue = this.initialValues[field.name] || field.defaultValue || '';
      formGroupConfig[field.name] = [initialValue, field.validators || []];
    });
    
    this.form = this.fb.group(formGroupConfig);
  }
  
  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return (control?.invalid && (control?.dirty || control?.touched)) ?? false;
  }
  
  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    
    if (!control || !control.errors) {
      return '';
    }
    
    const fieldConfig = this.config.find(f => f.name === fieldName);
    const errorMessages = fieldConfig?.errorMessages || {};
    
    const errorKeys = Object.keys(control.errors);
    
    if (errorKeys.length === 0) {
      return '';
    }
    
    const firstError = errorKeys[0];
    
    // Return custom error message if available, otherwise return default
    return errorMessages[firstError] || this.getDefaultErrorMessage(firstError, control.errors[firstError]);
  }
  
  private getDefaultErrorMessage(errorType: string, errorValue: any): string {
    switch (errorType) {
      case 'required':
        return 'This field is required';
      case 'email':
        return 'Please enter a valid email address';
      case 'minlength':
        return `Minimum length is ${errorValue.requiredLength} characters`;
      case 'maxlength':
        return `Maximum length is ${errorValue.requiredLength} characters`;
      case 'pattern':
        return 'The value does not match the required pattern';
      case 'min':
        return `Minimum value is ${errorValue.min}`;
      case 'max':
        return `Maximum value is ${errorValue.max}`;
      default:
        return 'This field is invalid';
    }
  }
  
  onSubmit() {
    if (this.form.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
      return;
    }
    
    this.isSubmitting = true;
    
    // In a real application, you would handle the form submission here
    // For example, sending the form data to a backend API
    console.log('Form submitted:', this.form.value);
    
    // Simulate async operation
    setTimeout(() => {
      this.isSubmitting = false;
      // Reset form after successful submission if needed
      // this.form.reset();
    }, 1000);
  }
  
  // Public method to reset the form
  resetForm() {
    this.form.reset(this.initialValues);
  }
  
  // Public method to patch form values
  patchFormValues(values: { [key: string]: any }) {
    this.form.patchValue(values);
  }
}