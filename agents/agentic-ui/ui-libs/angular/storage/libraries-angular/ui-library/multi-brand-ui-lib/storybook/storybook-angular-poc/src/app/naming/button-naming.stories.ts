import { Meta, StoryObj } from '@storybook/angular';
import { ButtonNamingComponent } from './button-naming.component';

export default {
  title: 'Components/Naming',
  component: ButtonNamingComponent,
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary'] },
  },
} as Meta<ButtonNamingComponent>;


export const primary: StoryObj<ButtonNamingComponent> = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
  },
};

export const secondary: StoryObj<ButtonNamingComponent> = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
  },
};


