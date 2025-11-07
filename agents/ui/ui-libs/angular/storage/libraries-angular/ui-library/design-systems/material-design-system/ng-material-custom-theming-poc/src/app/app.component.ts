import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <mat-card>
      <h1>Angular Material v18 Custom Theme</h1>

      <button mat-raised-button color="primary">
        <mat-icon>thumb_up</mat-icon> Primary Button
      </button>

      <button mat-raised-button color="accent">
        <mat-icon>favorite</mat-icon> Accent Button
      </button>

      <button mat-raised-button color="warn">
        <mat-icon>lightbulb</mat-icon> Warn Button
      </button>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 400px;
      margin: 3rem auto;
      text-align: center;
      padding: 2rem;
    }

    button {
      margin: 1rem 0;
    }

    h1 {
      margin-bottom: 2rem;
    }
  `]
})
export class AppComponent {}
