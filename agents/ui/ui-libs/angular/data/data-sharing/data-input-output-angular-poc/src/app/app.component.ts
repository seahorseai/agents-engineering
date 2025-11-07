import { Component } from '@angular/core';
import { ParentComponent } from './parent.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  ParentComponent ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'data-input';
}
