export enum Commands {
  CREATE_APP_INTERACTIVE = 'create-app.interactive',
  CREATE_APP_QUICK = 'create-app.quick'
}

export enum Actions {
  SWITCH_APP = 'switch-app',
  GET_LOCATION = 'get-location',
  GET_COMMAND_TEMPLATE = 'get-command-template',
  EXECUTE_COMMAND = 'execute-command',
  COPY_COMMAND = 'copy-command',
  COPY_CONFIG = 'copy-config',
  EXECUTE_CREATE_COMMAND = 'execute-create-command',
  SET_COMMAND_TEMPLATE = 'set-command-template'
}

export type Message = {
  action: Actions;
  name: string;
  appName: string;
  groupName: string;
  filterValue: string;
  commandTemplate: string;
  isAppLocation: boolean;
  object: {
    fields: object;
    execPath: string;
  };
  command: string;
  location: string;
};

export enum FieldType {
  TEXTBOX = 'textbox',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  BROWSE = 'browse',
  DROPDOWN = 'dropdown'
}

export type Options = {
  label: string;
  value?: unknown;
};

export type Tags = {
  label: string;
  description: string;
  command?: string;
  href?: string;
};

export type TextBoxProps = {
  type: FieldType.TEXTBOX;
  placeholder?: string;
  pattern?: string;
  required?: boolean;
  errors?: { required?: string; pattern?: string };
};

export type CheckboxProps = {
  type: FieldType.CHECKBOX;
  checkedValue?: string | boolean;
  unCheckedValue?: string | boolean;
  checkedLabel?: string;
  unCheckedLabel?: string;
  required?: boolean;
  errors?: { required?: string };
};

export type OptionProps = {
  type: FieldType.RADIO | FieldType.DROPDOWN;
  required?: boolean;
  errors?: { required?: string };
  options: Options[];
};

export type BrowseProps = {
  type?: FieldType.BROWSE;
  placeholder?: string;
  buttonText?: string;
  required?: boolean;
  canSelectFile?: boolean;
  canSelectFolder?: boolean;
  pattern?: string;
  errors?: { required?: string; pattern?: string };
};

export type CommonProps = {
  label?: string;
  order?: number;
  prefix?: string;
  suffix?: string;
  value?: string | boolean;
  description?: string;
  prompt?: boolean;
  hide?: boolean;
};

export type FieldProps = (TextBoxProps | OptionProps | CheckboxProps | BrowseProps) & CommonProps;

export type AppProps = {
  appName: string;
  groupNames: string[];
  relatedAppNames?: string[];
  commandTemplate: string | string[];
  hide?: boolean;
  fields?: Record<string, FieldProps>;
  description?: string;
  logoPath?: string;
  prerequisites?: Tags[];
  additionalCommands?: Tags[];
  resources?: Tags[];
  tags?: string[];
  order?: number;
};
