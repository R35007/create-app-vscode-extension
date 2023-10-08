## v5.2.0

- Added - `create-app.settings.interactive.showAppIcons` setting - if false it hides the app icons to improve the rendering speed. Defaults to true.
- Added - `Open in interactive mode` button in `Create App: Quick` command pallet. On click it opens the `Create App: Interactive` window.

## v5.1.0

- Added - `create-app.settings.quick.promptType` setting - Set `Create App: Quick` command prompt type.
- Added - `create-app.settings.quick.promptCommandString` - If true it shows the quick command input box before executing in terminal.
- Added - `create-app.settings.quick.promptExecutionPath` - If true it opens up the dialog to browse the folder for the app. If false it creates the app in the active workspace folder.
- Enhanced - `Create App: Quick` command now shows the number of steps to complete to create the app in the title of the command pallet.
- Modified - Code refactored.

## v5.0.0

- New✨ - Added `groupNames` - Helps to group multiple apps in a single tabbed view.
- Added - `relatedAppNames` - Helps to navigate to other apps.
- Added - Electron app configurations.
- Added - multiple app groups.
- Enhanced - Now able to retain the filtered apps on switching apps
- Enhanced - user interface - Now able to resize the command area. Introducing Apps groups view.

## v4.2.0

- Updated - Default apps cli configuration fields
- Added - `checkedValue` and `unCheckedValue` for the field type `checkbox`,
- Added - `hide` for the field props. If tru it will hide the file both in interactive form and in quick pick,
- Enhanced - Increased the width of the interactive container.
- Fixed - Selecting the current app name resetting the view issue fixed. Now it will not reset the view on clicking same selected app name.
- Fixed - If type is not provided the field is not rendering the textbox issue fixed. Now the filed type is defaulted to type `textbox`.

## v4.1.0

- Moved - `Install Prerequisites ?` moved into the form fields.
- Added - `Open in VSCode ?` in the form fields.
- Enhanced - `commandTemplate` can also be given as a array of string.
- Added - `fields.get()`, `fields.getExcept()` method to get the list of field values.

## v4.0.1

- Fixed - Style issue fixed.
- Fixed - Vulnerabilities fixed.

## v4.0.0

- New✨ - Now we can add our own custom apps to generate a interactive ui.
- Added - `Vite` and `Vite Extra` App
- Renamed - `create.app` command to `create-app.interactive` command.
  - Give `(cmd/ctrl)+shit+p` and select `Create App: Interactive` to open the interactive ui.
- Added - `create-app.quick` command.
  - Give `(cmd/ctrl)+shit+p` and select `Create App: Quick` to open the quick command pallet to create a app
- Added - `create-app.settings.customApps` setting - provide a direct list of custom apps config
- Added - `create-app.settings.customAppPath` setting - provide the `json` file path or folder path containing list of custom apps config.
- Added - `copy config` button ont he top right corner of the command text area. Helps to copy the app configurations and override the default configs.
- Removed - `Open in vscode` config from all app configs.
- Fixed - Keeps on reloading on view switching the tabs issue fixed.

## v3.1.0

- Typo fixes.
- Build size reduced.

## v3.0.2

- Due to compatibility reverted back [v3.0.1](#v3.0.1)

## v3.0.1

- On `Execute` button click, the terminal opens in powershell and failed to execute the create app commands - `Fixed`
- Now The Terminal open in `Git bash` by default on click of the `Execute` button.

## v3.0.0

- Added Gatsby App
- [Preview here](https://raw.githubusercontent.com/R35007/create-app-support/version_5.1.0/images/previews/preview_v3.0.0.gif)

## v2.0.0, v2.0.1, v2.0.2, v2.0.3

- Added more Apps to Create
- Implemented New UI Layout
- [Preview here](https://raw.githubusercontent.com/R35007/create-app-support/version_5.1.0/images/previews/preview_v2.0.0.gif)

## v1.0.0

- Initial release
- [Preview here](https://raw.githubusercontent.com/R35007/create-app-support/version_5.1.0/images/previews/preview_v1.0.0.gif)
