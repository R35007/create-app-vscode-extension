
import { FieldProps, FieldType } from '../../modal';

const reactNativeProps: FieldProps[] = [
  {
    id: "app-name",
    label: "App Name",
    value: 'Hello World',
    isRequired: true,
    type: FieldType.TEXTBOX
  },
  {
    id: "app-id",
    label: "App Id",
    type: FieldType.TEXTBOX,
    value: 'hello-world',
    isRequired: true,
    placeholder: "Can have lowercase alphabets, numbers and minus (-). No spaces or special chars are allowed."
  },
  {
    id: "template",
    label: "Template",
    type: FieldType.DROPDOWN,
    value: "expo-template-blank",
    options: [
      { label: "Blank", value: "expo-template-blank" },
      { label: "Blank (Typescript)", value: "expo-template-blank-typescript" },
      { label: "Tabs (Typescript)", value: "expo-template-tabs" },
      { label: "Bare Minimum", value: "expo-template-bare-minimum" }
    ],
    description: "You can find many great community templates by searching for <a href='https://www.npmjs.com/search?q=expo-template-*'>expo-template-*</a> on npm."
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

export default reactNativeProps;
