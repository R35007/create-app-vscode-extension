let installPrerequisites = "";
let initialCommand = "vue create"
let appId = 'hello-world';
let customPresetLocation = '';
let gitInit = '';
let packageManager = '';
let openInVscode = '';

const $installPrerequisites = document.getElementById('install-prerequisites');
const $appId = document.getElementById('app-id');
const $customPresetLocationTextbox = document.getElementById('custom-preset-location-textbox');
const $customPresetLocationButton = document.getElementById('custom-preset-location-button');
const $packageManager = document.getElementById('package-manager');
const $gitInit = document.getElementById('git-init');
const $openInVscode = document.getElementById('open-in-vscode');

const setCommand = () => {
  const value = `${installPrerequisites} ${initialCommand} ${appId} ${customPresetLocation || '--default'} ${gitInit} ${packageManager}; ${openInVscode}`;
  const cleanCommand = value.replace(/\s{2,}/g, ' ') // replace all multiple spaces with single space
    .trim().split(';')
    .map(c => c.trim())
    .join(';\n');
  $command.value = cleanCommand;
}

// Set Initial Command
setCommand();

// Handle messages sent from the extension to the webview
window.addEventListener('message', event => {
  const message = event.data; // The json data that the extension sent
  switch (message.action) {
    case 'set-location':
      if (message.id === 'custom-preset-location') {
        customPresetLocation = `--preset="${message.value}"`;
        $customPresetLocationTextbox.value = message.value;
        setCommand();
      }
      break;
  }
});

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

// Set Custom Preset location
$customPresetLocationButton.addEventListener("click", function () {
  vscode.postMessage({
    action: 'get-location',
    id: `custom-preset-location`,
    canSelectFolders: false,
    canSelectFiles: true,
    filters: {
      'JSON': ["json"]
    }
  });
})
$customPresetLocationTextbox.addEventListener("input", function () {
  customPresetLocation = this.value?.trim() ? `--preset="${this.value}"` : '--default';
  setCommand();
})

// Set Package
$packageManager.addEventListener("change", function () {
  packageManager = this.value !== 'npm' ? `--packageManager=${this.value}` : '';
  setCommand();
})

// Set Git Init
$gitInit.addEventListener("change", function () {
  gitInit = this.value !== 'yes' ? `--no-git` : '';
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