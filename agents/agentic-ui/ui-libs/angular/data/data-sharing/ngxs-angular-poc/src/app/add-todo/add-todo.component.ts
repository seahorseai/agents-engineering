import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddTodo } from '../todo.state';

@Component({
  selector: 'add-todo',
  template: `
    <input [(ngModel)]="todo" placeholder="Enter a todo" />
    <button (click)="addTodo()">Add Todo</button>
  `
})
export class AddTodoComponent {
  todo: string = '';

  constructor(private store: Store) {}

  addTodo() {
    if (this.todo.trim()) {
      
      console.log(new AddTodo(this.todo).payload)
      
      
      this.store.dispatch(new AddTodo(this.todo));
      this.todo = ''; // Clear the input
    }
  }
}