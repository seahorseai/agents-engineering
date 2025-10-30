import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

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
  templateUrl: './app.component.html',
})
export class AppComponent {
  form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
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
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
   console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  } 
}