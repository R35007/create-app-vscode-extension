
import { FieldProps, FieldType } from '../../modal';

const reactProps: FieldProps[] = [
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
    value: "javascript",
    options: [
      { label: "Javascript", value: "javascript" },
      { label: "Typescript", value: "typescript" },
      { label: "Typescript, Bootstrap, SASS", value: "tbs" },
      { label: "Typescript, Redux", value: "redux-typescript" },
      { label: "Javascript, Redux", value: "redux" }
    ],
    description: "You can find many great community templates by searching for <a href='https://www.npmjs.com/search?q=cra-template-*'>cra-template-*</a> on npm."
  },
  {
    id: "package-manager",
    label: "Package Manager",
    type: FieldType.RADIO_GROUP,
    value: "yarn",
    options: [
      { label: "yarn", value: "yarn" },
      { label: "npm", value: "npm" },
      { label: "pnp", value: "pnp" }
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
    readonly: true,
    description: "If not provided the app creates in the active workspace folder."
  }
]

export default reactProps;