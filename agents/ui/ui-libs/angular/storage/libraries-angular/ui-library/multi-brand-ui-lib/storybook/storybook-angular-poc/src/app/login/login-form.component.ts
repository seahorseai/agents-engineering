import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ],
  selector: 'app-login-form',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <div >
        <input class="form-control" placeholder="email" id="email" type="email" formControlName="email" />
        <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
          <small>Email is required and must be valid.</small>
        </div>
      </div>

      <div >
        
        <input class="form-control" placeholder="password" id="password" type="password" formControlName="password" />
        <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
          <small>Password is required (min length: 6).</small>
        </div>
      </div>

      <button class="btn btn-primary" type="submit" [disabled]="loginForm.invalid">Login</button>
    </form>
  `,
  styles: [`
    form div {
      margin-bottom: 12px;
    }
    small {
      color: red;
    }
  `],
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
