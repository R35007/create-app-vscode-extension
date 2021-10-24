import { FieldProps, FieldType } from '../modal'

export default (fieldProps?: FieldProps[]): string => {
  if (!fieldProps) return ''
  return fieldProps.map(props => {
    return `
      <div id="row-${props.id}" class="row mb-3 align-items-center">
        <div class="col-12 col-lg-4 key">${props.label} ${props.isRequired ? `<span class="text-primary">*</span>` : ''}</div>
        <div class="col-12 col-lg-8 val">
          <div>${fieldSwitch(props)}</div>
          <div>${props.description || ''}</div>
          <div class="error text-primary">
          </div>
        </div>
      </div>
    `
  }).join('')
}

const fieldSwitch = (props: FieldProps) => {
  switch (props.type) {
    case FieldType.TEXTBOX:
      return getTextbox(props)
    case FieldType.RADIO_GROUP:
      return getRadioGroup(props)
    case FieldType.CHECKBOX:
      return getCheckbox(props)
    case FieldType.BROWSE:
      return getBrowse(props)
    case FieldType.DROPDOWN:
      return getDropDown(props)
    default:
      break;
  }
}

const getTextbox = (props: FieldProps) => {
  return ` <vscode-text-field id="${props.id}" class="d-block ${props.className || ''}" value="${props.value || ''}" placeholder="${props.placeholder || ''}" ${props.disabled && 'disabled'} ${props.readonly && 'readonly'}></vscode-text-field>`
}

const getRadioGroup = (props: FieldProps) => {
  const radioGroup = `
  <vscode-radio-group id="${props.id}" class="${props.className || ''}">
    ${props.options?.map(opt => {
    return `<vscode-radio ${props.value === opt.value && 'checked'} value="${opt.value || ''}">${opt.label}</vscode-radio>`
  }).join('')}
  </vscode-radio-group>
  `
  return radioGroup;
}

const getBrowse = (props: FieldProps) => {
  return `
  <div class="d-flex">
    <vscode-text-field id="${props.id}-textbox" class="d-block w-100 ${props.className || ''}" placeholder="${props.placeholder || 'Please select any folder'}" ${props.readonly ? 'readonly' : ''}></vscode-text-field>
    <vscode-button id="${props.id}-button">${props.buttonText || 'Browse Folder'}</vscode-button>
  </div>
  `
}

const getDropDown = (props: FieldProps) => {
  return `
  <vscode-dropdown id="${props.id}" class="d-block w-100 ${props.className || ''}">
  ${props.options?.map(opt => (
    `<vscode-option ${opt.value === props.value && 'selected'} value="${opt.value || ''}">${opt.label}</vscode-option>`
  )).join('')}
  </vscode-dropdown>
  `
}

const getCheckbox = (props: FieldProps) => {
  return `<vscode-checkbox id="${props.id}" class="${props.className || ''}" ${props.value ? 'checked' : ''}></vscode-checkbox>`
}