import { TwoWayBindingComponent } from "./two-way-binding.component";
import { render, screen } from '@testing-library/angular';

describe("TwoWayBindingComponent", () => {
  
  
	beforeEach(async() => {
		await render(TwoWayBindingComponent, {
			componentProperties: {
				fontSizePx: 16
			}
		});
  });

	it("the font size should be two-way binded", () => {
		expect(screen.getByText("FontSize: 16px")).toBeTruthy();
		
		const decrementFontSizeButton = screen.getByRole("button", {name: "-"});
		const incrementFontSizeButton = screen.getByRole("button", {name: "+"});
		
		decrementFontSizeButton.click();
		expect(screen.getByText('Resizable Text').style.fontSize).toBe("15px");

		incrementFontSizeButton.click();
		expect(screen.getByText('Resizable Text').style.fontSize).toBe("16px");
	});
});