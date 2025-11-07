import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card'; 
import {MatButtonModule} from '@angular/material/button'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'card';
}
