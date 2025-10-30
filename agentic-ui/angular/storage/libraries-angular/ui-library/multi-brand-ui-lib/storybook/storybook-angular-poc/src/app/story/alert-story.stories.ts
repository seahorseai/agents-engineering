import type { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from './alert-story.component';

export default {
  title: 'Components/Story',
  component: AlertComponent,
  argTypes: {
    message: { control: 'text' }, // Explicitly define message as a text control
  },
} as Meta<AlertComponent>;
 


export const primary: StoryObj<AlertComponent> = {
  args: {
    message: 'This is the primary story!',
  },
};

export const secondary: StoryObj<AlertComponent> = {
 
  args: {
    message: 'This is the secondary story',
  },
};

export const tertiary: StoryObj<AlertComponent> = {
  args: {
    message: 'This is the Tertiary story',
  },
};
