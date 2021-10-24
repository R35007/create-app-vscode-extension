import { AppName, AppProps, CliCommands } from '../../modal';
import FieldProps from '../Field-Props';

const prerequisites: CliCommands[] = [
  {
    label: "degit",
    command: "npm install -g degit",
    description: "Click here to install degit"
  }
]

const additionalCommands: CliCommands[] = [
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
