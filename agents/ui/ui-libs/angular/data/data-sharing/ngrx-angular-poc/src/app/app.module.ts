import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './todo/todo.reducer';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
		FormsModule,
    StoreModule.forRoot({ todos: todoReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
