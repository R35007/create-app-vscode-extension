
import { FieldProps, FieldType } from '../../modal';

const nextJsProps: FieldProps[] = [
  {
    id: "app-id",
    label: "App Id",
    type: FieldType.TEXTBOX,
    value: "hello-world",
    isRequired: true,
    placeholder: "Can have lowercase alphabets, numbers and minus (-). No spaces or special chars are allowed."
  },
  {
    id: "example",
    label: "Example Template Url",
    type: FieldType.TEXTBOX,
    description: `You can use an example name from the <a href="https://github.com/vercel/next.js/tree/master/examples">Next.js repo</a> or a GitHub URL`
  },
  {
    id: "use-typescript",
    label: "Use Typescript ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "package-manager",
    label: "Use Npm Package Manager ?",
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

export default nextJsProps;
