import { Component, ViewChild } from '@angular/core';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list'; // Import MatListModule
import {  NgFor } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule, // Add MatListModule to the imports array
    
    NgFor
  ],
  template: `

      <!-- TOOLBAR -->

    <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>My App</span>
        </mat-toolbar>
    
     <!-- SIDENAV -->
    <mat-sidenav-container class="sidenav-container">
       <mat-sidenav #sidenav mode="side" opened>
         <mat-nav-list>
           <a mat-list-item *ngFor="let item of navItems" (click)="sidenav.close()">
             <mat-icon>{{ item.icon }}</mat-icon>
             <span>{{ item.label }}</span>
           </a>
         </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content class="sidenav-content">
     
        
          <p>Main content goes here!</p>

      
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: calc(100vh - 64px); /* Adjust for toolbar height */
    }

    .sidenav-content {
      padding: 16px;
    }

    .mat-nav-list a {
      cursor: pointer;
    }

    .mat-icon {
      margin-right: 8px;
    }
  `],
})
export class SidenavComponent {
  
  navItems = [
    { label: 'Home', icon: 'home' },
    { label: 'Profile', icon: 'account_circle' },
    { label: 'Settings', icon: 'settings' },
  ];
}