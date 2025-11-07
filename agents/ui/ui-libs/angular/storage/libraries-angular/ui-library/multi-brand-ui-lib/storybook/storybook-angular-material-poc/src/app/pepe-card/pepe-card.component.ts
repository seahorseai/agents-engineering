import { Component, ChangeDetectionStrategy } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-pepe-card',
  standalone: true,
  imports: [MatCardModule],
  template: `
  
  <mat-card appearance="outlined">
  <mat-card-content>Simple card</mat-card-content>
  </mat-card>

  
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
 
})
export class PepeCardComponent {

}
