import { AppName, AppProps, CliCommands } from '../../modal';
import FieldProps from '../Field-Props';

const prerequisites: CliCommands[] = [
  {
    label: "create-react-app",
    command: "npm install -g create-react-app",
    description: "Click here to install create-react-app"
  }
]

const additionalCommands: CliCommands[] = [
  {
    label: "create-react-app",
    command: "create-react-app",
    description: "Click here to create the react app using cli prompts"
  },
  {
    label: "check cli version",
    command: "create-react-app --version",
    description: "Click here to check cli version"
  },
  {
    label: "cli help",
    command: "create-react-app --help",
    description: "Click here to know more cli configurations"
  }
]

const resources = [
  `<a href="https://create-react-app.dev/docs/getting-started">Getting Started</a>`,
  `<a href="https://www.npmjs.com/package/create-react-app">Npm Package</a> `,
  `<a href="https://www.npmjs.com/search?q=cra-template-*">React Templates</a> `
]

const tags = [
  "react",
  "ui",
  "frontend",
  "webapp"
]


const react: AppProps = {
  appName: AppName.REACT,
  fieldProps: FieldProps.react,
  isSelected: false,
  logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/react.png",
  scriptPath: ['media', 'scripts', 'react.js'],
  prerequisites,
  additionalCommands,
  resources,
  tags
}

export default react;
