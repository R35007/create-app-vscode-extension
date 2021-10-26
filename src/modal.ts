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
  DJANGO = 'Django',
  EXPRESS_JS = 'ExpressJS',
  NEST_JS = 'NestJs',
  REACT_NATIVE = 'React Native',
  IONIC = 'Ionic',
  VS_CODE_EXTENSION = 'VS Code Extension',
}

export interface AppProps {
  appName: AppName;
  description: string;
  fieldProps: FieldProps[];
  isSelected: boolean;
  logoPath: string;
  scriptPath: string[];
  prerequisites: Tags[];
  additionalCommands: Tags[];
  resources: string[];
  tags: string[];
}

export interface Tags {
  label: string;
  command?: string;
  href?: string;
  description: string;
}

export interface FieldProps {
  id: string;
  label: string;
  type: FieldType;
  value?: string | boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  buttonText?: string;
  description?: string;
  readonly?: boolean;
  isRequired?: boolean;
  options?: DropDownOptions[];
}

export enum FieldType {
  TEXTBOX = 'text-field',
  CHECKBOX = 'checkbox',
  RADIO_GROUP = 'radio-group',
  BROWSE = 'browse',
  DROPDOWN = 'dropdown',
}

export interface DropDownOptions {
  label: string;
  value: any;
}
