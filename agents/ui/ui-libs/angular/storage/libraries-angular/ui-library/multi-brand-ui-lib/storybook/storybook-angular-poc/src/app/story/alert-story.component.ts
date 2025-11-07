import { Component, Input } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'alert-story',
  standalone: true,
  imports: [NgbAlertModule],
  template: `
    
    <ngb-alert [dismissible]="false">
	  <strong>{{ message }}</strong> 
    </ngb-alert>

  `,
 
})
export class AlertComponent {
  @Input() message: string | undefined;

}
