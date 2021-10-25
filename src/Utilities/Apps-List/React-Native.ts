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
    label: "install expo-cli",
    command: "npm install -g expo-cli",
    description: "Click here to install expo-cli globally"
  },
  {
    label: "expo init",
    command: "expo init",
    description: "Click here to create the react native app using expo cli prompts"
  },
  {
    label: "check cli version",
    command: "expo --version",
    description: "Click here to check cli version"
  },
  {
    label: "cli help",
    command: "expo init --help",
    description: "Click here to know more cli configurations"
  }
]

const resources = [
  `<a href="https://reactnative.dev/">Home Page</a>`,
  `<a href="https://reactnative.dev/docs/getting-started">Getting Started</a>`,
  `<a href="https://www.npmjs.com/package/expo-cli">Npm Package</a>`,
  `<a href="https://www.npmjs.com/search?q=expo-template-*">React Native Templates</a> `
]

const tags = [
  "react",
  "reactnative",
  "native",
  "frontend",
  "library",
  "ui",
  "mobileapp",
  "mobile",
  "phone",
  "react-native"
]


const reactNative: AppProps = {
  appName: AppName.REACT_NATIVE,
  fieldProps: FieldProps.reactNative,
  description: "React Native is a popular JavaScript-based mobile app framework that allows you to build natively-rendered mobile apps for iOS and Android.",
  logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/react.png",
  scriptPath: ['media', 'scripts', 'react-native.js'],
  isSelected: false,
  prerequisites,
  additionalCommands,
  resources,
  tags
}

export default reactNative;
