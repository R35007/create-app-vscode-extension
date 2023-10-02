/* eslint-disable @typescript-eslint/naming-convention */
export enum Commands {
  CREATE_APP = 'create.app',
}

export enum AppName {
  ANGULAR = 'Angular',
  REACT = 'React',
  VUE = 'Vue',
  PREACT = 'Preact',
  SVELTE = 'Svelte',
  NEXT_JS = 'NextJs',
  GATSBY = 'Gatsby',
  DJANGO = 'Django',
  EXPRESS_JS = 'ExpressJS',
  NEST_JS = 'NestJs',
  REACT_NATIVE = 'React Native',
  IONIC = 'Ionic',
  VS_CODE_EXTENSION = 'VS Code Extension',
}

export interface AppProps {
  appName: string;
  commandTemplate?: string;
  description: string;
  fields: Record<string, FieldProps>;
  logoPath: string;
  prerequisites: Tags[];
  additionalCommands: Tags[];
  resources: string[];
  tags: string[];
  isSelected?: boolean;
}

export interface Tags {
  label: string;
  command?: string;
  href?: string;
  description: string;
}

export interface FieldProps {
  label: string;
  prefix?: string;
  type: string;
  value?: string | boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  buttonText?: string;
  description?: string;
  readonly?: boolean;
  required?: boolean;
  pattern?: string;
  errors?: { required?: string, pattern?: string };
  options?: DropDownOptions[];
}

export enum FieldType {
  TEXTBOX = 'textbox',
  CHECKBOX = 'checkbox',
  RADIO_GROUP = 'radio',
  BROWSE = 'browse',
  DROPDOWN = 'dropdown',
}

export interface DropDownOptions {
  label: string;
  value: any;
  fields?: Record<string, FieldProps>;
}
