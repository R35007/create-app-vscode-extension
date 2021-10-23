import * as vscode from 'vscode';
import { AppProps } from '../modal';
import { getAdditionalCommands, getAppCards, getNonce, getPrerequisites, getUriFromPath } from '../Utilities';
import generateAppForm from '../Utilities/Generate-App-Form';

export default (extensionUri: vscode.Uri, webview: vscode.Webview, appsList: AppProps[], selectedApp: AppProps) => {
  // Generate Dynamic Form Fields for the selected App
  const createAppForm = generateAppForm(selectedApp.fieldProps);
  // Generate App Cards
  const createAppCards = getAppCards(extensionUri, webview, appsList, selectedApp.appName);

  // Additional Details
  const prerequisitesCommands = selectedApp.prerequisites?.map(prereq => prereq.command).join('; ') + '; ';
  const prerequisites = getPrerequisites(selectedApp.prerequisites);
  const additionalCommands = getAdditionalCommands(selectedApp.additionalCommands);
  const resources = selectedApp.resources.map(r => `<div>${r}</div>`).join('')

  const uri = getUris(extensionUri, webview, selectedApp)

  // Use a nonce to only allow specific scripts to be run
  const nonce = getNonce();

  return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <!--
          Use a content security policy to only allow loading images from https or from our extension directory,
          and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; 
        img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
        <link href="${uri.bootstrapUri}" rel="stylesheet">
        <link href="${uri.stylesResetUri}" rel="stylesheet">
        <link href="${uri.stylesMainUri}" rel="stylesheet">
  
        <script type="module" src="${uri.toolkitUri}" nonce="${nonce}"></script>
        <title>Create App</title>
      </head>
      <body>
        <div class="container-md">
          <section class="my-4">
            <div class="app-cards-wrapper d-flex align-items-center flex-wrap justify-content-center mb-3">${createAppCards}</div>
          </section>
          <section class="command-wrapper my-4 d-flex align-items-center">
            <vscode-button class="pe-none">Create ${selectedApp.appName} App</vscode-button>
            <div class="flex-1">
              <vscode-text-field id="command" class="d-block w-100" readonly placeholder="Please select any app configurations to create the app"></vscode-text-field>
            </div>
            <vscode-button appearance="secondary" id="copy-command">Copy</vscode-button>
            <vscode-button id="execute">Excute</vscode-button>
          </section>
          <section class="mx-3">
            <div class="row">
              <div class="col-8 col-lg-9 p-0 app-form-container">
                ${createAppForm}
              </div>
              <div class="col-4 col-lg-3 p-0 additional-details-container">
                <div class="prerequisites-container">
                  <h5>Prerequisites</h5>
                  <div class="prerequisites-content my-3">
                    ${prerequisites}
                  </div>
                </div>
                <div class="additional-commands-container">
                  <h5>Additional Commands</h5>
                  <div class="additional-commands-content my-3">
                    ${additionalCommands}
                  </div>
                </div>
                <div class="resources-container">
                  <h5>Resources</h5>
                  <div class="resources-content my-3">
                   ${resources}
                  </div>
                </div>
                <div class="install-prerequisites-container">
                  <div class="install-prerequisite-content my-3">
                    <vscode-checkbox id="install-prerequisites" data-command="${prerequisitesCommands}"> Install prerequisites</vscode-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer>
          </footer>
        </div>
        <script src="${uri.scriptMainUri}" nonce="${nonce}"></script>
        <script src="${uri.formScriptUri}" nonce="${nonce}"></script>
      </body>
      </html>`;
}

// Webview Uri for script and style to run in the webview
const getUris = (extensionUri: vscode.Uri, webview: vscode.Webview, selectedApp: AppProps) => {

  const stylesResetUri = getUriFromPath(extensionUri, webview, 'media', 'styles', 'reset.css');
  const stylesMainUri = getUriFromPath(extensionUri, webview, 'media', 'styles', 'vscode.css');
  const scriptMainUri = getUriFromPath(extensionUri, webview, 'media', 'scripts', 'main.js');
  const toolkitUri = getUriFromPath(extensionUri, webview, 'node_modules', '@vscode', 'webview-ui-toolkit', 'dist', 'toolkit.js');
  const bootstrapUri = getUriFromPath(extensionUri, webview, 'node_modules', 'bootstrap', 'dist', 'css', 'bootstrap.min.css');
  const formScriptUri = getUriFromPath(extensionUri, webview, ...selectedApp.scriptPath);

  return {
    stylesResetUri,
    stylesMainUri,
    scriptMainUri,
    toolkitUri,
    bootstrapUri,
    formScriptUri
  }
}