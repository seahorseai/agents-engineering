import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-args',
  standalone: true,
  imports: [],
  template: `

  <button
  class="btn btn-outline-primary">{{ storybookArg }}</button>


`
  
})
export class ButtonArgsComponent {

  storybookArg: string | undefined;
  
}
