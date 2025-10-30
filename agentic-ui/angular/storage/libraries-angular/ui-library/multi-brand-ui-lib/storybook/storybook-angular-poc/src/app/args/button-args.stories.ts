import type { Meta, StoryObj } from '@storybook/angular/';

import { ButtonArgsComponent } from './button-args.component';

export default {
  title: 'Components/Args',
  component: ButtonArgsComponent,
  argTypes: {
    storybookArg: { control: 'text' }, // Explicitly define message as a text control
  },
} as Meta<ButtonArgsComponent>;




export const primary: StoryObj<ButtonArgsComponent> = {
  args: {
    storybookArg: "Button"
  },
};