import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-scroll',
  standalone: true,
  imports: [],
  template: `
    <nav>
      <button (click)="scrollTo('section1')">Section 1</button>
      <button (click)="scrollTo('section2')">Section 2</button>
      <button (click)="scrollTo('section3')">Section 3</button>
    </nav>

    <section id="section1" class="content-section">
      <h2>Section 1</h2>
      <p>Content for section 1...</p>
    </section>

    <section id="section2" class="content-section">
      <h2>Section 2</h2>
      <p>Content for section 2...</p>
    </section>

    <section id="section3" class="content-section">
      <h2>Section 3</h2>
      <p>Content for section 3...</p>
    </section>
  `,
  styles: [`
    .content-section {
      height: 100vh;
      padding: 20px;
      border-bottom: 1px solid #ccc;
    }
    nav {
      position: fixed;
      top: 0;
      width: 100%;
      background: white;
      padding: 10px;
      z-index: 1000;
    }
    button {
      margin-right: 10px;
    }
  `]
})
export class ScrollComponent {
  private viewportScroller = inject(ViewportScroller);

  scrollTo(sectionId: string) {
    this.viewportScroller.scrollToAnchor(sectionId);
    
    // Alternatively, you can use:
    // this.viewportScroller.scrollToPosition([0, document.getElementById(sectionId).offsetTop]);
  }
}
