// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Commands } from './modal';
import CreateApp from './Create-App/Create-App';
import { getWebviewOptions } from './Utilities';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "create-app" is now active!');
	const mySubs = context.subscriptions;

	mySubs.push(vscode.commands.registerCommand(Commands.CREATE_APP, () => {
		CreateApp.createOrShow(context.extensionUri);
	}));

	if (vscode.window.registerWebviewPanelSerializer) {
		// Make sure we register a serializer in activation event
		vscode.window.registerWebviewPanelSerializer(Commands.CREATE_APP, {
			async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, _state: any) {
				// Reset the webview options so we use latest uri for `localResourceRoots`.
				webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
				CreateApp.revive(webviewPanel, context.extensionUri);
			}
		});
	}
}

// this method is called when your extension is deactivated
export function deactivate() { }
