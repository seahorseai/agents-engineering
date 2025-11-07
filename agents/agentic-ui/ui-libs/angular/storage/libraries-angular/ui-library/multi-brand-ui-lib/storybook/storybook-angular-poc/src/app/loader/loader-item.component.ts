

import { Component, Input } from '@angular/core';

@Component({
  selector: 'item-loader',
  template: `
    <div *ngIf="todo">
      <h3>{{ todo.title }}</h3>
      <p>Status: {{ todo.completed ? 'Completed' : 'Pending' }}</p>
    </div>
  `,
})
export class ItemLoaderComponent {
  @Input() todo!: { title: string; completed: boolean };
}

