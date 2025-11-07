import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { UsernameService } from './username.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

export function usernameAsyncValidator(service: UsernameService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null); // Valid if empty
    return service.checkUsername(control.value).pipe(
      map(isTaken => (isTaken ? { usernameTaken: true } : null))
    );
  };
}


@Component({
  selector: 'app-async-validation-form',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <label for="username">Username:</label>
        <input id="username" formControlName="username" />
        <div *ngIf="form.get('username')?.pending">Checking availability...</div>
        <div *ngIf="form.get('username')?.hasError('usernameTaken') && form.get('username')?.touched">
          This username is already taken.
        </div>
        <div *ngIf="form.get('username')?.hasError('required') && form.get('username')?.touched">
          Username is required.
        </div>
      </div>

      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `,
  styles: [``],
})
export class AsyncValidationFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private usernameService: UsernameService) {
    this.form = this.fb.group({
      username: [
        '',
        Validators.required,
        usernameAsyncValidator(this.usernameService),
      ],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
    }
  }
}

