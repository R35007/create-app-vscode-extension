import { AppName, AppProps } from '../modal';
import FieldProps from "./Field-Props";

export default (): AppProps[] => {
  const vsCodeExtension = {
    id: 1,
    appName: AppName.VS_CODE_EXTENSION,
    fieldProps: FieldProps.vsCodeExtension,
    logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/vscode.png",
    scriptPath: ['media', 'scripts', 'vscode.js'],
    isSelected: true,
    prerequisites: [
      {
        id: 1,
        label: "yo generator-code",
        command: "npm install -g yo generator-code",
        description: "Click here to install yo generator-code"
      }
    ],
    additionalCommands: [
      {
        id: 1,
        label: "yo code",
        command: "yo code",
        description: "Click here to create the vscode extension using cli prompts"
      },
      {
        id: 2,
        label: "check cli version",
        command: "yo code --version",
        description: "Click here to check cli version"
      },
      {
        id: 3,
        label: "cli help",
        command: "yo code --help",
        description: "Click here to know more cli configurations"
      }
    ],
    resources: [
      `<a href="https://code.visualstudio.com/api/get-started/your-first-extension">Getting Started</a>`,
      `<a href="https://www.npmjs.com/package/generator-code">Npm package</a>`,
      `<a href="https://github.com/microsoft/vscode-extension-samples">VS Code extension API samples</a>`,
      `<a href="https://github.com/microsoft/vscode-webview-ui-toolkit">VS Code webview ui toolkit</a> `,
    ],
    tags: [
      "vscodeextension",
      "extension",
      "node"
    ]
  }

  const react = {
    id: 2,
    appName: AppName.REACT,
    fieldProps: FieldProps.react,
    logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/react.png",
    scriptPath: ['media', 'scripts', 'react.js'],
    isSelected: false,
    prerequisites: [
      {
        id: 1,
        label: "create-react-app",
        command: "npm install -g create-react-app",
        description: "Click here to install create-react-app"
      }
    ],
    additionalCommands: [
      {
        id: 1,
        label: "create-react-app",
        command: "create-react-app",
        description: "Click here to create the react app using cli prompts"
      },
      {
        id: 2,
        label: "check cli version",
        command: "create-react-app --version",
        description: "Click here to check cli version"
      },
      {
        id: 3,
        label: "cli help",
        command: "create-react-app --help",
        description: "Click here to know more cli configurations"
      }
    ],
    resources: [
      `<a href="https://create-react-app.dev/docs/getting-started">Getting Started</a>`,
      `<a href="https://www.npmjs.com/package/create-react-app">Npm Package</a> `,
      `<a href="https://www.npmjs.com/search?q=cra-template-*">React Templates</a> `
    ],
    tags: [
      "react",
      "ui",
      "frontend"
    ]
  }

  const angular = {
    id: 3,
    appName: AppName.ANGULAR,
    fieldProps: FieldProps.angular,
    logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/angular.png",
    scriptPath: ['media', 'scripts', 'angular.js'],
    isSelected: false,
    prerequisites: [
      {
        id: 1,
        label: "@angular/cli",
        command: "npm install -g @angular/cli",
        description: "Click here to install @angular/cli"
      }
    ],
    additionalCommands: [
      {
        id: 1,
        label: "ng new",
        command: "ng new",
        description: "Click here to create the angular app using cli prompts"
      },
      {
        id: 2,
        label: "check cli version",
        command: "ng --version",
        description: "Click here to check cli version"
      },
      {
        id: 2,
        label: "cli help",
        command: "ng new --help",
        description: "Click here to know more cli configurations"
      }
    ],
    resources: [
      `<a href="https://angular.io/guide/setup-local">Getting Started</a>`,
      `<a href="https://www.npmjs.com/package/@angular/cli">Npm Package</a>`,
      `<a href="https://angular.io/tutorial">Tutorial</a>`,
    ],
    tags: [
      "angular",
      "ui",
      "frontend"
    ]
  }

  const vue = {
    id: 4,
    appName: AppName.VUE,
    fieldProps: FieldProps.vue,
    logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/vue.png",
    scriptPath: ['media', 'scripts', 'vue.js'],
    isSelected: false,
    prerequisites: [
      {
        id: 1,
        label: "@vue/cli",
        command: "npm install -g @vue/cli",
        description: "Click here to install @vue/cli"
      }
    ],
    additionalCommands: [
      {
        id: 1,
        label: "@vue/cli-service",
        command: "npm install @vue/cli-service",
        description: "Click here to install the vue local service using cli prompts"
      },
      {
        id: 2,
        label: "@vue/cli-service-global",
        command: "npm install @vue/cli-service-global",
        description: "Click here to install the vue global service using cli prompts"
      },
      {
        id: 4,
        label: "vue ui",
        command: "vue ui",
        description: "Click here to create the vue app using official vue gui"
      },
      {
        id: 5,
        label: "vue create",
        command: "vue create",
        description: "Click here to create the vue app using cli prompts"
      },
      {
        id: 6,
        label: "check cli version",
        command: "vue --version",
        description: "Click here to check cli version"
      },
      {
        id: 7,
        label: "cli help",
        command: "vue create --help",
        description: "Click here to know more cli configurations"
      }
    ],
    resources: [
      `<a href="https://cli.vuejs.org/guide/">Getting Started</a>`,
      `<a href="https://www.npmjs.com/package/@vue/cli">Vue Cli Npm Package</a>`,
      `<a href="https://www.npmjs.com/package/@vue/cli-service">Vue Cli service Npm Package</a>`,
    ],
    tags: [
      "vue",
      "ui",
      "frontend"
    ]
  }

  const node = {
    id: 5,
    appName: AppName.NODE,
    fieldProps: FieldProps.node,
    logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/node.png",
    scriptPath: ['media', 'scripts', 'node.js'],
    isSelected: false,
    prerequisites: [
      {
        id: 1,
        label: "express-generator",
        command: "npm install -g express-generator",
        description: "Click here to install express-generator"
      }
    ],
    additionalCommands: [
      {
        id: 1,
        label: "express",
        command: "express",
        description: "Click here to create the express app using cli prompts"
      },
      {
        id: 2,
        label: "check cli version",
        command: "express --version",
        description: "Click here to check cli version"
      },
      {
        id: 2,
        label: "cli help",
        command: "express --help",
        description: "Click here to know more cli configurations"
      }
    ],
    resources: [
      `<a href="https://expressjs.com/en/starter/generator.html">Getting Started</a>`,
      `<a href="https://www.npmjs.com/package/express-generator">Npm Package</a>`,
    ],
    tags: [
      "node",
      "express",
      "backend",
      "server"
    ]
  }

  const reactNative = {
    id: 6,
    appName: AppName.REACT_NATIVE,
    fieldProps: FieldProps.reactNative,
    logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/react.png",
    scriptPath: ['media', 'scripts', 'react-native.js'],
    isSelected: false,
    prerequisites: [
      {
        id: 1,
        label: "expo-cli",
        command: "npm install -g expo-cli",
        description: "Click here to install expo-cli"
      }
    ],
    additionalCommands: [
      {
        id: 1,
        label: "expo init",
        command: "expo init",
        description: "Click here to create the react native app using expo cli prompts"
      },
      {
        id: 2,
        label: "check cli version",
        command: "expo --version",
        description: "Click here to check cli version"
      },
      {
        id: 2,
        label: "cli help",
        command: "expo init --help",
        description: "Click here to know more cli configurations"
      }
    ],
    resources: [
      `<a href="https://reactnative.dev/docs/getting-started">Getting Started</a>`,
      `<a href="https://www.npmjs.com/package/expo-cli">Npm Package</a>`,
      `<a href="https://www.npmjs.com/search?q=expo-template-*">React Native Templates</a> `
    ],
    tags: [
      "reactnative",
      "react",
      "native",
      "ui",
      "frontend",
      "mobileapp",
    ]
  }

  const ionic = {
    id: 7,
    appName: AppName.IONIC,
    fieldProps: FieldProps.ionic,
    logoPath: "https://raw.githubusercontent.com/R35007/create-app-support/master/images/ionic.png",
    scriptPath: ['media', 'scripts', 'ionic.js'],
    isSelected: false,
    prerequisites: [
      {
        id: 1,
        label: "@ionic/cli",
        command: "npm install -g @ionic/cli",
        description: "Click here to install @angular/cli"
      },
      {
        id: 2,
        label: "@angular/cli",
        command: "npm install -g @angular/cli",
        description: "Click here to install @angular/cli If the the ionic app --type=angular"
      },
      {
        id: 3,
        label: "@vue/cli",
        command: "npm install -g @vue/cli",
        description: "Click here to install @vue/cli If the the ionic app --type=vue"
      },
      {
        id: 4,
        label: "create-react-app",
        command: "npm install -g create-react-app",
        description: "Click here to install create-react-app If the the ionic app --type=react"
      }
    ],
    additionalCommands: [
      {
        id: 1,
        label: "ionic start",
        command: "ionic start",
        description: "Click here to create the ionic app using cli prompts"
      },
      {
        id: 2,
        label: "check ionic cli version",
        command: "ionic --version",
        description: "Click here to check ionic cli version"
      },
      {
        id: 3,
        label: "check angular cli version",
        command: "ng --version",
        description: "Click here to angular ionic cli version"
      },
      {
        id: 4,
        label: "cli help",
        command: "ionic start --help",
        description: "Click here to know more cli configurations"
      },
      {
        id: 5,
        label: "List Templates",
        command: "ionic start --list",
        description: "Click here to see list of available templates"
      }
    ],
    resources: [
      `<a href="https://ionicframework.com/docs">Getting Started</a>`,
      `<a href="https://www.npmjs.com/package/@ionic/cli">Npm Package</a>`,
      `<a href="https://ionicframework.com/docs/componentsl">Ionic Components</a>`,
      `<a href="https://ionic.io/ionicons">Ionic Icons</a>`,
    ],
    tags: [
      "ionic",
      "ui",
      "frontend",
      "hybridapp",
    ]
  }

  return [
    vsCodeExtension,
    react,
    angular,
    vue,
    node,
    reactNative,
    ionic,
  ]
}