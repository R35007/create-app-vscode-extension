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
    label: "install degit",
    command: "npm install -g degit",
    description: "Click here to install degit globally"
  },
  {
    label: "create svelte app",
    command: "npx degit sveltejs/template",
    description: "Click here to create the svelte app using cli prompts"
  },
  {
    label: "create svelteKit app",
    command: "npm init svelte@next",
    description: "Click here to create the sveltekit app using cli prompts"
  },

]

const resources = [
  `<a href="https://svelte.dev/">Home Page</a>`,
  `<a href="https://svelte.dev/docs">Getting Started with Svelte</a>`,
  `<a href="https://kit.svelte.dev/docs">Getting Started with SvelteKit</a>`,
  `<a href="https://svelte.dev/tutorial/basics">Tutorial</a> `,
  `<a href="https://svelte.dev/examples#hello-world">Examples</a> `
]

const tags = [
  "svelte",
  "sveltekit",
  "ui",
  "frontend",
  "library",
  "webapp",
  "compiler"
]


const svelte: AppProps = {
  appName: AppName.SVELTE,
  fieldProps: FieldProps.svelte,
  isSelected: false,
  logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/svelte.png",
  scriptPath: ['media', 'scripts', 'svelte.js'],
  prerequisites,
  additionalCommands,
  resources,
  tags
}

export default svelte;
