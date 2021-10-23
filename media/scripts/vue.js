let installPrerequisites = "";
let initialCommand = "vue create"
let appId = 'hello-world';
let defaultPreset = '--default';
let customPresetLocation = '';
let gitInit = '';
let packageManager = '';

const $installPrerequisites = document.getElementById('install-prerequisites');
const $appId = document.getElementById('app-id');
const $defaultPreset = document.getElementById('default-preset');
const $customPresetLocationTextbox = document.getElementById('custom-preset-location-textbox');
const $customPresetLocationButton = document.getElementById('custom-preset-location-button');
const $packageManager = document.getElementById('package-manager');
const $gitInit = document.getElementById('git-init');

const setCommand = () => {
  const value = `${installPrerequisites} ${initialCommand} ${appId} ${defaultPreset} ${customPresetLocation} ${gitInit} ${packageManager} ${extras}`;
  const cleanCommand = value.replace(/\s{2,}/g, ' '); // replace all multiple spaces with single space
  $command.value = cleanCommand.trim();
}

// Set Initial Command
setCommand();

// Handle messages sent from the extension to the webview
window.addEventListener('message', event => {
  const message = event.data; // The json data that the extension sent
  switch (message.action) {
    case 'set-location':
      if (message.id === 'custom-preset-location') {
        defaultPreset = '';
        $defaultPreset.value = 'no';
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
  setCommand();
})

// Set Default Preset
$defaultPreset.addEventListener("change", function () {
  if (this.value === 'yes') {
    defaultPreset = '--default';
    customPresetLocation = '';
    $customPresetLocationTextbox.value = '';
  } else {
    defaultPreset = '';
  }
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
  if (this.value) {
    defaultPreset = '';
    $defaultPreset.value = 'no';
    customPresetLocation = `--preset="${this.value}"`;
  } else {
    defaultPreset = '--default';
    $defaultPreset.value = 'yes';
    customPresetLocation = ''
  }
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

const isValidConfiguration = () => {
  const _isValidAppId = isNotEmpty('row-app-id', appId) && isValidAppId('row-app-id', appId);
  return _isValidAppId;
}