import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from './todo/todo.model';
import { addTodo, toggleTodo, deleteTodo } from './todo/todo.actions';
import { selectAllTodos } from './todo/todo.selectors';
import { v4 as uuidv4 } from 'uuid';

@Component({
	selector: 'app-root',
	template: `
		<h1>Todo List</h1>
		<input [(ngModel)]="newTodo" placeholder="Enter a new task" />
		<button (click)="add()">Add</button>
		<ul>
			<li *ngFor="let todo of todos$ | async">
				<span [style.textDecoration]="todo.completed ? 'line-through' : 'none'" (click)="toggle(todo.id)">
					{{ todo.title }}
				</span>
				<button (click)="remove(todo.id)">Delete</button>
			</li>
		</ul>
	`,
})
export class AppComponent {
	newTodo: string = '';
	todos$: Observable<Todo[]>;

	constructor(private store: Store) {
		this.todos$ = this.store.select(selectAllTodos);
	}

	add(): void {
		if (this.newTodo.trim()) {
			const todo: Todo = {
				id: uuidv4(),
				title: this.newTodo.trim(),
				completed: false,
			};
			this.store.dispatch(addTodo({ todo }));
			this.newTodo = '';
		}
	}

	toggle(id: string): void {
		this.store.dispatch(toggleTodo({ id }));
	}

	remove(id: string): void {
		this.store.dispatch(deleteTodo({ id }));
	}
}
