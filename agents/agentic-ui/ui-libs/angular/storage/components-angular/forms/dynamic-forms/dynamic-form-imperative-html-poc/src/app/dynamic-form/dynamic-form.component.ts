import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Dynamic Form</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div formArrayName="fields">
        <div *ngFor="let field of fieldArray.controls; let i = index" [formGroupName]="i">
          <label>{{ field.get('label')?.value }}</label>
          <input [type]="field.get('type')?.value" formControlName="value" />
          <div *ngIf="field.get('value')?.invalid && field.get('value')?.touched">
            <small>This field is required.</small>
          </div>
        </div>
      </div>

      <button (click)="addField()">Add Field</button>
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
    <pre>{{ form.value | json }}</pre>
  `,
  styles: [`
    form {
      margin: 20px;
    }
    label {
      display: block;
      font-weight: bold;
    }
    input {
      margin-bottom: 10px;
      display: block;
    }
    small {
      color: red;
    }
  `],
})
export class DynamicFormComponent implements OnInit {
  @Input() initialFields: { label: string; type: string; value: any }[] = [];

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      fields: this.fb.array(this.initialFields.map((field) => this.createFieldGroup(field))),
    });
  }

  get fieldArray(): FormArray {
    return this.form.get('fields') as FormArray;
  }



  addField() {
    this.fieldArray.push(
      this.createFieldGroup({ label: 'Gender', type: 'text', value: '' })
    );
  }

  createFieldGroup(field: { label: string; type: string; value: any }) {
    return this.fb.group({
      label: [field.label],
      type: [field.type],
      value: [field.value, Validators.required],
    });
  }

  onSubmit() {
    console.log('Form Submitted:', this.form.value);
  }
}
