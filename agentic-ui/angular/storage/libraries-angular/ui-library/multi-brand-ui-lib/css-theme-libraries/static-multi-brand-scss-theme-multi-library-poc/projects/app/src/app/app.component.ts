


import { Component } from '@angular/core';
import { ButtonComponent } from 'ui-lib';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  template: `


    <div class="container">
      <h1>Static Multi-brand UI Lib</h1>
 


    <div class="preference">
 
        <ui-button>Click Me</ui-button>
    </div>
   
    <div class="preference">
     
   
    </div>


    </div>
 
  `,
  styles: [
    `
      .preference {
        display: flex;
        justify-content: space-between;
        width: 60%;
        margin: 0.5rem;
}


    `
  ]
})
export class AppComponent {}


