import * as vscode from 'vscode';
import { AppProps, CliCommands } from '../modal';

export const getWebviewOptions = (_extensionUri: vscode.Uri): vscode.WebviewOptions => {
  return {
    // Enable javascript in the webview
    enableScripts: true,
    // And restrict the webview to only loading content from our extension's `media` directory.
    // localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
  };
}

export const getUriFromPath = (extensionUri: vscode.Uri, webview: vscode.Webview, ...paths: string[]): vscode.Uri => {
  const localDiskPath = vscode.Uri.joinPath(extensionUri, ...paths);
  return webview.asWebviewUri(localDiskPath)
}

export const getNonce = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export const getAppCards = (extensionUri: vscode.Uri, webview: vscode.Webview, appsList: AppProps[], selectedAppName?: string): string => {
  return appsList.map(app => {
    const logoUri = getUriFromPath(extensionUri, webview, ...app.logoPath);
    return `
      <div id="${app.id}" class="row g-0 app-card rounded ${app.appName === selectedAppName ? 'selected' : ''}">
        <div class="col-3 text-center thumbnail p-2">
          <img
              src="${logoUri}"
              alt="${app.appName}"
              class="img-fluid"
            />
        </div>
        <div class="col app-title p-2">
          <h5 class="mb-1">
            ${app.appName}
          </h5>
        </div>
      </div>
    `
  }).join('')
}

export const getPrerequisites = (prerequisites: CliCommands[] = []) => {
  return prerequisites.map(p =>
    `<span title="${p.description}" data-command="${p.command}" class="tag prerequisites-tag">${p.label}</span>`
  ).join('')
}

export const getAdditionalCommands = (additionalCommands: CliCommands[] = []) => {
  return additionalCommands.map(ac =>
    `<span title="${ac.description}" data-command="${ac.command}" class="tag additional-commands-tag">${ac.label}</span>`
  ).join('');
}