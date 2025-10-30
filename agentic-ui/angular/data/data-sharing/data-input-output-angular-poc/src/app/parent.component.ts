import { Component } from '@angular/core';
import { ChildComponent } from "./child.component";

@Component({
  selector: 'app-parent',
  standalone: true,
  template: `
    <h1>Task List</h1>
    @for(task of tasks; track $index){

      <app-child 
        [task]="task" 
        (updateTask)="handleTaskUpdate($event)">
      </app-child>

      <ul>
	@for (updateFromList of updates; track $index) {
		<li>
        {{updateFromList}}
		</li>
	}
</ul>
    

    }
      
  `,
  imports: [ChildComponent],
})
export class ParentComponent {

  updates : string[] = [];




  tasks = [
    { id: 1, title: 'Buy groceries' },
  ];

  handleTaskUpdate(updatedTask: { id: number; title: string }) {
    // Update the task in the tasks array
    const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = updatedTask;
    }
    
    console.log('Task updated:', updatedTask);
    this.updates.push(updatedTask.title);
  }
}
