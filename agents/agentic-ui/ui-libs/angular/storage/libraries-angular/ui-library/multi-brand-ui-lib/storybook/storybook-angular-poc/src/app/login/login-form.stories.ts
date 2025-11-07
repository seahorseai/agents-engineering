
import { Meta, moduleMetadata } from '@storybook/angular';

import { LoginFormComponent } from './login-form.component';

export default {
  title: 'Components/Login',
  component: LoginFormComponent,
  decorators: [
    moduleMetadata({
      imports: [LoginFormComponent], // Import the standalone component here
    }),
  ],
} as Meta<LoginFormComponent>;

export const Default = () => ({
  component: LoginFormComponent,
});





export const Prefilled = () => ({
  component: LoginFormComponent,
  props: {
    // Provide props if necessary
  },
});
