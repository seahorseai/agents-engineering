import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-ngstyle-attribute',
  standalone: true,
  imports: [NgStyle],
  template: `
    <hr />

    <p>Click the buttons and see the difference!!!</p>

    <hr />
    <div>
      <span [ngStyle]="personalizedStyle">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>
      <p>
        <button (click)="incFontSize()">+</button>
        <button (click)="desFontSize()">-</button>
      </p>
    </div>
  `,
})
export class NgstyleDirectiveComponent {
  personalizedStyle = {
    "font-size.px": 20,
  };

  incFontSize() { this.personalizedStyle["font-size.px"]++ };

  desFontSize() { this.personalizedStyle["font-size.px"]-- };
}
