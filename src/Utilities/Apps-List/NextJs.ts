import { AppName, AppProps, CliCommands } from '../../modal';
import FieldProps from '../Field-Props';

const prerequisites: CliCommands[] = [
  {
    label: "create-next-app",
    command: "npm i -g create-next-app",
    description: "Click here to install create-next-app"
  }
]

const additionalCommands: CliCommands[] = [
  {
    label: "create-next-app",
    command: "npx create-next-app@latest",
    description: "Click here to create the next app using cli prompts"
  },
  {
    label: "check cli version",
    command: "npx create-next-app@latest --version",
    description: "Click here to check cli version"
  },
  {
    label: "cli help",
    command: "npx create-next-app@latest --help",
    description: "Click here to know more cli configurations"
  }
]

const resources = [
  `<a href="https://nextjs.org/docs/getting-started">Getting Started</a>`,
  `<a href="https://www.npmjs.com/package/create-next-app">Npm Package</a> `,
  `<a href="https://nextjs.org/showcase#all">Examples</a> `
]

const tags = [
  "next",
  "nextJs",
  "react framework",
  "react",
  "ui",
  "frontend",
  "webapp"
]


const nextJs: AppProps = {
  appName: AppName.NEXT_JS,
  fieldProps: FieldProps.nextJs,
  isSelected: false,
  logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/nextJs.png",
  scriptPath: ['media', 'scripts', 'nextJs.js'],
  prerequisites,
  additionalCommands,
  resources,
  tags
}

export default nextJs;
