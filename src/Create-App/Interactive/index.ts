import * as vscode from 'vscode';
import { Actions, AppProps, BrowseProps, Commands, Message } from '../../modal';
import { getInterpolateObject, getWebviewOptions, interpolate } from '../../utilities';
import { getAppsAndGroups } from '../../utilities/getAppsList';
import { Command } from '../Command';
import getWebview from './WebView';

export default class CreateApp {
  static currentPanel: CreateApp | undefined;

  readonly #panel: vscode.WebviewPanel;
  readonly #extensionUri: vscode.Uri;
  #disposables: vscode.Disposable[] = [];

  #appsList: AppProps[];
  #selectedApp: AppProps;
  #groupNames: string[];
  #selectedGroup: string;
  #filterValue: string = '';

  static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

    // If we already have a panel, show it.
    if (CreateApp.currentPanel) {
      CreateApp.currentPanel.#panel.reveal(column);
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      Commands.CREATE_APP_INTERACTIVE,
      'Create App',
      column || vscode.ViewColumn.One,
      getWebviewOptions(extensionUri)
    );

    CreateApp.currentPanel = new CreateApp(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this.#panel = panel;
    this.#extensionUri = extensionUri;

    const { appsList, groupNames } = getAppsAndGroups();

    this.#appsList = appsList;
    this.#groupNames = groupNames;
    this.#selectedApp = this.#appsList[0];
    this.#selectedGroup = groupNames[0];

    this.#panel.iconPath = vscode.Uri.joinPath(extensionUri, 'media', 'images', 'ca-logo-sm.png');

    // Set the webview's initial html content
    this.#update(true);

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programmatically
    this.#panel.onDidDispose(() => this.dispose(), null, this.#disposables);

    // Handle messages from the webview
    this.#panel.webview.onDidReceiveMessage(this.onDidReceiveMessage, null, this.#disposables);
  }

  onDidReceiveMessage = (message: Message) => {
    switch (message.action) {
      case Actions.SWITCH_APP: {
        this.#switchApp(message.appName, message.groupName, message.filterValue);
        return;
      }
      case Actions.GET_LOCATION: {
        this.#getFolderLocation(message);
        return;
      }
      case Actions.GET_COMMAND_TEMPLATE: {
        this.#setCommandTemplate(message.object, message.commandTemplate);
        return;
      }
      case Actions.EXECUTE_COMMAND: {
        const command = new Command(message.command, message.location, this.#selectedApp.appName);
        command.executeCommand();
        return;
      }
      case Actions.COPY_COMMAND: {
        this.#copyCommand(message.command);
        return;
      }
      case Actions.COPY_CONFIG: {
        this.#copyConfig();
        return;
      }
      case Actions.EXECUTE_CREATE_COMMAND: {
        const command = new Command(message.command, message.location, this.#selectedApp.appName);
        command.executeCreateCommand();
        return;
      }
    }
  };

  #copyConfig = () => {
    vscode.env.clipboard.writeText(JSON.stringify(this.#selectedApp, null, vscode.window.activeTextEditor?.options.tabSize || '\t'));
    vscode.window.showInformationMessage(`${this.#selectedApp.appName} App config is copied to clipboard 📋`);
  };

  #copyCommand = (command: string) => {
    vscode.env.clipboard.writeText(command);
    vscode.window.showInformationMessage('Command copied  to clipboard 📋');
  };

  #switchApp = (appName: string, groupName: string, filterValue: string) => {
    if (!appName && !groupName) return;
    this.#selectedGroup = groupName;
    this.#filterValue = filterValue;
    this.#selectedApp = this.#appsList.find((app) => app.appName === appName) || this.#selectedApp;
    this.#update();
  };

  #getFolderLocation = async (props: Message) => {
    const folderLocations = await vscode.window.showOpenDialog({
      defaultUri: vscode.workspace.workspaceFolders?.[0]?.uri,
      canSelectFolders: props.isAppLocation ? true : ((this.#selectedApp.fields?.[props.name] as BrowseProps)?.canSelectFolder ?? true),
      canSelectFiles: props.isAppLocation ? false : ((this.#selectedApp.fields?.[props.name] as BrowseProps)?.canSelectFolder ?? true),
      canSelectMany: false,
      ...props
    });

    if (folderLocations?.length) {
      this.#panel.webview.postMessage({
        action: props.isAppLocation ? 'set-app-location' : 'set-location',
        value: folderLocations[0].fsPath,
        name: props.name
      });
    }
  };

  #setCommandTemplate = (object: Message['object'], commandTemplate: string) => {
    try {
      this.#panel.webview.postMessage({
        action: 'set-command-template',
        value: interpolate(getInterpolateObject(object.fields, object.execPath), commandTemplate)
      });
    } catch (err) {
      if (!(err instanceof Error)) return;
      if (err.message.includes('no defined')) {
        vscode.window.showErrorMessage(err.message + ". Please use ${fields.get('yourFieldName')} in the commandTemplate");
      } else {
        vscode.window.showErrorMessage(err.message + '. Please check the commandTemplate');
      }
    }
  };

  #update(showLoader: boolean = false) {
    // Vary the webview's content based on where it is located in the editor.
    switch (this.#panel.viewColumn) {
      case vscode.ViewColumn.Two:
      case vscode.ViewColumn.Three:
      case vscode.ViewColumn.One:
      default:
        this.#panel.webview.html = getWebview(
          this.#extensionUri,
          this.#panel.webview,
          this.#appsList,
          this.#groupNames,
          this.#selectedApp,
          this.#selectedGroup,
          this.#filterValue,
          showLoader
        );
        return;
    }
  }

  dispose() {
    CreateApp.currentPanel = undefined;

    // Clean up our resources
    this.#panel.dispose();

    while (this.#disposables.length) {
      const disposable = this.#disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}
