// projects/my-lib/src/lib/my-component/my-component.stories.ts
import { Meta, StoryObj } from '@storybook/angular';
import { MyComponent } from './my-component.component';

const meta: Meta<MyComponent> = {
  title: 'My Library/My Component',
  component: MyComponent,
};

export default meta;
type Story = StoryObj<MyComponent>;

export const Default: Story = {
  render: (args) => ({
    component: MyComponent,
    props: args,
  }),
};