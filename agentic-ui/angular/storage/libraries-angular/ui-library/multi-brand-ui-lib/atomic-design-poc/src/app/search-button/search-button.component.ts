import { Component, Input } from '@angular/core';



@Component({
  selector: 'app-search-button',
  standalone: true,
  template: `<button (click)="handleClick()">{{ label }}</button>`,
  styles: [`button { padding: 8px 16px; background: #007bff; color: white; border: none; cursor: pointer; }`]
})
export class SearchButtonComponent {
  @Input() label = 'Search';
  handleClick() {
    console.log('Button clicked');
  }
}
