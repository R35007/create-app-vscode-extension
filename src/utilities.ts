import * as vscode from 'vscode';
import { NodeModulesAccessor } from './NodeModuleAccessor';
import { AppProps } from './modal';

export const getWebviewOptions = (extensionUri: vscode.Uri): vscode.WebviewOptions => {
  return {
    // Enable javascript in the webview
    enableScripts: true,
    localResourceRoots: [
      vscode.Uri.joinPath(extensionUri, NodeModulesAccessor.outputPath, 'libs'), // <--- Important
      vscode.Uri.joinPath(extensionUri, 'media'),
    ],
  };
};

export const getUriFromPath = (extensionUri: vscode.Uri, webview: vscode.Webview, ...paths: string[]): vscode.Uri => {
  const localDiskPath = vscode.Uri.joinPath(extensionUri, ...paths);
  return webview.asWebviewUri(localDiskPath);
};

export const getNonce = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const generateGroupList = (appsList: AppProps[], selectedGroup?: string, filterValue: string = ''): string => {
  const groupNames: string[] = [...new Set(appsList.map(app => app.groupNames).flat())];
  return groupNames.map((groupName) => {
    const app = appsList.find(app => app.groupNames.includes(groupName)) as AppProps;
    const isSelected = groupName === selectedGroup;
    const groupTags = appsList.filter(app => app.groupNames.includes(groupName)).map(app => app.tags || []).flat();
    const isHidden = filterValue && !groupTags?.some((tag) => tag.includes(filterValue));

    return `
      <li 
        data-switch-group="${groupName}" 
        data-switch-app="${app.appName}" 
        title="${app.description}" 
        role="button" 
        class="row g-0 app-card ${isSelected ? 'selected' : ''}"
        style="order: ${app.order}; display: ${isHidden ? "none" : "flex"};" 
      >
        <div class="col-3 text-center thumbnail p-2">
          <img src="${app.logoPath || "https://raw.githubusercontent.com/R35007/create-app-support/version_5.0.0/images/ca-logo.png"}" />
        </div>
        <div class="tags d-none">${groupTags?.join(',')}</div>
        <div class="col app-title p-2">${groupName}</div>
      </li>
    `;
  }).join('');
};

export const getInterpolateObject = (fields: object) => {
  const interpolateObject = {
    ...fields,
    "*": Object.values(fields).join(" ").trim(),
    get(...args: string[]) {
      return args.map((arg) => (this as any)[arg]).join(" ");
    },
    getExcept(...args: string[]) {
      return Object.entries(fields).filter(([key]) => !args.includes(key)).map(([, value]) => value).join(" ");
    },
  };

  return interpolateObject;
};

export const interpolate = (object: object, format: string) => {
  const keys = Object.keys(object);
  const values = Object.values(object);
  return new Function(...keys, `return \`${format}\`;`)(...values);
};

export const getCommand = (prefix = "", value: any = "", suffix = "") => (`${value}`.trim().length > 0 ? `${prefix}${value}${suffix}` : value);

export const toSanitizedCommand = (str: string) =>
  str
    .replace(/ +(?= )/g, "")
    .replace(/;/g, ";\n")
    .replace(/\n\s+/g, "\n")
    .replace(/\s*;\s*/g, ";\n")
    .replace(/\n+/g, "\n")
    .trim();
