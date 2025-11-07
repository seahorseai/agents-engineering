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
  selector: 'app-sidenav',
  template: `
  
<!--TOOLBAR -->
  <mat-toolbar color="accent">
    @if (isHandset$ | async) {
      <button
        type="button"
        aria-label="Toggle sidenav"
        mat-icon-button
        (click)="sidenav.toggle()"
      >
          <mat-icon aria-label="sidenav toggle icon">menu</mat-icon>
      </button>
      }
    <span>Mat-Toolbar</span>

    <span class="spacer"></span>
        @if (!(isHandset$ | async)) {
          <a mat-button href="#">Link 1</a>
          <a mat-button href="#">Link 2</a>
          <a mat-button href="#">Link 3</a>
           }
  </mat-toolbar>


  <!--SIDENAV -->
  <mat-sidenav-container>
    
    <mat-sidenav
      #sidenav
      fixedInViewport
      [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
		  [ngClass]="{hidden: !(isHandset$ | async)}"
	    >
        <mat-toolbar color="accent">Menu</mat-toolbar>
          <mat-nav-list>
            <a mat-list-item href="#">Link 1</a>
            <a mat-list-item href="#">Link 2</a>
            <a mat-list-item href="#">Link 3</a>
          </mat-nav-list>
        </mat-sidenav>

      <mat-sidenav-content>
        <!-- Add Content Here -->
		    <main>
          <h1>The sidenav components are designed to add side content to a fullscreen app.</h1>
        </main>
      </mat-sidenav-content>
  </mat-sidenav-container>
  
  
  
  `,
  styles: [`

  mat-sidenav-container {
        height: 100vh;
    }

  .spacer {
    flex: 1 1 auto;
    }

  .hidden {
    display: none;
  }


    `],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
		NgClass
  ]
})
export class SidenavComponent {

  
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 599.98px)')
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );
}