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
    label: "install gatsby-cli",
    command: "npm install -g gatsby-cli",
    description: "Click here to install gatsby-cli globally"
  },
  {
    label: "gatsby new",
    command: "npx gatsby new",
    description: "Click here to create the gatsby app using cli prompts"
  },
  {
    label: "check cli version",
    command: "npx gatsby --version",
    description: "Click here to check cli version"
  },
  {
    label: "cli help",
    command: "npx gatsby new --help",
    description: "Click here to know more cli configurations"
  }
]

const resources = [
  `<a href="https://www.gatsbyjs.com/">Home Page</a>`,
  `<a href="https://www.gatsbyjs.com/docs/">Getting Started</a>`,
  `<a href="https://www.npmjs.com/package/gatsby-cli">Npm Package</a> `,
  `<a href="https://www.gatsbyjs.com/starters">Starter Templates</a> `,
  `<a href="https://github.com/orgs/gatsbyjs/repositories">Starter Templates Repos</a> `
]

const tags = [
  "gatsby",
  "react framework",
  "framework",
  "react",
  "ui",
  "frontend",
  "backend",
  "full stack",
  "webapp",
  "web"
]


const gatsby: AppProps = {
  appName: AppName.GATSBY,
  fieldProps: FieldProps.gatsby,
  description: "Gatsby helps to build a powerful websites using a React-based framework and innovative data layer that makes integrating different APIs, and services into one web experience incredibly simple.",
  isSelected: false,
  logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/gatsby.png",
  scriptPath: ['media', 'scripts', 'gatsby.js'],
  prerequisites,
  additionalCommands,
  resources,
  tags
}

export default gatsby;
