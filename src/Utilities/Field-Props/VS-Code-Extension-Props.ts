
import { FieldProps, FieldType } from '../../modal';

const vsCodeExtensionProps: FieldProps[] = [
  {
    id: "extension-display-name",
    label: "Extension Name",
    type: FieldType.TEXTBOX,
    value: "Hello World",
    isRequired: true
  },
  {
    id: "extension-id",
    label: "Extension Id",
    type: FieldType.TEXTBOX,
    value: "hello-world",
    isRequired: true,
    placeholder: "Can have lowercase alphabets, numbers and minus (-). No spaces or special chars are allowed."
  },
  {
    id: "extension-description",
    label: "Description",
    type: FieldType.TEXTBOX
  },
  {
    id: "extension-type",
    label: "Type",
    type: FieldType.DROPDOWN,
    value: "ts",
    options: [
      { label: "Typescript", value: "ts" },
      { label: "Javascript", value: "js" },
      { label: "Color Theme", value: "colortheme" },
      { label: "Language Support", value: "language" },
      { label: "Code Snippets", value: "snippets" },
      { label: "Keymap", value: "keymap" },
      { label: "Extension Pack", value: "extensionpack" },
      { label: "Language Pack (Localization)", value: "localization" },
      { label: "Notebook Renderer (TypeScript)", value: "notebook" },
      { label: "Web", value: "web" },
    ],
  },
  {
    id: "package-manager",
    label: "Package Manager",
    type: FieldType.RADIO_GROUP,
    value: "npm",
    options: [{ label: "yarn", value: "yarn" }, { label: "npm", value: "npm" }]
  },
  {
    id: "webpack",
    label: "Bundle with webpack ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
  },
  {
    id: "git-init",
    label: "Initialize Git Repository ?",
    type: FieldType.RADIO_GROUP,
    value: "yes",
    options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
  },
  {
    id: "skip-install",
    label: "Skip Install ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" }
    ]
  },
  {
    id: "open-in-vscode",
    label: "Open in Vs Code ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
  },
  {
    id: "folder-location",
    label: "App Folder Location",
    type: FieldType.BROWSE,
    description: "If not provided the app creates in the active workspace folder."
  }
]

export default vsCodeExtensionProps;