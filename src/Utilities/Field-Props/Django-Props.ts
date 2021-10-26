
import { FieldProps, FieldType } from '../../modal';

const django: FieldProps[] = [
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
    label: "Template",
    type: FieldType.BROWSE,
    buttonText: 'Browse File',
    placeholder: "Please select any Template files Archive",
    description: `Please provide local path or GitHub URL to template files or an archive file`
  },
  {
    id: "file-extensions",
    label: "File Extension(s)",
    type: FieldType.TEXTBOX,
    value: "py",
    description: "Please separate multiple file extension(s) with comma"
  },
  {
    id: "file-names",
    label: "File Name(s)",
    type: FieldType.TEXTBOX,
    value: "",
    placeholder: "Please provide the file name(s) to render",
    description: "Please separate multiple file name(s) with comma"
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

export default django;