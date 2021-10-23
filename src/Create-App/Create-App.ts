
import * as vscode from 'vscode';
import { AppProps, Commands } from '../modal';
import { getWebviewOptions } from '../Utilities';
import getAppsList from '../Utilities/Apps-List';
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

  private readonly _panel: vscode.WebviewPanel;
  private readonly _webview: vscode.Webview;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  private _appsList: AppProps[] = getAppsList();
  private _selectedApp: AppProps = this._appsList[0];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (CreateApp.currentPanel) {
      CreateApp.currentPanel._panel.reveal(column);
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      Commands.CREATE_APP,
      'Create App',
      column || vscode.ViewColumn.One,
      getWebviewOptions(extensionUri),
    );


    CreateApp.currentPanel = new CreateApp(panel, extensionUri);
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    CreateApp.currentPanel = new CreateApp(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._webview = panel.webview;
    this._extensionUri = extensionUri;

    this._panel.iconPath = vscode.Uri.joinPath(extensionUri, "media", "images", "ca-logo-sm.png");

    // Set the webview's initial html content
    this._update(true);

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programmatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Update the content based on view changes
    this._panel.onDidChangeViewState(e => {
      if (this._panel.visible) {
        this._update(true);
      }
    }, null, this._disposables);

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(this.onDidReceiveMessage, null, this._disposables);
  }

  onDidReceiveMessage = (message: any) => {
    switch (message.action) {
      case 'switch-app': {
        this._switchApp(message.id)
        return;
      }
      case 'get-location': {
        this._getFolderLocation(message);
        return;
      }
      case 'execute-command': {
        const command = new Command(
          message.command,
          message.location,
          this._selectedApp.appName
        );
        command.executeCommand();
        return;
      }
      case 'copy-command': {
        this._copyCommand(message.command);
        return;
      }
      case 'execute-create-command': {
        const command = new Command(
          message.command,
          message.location,
          this._selectedApp.appName
        );
        command.executeCreateCommand();
        return;
      }
    }
  }


  private _copyCommand = (command: string) => {
    vscode.env.clipboard.writeText(command);
    vscode.window.showInformationMessage('Copied command to the clipboard 📋');
  }

  private _switchApp = (id: number) => {
    this._appsList.forEach(app => {
      if (app.id === id) {
        app.isSelected = true;
        this._selectedApp = app;
      }
    });
    this._update();
  }

  private _getFolderLocation = async (props: any) => {
    const folderLocations = await vscode.window.showOpenDialog({
      canSelectFolders: true,
      canSelectFiles: false,
      canSelectMany: false,
      ...props
    })

    if (folderLocations?.length) {
      this._panel.webview.postMessage({ action: 'set-location', value: folderLocations[0].fsPath, id: props.id });
    }
  }

  public dispose() {
    CreateApp.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  private _update(showLoader: boolean = false) {
    // Vary the webview's content based on where it is located in the editor.

    switch (this._panel.viewColumn) {
      case vscode.ViewColumn.Two:
      case vscode.ViewColumn.Three:
      case vscode.ViewColumn.One:
      default:
        this._panel.webview.html = getHtmlForWebview(
          this._extensionUri,
          this._panel.webview,
          this._appsList,
          this._selectedApp,
          showLoader
        );
        return;
    }
  }
}
