import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonAutodocComponent } from './button-autodoc.component';


const meta: Meta<ButtonAutodocComponent> = {
  title: 'Components/Autodoc',
  component: ButtonAutodocComponent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<ButtonAutodocComponent>;

export const primary: Story = {
  
};

export const secondary: Story = {
  tags: ['!autodocs'],
  
};

export const tertiary: Story = {
 
};
