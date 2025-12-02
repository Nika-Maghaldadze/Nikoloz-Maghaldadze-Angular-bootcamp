export interface FormField {
  key: string;
  type: 'text' | 'email' | 'password' | 'radio';
  label: string;
  placeholder?: string;
  options?: { label: string; value: any }[];
  passwordRules?: boolean;
}

export const registrationFormConfig: FormField[] = [
  {
    key: 'gender',
    type: 'radio',
    label: 'Gender',
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" }
    ]
  },
  {
    key: 'firstName',
    type: 'text',
    label: 'First Name',
    placeholder: 'John',
  },
  {
    key: 'lastName',
    type: 'text',
    label: 'Last Name',
    placeholder: 'Smith'
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: "john.smith@email.com"
  },
  {
    key: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'MyPass123!',
    passwordRules: true
  },
  {
    key: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Repeat password'
  }
];
