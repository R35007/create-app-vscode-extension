let installPrerequisites = "";
let initialCommand = "expo init"
let appName = '--name="Hello World"';
let appId = 'hello-world';
let template = '';
let packageManager = '--npm';
let skipInstall = '';
let openInVscode = '';

const $installPrerequisites = document.getElementById('install-prerequisites');
const $appId = document.getElementById('app-id');
const $appName = document.getElementById('app-name');
const $template = document.getElementById('template');
const $packageManager = document.getElementById('package-manager');
const $skipInstall = document.getElementById('skip-install');
const $openInVscode = document.getElementById('open-in-vscode');

const setCommand = () => {
  const value = `${installPrerequisites} ${initialCommand} ${appId} ${appName}` +
    ` ${template} ${packageManager} ${skipInstall} --yes; ${openInVscode}`;
  const cleanCommand = value.replace(/\s{2,}/g, ' ') // replace all multiple spaces with single space
    .trim().split(';')
    .map(c => c.trim())
    .join(';\n');
  $command.value = cleanCommand;
}

// Set Initial Command
setCommand();

// Set Prerequisites
$installPrerequisites.addEventListener("change", function () {
  installPrerequisites = this.checked ? this.dataset.command : '';
  setCommand();
})

// Set App Id
$appId.addEventListener("input", function () {
  appId = this.value;
  openInVscode = $openInVscode.value === 'yes' ? `code ${appId};` : '';
  setCommand();
})

// Set App Display Name
$appName.addEventListener("input", function () {
  if (this.value) {
    appName = `--name="${this.value}"`;
    const _appId = this.value.toLowerCase().replace(/\s{2,}/g, ' ').replace(/\s/g, '-');
    appId = _appId;
    $appId.value = _appId;
    openInVscode = $openInVscode.value === 'yes' ? `code ${appId};` : '';
  } else {
    appName = '';
    appId = '';
    openInVscode = '';
    $appId.value = '';
  }

  appName = this.value ? `--name="${this.value}"` : '';
  setCommand();
})

// Set Template
$template.addEventListener("change", function () {
  template = this.value !== 'expo-template-blank' ? `--template=${this.value}` : '';
  setCommand();
})

// Set Package
$packageManager.addEventListener("change", function () {
  packageManager = `--${this.value}`
  setCommand();
})

// Skip Install
$skipInstall.addEventListener("change", function () {
  skipInstall = this.value === 'yes' ? `--no-install` : '';
  setCommand();
})

// Set Open In VSCode
$openInVscode.addEventListener("change", function () {
  openInVscode = this.value === 'yes' ? `code ${$appId.value};` : '';
  setCommand();
})

const isValidConfiguration = () => {
  const _isValidAppId = isNotEmpty('row-app-id', $appId.value) && isValidAppId('row-app-id', $appId.value);
  const _isValidAppName = isNotEmpty('row-app-name', $appName.value);
  return _isValidAppId && _isValidAppName;
}