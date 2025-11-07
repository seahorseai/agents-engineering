import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <div class="task">
      <input 
        [value]="task.title" 
        (input)="onTitleChange($event)" 
        placeholder="Edit task"
      />
      <button (click)="saveChanges()">Save</button>
    </div>
  `,
  styles: [`
    .task {
      margin-bottom: 10px;
    }
    input {
      margin-right: 10px;
    }
  `],
})
export class ChildComponent {
  @Input() task!: { id: number; title: string }; // Input property for the task
  @Output() updateTask = new EventEmitter<{ id: number; title: string }>(); // Output property to emit task updates

  private updatedTask!: { id: number; title: string };

  ngOnInit() {
    this.updatedTask = { ...this.task }; // Clone the input task to avoid direct mutations
  }

  onTitleChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.updatedTask.title = inputElement.value; // Update the local task object
  }

  saveChanges() {
    this.updateTask.emit(this.updatedTask); // Emit the updated task to the parent
  }
}
