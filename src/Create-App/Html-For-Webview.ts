import * as vscode from 'vscode';
import { AppProps } from '../modal';
import { getAdditionalCommands, getAppList, getNonce, getPrerequisites, getUriFromPath } from '../Utilities';
import generateAppForm from '../Utilities/Generate-App-Form';

export default (extensionUri: vscode.Uri, webview: vscode.Webview, appsList: AppProps[], selectedApp: AppProps, showLoader: boolean) => {
  // Generate Dynamic Form Fields for the selected App
  const createAppForm = generateAppForm(selectedApp.fieldProps);
  // Generate App Cards
  const createAppList = getAppList(appsList, selectedApp.appName);

  // Additional Details
  const prerequisitesCommands = selectedApp.prerequisites?.filter(prereq => prereq.command).map(prereq => prereq.command).join('; ');
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
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; 
        img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
        <link href="${uri.bootstrapUri}" rel="stylesheet">
        <link href="${uri.stylesResetUri}" rel="stylesheet">
        <link href="${uri.stylesMainUri}" rel="stylesheet">
  
        <script type="module" src="${uri.toolkitUri}" nonce="${nonce}"></script>
        <style nonce="${nonce}">
          .hide-loader{
             display: none !important;
          }

          .loader{
            background: var(--vscode-editor-background);
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: 1;
          }
          
          .loader-text{
            font-size: 26px;
            opacity: 0.8;
            animation: blink 0.5s linear infinite alternate;
            position: absolute;
            top: 35%;
            text-align: center;
            width: 100%;
          }
          
          @keyframes blink {
            0% {
              opacity: 0.8;
            }
            100% {
              opacity: 0.5;
            }
          }

        </style>
        <title>Create App</title>
      </head>
      <body style="overflow: hidden;">
        <div id="loader" class="loader ${showLoader ? '' : 'hide-loader'}">
          <div class="loader-text">🚀Launching...</div>
        </div>
        <div class="container-md my-0 h-100">
          <div class="row pt-4 h-100">
            <aside class="col-3 col-lg-2 d-none d-sm-block app-list-container h-100">
              <div class="searchbox-wrapper">
                <vscode-text-field id="app-list-filter-input" class="search-box d-block mb-2" placeholder="Search apps here"></vscode-text-field>
              </div>
              <ul id="app-list" class="list-group app-list overflow-y-auto mb-3">
                ${createAppList}
              </ul>
            </aside>
            <section class="col h-100">
              <vscode-button class="pe-none mb-2">Create ${selectedApp.appName} App</vscode-button>
              <section class="command-container position-relative mb-3">
                <vscode-text-area id="command" class="d-block w-100" rows="5"></vscode-text-area>
                <div class="action-container d-inline-block position-absolute">
                  <vscode-button appearance="secondary" id="copy-command">Copy</vscode-button>
                  <vscode-button id="execute">Excute</vscode-button>
                </div>
              </section>
              <section class="configuration-container mx-3">
                <div class="row h-100">
                  <div class="col-8 col-lg-9 app-config-container overflow-y-auto h-100">
                    ${createAppForm}
                  </div>
                  <div class="col-4 col-lg-3 additional-details-container h-100 overflow-y-auto">
                    <div class="prerequisites-container ${prerequisites ? '' : 'd-none'}">
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
                    <div class="install-prerequisites-container ${prerequisitesCommands ? '' : 'd-none'}">
                      <div class="install-prerequisite-content my-3">
                        <vscode-checkbox id="install-prerequisites" data-command="${prerequisitesCommands};"> Install Prerequisites Cli</vscode-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </div>
        </div>
        <script src="${uri.scriptMainUri}" nonce="${nonce}"></script>
        <script src="${uri.formScriptUri}" nonce="${nonce}"></script>
        <script nonce="${nonce}">
          setTimeout(() => {
            document.getElementById("loader")?.remove();
          }, 2000);
        </script>
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