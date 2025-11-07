
import { ButtonParametersComponent } from './button-parameters.component';
import type { Meta, StoryObj } from '@storybook/angular';



export default {
  title: 'Components/Parameters',
  component: ButtonParametersComponent,
  
  } as  Meta<ButtonParametersComponent>;



export const primary: StoryObj<ButtonParametersComponent> = {
  parameters: {
    backgrounds: {
      values: [
        { name: 'black', value: '#000' },
        { name: 'dark', value: '#222' },
        { name: 'light', value: '#ddd' },
        { name: 'white', value: '#fff' }
      ],
    },
  },
};