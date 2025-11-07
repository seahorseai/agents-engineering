import { Component } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent],
  template: `
    <app-sidenav></app-sidenav>
  `,
})
export class AppComponent {
}
