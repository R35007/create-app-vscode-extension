import * as vscode from 'vscode';
import { NodeModulesAccessor, NodeModulesKeys } from '../NodeModuleAccessor';
import { AppProps } from '../modal';
import { generateGroupList, getNonce, getUriFromPath } from '../utilities';
import generateAppForm from './Generate-App-Form';

export default (
  extensionUri: vscode.Uri,
  webview: vscode.Webview,
  appsList: AppProps[],
  selectedApp: AppProps,
  selectedGroup: string,
  filterValue: string,
  showLoader: boolean) => {
  // Generate Dynamic Form Fields for the selected App
  const createAppForm = generateAppForm(selectedApp.fields);
  // Generate App Names
  const groupNamesList = generateGroupList(appsList, selectedGroup, filterValue);

  const appGroupsBtn = appsList.filter(app => app.groupNames.includes(selectedGroup))
    .map((app) => `
    <vscode-button 
      style="order: ${app.order}" 
      data-switch-app="${app.appName}"
      data-switch-group="${selectedGroup}"
      appearance=${selectedApp.appName === app.appName ? 'primary' : 'secondary'}
    >
        ${app.appName}
    </vscode-button>`)
    .join("");

  // Generate App List dropdown Options
  const appsListOptions = appsList.map(app => `
    <vscode-option 
      data-switch-group=${selectedApp.groupNames[0]} 
      ${app.appName === selectedApp.appName && 'selected'} 
      value="${app.appName || ''}">${app.appName}</vscode-option>`
  ).join('') || "";

  // Additional Details
  const aboutSection = selectedApp.description?.length ? `
  <div class="about-container">
    <h5 class="my-3">About</h5>
    <div class="about-content my-3">
      ${selectedApp.description}
    </div>
  </div>` : '';

  const prerequisites = selectedApp.prerequisites?.map(p => {
    if (p.href) return `<a title="${p.description}" href="${p.href}" class="tag anchor-tag">${p.label}</a>`;
    return `<span title="${p.description}" data-command="${p.command}" class="tag command-tag">${p.label}</span>`;
  }).join('') || "";

  const additionalCommands = selectedApp.additionalCommands?.map(ac =>
    `<span title="${ac.description}" data-command="${ac.command}" class="tag command-tag">${ac.label}</span>`
  ).join('') || "";

  const relatedApps = selectedApp.relatedAppNames?.filter((relativeAppName: string) => appsList.some(app => app.appName === relativeAppName))
    .map((relativeApp: string) => `<span 
    data-switch-app="${relativeApp}"
    data-switch-group="${appsList.find(app => app.appName === relativeApp)?.groupNames[0]}"
    title="${relativeApp}" 
    class="tag">${relativeApp}</span>`)
    .join("") || "";

  const resources = selectedApp.resources?.map(resource =>
    `<div><a href='${resource.href}' title='${resource.description || resource.href}'>${resource.label}</a></div>`
  ).join('') || "";


  const prerequisitesSection = selectedApp.prerequisites?.length ? `
  <div class="prerequisites-container">
    <h5 class="my-3">Prerequisites</h5>
    <div class="prerequisites-content my-3">
      ${prerequisites}
    </div>
  </div>` : '';

  const additionCommandsSection = selectedApp.additionalCommands?.length ? `
  <div class="additional-commands-container">
    <h5 class="my-3">Additional Commands</h5>
    <div class="additional-commands-content my-3">
      ${additionalCommands}
    </div>
  </div>` : '';

  const relatedAppsSection = relatedApps?.length ? `
  <div class="additional-commands-container">
    <h5 class="my-3">Related Apps</h5>
    <div class="additional-commands-content my-3">
      ${relatedApps}
    </div>
  </div>` : '';

  const resourcesSection = selectedApp.resources?.length ? `
  <div class="resources-container">
    <h5 class="my-3">Resources</h5>
    <div class="resources-content my-3">
    ${resources}
    </div>
  </div>` : '';

  const infoContainers = [aboutSection, prerequisitesSection, additionCommandsSection, relatedAppsSection, resourcesSection].filter(Boolean).join('<vscode-divider></vscode-divider>');

  const browseAppLocation = `<div class="row mb-3 align-items-center" style="order: ${Object.keys(selectedApp.fields || {}).length + 1}">
    <div class="col-12 val">
      <div class="d-flex mb-1">
        <vscode-text-field id="app-folder-location" class="d-block flex-1 w-100" placeholder="Please provide the folder path to create app"></vscode-text-field>
        <vscode-button id="app-folder-location-btn" title="Browse location to carate app" style="white-space: nowrap;">Browse Folder</vscode-button>
      </div>
      <div>Leave it empty to create app in active workspace folder.</div>
    </div>
  </div>`;

  // Use a nonce to only allow specific scripts to be run
  const nonce = getNonce();

  const uri = getUris(extensionUri, webview, selectedApp);

  const loaderStyles = `<style nonce="${nonce}">
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
      z-index: 3;
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

  </style>`;

  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; 
          img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
      <link href="${uri.bootstrapUri}" rel="stylesheet">
      <link href="${uri.stylesResetUri}" rel="stylesheet">
      <link href="${uri.stylesMainUri}" rel="stylesheet">
  
      <script type="module" src="${uri.toolkitUri}" nonce="${nonce}"></script>
      ${loaderStyles}
      <title>Create App</title>
  </head>
  
  <body style="overflow: hidden;">
      <div id="loader" class="loader ${showLoader ? '' : 'hide-loader'}">
          <div class="loader-text">🚀Launching...</div>
      </div>
      <div class="container-lg my-0 h-100">
          <div class="row pt-4 h-100">
              <aside class="col-3 col-lg-2 d-none d-md-block app-list-container h-100 pe-0 overflow-y-auto">
                  <div class="searchbox-wrapper position-sticky top-0">
                      <vscode-text-field id="app-list-filter-input" class="search-box d-block mb-2"
                          placeholder="Search apps here" value="${filterValue}"></vscode-text-field>
                  </div>
                  <ul id="app-list" class="list-group app-list overflow-y-auto mb-3 rounded-0">
                      ${groupNamesList}
                  </ul>
              </aside>
              <section class="col h-100 overflow-y-auto d-flex flex-column">
                  <section class="position-sticky top-0 z-1" style="background: var(--vscode-editor-background);">
                      <header class="d-flex align-items-center justify-content-between mb-2">
                          <div class="d-none d-md-inline-flex gap-1 flex-wrap">
                              ${appGroupsBtn}
                          </div>
                          <vscode-dropdown id="app-list-dropdown" class="d-inline-block d-md-none"
                              style="min-width: 12rem;">
                              ${appsListOptions}
                          </vscode-dropdown>
                          <div class="d-inline-flex gap-1 flex-wrap justify-content-end">
                              <vscode-button appearance="secondary" id="copy-config" title="copy the app config">Copy App
                                  Config</vscode-button>
                              <vscode-button appearance="secondary" id="copy-command" title="copy the command">Copy
                                  Command</vscode-button>
                              <vscode-button appearance="primary" id="execute"
                                  title="execute the command in terminal">Execute Command</vscode-button>
                          </div>
                      </header>
                      <div class="command-container mb-3">
                          <vscode-text-area id="command" class="d-block w-100" rows="5" style="margin-bottom: -5px" resize="vertical"></vscode-text-area>
                      </div>
                  </section>
                  <section class="configuration-container row flex-grow">
                      <div id="create-app-form" class="col d-flex flex-column app-config-container overflow-y-auto h-100">
                          ${createAppForm}
                          ${browseAppLocation}
                      </div>
                      <div
                          class="col-4 col-lg-3 additional-details-container h-100 overflow-y-auto d-none d-lg-block ${infoContainers ? '' : 'd-lg-none'}">
                          ${infoContainers}
                      </div>
                  </section>
              </section>
          </div>
      </div>
      <script src="${uri.scriptMainUri}" nonce="${nonce}"></script>
      <script nonce="${nonce}">
          setTimeout(() => {
              init(${JSON.stringify(selectedApp)}, "${filterValue}");
          }, 300);
          setTimeout(() => {
              document.getElementById("loader")?.remove();
          }, 1000);
      </script>
  </body>
  
  </html>
  `;
};

// Webview Uri for script and style to run in the webview
const getUris = (extensionUri: vscode.Uri, webview: vscode.Webview, selectedApp: AppProps) => {

  const stylesResetUri = getUriFromPath(extensionUri, webview, 'media', 'styles', 'reset.css');
  const stylesMainUri = getUriFromPath(extensionUri, webview, 'media', 'styles', 'vscode.css');
  const scriptMainUri = getUriFromPath(extensionUri, webview, 'media', 'scripts', 'main.js');

  const toolkitUri = getUriFromPath(extensionUri, webview, ...NodeModulesAccessor.getPathToOutputFile(NodeModulesKeys.uiToolkit));
  const bootstrapUri = getUriFromPath(extensionUri, webview, ...NodeModulesAccessor.getPathToOutputFile(NodeModulesKeys.bootstrap));

  return {
    stylesResetUri,
    stylesMainUri,
    scriptMainUri,
    toolkitUri,
    bootstrapUri,
  };
};
