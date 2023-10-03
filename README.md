<h1>
  <a href="https://marketplace.visualstudio.com/items?itemName=Thinker.create-app"><sub><img src="https://github.com/R35007/create-app-support/blob/version_4.1.0/images/ca-logo.png?raw=true" height="40"></sub> Create App</a>
</h1>

Easily Create any UI App with Official Starter Templates or Boilerplate using CLI.

## Features

- Easy to create a boilerplate app using the `Create App: Interactive` view.
- Bored of interactive form fields, no worries. Try the new `Create App: Quick` command to create a app in seconds using vscode quick pick command pallet.
- Add our own custom apps and commands that generates interactive form fields and quick picks.

## Default Apps:

<span><sub><a href="https://angular.io/"><img src="https://github.com/R35007/create-app-support/blob/version_4.1.0/images/angular.png?raw=true" alt="" width="20"></a></sub>&nbsp;&nbsp;Angular</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span><sub><a href="https://www.djangoproject.com/"><img src="https://github.com/R35007/create-app-support/blob/version_4.1.0/images/django.png?raw=true" alt="" width="20"></a></sub>&nbsp;&nbsp;Django</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span><sub><a href="https://expressjs.com/"><img src="https://github.com/R35007/create-app-support/blob/version_4.1.0/images/expressJs.png?raw=true" alt="" width="20"></a></sub>&nbsp;&nbsp;ExpressJs</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span><sub><a href="https://www.gatsbyjs.com/"><img src="https://github.com/R35007/create-app-support/blob/version_4.1.0/images/gatsby.png?raw=true" alt="" width="20"></a></sub>&nbsp;&nbsp;Gatsby</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span><sub><a href="https://ionicframework.com/"><img src="https://github.com/R35007/create-app-support/blob/version_4.1.0/images/ionic.png?raw=true" alt="" width="20"></a></sub>&nbsp;&nbsp;Ionic</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
<span><sub><a href="https://nestjs.com/"><img src="https://github.com/R35007/create-app-support/blob/version_4.1.0/images/nestJs.png?raw=true" alt="" width="20"></a></sub>&nbsp;&nbsp;NestJs</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span><sub><a href="https://nextjs.org/"><img src="https://github.com/R35007/create-app-support/blob/version_4.1.0/images/nextJs.png?raw=true" alt="" width="20"></a></sub>&nbsp;&nbsp;NextJs</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span><sub><a href="https://preactjs.com/"><img src="https://github.com/R35007/create-app-support/blob/version_4.1.0/images/preact.png?raw=true" alt="" width="20"></a></sub>&nbsp;&nbsp;Preact</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span><sub><a href="https://reactjs.org/"><img src="https://github.com/R35007/create-app-support/blob/version_4.1.0/images/react.png?raw=true" alt="" width="20"></a></sub>&nbsp;&nbsp;React</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span><sub><a href="https://reactnative.dev/"><img src="https://github.com/R35007/create-app-support/blob/version_4.1.0/images/react.png?raw=true" alt="" width="20"></a></sub>&nbsp;&nbsp;React Native</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span><sub><a href="https://svelte.dev/"><img src="https://github.com/R35007/create-app-support/blob/version_4.1.0/images/svelte.png?raw=true" alt="" width="20"></a></sub>&nbsp;&nbsp;Svelte</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
<span><sub><a href="https://vitejs.dev/"><img src="https://github.com/R35007/create-app-support/blob/version_4.1.0/images/vite.png?raw=true" alt="" width="20"></a></sub>&nbsp;&nbsp;Vite</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span><sub><a href="https://code.visualstudio.com/api"><img src="https://github.com/R35007/create-app-support/blob/version_4.1.0/images/vscode.png?raw=true" alt="" width="20"></a></sub>&nbsp;&nbsp;VS Code Extension</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span><sub><a href="https://vuejs.org/"><img src="https://github.com/R35007/create-app-support/blob/version_4.1.0/images/vue.png?raw=true" alt="" width="20"></a></sub>&nbsp;&nbsp;Vue</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

## Create App: Interactive

- Give `Ctrl/Cmd+Shift+P` to open the command pallet and type `Create App: Interactive` to open the Create App view.
- This opens an interactive ui that prompts you tp pick the app name and provide configurations to create the app.

![Create App: Interactive Preview](https://github.com/R35007/create-app-support/blob/version_4.1.0/images/preview_interactive.gif?raw=true)

## Create App: Quick

- Give `Ctrl/Cmd+Shift+P` to open the command pallet and type `Create App: Quick` to open the Create App quick prompt.
- This provides you the quick command pallet and prompt you the pick the app and its required minimal configurations to create the app.

![Create App: Quick Preview](https://github.com/R35007/create-app-support/blob/version_4.1.0/images/preview_quick.gif?raw=true)

## Custom App Config interface

- Custom app can be provide in two ways.
  - use `create-app.settings.customApps` setting - provide a direct list of custom apps config.
  - or use `create-app.settings.customAppPath` setting - provide the `json` file path or folder path containing list of custom apps config.
  - Click [here](https://github.com/R35007/create-app-vscode-extension/tree/master/apps) for more app config references.

```ts
interface Tags {
  label: string;
  description: string;
  command?: string; //  Provide a command to execute in terminal on click
  href?: string; // Provide the link to webpage to redirect on click
}

interface FieldProps {
  type: "textbox" | "checkbox" | "radio" | "browse" | "dropdown";
  label: string;
  prefix?: string; // set prefix of the field value. Ex: "prefix":"--template=\""
  suffix?: string; // set suffix of the field value. Ex: "prefix":"\""
  value?: string | boolean; // The prefix and suffix will be added to the value. Ex: --template="value"
  placeholder?: string;
  description?: string;
  buttonText?: string; // provide button text if the field type is "browse"
  required?: boolean; // By default all required fields will be prompted on command Create App: Quick
  pattern?: string; // Set pattern to validate the value
  prompt?: boolean; // If True this field will be prompted on command Create App: Quick
  canSelectFile?: boolean; // Set to true or false when field type is "browse"
  canSelectFolder?: boolean; // Set to true or false when field type is "browse"
  errors?: { required?: string; pattern?: string }; // provide the error message
  options?: Array<{
    // provide options if the field type is "radio" or "dropdown"
    label: string;
    value: any;
  }>;
}

interface AppProps {
  appName: string; // Provide a unique app name. This overrides the app configs if already exist with a same name.
  commandTemplate: string | string[]; // Provide a command template here. Ex: "commandTemplate": "ng new ${fields.appId} --defaults" or "ng new ${fields['*']} --defaults"
  fields?: Record<string, FieldProps>; // Provide the app configuration to generate a app form fields. Ex: "fields": { "appId": { "type": "textbox", "required": true, value: "hello-world" } }
  description?: string; // This description will be shown below the About section in the right side of the form.
  order?: number; // Provide the App order to display in the apps list
  hide?: boolean; // If true this app will not be shown in both interactive and quick commands
  logoPath?: string; // Provide the app logo path. If not provide it will show the create app logo
  prerequisites?: Tags[]; // Provide the list of prerequisites commands and site links
  additionalCommands?: Tags[]; // Provide the additional commands to execute in terminal
  resources?: Tags[]; // List of links to refer the app
  tags?: string[]; // Provide the list of stings that helps to find the app
}
```

## Command Template Variables

- `commandTemplate` helps to generate the cli command.
- It takes the variable `fields` and populates its value based on the field name.

```json
{
  "commandTemplate": [
    "npm install -g @angular/cli;" // Add semicolon (;) to end the command. This adds the new line after the semicolon.
    "ng new ${fields.appId} ${fields['template']};", // populates the value of the specified field name.
    "ng new ${fields.get('appId', 'template')};", // populates the value of the specified field name using get method.
    "ng new fields.get('*');", // populates all field values.
    "ng new ${fields.getExcept('appId', 'template')};", // populates all the field values except the given field names.
    "${fields.openInVsCode ? `code ${fields.appId};` : ''}" // conditionally updated the command based on other field values.
  ]
}
```
