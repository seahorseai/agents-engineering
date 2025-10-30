import { Component } from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-scroll',
  standalone: true,
  imports: [ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="example-viewport">
    <div *cdkVirtualFor="let item of items" class="example-item">{{item}}</div>
    </cdk-virtual-scroll-viewport>  
  `  ,
  styles: [`

    .example-viewport {
        height: 200px;
        width: 200px;
        border: 1px solid black;
      }

    .example-item {
          height: 50px;
      }
    
    `
  ]
})
export class ScrollComponent {

  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

}
