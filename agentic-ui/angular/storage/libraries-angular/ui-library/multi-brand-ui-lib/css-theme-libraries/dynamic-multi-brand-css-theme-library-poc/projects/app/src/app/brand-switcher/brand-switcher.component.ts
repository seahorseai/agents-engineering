import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrandService, BrandType } from 'ui-lib';
import { ButtonComponent } from 'ui-lib';

@Component({
  selector: 'app-brand-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  template: `
    <div>
      <label>Select Brand:</label>
      <select [ngModel]="currentBrand" (ngModelChange)="switchBrand($event)">
        <option value="brand-a">Brand A</option>
        <option value="brand-b">Brand B</option>
      </select>
    </div>

    <div style="margin-top: 20px">
      <button-lib variant="primary" style="margin-right: 10px">Primary Button</button-lib>
      <button-lib variant="secondary">Secondary Button</button-lib>
    </div>
  `
})
export class BrandSwitcherComponent {
  currentBrand: BrandType;

  constructor(private brandService: BrandService) {
    this.currentBrand = this.brandService.brand();
  }

  switchBrand(brand: BrandType): void {
    this.currentBrand = brand;
    this.brandService.switchBrand(brand);
  }
}
