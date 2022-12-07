
import { FieldProps, FieldType } from '../../modal';

const preactProps: FieldProps[] = [
  {
    id: "app-id",
    label: "App Id",
    type: FieldType.TEXTBOX,
    value: "hello-world",
    isRequired: true,
    placeholder: "Can have lowercase alphabets, numbers and minus (-). No spaces or special chars are allowed."
  },
  {
    id: "template",
    label: "Template",
    type: FieldType.DROPDOWN,
    value: "default",
    options: [
      { label: "Default", value: "default" },
      { label: "Simple", value: "simple" },
      { label: "Netlify", value: "netlify" },
      { label: "Typescript", value: "typescript" },
      { label: "Widget", value: "widget" }
    ],
    description: "All official project templates are repos in the <a href='https://github.com/preactjs-templates'>preactjs-templates organization</a>."
  },
  {
    id: "package-manager",
    label: "Package Manager",
    type: FieldType.RADIO_GROUP,
    value: "npm",
    options: [
      { label: "yarn", value: "yarn" },
      { label: "npm", value: "npm" },
    ]
  },
  {
    id: "git-init",
    label: "Initialize Git Repository ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
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
];

export default preactProps;
