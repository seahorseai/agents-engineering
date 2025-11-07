import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonTagComponent } from './button-tag.component';


const meta: Meta<ButtonTagComponent> = {
  title: 'Components/Tags',
  component: ButtonTagComponent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<ButtonTagComponent>;

export const primary: Story = {
  
};

export const secondary: Story = {
  tags: ['!autodocs'],
  
};

export const tertiary: Story = {
 
};
