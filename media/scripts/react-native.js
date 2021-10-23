let installPrerequisites = "";
let initialCommand = "expo init --yes"
let appDisplayName = '--name="Hello World"';
let appId = 'hello-world';
let template = '';
let packageManager = '--npm';
let skipInstall = '';

const $installPrerequisites = document.getElementById('install-prerequisites');
const $appId = document.getElementById('app-id');
const $appDisplayName = document.getElementById('app-display-name');
const $template = document.getElementById('template');
const $packageManager = document.getElementById('package-manager');
const $skipInstall = document.getElementById('skip-install');

const setCommand = () => {
  const value = `${installPrerequisites} ${initialCommand} ${appId} ${appDisplayName} ${template} ${packageManager} ${skipInstall} ${extras}`;
  const cleanCommand = value.replace(/\s{2,}/g, ' '); // replace all multiple spaces with single space
  $command.value = cleanCommand.trim();
}

// Set Initial Command
setCommand();

// Set Prerequisites
$installPrerequisites.addEventListener("change", function () {
  installPrerequisites = this.checked ? this.dataset.command : '';
  setCommand();
})

// Set App Display Name
$appDisplayName.addEventListener("input", function () {
  if (this.value) {
    appDisplayName = `--name="${this.value}"`;
    const _appId = this.value.toLowerCase().replace(/\s{2,}/g, ' ').replace(/\s/g, '-');
    appId = _appId;
    $appId.value = _appId;
  } else {
    appDisplayName = '';
    appId = '';
    $appId.value = '';
  }

  appDisplayName = this.value ? `--name="${this.value}"` : '';
  setCommand();
})

// Set App Id
$appId.addEventListener("input", function () {
  appId = this.value;
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

const isValidConfiguration = () => {

  const _appDisplayName = appDisplayName.replace('--name=', '').replace('"', '');

  const _isValidAppId = isNotEmpty('row-app-id', appId) && isValidAppId('row-app-id', appId);
  const _isValidAppName = isNotEmpty('row-app-display-name', _appDisplayName) && isValidAppId('row-app-display-name', _appDisplayName);
  return _isValidAppId && _isValidAppName;
}