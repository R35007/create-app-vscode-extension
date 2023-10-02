/* eslint-disable @typescript-eslint/naming-convention */
export enum Commands {
  CREATE_APP_INTERACTIVE = 'create-app.interactive',
  CREATE_APP_QUICK = 'create-app.quick',
}

export enum FieldType {
  TEXTBOX = 'textbox',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  BROWSE = 'browse',
  DROPDOWN = 'dropdown',
}

export interface Options {
  label: string;
  value: any;
}

export interface Tags {
  label: string;
  description: string;
  command?: string;
  href?: string;
}

export interface FieldProps {
  type: FieldType.TEXTBOX | FieldType.CHECKBOX | FieldType.RADIO | FieldType.DROPDOWN | FieldType.BROWSE;
  label: string;
  prefix?: string;
  suffix?: string;
  value?: string | boolean;
  placeholder?: string;
  buttonText?: string;
  description?: string;
  required?: boolean;
  prompt?: boolean;
  canSelectFile?: boolean;
  canSelectFolder?: boolean;
  pattern?: string;
  errors?: { required?: string, pattern?: string };
  options?: Options[];
}

export interface AppProps {
  appName: string;
  commandTemplate: string;
  hide?: boolean;
  fields?: Record<string, FieldProps>;
  description?: string;
  logoPath?: string;
  prerequisites?: Tags[];
  additionalCommands?: Tags[];
  resources?: Tags[];
  tags?: string[];
  isSelected?: boolean;
  order?: number;
}



