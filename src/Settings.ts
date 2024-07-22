import * as vscode from 'vscode';
import { AppProps } from './modal';

export class Settings {
  static get iconsConfiguration() {
    return vscode.workspace.getConfiguration('create-app.settings');
  }
  static getSettings(key: string) {
    return Settings.iconsConfiguration.get(key);
  }
  static setSettings(key: string, val: unknown, isUser = true) {
    return Settings.iconsConfiguration.update(key, val, isUser);
  }
  static get customAppPaths() {
    return Settings.getSettings('customAppPaths') as string[];
  }
  static get customApps() {
    return (Settings.getSettings('customApps') as Array<AppProps>) || [];
  }
  static get promptType() {
    return Settings.getSettings('quick.promptType') as 'Default' | 'Required' | 'None';
  }
  static get shouldPromptCommandString() {
    return Settings.getSettings('quick.promptCommandString') as boolean;
  }
  static get shouldPromptLocation() {
    return Settings.getSettings('quick.promptExecutionPath') as boolean;
  }
  static get shouldShowAppIcons() {
    return Settings.getSettings('interactive.showAppIcons') as boolean;
  }
  static get hiddenAppNames() {
    return (Settings.getSettings('hiddenApps') as string[]) || [];
  }
  static get hiddenGroupNames() {
    return (Settings.getSettings('hiddenGroups') as string[]) || [];
  }
  static get shouldGroupApps() {
    return Settings.getSettings('interactive.groupApps') as boolean;
  }
}
