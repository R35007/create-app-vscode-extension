import { AppProps, BrowseProps, CheckboxProps, CommonProps, FieldProps, FieldType, OptionProps, TextBoxProps } from '../modal';

const getTextbox = (fieldName: string, props: TextBoxProps & CommonProps) => {
  return /* html */ `<vscode-text-field 
    placeholder="${props.placeholder ?? ''}" 
    class="d-block control" 
    value="${props.value ?? ''}" 
    name="${fieldName}" 
    ${props.required ? 'required' : ''}
  ></<vscode-text-field>`;
};

const getRadioGroup = (fieldName: string, props: OptionProps & CommonProps) => {
  const options =
    props.options
      ?.map((opt) => {
        const isChecked = `${props.value ?? ''}`.trim() === `${opt.value ?? ''}`.trim();
        return /* html */ `<vscode-radio ${isChecked ? 'checked' : ''} value="${opt.value ?? ''}">${opt.label ?? ''}</vscode-radio>`;
      })
      .join('') || '';

  const radioGroup = /* html */ `
  <vscode-radio-group 
    class="control" 
    name="${fieldName}" 
  >
    ${options}
  </vscode-radio-group>
  `;
  return radioGroup;
};

const getDropDown = (fieldName: string, props: OptionProps & CommonProps) => {
  return /* html */ `
  <vscode-dropdown 
    class="d-block w-100 control"
    name="${fieldName}" 
    ${props.required ? 'required' : ''}
  >
    ${
      props.options
        ?.map(
          (opt) =>
            /* html */ `<vscode-option ${(opt.value ?? '') === (props.value ?? '') && 'selected'} value="${opt.value ?? ' '}">${
              opt.label ?? ''
            }</vscode-option>`
        )
        .join('') || ''
    }
  </vscode-dropdown>
  `;
};

const getCheckbox = (fieldName: string, props: CheckboxProps & CommonProps) => {
  const isChecked = `${props.value ?? ''}`.trim() !== `${props.unCheckedValue ?? ''}`.trim();
  return /* html */ `<vscode-checkbox 
    class="control-checkbox" 
    data-checked-value="${props.checkedValue ?? 'true'}" 
    data-un-checked-value="${props.unCheckedValue ?? ''}"
    data-checked-label="${props.checkedLabel ?? 'Yes'}" 
    data-unchecked-label="${props.unCheckedLabel ?? props.checkedLabel ?? 'Yes'}" 
    name="${fieldName}" 
    ${isChecked ? 'checked' : ''}
    ></<vscode-checkbox>`;
};

const getBrowse = (fieldName: string, props: BrowseProps & CommonProps) => {
  return /* html */ `
  <div class="d-flex">
    <vscode-text-field 
      name="${fieldName}" 
      value="${props.value ?? ''}"
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
      return getTextbox(fieldName, fieldProps as never);
  }
};

export const generateFormFields = (fieldProps: Record<string, FieldProps> = {}, selectedApp: AppProps): string => {
  const browseAppLocation = /* html */ `
  <div class="row mb-3 align-items-center" style="order: ${Object.keys(selectedApp.fields || {}).length + 1}">
    <div class="col-12 val">
      <div class="d-flex mb-1">
        <vscode-text-field id="app-folder-location" class="d-block flex-1 w-100" placeholder="Please provide the folder path to create app"></vscode-text-field>
        <vscode-button id="app-folder-location-btn" title="Browse location to carate app" style="white-space: nowrap;">Browse Folder</vscode-button>
      </div>
      <div>Leave it empty to create app in active workspace folder.</div>
    </div>
  </div>`;

  if (!Object.entries(fieldProps).length) return browseAppLocation;

  const formFields = Object.entries(fieldProps)
    .map(([fieldName, fieldProps]) => {
      return /* html */ `
      <div class="field-row row mb-3 align-items-center" style="order: ${fieldProps.order}">
        <div class="col-12 col-lg-4 key mb-1 ${fieldProps.label?.trim().length ? '' : 'd-none'}">${fieldProps.label} ${
          fieldProps.required ? `<span class="text-primary">*</span>` : ''
        }</div>
        <div class="col val">
          <div class="mb-1">${fieldSwitch(fieldName, fieldProps)}</div>
          <div class="error ${fieldName}-error text-danger"></div>
          <div class="description">${fieldProps.description || ''}</div>
        </div>
      </div>
    `;
    })
    .join('');

  return formFields + browseAppLocation;
};
