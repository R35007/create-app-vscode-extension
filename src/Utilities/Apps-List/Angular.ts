import { AppName, AppProps, CliCommands } from '../../modal';
import FieldProps from '../Field-Props';

const prerequisites: CliCommands[] = [
  {
    label: "@angular/cli",
    command: "npm install -g @angular/cli",
    description: "Click here to install @angular/cli globally"
  }
]

const additionalCommands: CliCommands[] = [
  {
    label: "ng new",
    command: "ng new",
    description: "Click here to create the angular app using cli prompts"
  },
  {
    label: "check cli version",
    command: "ng --version",
    description: "Click here to check cli version"
  },
  {
    label: "cli help",
    command: "ng new --help",
    description: "Click here to know more cli configurations"
  }
]

const resources = [
  `<a href="https://angular.io/guide/setup-local">Getting Started</a>`,
  `<a href="https://www.npmjs.com/package/@angular/cli">Npm Package</a>`,
  `<a href="https://angular.io/tutorial">Tutorial</a>`,
]

const tags = [
  "angular",
  "ui",
  "frontend",
  "webapp"
]


const angular: AppProps = {
  appName: AppName.ANGULAR,
  fieldProps: FieldProps.angular,
  logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/angular.png",
  scriptPath: ['media', 'scripts', 'angular.js'],
  isSelected: false,
  prerequisites,
  additionalCommands,
  resources,
  tags
}

export default angular;
