export enum Commands {
  CREATE_APP = 'create.app',
}

export enum AppName {
  ANGULAR = 'Angular',
  REACT = 'React',
  VUE = 'Vue',
  NODE = 'Express',
  REACT_NATIVE = 'React Native',
  IONIC = 'Ionic',
  VS_CODE_EXTENSION = 'VS Code Extension',
}

export interface AppProps {
  id: number;
  appName: AppName;
  fieldProps: FieldProps[];
  logoPath: string;
  isSelected: boolean;
  scriptPath: string[];
  prerequisites: CliCommands[];
  additionalCommands: CliCommands[];
  resources: string[];
  stylePath?: string[];
}

export interface CliCommands {
  id: number;
  label: string;
  command: string;
  description?: string;
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
