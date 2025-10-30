import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Scrollable View Example</h1>
    <div class="scroll-container">
      <div *ngFor="let item of items" class="item">
        Item {{ item }}
      </div>
    </div>
  `,
  styles: [`    
  
    .scroll-container {
      height: 300px;
      width: 100%;
      border: 1px solid #ccc;
      overflow-y: scroll;
      padding: 10px;
      box-sizing: border-box;
    }

    .item {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
  `]
})
export class FiniteScrollComponent {
  items = Array.from({ length: 50 }, (_, i) => i + 1);
}
