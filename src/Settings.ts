import * as vscode from 'vscode';

export class Settings {
    static get iconsConfiguration() {
        return vscode.workspace.getConfiguration('font-awesome.settings');
    }
    static getSettings(key: string) {
        return Settings.iconsConfiguration.get(key);
    }
    static setSettings(key: string, val: any, isUser = true) {
        return Settings.iconsConfiguration.update(key, val, isUser);
    }
    static get pngDimensions() {
        return Settings.getSettings('pngDimensions') as { width: number, height: number };
    }
    static get fillColor() {
        return Settings.getSettings('fillColor') as string;
    }
    static get pngIconColor() {
        return Settings.getSettings('pngIconColor') as string;
    }
    static get customIconsArchivePath() {
        return Settings.getSettings('customIconsArchivePath') as string;
    }
    static get customIconsFolderPath() {
        return Settings.getSettings('customIconsFolderPath') as string;
    }
    static get customIcons() {
        return Settings.getSettings('customIcons') as string;
    }
    static get showSnippetSuggestion() {
        return Settings.getSettings('showSnippetSuggestion') as boolean;
    }
    static get copyOnClick() {
        return Settings.getSettings('copyOnClick') as boolean;
    }
    static get copySnippetAs() {
        return Settings.getSettings('copySnippetAs') as string;
    }
    static set copySnippetAs(value: string) {
        Settings.setSettings('copySnippetAs', value);
    }
    static get showIconName() {
        return Settings.getSettings('showIconName') as boolean;
    }
    static set showIconName(value: boolean) {
        Settings.setSettings('showIconName', value);
    }
    static get showIconInfo() {
        return Settings.getSettings('showIconSnippetTab') as boolean;
    }
    static set showIconInfo(value: boolean) {
        Settings.setSettings('showIconSnippetTab', value);
    }
    static get showCategoryBadge() {
        return Settings.getSettings('showCategoryBadge') as boolean;
    }
    static set showCategoryBadge(value: boolean) {
        Settings.setSettings('showCategoryBadge', value);
    }
    static get sortIconBy() {
        return Settings.getSettings('sortIconBy') as string;
    }
    static set sortIconBy(value: string) {
        Settings.setSettings('sortIconBy', value);
    }
}
