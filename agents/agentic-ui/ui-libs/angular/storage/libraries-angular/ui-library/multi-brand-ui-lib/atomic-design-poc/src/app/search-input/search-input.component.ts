import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; 




@Component({
  selector: 'app-search-input',
  imports: [FormsModule],
  standalone: true,
  template: `<input [placeholder]="placeholder" [(ngModel)]="query">`,
  styles: [`input { padding: 8px; width: 200px; border: 1px solid #ccc; }`]
})
export class SearchInputComponent {
  @Input() placeholder = 'Search...';
  query = '';
}