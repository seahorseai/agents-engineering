import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <mat-icon>menu</mat-icon>
      <span>My Standalone App</span>
      <span class="spacer"></span>
      <button mat-raised-button color="accent" (click)="showAlert()">
        <mat-icon>touch_app</mat-icon> Click Me
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `],
})
export class ToolbarComponent {
  showAlert() {
    alert('Button clicked in standalone component!');
  }
}