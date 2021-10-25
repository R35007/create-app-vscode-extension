import * as vscode from 'vscode';
import { AppProps, Tags } from '../modal';

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

export const getAppList = (appsList: AppProps[], selectedAppName?: string): string => {
  return appsList.map(app => {
    return `
      <li id="${app.appName}" title="${app.description}" role="button" class="row g-0 app-card ${app.appName === selectedAppName ? 'selected' : ''}">
        <div class="col-3 text-center thumbnail p-2 d-none d-md-block">
          <img
              src="${app.logoPath}"
              alt="${app.appName}"
            />
        </div>
        <div class="tags d-none">
          ${app.tags?.join(',')}
        </div>
        <div class="col app-title p-2">${app.appName}</div>
      </li>
    `
  }).join('')
}

export const getPrerequisites = (prerequisites: Tags[] = []) => {
  return prerequisites.map(p => {
    if (p.href) {
      return `<a title="${p.description}" href="${p.href}" class="tag anchor-tag prerequisites-tag">${p.label}</a>`
    }
    return `<span title="${p.description}" data-command="${p.command}" class="tag command-tag prerequisites-tag">${p.label}</span>`
  }).join('')
}

export const getAdditionalCommands = (additionalCommands: Tags[] = []) => {
  return additionalCommands.map(ac =>
    `<span title="${ac.description}" data-command="${ac.command}" class="tag command-tag additional-commands-tag">${ac.label}</span>`
  ).join('');
}