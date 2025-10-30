import type { Meta, StoryObj } from '@storybook/angular';

import { moduleMetadata } from '@storybook/angular';

import { CommonModule } from '@angular/common';

import { ItemLoaderComponent } from './loader-item.component';



export default {
  title: 'Components/Loader',
  component: ItemLoaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [ItemLoaderComponent],
      imports: [CommonModule],
    }),
  ],
} as Meta<ItemLoaderComponent>;





export const primary: StoryObj<ItemLoaderComponent> = {
  render: (args, { loaded: { todo } }) => ({
    props: {
      args,
      todo,
    },
  }),
  loaders: [
    async () => ({
      todo: await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json(),
    }),
  ],
};