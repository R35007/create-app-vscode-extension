
import * as vscode from 'vscode';
import { AppProps, Commands } from '../modal';
import { getInterpolateObject, getWebviewOptions, interpolate } from '../utilities';
import { Command } from './Command';
import getHtmlForWebview from './Html-For-Webview';

/**
 * Manages Create React App Panel
 */
export default class CreateApp {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: CreateApp | undefined;

  readonly #panel: vscode.WebviewPanel;
  readonly #extensionUri: vscode.Uri;
  #disposables: vscode.Disposable[] = [];

  _appsList: AppProps[];
  #selectedApp: AppProps;

  public static createOrShow(extensionUri: vscode.Uri, appsList: AppProps[]) {

    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

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
      getWebviewOptions(extensionUri),
    );


    CreateApp.currentPanel = new CreateApp(panel, extensionUri, appsList);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, appsList: AppProps[]) {
    this._appsList = appsList;
    this.#selectedApp = this._appsList[0];

    this.#panel = panel;
    this.#extensionUri = extensionUri;

    this.#panel.iconPath = vscode.Uri.joinPath(extensionUri, "media", "images", "ca-logo-sm.png");

    // Set the webview's initial html content
    this.#update(true);

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programmatically
    this.#panel.onDidDispose(() => this.dispose(), null, this.#disposables);

    // Handle messages from the webview
    this.#panel.webview.onDidReceiveMessage(this.onDidReceiveMessage, null, this.#disposables);
  }

  onDidReceiveMessage = (message: any) => {
    switch (message.action) {
      case 'switch-app': {
        this.#switchApp(message.appName);
        return;
      }
      case 'get-location': {
        this.#getFolderLocation(message);
        return;
      }
      case 'get-command-template': {
        this.#setCommandTemplate(message.fields, message.commandTemplate);
        return;
      }
      case 'execute-command': {
        const command = new Command(
          message.command,
          message.location,
          this.#selectedApp.appName
        );
        command.executeCommand();
        return;
      }
      case 'copy-command': {
        this.#copyCommand(message.command);
        return;
      }
      case 'copy-config': {
        this.#copyConfig();
        return;
      }
      case 'execute-create-command': {
        const command = new Command(
          message.command,
          message.location,
          this.#selectedApp.appName
        );
        command.executeCreateCommand();
        return;
      }
    }
  };

  #copyConfig = () => {
    vscode.env.clipboard.writeText(JSON.stringify(this.#selectedApp, null, vscode.window.activeTextEditor?.options.tabSize || "\t"));
    vscode.window.showInformationMessage(`${this.#selectedApp.appName} App config is copied to clipboard 📋`);
  };

  #copyCommand = (command: string) => {
    vscode.env.clipboard.writeText(command);
    vscode.window.showInformationMessage('Command copied  to clipboard 📋');
  };

  #switchApp = (appName: string) => {
    this._appsList.forEach(app => {
      if (app.appName === appName) {
        app.isSelected = true;
        this.#selectedApp = app;
      }
    });
    this.#update();
  };

  #getFolderLocation = async (props: any) => {
    const folderLocations = await vscode.window.showOpenDialog({
      defaultUri: vscode.workspace.workspaceFolders?.[0]?.uri,
      canSelectFolders: props.isAppLocation ? true : this.#selectedApp.fields?.[props.name]?.canSelectFolder ?? true,
      canSelectFiles: props.isAppLocation ? false : this.#selectedApp.fields?.[props.name]?.canSelectFolder ?? true,
      canSelectMany: false,
      ...props
    });

    if (folderLocations?.length) {
      this.#panel.webview.postMessage({ action: props.isAppLocation ? 'set-app-location' : 'set-location', value: folderLocations[0].fsPath, name: props.name });
    }
  };

  #setCommandTemplate = (fieldProps: any, commandTemplate: string) => {
    try {
      this.#panel.webview.postMessage({ action: 'set-command-template', value: interpolate({ fields: getInterpolateObject(fieldProps) }, commandTemplate) });
    } catch (err: any) {
      if (err.message.includes('no defined')) {
        vscode.window.showErrorMessage(err.message + ". Please use ${fields.get('yourFieldName')} in the commandTemplate");
      } else {
        vscode.window.showErrorMessage(err.message + ". Please check the commandTemplate");
      }
    }
  };

  public dispose() {
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

  #update(showLoader: boolean = false) {
    // Vary the webview's content based on where it is located in the editor.

    switch (this.#panel.viewColumn) {
      case vscode.ViewColumn.Two:
      case vscode.ViewColumn.Three:
      case vscode.ViewColumn.One:
      default:
        this.#panel.webview.html = getHtmlForWebview(
          this.#extensionUri,
          this.#panel.webview,
          this._appsList,
          this.#selectedApp,
          showLoader
        );
        return;
    }
  }
}
