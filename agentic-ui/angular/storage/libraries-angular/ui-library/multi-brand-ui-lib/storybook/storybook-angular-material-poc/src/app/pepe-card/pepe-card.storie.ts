import { moduleMetadata } from '@storybook/angular';
import { MatCardModule } from '@angular/material/card';
import { PepeCardComponent } from './pepe-card.component';

export default {
  title: 'Components/Login Form',
  component: PepeCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [PepeCardComponent],
      imports: [MatCardModule], // Import the standalone component here
    }),
  ],
};

export const Default = () => ({
  component: PepeCardComponent,
});


export const Prefilled = () => ({
  component: PepeCardComponent,
  props: {
    // Provide props if necessary
  },
});
