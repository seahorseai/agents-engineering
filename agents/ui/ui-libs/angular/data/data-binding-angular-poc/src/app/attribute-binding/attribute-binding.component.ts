import { Component } from '@angular/core';

@Component({
  selector: 'app-attribute-binding',
  standalone: true,
  template: `
    <div>
      <hr />
      <h1>Attribute Binding</h1>
      <p>Change the input and see the differences!!!</p>
      <hr />
      <div (keyup)="(0)">
        <div>
          <h2>HTML Attribute Initializes to "{{ inputValue }}"</h2>
          <label for="html-attr">
            <input id="html-attr" type="text" [attr.value]="inputValue" #bindingInput1 />
          </label>
          <p id="attribute">HTML attribute value: {{ bindingInput1.getAttribute('value') }} (static)</p>
          <p id="property">DOM property value: {{ bindingInput1.value }}</p>
        </div>
      </div>
    </div>
  `,
})
export class AttributeBindingComponent {
  inputValue = 'miguel';
}
