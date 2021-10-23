
import { FieldProps, FieldType } from '../../modal';

const vueProps: FieldProps[] = [
  {
    id: "app-id",
    label: "App Id",
    type: FieldType.TEXTBOX,
    value: 'hello-world',
    isRequired: true,
    placeholder: "Can have lowercase alphabets, numbers and minus (-). No spaces or special chars are allowed."
  },
  {
    id: "custom-preset-location",
    label: "Custom Preset Location",
    type: FieldType.BROWSE,
    buttonText: 'Browse File',
    description: `Please provide local or remote path to <span class="text-primary">preset.json</span> file`
  },
  {
    id: "package-manager",
    label: "Package Manager",
    type: FieldType.RADIO_GROUP,
    value: "npm",
    options: [
      { label: "yarn", value: "yarn" },
      { label: "npm", value: "npm" },
      { label: "pnp", value: "pnp" }
    ]
  },
  {
    id: "git-init",
    label: "Initialize a git repository ?",
    type: FieldType.RADIO_GROUP,
    value: "yes",
    options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
  },
  {
    id: "open-in-vscode",
    label: "Open in Vs Code ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
  },
  {
    id: "extras",
    label: "Additional Configuration",
    type: FieldType.TEXTBOX,
  },
  {
    id: "folder-location",
    label: "App Folder Location",
    type: FieldType.BROWSE,
    readonly: true,
    description: "If not provided the app creates in the active workspace folder."
  }
]

export default vueProps;