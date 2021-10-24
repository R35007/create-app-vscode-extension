import { AppName, AppProps, CliCommands } from '../../modal';
import FieldProps from '../Field-Props';

const prerequisites: CliCommands[] = [
  {
    label: "@ionic/cli",
    command: "npm install -g @ionic/cli",
    description: "Click here to install @angular/cli globally"
  },
  {
    label: "@angular/cli",
    command: "npm install -g @angular/cli",
    description: "Click here to install @angular/cli If the the ionic app --type=angular"
  },
  {
    label: "@vue/cli",
    command: "npm install -g @vue/cli",
    description: "Click here to install @vue/cli If the the ionic app --type=vue"
  },
  {
    label: "create-react-app",
    command: "npm install -g create-react-app",
    description: "Click here to install create-react-app If the the ionic app --type=react"
  }
]

const additionalCommands: CliCommands[] = [
  {
    label: "ionic start",
    command: "ionic start",
    description: "Click here to create the ionic app using cli prompts"
  },
  {
    label: "check ionic cli version",
    command: "ionic --version",
    description: "Click here to check ionic cli version"
  },
  {
    label: "check angular cli version",
    command: "ng --version",
    description: "Click here to angular ionic cli version"
  },
  {
    label: "cli help",
    command: "ionic start --help",
    description: "Click here to know more cli configurations"
  },
  {
    label: "List Templates",
    command: "ionic start --list",
    description: "Click here to see list of available templates"
  }
]

const resources = [
  `<a href="https://ionicframework.com/docs">Getting Started</a>`,
  `<a href="https://www.npmjs.com/package/@ionic/cli">Npm Package</a>`,
  `<a href="https://ionicframework.com/docs/componentsl">Ionic Components</a>`,
  `<a href="https://ionic.io/ionicons">Ionic Icons</a>`,
]

const tags = [
  "ionic",
  "hybrid",
  "frontend",
  "ui",
  "mobileapp",
  "mobile",
  "phone",
  "hybridapp"
]


const ionic: AppProps = {
  appName: AppName.IONIC,
  fieldProps: FieldProps.ionic,
  logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/ionic.png",
  scriptPath: ['media', 'scripts', 'ionic.js'],
  isSelected: false,
  prerequisites,
  additionalCommands,
  resources,
  tags
}

export default ionic;
