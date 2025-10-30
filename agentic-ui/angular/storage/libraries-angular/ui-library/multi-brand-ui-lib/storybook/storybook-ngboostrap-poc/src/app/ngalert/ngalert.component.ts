import { Component } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngalert',
  standalone: true,
  imports: [NgbAlertModule],
  template: `

  <ngb-alert [dismissible]="false">
	<strong>Warning!</strong> Better check yourself, you're not looking too good.
</ngb-alert>

  `
})
export class NgalertComponent {

}
