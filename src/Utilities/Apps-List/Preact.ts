import { AppName, AppProps, CliCommands } from '../../modal';
import FieldProps from '../Field-Props';

const prerequisites: CliCommands[] = [
  {
    label: "preact-cli",
    command: "npm install -g preact-cli",
    description: "Click here to install preact-cli globally"
  }
]

const additionalCommands: CliCommands[] = [
  {
    label: "preact-cli create",
    command: "npx preact-cli create",
    description: "Click here to create the preact app using cli prompts"
  },
  {
    label: "check cli version",
    command: "npx preact-cli --version",
    description: "Click here to check cli version"
  },
  {
    label: "cli help",
    command: "npx preact-cli create --help",
    description: "Click here to know more cli configurations"
  }
]

const resources = [
  `<a href="https://preactjs.com/cli/getting-started/">Getting Started</a>`,
  `<a href="https://www.npmjs.com/package/preact">Npm Package</a> `,
  `<a href="https://preactjs.com/about/demos-examples">Demos and Examples</a> `
]

const tags = [
  "react",
  "preact",
  "ui",
  "frontend",
  "webapp"
]


const preact: AppProps = {
  appName: AppName.PREACT,
  fieldProps: FieldProps.preact,
  isSelected: false,
  logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/preact.png",
  scriptPath: ['media', 'scripts', 'preact.js'],
  prerequisites,
  additionalCommands,
  resources,
  tags
}

export default preact;
