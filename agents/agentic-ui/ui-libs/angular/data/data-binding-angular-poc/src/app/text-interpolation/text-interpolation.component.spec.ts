import { TextInterpolationComponent } from './text-interpolation.component';
import { render, screen } from '@testing-library/angular';

describe('TextInterpolationComponent', () => {

  beforeEach(async() => {
		await render(TextInterpolationComponent, {
			componentProperties: {
				title: 'This is the title section',
				inputValue: 'This is the content'
			}
		})
  });

	it('should see title embeded into h3 tag', () => {
		const HEADING_3: HTMLHeadingElement = screen.getByRole('heading', { level: 3 });
		expect(HEADING_3.textContent).toEqual('This is the title section');
	});


  it('should see inputValue embeded in input tag', () => {
		const INPUT: HTMLInputElement = screen.getByRole('textbox');
		expect(INPUT.value).toEqual('This is the content');
	});


});