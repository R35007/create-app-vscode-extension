import { AppName, AppProps, Tags } from '../../modal';
import FieldProps from '../Field-Props';

const prerequisites: Tags[] = [
  {
    label: "node",
    href: "https://nodejs.org/en/",
    description: "https://nodejs.org/en/"
  },
  {
    label: "yo generator-code",
    command: "npm install -g yo generator-code",
    description: "Click here to install yo generator-code globally"
  }
]

const additionalCommands: Tags[] = [
  {
    label: "yo code",
    command: "yo code",
    description: "Click here to create the vscode extension using cli prompts"
  },
  {
    label: "check cli version",
    command: "yo code --version",
    description: "Click here to check cli version"
  },
  {
    label: "cli help",
    command: "yo code --help",
    description: "Click here to know more cli configurations"
  }
]

const resources = [
  `<a href="https://code.visualstudio.com/api">Home Page</a>`,
  `<a href="https://code.visualstudio.com/api/get-started/your-first-extension">Getting Started</a>`,
  `<a href="https://www.npmjs.com/package/generator-code">Npm package</a>`,
  `<a href="https://github.com/microsoft/vscode-extension-samples">VS Code extension API samples</a>`,
  `<a href="https://github.com/microsoft/vscode-webview-ui-toolkit">VS Code webview ui toolkit</a> `,
]

const tags = [
  "extension",
  "node",
  "vscode",
  "vscodeextension",
  "vscode-extension",
  "extensions"
]


const vsCodeExtension: AppProps = {
  appName: AppName.VS_CODE_EXTENSION,
  fieldProps: FieldProps.vsCodeExtension,
  logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/vscode.png",
  scriptPath: ['media', 'scripts', 'vscode.js'],
  isSelected: false,
  prerequisites,
  additionalCommands,
  resources,
  tags
}

export default vsCodeExtension;
