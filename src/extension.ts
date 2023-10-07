// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Interactive from './Create-App/Interactive';
import Quick from './Create-App/Quick';
import { Commands } from './modal';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	;

	context.subscriptions.push(vscode.commands.registerCommand(Commands.CREATE_APP_INTERACTIVE, () => {
		Interactive.createOrShow(context.extensionUri);
	}));

	context.subscriptions.push(vscode.commands.registerCommand(Commands.CREATE_APP_QUICK, async () => {
		Quick.createApp();
	}));
}

// this method is called when your extension is deactivated
export function deactivate() { }
