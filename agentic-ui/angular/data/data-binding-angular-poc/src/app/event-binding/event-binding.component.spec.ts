import { EventBindingComponent } from "./event-binding.component";
import { render, screen } from '@testing-library/angular';


describe("EventBindingComponent", ()=> {

	let component: EventBindingComponent;
	

beforeEach(async () => {
    const { fixture } = await render(EventBindingComponent);
    component = fixture.componentInstance; // Assign the component instance
  });


it("clicking on the buttons should change the component's clickCount property in their way", () => {
	const beforeBtnIncrementClickCount = component.clickCount;
	const btnDecrement = screen.getByText("-") as HTMLButtonElement;
	const btnIncrement = screen.getByText("+") as HTMLButtonElement;
	
	
	btnIncrement.click();

	const afterbtnIncrementClickCount = component.clickCount;
	expect(beforeBtnIncrementClickCount).toBeLessThan(afterbtnIncrementClickCount);
	
	// btnIncrement.click();
	// expect(eventBindingComp.clickCount).toBe(auxClickCount);
});


});