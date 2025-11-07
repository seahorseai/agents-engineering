import { Component} from '@angular/core';
import { ListComponent } from './list-component/list.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title: string = 'Networking';
 
 

  






}

