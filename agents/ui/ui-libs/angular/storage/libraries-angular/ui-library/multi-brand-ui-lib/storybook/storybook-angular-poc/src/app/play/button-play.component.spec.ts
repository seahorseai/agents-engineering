import { render, screen , fireEvent} from '@testing-library/angular';
import { ButtonEventComponent } from './button-play.component';



test('renders button with label', async () => {
  await render(ButtonEventComponent, {
    componentProperties: { label: 'Click Me' }
  });

  expect(screen.getByText('Click Me')).toBeTruthy();
});



