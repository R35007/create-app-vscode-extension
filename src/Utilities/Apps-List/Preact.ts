import { AppName, AppProps, Tags } from '../../modal';
import FieldProps from '../Field-Props';

const prerequisites: Tags[] = [
  {
    label: "node",
    href: "https://nodejs.org/en/",
    description: "https://nodejs.org/en/"
  }
];

const additionalCommands: Tags[] = [
  {
    label: "install preact-cli",
    command: "npm install -g preact-cli",
    description: "Click here to install preact-cli globally"
  },
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
];

const resources = [
  `<a href="https://preactjs.com/">Home Page</a>`,
  `<a href="https://preactjs.com/cli/getting-started/">Getting Started</a>`,
  `<a href="https://www.npmjs.com/package/preact">Npm Package</a> `,
  `<a href="https://preactjs.com/about/demos-examples">Demos and Examples</a> `
];

const tags = [
  "react",
  "preact",
  "ui",
  "frontend",
  "library",
  "webapp",
  "web"
];


const preact: AppProps = {
  appName: AppName.PREACT,
  fieldProps: FieldProps.preact,
  description: 'Preact is alternative to  React with the same modern API, claiming to be a “fast 3kB”',
  isSelected: false,
  logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/preact.png",
  scriptPath: ['media', 'scripts', 'preact.js'],
  prerequisites,
  additionalCommands,
  resources,
  tags
};

export default preact;
