import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {  FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NgClass } from '@angular/common';


class FormValidation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgClass],
  template: `
  
  <div class="register-form">
    <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>Full Name</label>
        <input
          type="text"
          formControlName="fullname"
          class="form-control"
          [ngClass]="{ 'is-invalid': submitted && f['fullname'].errors }"
        />
        @if (submitted && f['fullname'].errors) {
        <div class="invalid-feedback">
          @if (f['fullname'].errors['required']) {
          <div>Fullname is required</div>
          }
        </div>
        }
      </div>
  
      <div class="form-group">
        <label>Username</label>
        <input
          type="text"
          formControlName="username"
          class="form-control"
          [ngClass]="{ 'is-invalid': submitted && f['username'].errors }"
        />
          @if (submitted && f['username'].errors) {
          <div class="invalid-feedback">
          @if (f['username'].errors['required']) {
          <div>Username is required</div>
          }
        </div>
        }
      </div>
  
      <div class="form-group">
        <label>Email</label>
        <input
          type="text"
          formControlName="email"
          class="form-control"
          [ngClass]="{ 'is-invalid': submitted && f['email'].errors }"
        />
      @if (submitted && f['email'].errors) {
        <div class="invalid-feedback">
          @if (f['email'].errors['required']) {
            <div>Email is required</div>
          }
              @if (f['email'].errors['email']) {
            <div>Email is invalid</div>
          }
        </div>
        }
      </div>
  
      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          formControlName="password"
          class="form-control"
          [ngClass]="{ 'is-invalid': submitted && f['password'].errors }"
        />
        @if (submitted && f['password'].errors) {
        <div class="invalid-feedback">
          @if (f['password'].errors['required']) {
          <div>Password is required</div>
          }
        </div>
        }
      </div>
  
      <div class="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          formControlName="confirmPassword"
          class="form-control"
          [ngClass]="{ 'is-invalid': submitted && f['confirmPassword'].errors }"
        />
        @if (submitted && f['confirmPassword'].errors) {
        <div class="invalid-feedback">
          @if (f['confirmPassword'].errors['required']) {
          <div>Confirm Password is required</div>
          }
          @if (f['confirmPassword'].errors['matching']) {
          <div>Confirm Password does not match</div>
          }
        </div>
        }
      </div>
  
      <div class="form-group">
        <button type="submit" (click)="onSubmit()" class="btn btn-primary">Register</button>
      </div>
    </form>
  </div>
  `,
styles: [
  
]
})
export class AppComponent implements OnInit {
  
  formGroup: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: ['',[Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: [FormValidation.match('password', 'confirmPassword')]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    console.log(JSON.stringify(this.formGroup.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.formGroup.reset();
  }

}




