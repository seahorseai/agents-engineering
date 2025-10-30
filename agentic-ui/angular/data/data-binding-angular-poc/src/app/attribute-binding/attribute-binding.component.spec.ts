import { AttributeBindingComponent } from "./attribute-binding.component";
import { fireEvent, render, screen } from '@testing-library/angular';

describe("AttributeBindingComponent", () => {
	let htmlInputElement: HTMLInputElement;

  beforeEach(async () => {
		await render(AttributeBindingComponent, {
			componentProperties: {
				inputValue: 'miguel'
			}
		});
		htmlInputElement = screen.getByRole("textbox");
  });

  it("htmlInputElement's value attribute should be equal to inputValue", () => {
		expect(htmlInputElement.getAttribute("value")).toBe('miguel');
  });

  it("after modifying input, we should see <p id=attribute>'s text unchanged and <p id=property>'s text modified", () => {
		const ATTRIBUTE_PARAGRAPH = screen.getByText('HTML attribute value: miguel (static)');
		const PROPERTY_PARAGRAPH = screen.getByText('DOM property value: miguel');

		fireEvent['input'](htmlInputElement, {target: {value: "Another value"}});

		expect(ATTRIBUTE_PARAGRAPH.textContent).toEqual(`HTML attribute value: miguel (static)`);
		expect(PROPERTY_PARAGRAPH.textContent).toEqual(`DOM property value: Another value`);
  });
});