
import { FieldProps, FieldType } from '../../modal';

const expressJsProps: FieldProps[] = [
  {
    id: "app-id",
    label: "App Id",
    type: FieldType.TEXTBOX,
    value: 'hello-world',
    isRequired: true,
    placeholder: "Can have lowercase alphabets, numbers and minus (-). No spaces or special chars are allowed."
  },
  {
    id: "view-type",
    label: "View Type",
    type: FieldType.DROPDOWN,
    value: "jade",
    options: [
      { label: "JADE", value: "jade" },
      { label: "EJS", value: "ejs" },
      { label: "HBD", value: "hbd" },
      { label: "HJS", value: "hjs" },
      { label: "PUG", value: "pug" },
      { label: "TWIG", value: "twig" },
      { label: "VASH", value: "vash" }
    ]
  },
  {
    id: "stylesheet-format",
    label: "Stylesheet Format",
    type: FieldType.DROPDOWN,
    value: "css",
    options: [
      { label: "CSS", value: "css" },
      { label: "LESS", value: "less" },
      { label: "STYLUS", value: "stylus" },
      { label: "COMPASS", value: "compass" },
      { label: "SASS", value: "sass" }
    ]
  },
  {
    id: "add-ejs",
    label: "Add ejs engine support ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "add-handlebar",
    label: "Add handlebar engine support ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "add-pug",
    label: "Add pug engine support ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "add-hogan",
    label: "Add hogan.js engine support ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "no-views",
    label: "Create app without views ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
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

export default expressJsProps;
