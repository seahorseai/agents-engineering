import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  title = 'local-storage';
  token: string | undefined;
  constructor(@Inject(DOCUMENT) private document: Document) {
    
    const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      const token = localStorage.getItem('token');
     
      if (token) {
        localStorage.setItem('token','xhja787')
        this.token = token;
      } else {
        localStorage.setItem('token', '1');
       
      }
    }

}
}
