import { AppName, AppProps, Tags } from '../../modal';
import FieldProps from '../Field-Props';

const prerequisites: Tags[] = [
  {
    label: "node",
    href: "https://nodejs.org/en/",
    description: "https://nodejs.org/en/"
  }
]

const additionalCommands: Tags[] = [
  {
    label: "install express-generator",
    command: "npm install -g express-generator",
    description: "Click here to install express-generator globally"
  },
  {
    label: "express-generator",
    command: "npx express-generator",
    description: "Click here to create the express app using cli prompts"
  },
  {
    label: "check cli version",
    command: "npx express-generator --version",
    description: "Click here to check cli version"
  },
  {
    label: "cli help",
    command: "npx express-generator --help",
    description: "Click here to know more cli configurations"
  }
]

const resources = [
  `<a href="https://expressjs.com/">Home Page</a>`,
  `<a href="https://expressjs.com/en/starter/generator.html">Getting Started</a>`,
  `<a href="https://www.npmjs.com/package/express-generator">Npm Package</a>`,
]

const tags = [
  "expressgenerator",
  "express-generator",
  "expressjs",
  "backend",
  "server",
  "node",
  "nodejs",
  "nodeserver"
]


const expressJs: AppProps = {
  appName: AppName.EXPRESS_JS,
  fieldProps: FieldProps.expressJs,
  logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/expressJs.png",
  scriptPath: ['media', 'scripts', 'expressJs.js'],
  isSelected: false,
  prerequisites,
  additionalCommands,
  resources,
  tags
}

export default expressJs;
