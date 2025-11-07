import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
	templateUrl: 'counter.component.html',
})
export class CounterComponent {
  // Define a Signal with an initial value of 0
  counter = signal(0);

  // Increment the counter
  increment() {
    this.counter.update(value => value + 1);
  }

  // Decrement the counter
  decrement() {
    this.counter.update(value => value - 1);
  }
}