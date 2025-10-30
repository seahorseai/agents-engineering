import { State, Action, StateContext, Selector } from '@ngxs/store';

// Define Actions
export class AddTodo {
  static readonly type = '[Todo] Add';
  constructor(public payload: string) {}
}

export class RemoveTodo {
  static readonly type = '[Todo] Remove';
  constructor(public payload: string) {}
}

// Define the State Model
export interface TodoStateModel {
  todos: string[];
}

// Create the State
@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todos: []
  }
})
export class TodoState {

  // Selector to get the todos
  @Selector()
  static getTodos(state: TodoStateModel): string[] {
    return state.todos;
  }

  // Action to add a todo
  @Action(AddTodo)
  add(ctx: StateContext<TodoStateModel>, action: AddTodo) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      todos: [...state.todos, action.payload]
    });
  }

  // Action to remove a todo
  @Action(RemoveTodo)
  remove(ctx: StateContext<TodoStateModel>, action: RemoveTodo) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      todos: state.todos.filter((todo: string) => todo !== action.payload)
    });
  }
}
