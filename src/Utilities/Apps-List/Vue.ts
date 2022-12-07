import { AppName, AppProps, Tags } from '../../modal';
import FieldProps from '../Field-Props';

const prerequisites: Tags[] = [
  {
    label: "node",
    href: "https://nodejs.org/en/",
    description: "https://nodejs.org/en/"
  },
  {
    label: "@vue/cli",
    command: "npm install -g @vue/cli",
    description: "Click here to install @vue/cli globally"
  }
];

const additionalCommands: Tags[] = [
  {
    label: "@vue/cli-service",
    command: "npm install -g @vue/cli-service",
    description: "Click here to install the vue local service using cli prompts globally"
  },
  {
    label: "@vue/cli-service-global",
    command: "npm install -g @vue/cli-service-global",
    description: "Click here to install the vue global service using cli prompts globally"
  },
  {
    label: "vue ui",
    command: "vue ui",
    description: "Click here to create the vue app using official vue gui"
  },
  {
    label: "vue create",
    command: "vue create",
    description: "Click here to create the vue app using cli prompts"
  },
  {
    label: "check cli version",
    command: "vue --version",
    description: "Click here to check cli version"
  },
  {
    label: "cli help",
    command: "vue create --help",
    description: "Click here to know more cli configurations"
  }
];

const resources = [
  `<a href="https://vuejs.org/">Home Work</a>`,
  `<a href="https://cli.vuejs.org/guide/">Getting Started</a>`,
  `<a href="https://www.npmjs.com/package/@vue/cli">Vue Cli Npm Package</a>`,
  `<a href="https://www.npmjs.com/package/@vue/cli-service">Vue Cli service Npm Package</a>`,
];

const tags = [
  "vue",
  "ui",
  "frontend",
  "framework",
  "webapp"
];


const vue: AppProps = {
  appName: AppName.VUE,
  fieldProps: FieldProps.vue,
  description: "Vue is a progressive javascript framework for building user interfaces",
  logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/vue.png",
  scriptPath: ['media', 'scripts', 'vue.js'],
  isSelected: false,
  prerequisites,
  additionalCommands,
  resources,
  tags
};

export default vue;
