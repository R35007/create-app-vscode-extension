import { AppName, AppProps, Tags } from '../../modal';
import FieldProps from '../Field-Props';

const prerequisites: Tags[] = [
  {
    label: "node",
    href: "https://nodejs.org/en/",
    description: "https://nodejs.org/en/"
  },
  {
    label: "@nestjs/cli",
    command: "npm i -g @nestjs/cli",
    description: "Click here to install create-next-app globally"
  }
]

const additionalCommands: Tags[] = [
  {
    label: "nest new",
    command: "nest new",
    description: "Click here to create the nest app using cli prompts"
  },
  {
    label: "check cli version",
    command: "nest --version",
    description: "Click here to check cli version"
  },
  {
    label: "cli help",
    command: "nest new --help",
    description: "Click here to know more cli configurations"
  }
]

const resources = [
  `<a href="https://nestjs.com/">Home Page</a>`,
  `<a href="https://docs.nestjs.com/">Getting Started</a>`,
  `<a href="https://www.npmjs.com/package/@nestjs/cli">Npm Package</a> `,
  `<a href="https://courses.nestjs.com/">Courses</a> `
]

const tags = [
  "nest",
  "nestJs",
  "node framework",
  "framework",
  "node",
  "backend",
  "server",
  "nodeserver"
]


const nestJs: AppProps = {
  appName: AppName.NEST_JS,
  fieldProps: FieldProps.nestJs,
  description: "NestJS is a framework for building efficient, scalable Node.js web applications",
  isSelected: false,
  logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/nestJs.png",
  scriptPath: ['media', 'scripts', 'nestJs.js'],
  prerequisites,
  additionalCommands,
  resources,
  tags
}

export default nestJs;
