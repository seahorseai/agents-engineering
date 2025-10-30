import { moduleMetadata } from '@storybook/angular';
import { NgalertComponent } from './ngalert.component';

export default {
  title: 'Components/Alert',
  component: NgalertComponent,
  decorators: [
    moduleMetadata({
      imports: [NgalertComponent], // Import the standalone component here
    }),
  ],
};

export const Default = () => ({
  component: NgalertComponent,
});

export const Prefilled = () => ({
  component: NgalertComponent,
  props: {
    // Provide props if necessary
  },
});
