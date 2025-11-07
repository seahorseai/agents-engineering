import { Component, inject } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
		NgClass,
  ]
})
export class AppComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 599.98px)')
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );
}
