import { Component } from '@angular/core';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-ngclass-attribute',
  standalone: true,
  imports: [NgClass],
  styles: `      
    .text-darkgreen { 
        color: white; 
        font-size: medium; 
        width: 350px; 
        padding: 20px; 
        background: green; 
    }
  `,
  template: `
    <hr />

    <p>Click the button and see the difference!!!</p>

    <hr />
    <div>
      <button class="btn btn-primary" (click)="this.isClicked = !this.isClicked">On/Off</button>
      <h3 class="display" [ngClass]="{'text-darkgreen':  isClicked}"> 
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h3>
    </div>
  `,
  
})
export class NgclassDirectiveComponent {
  isClicked = false;
}
