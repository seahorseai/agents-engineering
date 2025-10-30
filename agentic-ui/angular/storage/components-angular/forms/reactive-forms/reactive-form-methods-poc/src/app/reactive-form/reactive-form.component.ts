import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="name">Name:</label>
        <input id="name" formControlName="name" />
      </div>

      <div>
        <label for="email">Email:</label>
        <input id="email" formControlName="email" />
      </div>

      <div>
        <label for="age">Age:</label>
        <input id="age" formControlName="age" type="number" />
      </div>

      <button type="button" (click)="updateFormValues()">Set Value</button>
      <button type="button" (click)="patchFormValues()">Patch Value</button>
      <button type="button" (click)="resetForm()">Reset</button>
      <button type="submit">Submit</button>
    </form>
  `,
  styles: [``]
})
export class ReactiveFormComponent {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [null, Validators.min(18)]
    });

    // Listen to statusChanges
    this.myForm.statusChanges.subscribe(status => {
      console.log('Form status changed:', status);
    });

    // Listen to valueChanges
    this.myForm.valueChanges.subscribe(value => {
      console.log('Form value changed:', value);
    });
  }

  // SetValue updates all controls and requires every control to be included
  updateFormValues(): void {
    this.myForm.setValue({
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30
    });
  }

  // PatchValue updates specific controls and can leave out some fields
  patchFormValues(): void {
    this.myForm.patchValue({
      email: 'new.email@example.com'
    });
  }

  // Reset the form to its initial state
  resetForm(): void {
    this.myForm.reset();
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form Submitted:', this.myForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}

bootstrapApplication(ReactiveFormComponent).catch(err => console.error(err));
