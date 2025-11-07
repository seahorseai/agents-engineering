import { componentWrapperDecorator } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonDecoratorComponent } from './button-decorator.component';

export default {
  title: 'Components/Decorator',
  component: ButtonDecoratorComponent,
} as Meta<ButtonDecoratorComponent>;

export const primary: StoryObj<ButtonDecoratorComponent> = {
  decorators: [componentWrapperDecorator((story) => 
    `<div style="margin: 10em">${story}</div>`)],
};
 


