
import { FieldProps, FieldType } from '../../modal';

const gatsby: FieldProps[] = [
  {
    id: "app-id",
    label: "App Id",
    type: FieldType.TEXTBOX,
    value: "hello-world",
    isRequired: true,
    placeholder: "Can have lowercase alphabets, numbers and minus (-). No spaces or special chars are allowed."
  },
  {
    id: "template-path",
    label: "Starter Template Url",
    type: FieldType.TEXTBOX,
    placeholder: `Please provide a Starter Template GitHub URL here`,
    description: `You can get may official starter template <a href"https://www.gatsbyjs.com/starters">here</a>`
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

export default gatsby;
