import { Component } from '@angular/core';

@Component({
  selector: 'app-ngclass-attribute',
	styles: `      
    .text-darkgreen { 
        color: white; 
        font-size: medium; 
        width: 350px; 
        padding: 20px; 
        background: green; 
    }
  `,
  templateUrl: './ngclass-attribute.component.html'
  
})
export class NgclassAttributeComponent {
  isClicked = false;
}