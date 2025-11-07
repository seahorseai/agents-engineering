
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-field">
      <label *ngIf="label">{{ label }}</label>
      <input
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [ngClass]="{ 'error': showError }"
        [(ngModel)]="value"
      />
      <div *ngIf="showError" class="error-message">{{ errorMessage }}</div>
    </div>
  `,
  styles: [`
    .form-field {
      margin-bottom: 16px;
    }
    label {
      display: block;
      margin-bottom: 4px;
      font-weight: 500;
    }
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }
    input.error {
      border-color: #dc3545;
    }
    .error-message {
      color: #dc3545;
      font-size: 14px;
      margin-top: 4px;
    }
    input:disabled {
      background-color: #e9ecef;
      cursor: not-allowed;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() showError = false;
  @Input() errorMessage = 'This field is required';

  private _value: any = '';
  
  get value() {
    return this._value;
  }
  
  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouch();
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
