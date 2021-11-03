let initialCommand = "npx create-react-app"
let appId = 'hello-world';
let template = '';
let packageManager = '';
let openInVscode = '';

const $appId = document.getElementById('app-id');
const $template = document.getElementById('template');
const $packageManager = document.getElementById('package-manager');
const $openInVscode = document.getElementById('open-in-vscode');

const setCommand = () => {
  const value = `${initialCommand} ${appId} ${template} ${packageManager}; ${openInVscode}`;
  const cleanCommand = value.replace(/\s{2,}/g, ' ') // replace all multiple spaces with single space
    .trim().split(';')
    .map(c => c.trim())
    .join(';\n');
  $command.value = cleanCommand;
}

// Set Initial Command
setCommand();

// Set App Id
$appId.addEventListener("input", function () {
  appId = this.value;
  openInVscode = $openInVscode.value === 'yes' ? `code ${appId};` : '';
  setCommand();
})

// Set Template
$template.addEventListener("change", function () {
  template = this.value !== 'javascript' ? `--template=${this.value}` : '';
  setCommand();
})

// Set Package
$packageManager.addEventListener("change", function () {
  packageManager = this.value !== 'yarn' ? `--use-${this.value}` : '';
  setCommand();
})

// Set Open In VSCode
$openInVscode.addEventListener("change", function () {
  openInVscode = this.value === 'yes' ? `code ${$appId.value};` : '';
  setCommand();
})

const isValidConfiguration = () => {
  const _isValidAppId = isNotEmpty('row-app-id', $appId.value) && isValidAppId('row-app-id', $appId.value);
  return _isValidAppId;
}