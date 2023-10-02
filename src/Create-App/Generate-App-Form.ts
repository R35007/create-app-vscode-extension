import { FieldProps, FieldType } from '../modal';

const generateFormFields = (fieldProps: Record<string, FieldProps> = {}): string => {
  if (!Object.entries(fieldProps).length) { return ''; };
  return Object.entries(fieldProps).map(([fieldName, fieldProps]) => {
    return `
      <div class="row mb-3 align-items-center">
        <div class="col-12 col-lg-4 key mb-1">${fieldProps.label} ${fieldProps.required ? `<span class="text-primary">*</span>` : ''}</div>
        <div class="col-12 col-lg-8 val">
          <div class="mb-1">${fieldSwitch(fieldName, fieldProps)}</div>
          <div class="error ${fieldName}-error text-danger"></div>
          <div class="description">${fieldProps.description || ''}</div>
        </div>
      </div>
    `;
  }).join('');
};

const fieldSwitch = (fieldName: string, fieldProps: FieldProps) => {
  switch (fieldProps.type) {
    case FieldType.TEXTBOX:
      return getTextbox(fieldName, fieldProps);
    case FieldType.RADIO:
      return getRadioGroup(fieldName, fieldProps);
    case FieldType.CHECKBOX:
      return getCheckbox(fieldName, fieldProps);
    case FieldType.DROPDOWN:
      return getDropDown(fieldName, fieldProps);
    case FieldType.BROWSE:
      return getBrowse(fieldName, fieldProps);
    default:
      break;
  }
};

const getTextbox = (fieldName: string, props: FieldProps) => {
  return `<vscode-text-field 
    placeholder="${props.placeholder || ''}" 
    class="d-block control" 
    value="${props.value || ''}" 
    name="${fieldName}" 
    ${props.required ? 'required' : ''}
  ></<vscode-text-field>`;
};

const getRadioGroup = (fieldName: string, props: FieldProps) => {
  const radioGroup = `
  <vscode-radio-group 
    class="control" 
    name="${fieldName}" 
    ${props.required ? 'required' : ''}
  >
    ${props.options?.map(opt => `<vscode-radio ${props.value === opt.value && 'checked'} value="${opt.value}">${opt.label}</vscode-radio>`).join('')}
  </vscode-radio-group>
  `;
  return radioGroup;
};

const getDropDown = (fieldName: string, props: FieldProps) => {
  return `
  <vscode-dropdown 
    class="d-block w-100 control"
    name="${fieldName}" 
    ${props.required ? 'required' : ''}
  >
    ${props.options?.map(opt => `<vscode-option ${opt.value === props.value && 'selected'} value="${opt.value || " "}">${opt.label}</vscode-option>`).join('')}
  </vscode-dropdown>
  `;
};

const getCheckbox = (fieldName: string, props: FieldProps) => {
  return `<vscode-checkbox 
    class="control" 
    value="${props.value || ''}" 
    name="${fieldName}" 
    ${props.required ? 'required' : ''}
    ></<vscode-checkbox>`;
};

const getBrowse = (fieldName: string, props: FieldProps) => {
  return `
  <div class="d-flex">
    <vscode-text-field 
      name="${fieldName}" 
      class="d-block w-100 flex-1 control" 
      placeholder="${props.placeholder || 'Please select any folder'}" 
      ${props.required ? 'required' : ''}
    ></vscode-text-field>
    <vscode-button data-name="${fieldName}" class="browse-btn" style="white-space: nowrap;">
        ${props.buttonText || 'Browse Folder'}
    </vscode-button>
  </div>
  `;
};

export default generateFormFields;
