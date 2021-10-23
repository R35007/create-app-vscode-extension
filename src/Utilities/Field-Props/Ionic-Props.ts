
import { FieldProps, FieldType } from '../../modal';

const ionicAngularProps: FieldProps[] = [
  {
    id: "app-name",
    label: "App Display Name",
    type: FieldType.TEXTBOX,
    value: "Hello World",
    isRequired: true
  },
  {
    id: "app-id",
    label: "App Id",
    type: FieldType.TEXTBOX,
    value: "hello-world",
    isRequired: true,
    placeholder: "Can have lowercase alphabets, numbers and minus (-). No spaces or special chars are allowed."
  },
  {
    id: "type",
    label: "Type",
    type: FieldType.DROPDOWN,
    value: "angular",
    options: [
      { label: "Angular", value: "angular" },
      { label: "Vue", value: "vue" },
      { label: "React", value: "react" },
      { label: "Ionic Angular (older ionic version 3)", value: "ionic-angular" },
      { label: "Ionic One", value: "ionic1" },
    ]
  },
  {
    id: "template",
    label: "Template",
    type: FieldType.DROPDOWN,
    value: "tabs",
    options: [
      { label: "Tabs", value: "tabs" },
      { label: "Sidemenu", value: "sidemenu" },
      { label: "Blank", value: "blank" },
      { label: "List", value: "list" },
      { label: "My first app - A sample app that builds a camera with gallery", value: "my-first-app" },
      { label: "Conference - A kitchen-sink app that shows off all Ionic has to offer", value: "conference" },
      { label: "Super", value: "super" },
      { label: "Tutorial", value: "tutorial" },
      { label: "AWS Mobile Hub Starter", value: "aws" },
      { label: "Google Maps and a side menu", value: "maps" },
    ]
  },
  {
    id: "include-capacitor",
    label: "Include Capacitor ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
  },
  {
    id: "include-cordova",
    label: "Include Cordova ?",
    type: FieldType.RADIO_GROUP,
    value: "no",
    options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }],
    description: "Cordova is deprecated. Please use with caution."
  },
  {
    id: "git-init",
    label: "Initialize a git repository ?",
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

export default ionicAngularProps;