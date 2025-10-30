import { Component } from '@angular/core';

@Component({
  selector: 'app-ngstyle-attribute',
  templateUrl: './ngstyle-attribute.component.html'
})
export class NgstyleAttributeComponent {
  personalizedStyle = {
    "font-size.px": 20,
  };

  incFontSize() { this.personalizedStyle["font-size.px"]++ };

  desFontSize() { this.personalizedStyle["font-size.px"]-- };
}