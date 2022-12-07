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
    label: "install create-react-app",
    command: "npm install -g create-react-app",
    description: "Click here to install create-react-app globally"
  },
  {
    label: "create-react-app",
    command: "npx create-react-app",
    description: "Click here to create the react app using cli prompts"
  },
  {
    label: "check cli version",
    command: "npx create-react-app --version",
    description: "Click here to check cli version"
  },
  {
    label: "cli help",
    command: "npx create-react-app --help",
    description: "Click here to know more cli configurations"
  }
];

const resources = [
  `<a href="https://reactjs.org/">Home Page</a>`,
  `<a href="https://create-react-app.dev/docs/getting-started">Getting Started</a>`,
  `<a href="https://www.npmjs.com/package/create-react-app">Npm Package</a> `,
  `<a href="https://www.npmjs.com/search?q=cra-template-*">React Templates</a> `
];

const tags = [
  "react",
  "ui",
  "frontend",
  "library",
  "webapp",
  "web"
];


const react: AppProps = {
  appName: AppName.REACT,
  fieldProps: FieldProps.react,
  description: "React is a declarative, efficient, and flexible JavaScript library for building user interfaces",
  isSelected: false,
  logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/react.png",
  scriptPath: ['media', 'scripts', 'react.js'],
  prerequisites,
  additionalCommands,
  resources,
  tags
};

export default react;
