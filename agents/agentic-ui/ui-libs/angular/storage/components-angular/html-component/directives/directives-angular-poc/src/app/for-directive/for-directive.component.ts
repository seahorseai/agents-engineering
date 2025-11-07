import { Component } from '@angular/core';

@Component({
  selector: 'app-for-directive',
  templateUrl: 'for-directive.component.html',
})
export class ForDirectiveComponent {
  countries: string[] = ["Afghanistan", "Albania", "Algeria", "Andorra"];
}