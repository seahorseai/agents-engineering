import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-naming',
  standalone: true,
  imports: [ NgClass ],
  template: `

    <button class="btn btn-outline-primary">{{ label }}</button>
  
  `,
  styles: [

    

  ]
})
export class ButtonNamingComponent {

  @Input() label = 'Click me';
  @Input() variant: 'primary' | 'secondary' = 'primary';

}
