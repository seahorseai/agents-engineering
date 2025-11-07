import { Meta, StoryObj } from '@storybook/angular';
import { within, userEvent } from '@storybook/testing-library';
import { ButtonEventComponent } from './button-play.component';



export default  {
  title: 'Components/Play',
  component: ButtonEventComponent,
 
} as Meta<ButtonEventComponent>;


export const primary: StoryObj<ButtonEventComponent> = {
  
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole('button');
    await userEvent.click(button);
  },
};
