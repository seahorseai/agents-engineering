import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



export interface FormField {
  name: string;        
  label?: string;
  value?: any;
  required?: boolean;
  template: string;
  validators?: string[];
}

export interface FormConfig {
  title: string;
  fields: FormField[];
}

@Component({
  selector: 'app-dynamic-form-declararive-html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <h2>{{ formConfig.title || 'Dynamic Form' }}</h2>
      
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <!-- Loop through each field -->
        <div *ngFor="let field of formFields" class="form-field">
          <!-- The HTML template is applied here using [innerHTML] -->
          <div [innerHTML]="getSafeHtml(compileTemplate(field))" class="field-container"></div>
          
          <!-- Display validation errors -->
          <div *ngIf="isFieldInvalid(field.name)" class="error-message">
            {{ getErrorMessage(field.name) }}
          </div>
        </div>
        
        <div class="form-actions">
          <button type="submit" [disabled]="!form.valid">Submit</button>
          <button type="button" (click)="resetForm()">Reset</button>
        </div>
      </form>
      
      <div *ngIf="submitted" class="submission-result">
        <h3>Form Values:</h3>
        <pre>{{ formValues }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .form-container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .form-field { margin-bottom: 15px; }
    .error-message { color: red; font-size: 12px; margin-top: 5px; }
    .form-actions { margin-top: 20px; }
    button { padding: 8px 15px; margin-right: 10px; }
    .field-container :host ::ng-deep input,
    .field-container :host ::ng-deep select,
    .field-container :host ::ng-deep textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .field-container :host ::ng-deep label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    .field-container :host ::ng-deep .required {
      color: red;
    }
    .submission-result { 
      margin-top: 20px;
      padding: 15px;
      background-color: #f8f8f8;
      border-radius: 4px;
    }
    pre {
      white-space: pre-wrap;
      word-break: break-word;
    }
  `]
})
export class DynamicFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  formValues = '';
  formConfig: FormConfig = {
    title: 'Job Application Form',
    fields: []
  };
  

  formFields: FormField[] = [
    {
      "name": "firstName",
      "label": "First Name",
      "required": true,
      "validators": ["required"],
      "template": "<div class='input-field'><label for='{{name}}'>{{label}} <span class='required'>*</span></label><input type='text' id='{{name}}' formControlName='{{name}}' placeholder='Enter your first name' class='form-control'></div>"
    },
    {
      "name": "lastName",
      "label": "Last Name",
      "required": true,
      "validators": ["required"],
      "template": "<div class='input-field'><label for='{{name}}'>{{label}} <span class='required'>*</span></label><input type='text' id='{{name}}' formControlName='{{name}}' placeholder='Enter your last name' class='form-control'></div>"
    },
    {
      "name": "email",
      "label": "Email Address",
      "required": true,
      "validators": ["required", "email"],
      "template": "<div class='input-field'><label for='{{name}}'>{{label}} <span class='required'>*</span></label><input type='email' id='{{name}}' formControlName='{{name}}' placeholder='Enter your email address' class='form-control'></div>"
    },
    {
      "name": "phoneNumber",
      "label": "Phone Number",
      "template": "<div class='input-field'><label for='{{name}}'>{{label}}</label><div class='phone-input'><input type='tel' id='{{name}}' formControlName='{{name}}' placeholder='Enter your phone number' class='form-control'></div></div>"
    },
    {
      "name": "jobTitle",
      "label": "Job Title",
      "template": "<div class='select-field'><label for='{{name}}'>{{label}}</label><select id='{{name}}' formControlName='{{name}}' class='form-control'><option value=''>Select a job title</option><option value='developer'>Developer</option><option value='designer'>Designer</option><option value='manager'>Manager</option><option value='other'>Other</option></select></div>"
    },
    {
      "name": "experienceLevel",
      "label": "Experience Level",
      "template": "<div class='radio-group'><label>{{label}}</label><div class='radio-options'><div class='radio-option'><input type='radio' id='{{name}}_junior' formControlName='{{name}}' value='junior'><label for='{{name}}_junior'>Junior (0-2 years)</label></div><div class='radio-option'><input type='radio' id='{{name}}_mid' formControlName='{{name}}' value='mid'><label for='{{name}}_mid'>Mid-level (3-5 years)</label></div><div class='radio-option'><input type='radio' id='{{name}}_senior' formControlName='{{name}}' value='senior'><label for='{{name}}_senior'>Senior (5+ years)</label></div></div></div>"
    },
    {
      "name": "skills",
      "label": "Tell us about your skills",
      "template": "<div class='textarea-field'><label for='{{name}}'>{{label}}</label><textarea id='{{name}}' formControlName='{{name}}' placeholder='Describe your skills and experience...' rows='4' class='form-control'></textarea></div>"
    },
    {
      "name": "agreeToTerms",
      "label": "I agree to the terms and conditions",
      "required": true,
      "validators": ["required"],
      "template": "<div class='checkbox-field'><input type='checkbox' id='{{name}}' formControlName='{{name}}'><label for='{{name}}'>{{label}} <span class='required'>*</span></label></div>"
    },
    {
      "name": "receiveUpdates",
      "label": "Receive job updates via email",
      "value": true,
      "template": "<div class='checkbox-field'><input type='checkbox' id='{{name}}' formControlName='{{name}}'><label for='{{name}}'>{{label}}</label></div>"
    },
    {
      "name": "customField",
      "label": "Additional Information",
      "template": "<div class='custom-field'><label for='{{name}}'>{{label}}</label><div class='input-group'><input type='text' id='{{name}}' formControlName='{{name}}' class='form-control' placeholder='Any other information...'></div></div>"
    }
  ];

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.formConfig.fields = this.formFields;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    const formGroup: { [key: string]: FormControl } = {};
    
    this.formFields.forEach(field => {
      const validatorFunctions = this.getValidators(field);
      
      
      const initialValue = field.value !== undefined ? field.value : '';
      formGroup[field.name] = new FormControl(initialValue, validatorFunctions);
    });
    
    this.form = this.fb.group(formGroup);
  }

  
  getValidators(field: FormField): any[] {
    const validatorFunctions: any[] = [];
    
   
    if (field.required) {
      validatorFunctions.push(Validators.required);
    }
    
    
    if (field.validators) {
      field.validators.forEach(validatorName => {
        switch (validatorName) {
          case 'email':
            validatorFunctions.push(Validators.email);
            break;
          case 'minLength':
           
            break;
          
        }
      });
    }
    
    return validatorFunctions;
  }

  
  compileTemplate(field: FormField): string {
    let template = field.template;
    
    
    template = template.replace(/\{\{name\}\}/g, field.name);
    template = template.replace(/\{\{label\}\}/g, field.label || '');
    template = template.replace(/\{\{required\}\}/g, field.required ? '*' : '');
    
    return template;
  }

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    
    if (control?.hasError('minlength')) {
      return `Minimum length is ${control.getError('minlength').requiredLength} characters`;
    }
    
    if (control?.hasError('min')) {
      return `Minimum value is ${control.getError('min').min}`;
    }
    
    if (control?.hasError('max')) {
      return `Maximum value is ${control.getError('max').max}`;
    }
    
    return 'Invalid input';
  }

  resetForm(): void {
    this.form.reset();
    this.submitted = false;
    this.formValues = '';
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      this.formValues = JSON.stringify(this.form.value, null, 2);
      console.log('Form submitted successfully:', this.form.value);
    } else {
      this.markFormGroupTouched(this.form);
    }
  }


  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}