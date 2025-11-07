import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-element',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="nav">
      <button (click)="scrollToSection('section1')">Go to Section 1</button>
      <button (click)="scrollToSection('section2')">Go to Section 2</button>
      <button (click)="scrollToSection('section3')">Go to Section 3</button>
    </nav>

    <div class="scroll-container">
      <div id="section1" class="section">Section 1</div>
      <div id="section2" class="section">Section 2</div>
      <div id="section3" class="section">Section 3</div>
    </div>
  `,
  styles: [`
    .nav {
      position: sticky;
      top: 0;
      background: #fff;
      padding: 10px;
      z-index: 1;
    }

    .scroll-container {
      height: 400px;
      overflow-y: scroll;
      border: 1px solid #ccc;
    }

    .section {
      height: 600px;
      padding: 20px;
      border-bottom: 1px solid #ddd;
      background-color: #f9f9f9;
    }
  `]
})
export class ScrollToElementComponent {
  scrollToSection(id: string) {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
