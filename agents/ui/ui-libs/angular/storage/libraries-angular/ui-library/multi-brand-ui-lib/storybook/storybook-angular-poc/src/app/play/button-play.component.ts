
 import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'button-play',
  standalone: true,
  template: `<button class="btn btn-outline-primary" (click)="handleClick()">{{ label }}</button>`,
  styles: []
  
})
export class ButtonEventComponent {
  label: string = 'Click Me';

  @Output() clicked = new EventEmitter<void>();

  handleClick() {

    this.clicked.emit();
  }

}

