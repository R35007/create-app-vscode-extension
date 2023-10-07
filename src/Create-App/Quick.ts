import * as vscode from 'vscode';
import { Settings } from '../Settings';
import { FieldProps, FieldType } from '../modal';
import { getCommand, getInterpolateObject, interpolate, toSanitizedCommand } from '../utilities';
import { getAppsList } from '../utilities/getAppsList';
import { Command } from './Command';

export default class Quick {
    appsList = getAppsList();

    appName = '';
    totalSteps = 0;
    currentStep = 0;
    appFieldEntries: [string, FieldProps][] = [];
    appFields: Record<string, FieldProps> = {};
    exePath = vscode.workspace.workspaceFolders?.[0].uri;
    command = '';

    static async createApp() {
        new Quick();
    }

    constructor() {
        this.createApp();

    }

    pickAppName() {
        return vscode.window.showQuickPick(this.appsList.map(app => app.appName), {
            placeHolder: "Please Select a App",
            title: "Create App"
        });
    }

    async pickOptions([fieldName, fieldProps]: [string, FieldProps]) {
        if (!fieldProps.options?.length) {
            return vscode.window.showErrorMessage(`No Options for the field type ${fieldProps.type}. Please provide any options.`);
        };

        const pick = await vscode.window.showQuickPick(
            fieldProps.options.map(option => ({ label: option.label, picked: option.value === fieldProps.value })),
            {
                title: `Create ${this.appName} App ${this.currentStep}/${this.totalSteps}`,
                placeHolder: fieldProps.label || `Pick an option`,
            });

        if (pick === undefined) throw Error("return");

        this.appFields[fieldName].value = fieldProps.options.find(opt => opt.label === pick.label)?.value || fieldProps.value;
    }

    async pickToggleOptions([fieldName, fieldProps]: [string, FieldProps]) {
        const isChecked = `${fieldProps.value ?? ''}`.trim() !== (`${fieldProps.unCheckedValue ?? ''}`).trim() ? true : false;
        const pick = await vscode.window.showQuickPick(
            [{ label: "Yes", picked: isChecked }, { label: "No", picked: !isChecked }],
            {
                title: `Create ${this.appName} App ${this.currentStep}/${this.totalSteps}`,
                placeHolder: fieldProps.label || 'Pick a Yes or No',
            });

        if (pick === undefined) throw Error("return");

        this.appFields[fieldName].value = pick.label === "Yes" ? fieldProps.checkedValue as string ?? "true" : fieldProps.unCheckedValue;
    }

    async getLocation([fieldName, fieldProps]: [string, FieldProps]) {
        const savedPathUri = await vscode.window.showOpenDialog({
            defaultUri: vscode.workspace.workspaceFolders?.[0]?.uri,
            canSelectFiles: fieldProps.canSelectFile ?? true,
            canSelectFolders: fieldProps.canSelectFolder ?? true,
            canSelectMany: false,
            openLabel: fieldProps.label || "Please select a file or folder",
            title: `Create ${this.appName} App ${this.currentStep}/${this.totalSteps}`,
        });

        if (savedPathUri === undefined) throw Error("return");

        this.appFields[fieldName].value = savedPathUri?.[0].fsPath || fieldProps.value;
    }

    async getInput([fieldName, fieldProps]: [string, FieldProps]) {
        const value = await vscode.window.showInputBox({
            title: `Create ${this.appName} App ${this.currentStep}/${this.totalSteps}`,
            placeHolder: fieldProps.label || 'Please enter the value here',
            value: `${fieldProps.value || ''}`.trim() || '',
            validateInput: (value: string) => this.validator(value, fieldProps),
        });

        if (value === undefined) throw Error("return");

        this.appFields[fieldName].value = value || fieldProps.value;
    }

    async pickConfigs() {
        const config = this.appFieldEntries.shift();
        if (!config) return;

        const [, fieldProps] = config;

        this.currentStep += 1;

        if (([FieldType.DROPDOWN, FieldType.RADIO].includes(fieldProps.type as FieldType)) && fieldProps.options) await this.pickOptions(config);
        if (fieldProps.type === FieldType.CHECKBOX) await this.pickToggleOptions(config);
        if (fieldProps.type === FieldType.BROWSE) await this.getLocation(config);
        if (fieldProps.type === FieldType.TEXTBOX) await this.getInput(config);

        await this.pickConfigs();
    }

    async createApp() {
        try {
            const appName = await this.pickAppName();
            if (!appName) return;
            this.appName = appName;
            const selectedApp = this.appsList.find(app => app.appName === this.appName);
            this.appFields = selectedApp?.fields || {};

            this.appFieldEntries = Object.entries(this.appFields).filter(([, fieldProps]) => {
                if (Settings.promptType === "Default") return fieldProps.required || fieldProps.prompt;
                if (Settings.promptType === "Required") return fieldProps.required;
                return false;
            });

            this.totalSteps = this.appFieldEntries.length;
            this.totalSteps = Settings.shouldPromptLocation ? (this.totalSteps + 1) : this.totalSteps;
            this.totalSteps = Settings.shouldPromptCommandString ? (this.totalSteps + 1) : this.totalSteps;

            if (this.appFieldEntries.length) await this.pickConfigs();

            if (Settings.shouldPromptLocation) {
                this.currentStep += 1;

                const savedPathUri = await vscode.window.showOpenDialog({
                    defaultUri: this.exePath,
                    canSelectFiles: false,
                    canSelectFolders: true,
                    canSelectMany: false,
                    openLabel: "Please select the app folder",
                    title: this.totalSteps > 1 ? `Create ${this.appName} App ${this.currentStep}/${this.totalSteps}` : `Create ${this.appName} App`,
                });

                if (savedPathUri === undefined) throw Error("return");

                this.exePath = savedPathUri[0];
            }

            const fields = Object.fromEntries(Object.entries(this.appFields).map(([key, props]) => [key, getCommand(props.prefix, props.value, props.suffix)]));
            this.command = interpolate(getInterpolateObject(fields, this.exePath?.fsPath), ([] as any).concat(selectedApp?.commandTemplate || "${fields.get('*')}").join(" "));
            this.command = toSanitizedCommand(this.command);


            if (Settings.shouldPromptCommandString) {
                this.currentStep += 1;

                const value = await vscode.window.showInputBox({
                    placeHolder: "Please enter the command to execute",
                    prompt: "Please enter the command to execute",
                    title: this.totalSteps > 1 ? `Create ${this.appName} App ${this.currentStep}/${this.totalSteps}` : `Create ${this.appName} App`,
                    value: this.command,
                    validateInput: (value: string) => this.isEmpty(value) ? "Please enter a command to execute." : undefined,
                });

                if (value === undefined) throw Error("return");
                this.command = value;
            }

            const command = new Command(toSanitizedCommand(this.command), this.exePath?.fsPath || '', appName);
            command.executeCommand();
        } catch (err: any) {
            if (err.message === "return") return;

            if (err.message.includes('no defined')) {
                vscode.window.showErrorMessage(err.message + ". Please use ${fields.get('yourFieldName')} in the commandTemplate");
            } else {
                vscode.window.showErrorMessage(err.message + ". Please check the commandTemplate");
            }
        }
    }

    isEmpty = (value: string) => !`${value}`?.trim().length;
    isValidPattern = (value: string, pattern: string) => new RegExp(pattern).test(`${value}`?.trim());

    async validator(value: any, fieldProps: FieldProps) {
        const fieldValue = `${value}`?.trim();
        if (fieldProps.required && this.isEmpty(value)) return fieldProps.errors?.required || "Required";
        if (fieldValue.length && fieldProps.pattern && !this.isValidPattern(value, fieldProps.pattern)) return fieldProps.errors?.pattern || "Invalid Pattern.";
        return undefined;
    }

    shouldResume() {
        // Could show a notification with the option to resume.
        return new Promise<boolean>((resolve, reject) => {
            // noop
        });
    }
}
