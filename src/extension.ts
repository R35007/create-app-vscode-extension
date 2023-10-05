// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Command } from './Create-App/Command';
import CreateApp from './Create-App/Create-App';
import { getAppsList } from './Create-App/Get-Apps-List';
import { Commands, FieldType } from './modal';
import { getCommand, getInterpolateObject, interpolate, toSanitizedCommand } from './utilities';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const appsList = getAppsList();

	context.subscriptions.push(vscode.commands.registerCommand(Commands.CREATE_APP_INTERACTIVE, () => {
		CreateApp.createOrShow(context.extensionUri, appsList);
	}));

	context.subscriptions.push(vscode.commands.registerCommand(Commands.CREATE_APP_QUICK, async () => {
		const appName = await vscode.window.showQuickPick(appsList.map(app => app.appName), {
			placeHolder: "Please Select a App",
			title: "Create App"
		});
		if (!appName) return;

		const selectedApp = appsList.find(app => app.appName === appName);
		const appFields = selectedApp?.fields || {};

		const fieldsToAsk = Object.entries(appFields).filter(([key, fieldProps]) => fieldProps.required || fieldProps.prompt);

		for (let [fieldName, fieldProps] of fieldsToAsk) {
			if ((fieldProps.type === FieldType.DROPDOWN || fieldProps.type === FieldType.RADIO) && fieldProps.options) {
				const selectedOption = await vscode.window.showQuickPick(
					fieldProps.options.map(option => ({ label: option.label, value: option.value })),
					{ placeHolder: fieldProps.label, title: appName }
				);
				if (!selectedOption) return;
				appFields[fieldName].value = selectedOption?.value || fieldProps.value;
				continue;
			}

			if (fieldProps.type === FieldType.BROWSE) {
				const savedPathUri = await vscode.window.showOpenDialog({
					canSelectFiles: fieldProps.canSelectFile ?? true,
					canSelectFolders: fieldProps.canSelectFolder ?? true,
					canSelectMany: false,
					openLabel: fieldProps.label,
					title: appName
				});
				if (!savedPathUri) return;
				appFields[fieldName].value = savedPathUri?.[0].fsPath || fieldProps.value;
				continue;
			}

			if (fieldProps.type === FieldType.CHECKBOX) {
				const value = await vscode.window.showQuickPick(
					[{ label: "Yes" }, { label: "No" }],
					{ placeHolder: fieldProps.label, title: appName }
				);
				if (!value) return;
				appFields[fieldName].value = value?.label === "Yes" ? fieldProps.checkedValue as string ?? "true" : fieldProps.unCheckedValue as string;
				continue;
			}

			const value = await vscode.window.showInputBox({
				placeHolder: fieldProps.label,
				title: appName,
				value: fieldProps.value as string,
				validateInput: (value) => {
					if (fieldProps.required && !`${value}`.length) {
						return fieldProps.errors?.required || "Required";
					}
					if (`${value}`.length && fieldProps.pattern && !new RegExp(fieldProps.pattern).test(value)) {
						return fieldProps.errors?.pattern || "Invalid Pattern.";
					}
					return null;
				}
			});
			if (!value) return;
			appFields[fieldName].value = value || fieldProps.value;
		}

		const shouldBrowse = await vscode.window.showQuickPick(
			[{ label: "No", picked: true }, { label: "Yes" }],
			{ title: 'Browse Folder to create a app', placeHolder: "Please select No to create app in the active workspace folder" }
		);

		if (!shouldBrowse) return;

		let createAppLocation = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || "./";

		if (shouldBrowse?.label === 'Yes') {
			const savedPathUri = await vscode.window.showOpenDialog({
				defaultUri: vscode.workspace.workspaceFolders?.[0]?.uri,
				canSelectFiles: false,
				canSelectFolders: true,
				canSelectMany: false,
				openLabel: 'Select Folder',
				title: "Create App Location"
			});

			if (!savedPathUri) return;

			createAppLocation = savedPathUri?.[0].fsPath || createAppLocation;
		}

		const fields = Object.fromEntries(Object.entries(appFields).map(([key, props]) => [key, getCommand(props.prefix, props.value, props.suffix)]));

		const commandStr = interpolate({ fields: getInterpolateObject(fields) }, ([] as any).concat(selectedApp?.commandTemplate || "${fields.get('*')}").join(" "));
		const command = new Command(toSanitizedCommand(commandStr), createAppLocation, appName);
		command.executeCommand();
	}));
}

// this method is called when your extension is deactivated
export function deactivate() { }
