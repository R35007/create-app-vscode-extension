
import { FieldProps, FieldType } from '../../modal';

const angularProps: FieldProps[] = [
  {
    id: "app-id",
    label: "App Id",
    type: FieldType.TEXTBOX,
    value: "hello-world",
    isRequired: true,
    placeholder: "Can have lowercase alphabets, numbers and minus (-). No spaces or special chars are allowed."
  },
  {
    id: "prefix",
    label: "Prefix",
    type: FieldType.TEXTBOX
  },
  {
    id: "stylesheet-format",
    label: "Stylesheet Format",
    type: FieldType.DROPDOWN,
    value: "css",
    options: [
      { label: "CSS", value: "css" },
      { label: "SCSS", value: "scss" },
      { label: "SASS", value: "sass" },
      { label: "LESS", value: "less" },
    ]
  },
  {
    id: "routing",
    label: "Include Routing ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
  },
  {
    id: "include-inline-styles",
    label: "Include Inline Styles ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
  },
  {
    id: "include-inline-template",
    label: "Include Inline Template ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
  },
  {
    id: "learning-purpose",
    label: "For learning purpose only ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }],
    description: "If Yes It creates a workspace without any testing frameworks."
  },
  {
    id: "strict",
    label: "Do Strict Type Check ?",
    type: FieldType.RADIO_GROUP,
    value: "yes",
    options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
  },
  {
    id: "package-manager",
    label: "Package Manager",
    type: FieldType.RADIO_GROUP,
    value: "npm",
    options: [
      { label: "yarn", value: "yarn" },
      { label: "npm", value: "npm" },
      { label: "pnpm", value: "pnpm" },
      { label: "cnpm", value: "cnpm" }
    ]
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

export default angularProps;