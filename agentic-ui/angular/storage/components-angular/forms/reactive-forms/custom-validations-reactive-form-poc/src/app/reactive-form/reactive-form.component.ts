import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  


// Custom Validator Function
export function forbiddenNameValidator(forbiddenName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = control.value?.toLowerCase() === forbiddenName.toLowerCase();
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="name">Name:</label>
        <input id="name" formControlName="name" />
        <div *ngIf="myForm.get('name')?.hasError('forbiddenName') && myForm.get('name')?.touched">
          This name is not allowed.
        </div>
      </div>

      <div>
        <label for="email">Email:</label>
        <input id="email" formControlName="email" />
        <div *ngIf="myForm.get('email')?.hasError('email') && myForm.get('email')?.touched">
          Please enter a valid email.
        </div>
      </div>

      <div>
        <label for="age">Age:</label>
        <input id="age" formControlName="age" type="number" />
        <div *ngIf="myForm.get('age')?.hasError('min') && myForm.get('age')?.touched">
          You must be at least 18 years old.
        </div>
      </div>

      <button type="submit" [disabled]="myForm.invalid">Submit</button>
    </form>
  `,
  styles: [``]
})
export class ReactiveFormComponent {
  
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, forbiddenNameValidator('admin')]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18)]]
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form Submitted:', this.myForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
