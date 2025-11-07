import { PropertyBindingComponent } from "./property-binding.component";
import { fireEvent, render, screen } from '@testing-library/angular';

describe("PropertyBindingComponent", () => {
	let htmlInputElement: HTMLInputElement;

  beforeEach(async() => {
		await render(PropertyBindingComponent, {
			componentProperties: {
				inputValue: 'miguel'
			}
		});
		htmlInputElement = screen.getByRole("textbox");
  });

  it("input's value attribute should be null", () => {
		expect(htmlInputElement.getAttribute("value")).toEqual(null);
  });

  it("after modifying input, DOM paragraph's text should be modified", () => {
		const DOM_PARAGRAPH = screen.getByText('DOM property value: miguel');
		fireEvent['input'](htmlInputElement, {target: {value: "Another value"}});

		expect(DOM_PARAGRAPH.textContent).toEqual(`DOM property value: Another value`);
  });
});