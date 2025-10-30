// dynamic-form.stories.ts
import { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';
import { InputComponent } from '../input/input.component';

// Interface for our form fields
interface FormField {
  key: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  validators?: any[];
}

// Create a wrapper with the necessary configurations
const meta: Meta<DynamicFormComponent> = {
  title: 'Components/DynamicForm',
  component: DynamicFormComponent,
  decorators: [
    moduleMetadata({
      imports: [InputComponent],
    }),
    applicationConfig({
      providers: [importProvidersFrom(ReactiveFormsModule)],
    }),
  ],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    // Add argType for form submission to capture the action
    onSubmit: { action: 'form submitted' }
  },
};

export default meta;
type Story = StoryObj<DynamicFormComponent>;

// Basic registration form
export const RegistrationForm: Story = {
  args: {
    formFields: [
      {
        key: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'Enter your first name',
        required: true
      },
      {
        key: 'lastName',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Enter your last name',
        required: true
      },
      {
        key: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        required: true,
        validators: []
      },
      {
        key: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter password',
        required: true,
        validators: []
      }
    ]
  }
};

// Contact form
export const ContactForm: Story = {
  args: {
    formFields: [
      {
        key: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Your full name',
        required: true
      },
      {
        key: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Your email address',
        required: true,
        validators: []
      },
      {
        key: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: '(123) 456-7890',
        required: false
      },
      {
        key: 'subject',
        label: 'Subject',
        type: 'text',
        placeholder: 'Message subject',
        required: true
      },
      {
        key: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Your message here',
        required: true
      }
    ]
  }
};

// Survey form
export const SurveyForm: Story = {
  args: {
    formFields: [
      {
        key: 'age',
        label: 'Age',
        type: 'number',
        placeholder: 'Your age',
        required: true,
        validators: []
      },
      {
        key: 'occupation',
        label: 'Occupation',
        type: 'text',
        placeholder: 'Your occupation',
        required: true
      },
      {
        key: 'income',
        label: 'Annual Income',
        type: 'number',
        placeholder: 'Annual income',
        required: false
      },
      {
        key: 'feedback',
        label: 'Feedback',
        type: 'textarea',
        placeholder: 'Please provide your feedback',
        required: true
      }
    ]
  }
};

// Empty form (to demonstrate initialization)
export const EmptyForm: Story = {
  args: {
    formFields: []
  }
};