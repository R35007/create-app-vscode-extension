let installPrerequisites = "";
let initialCommand = "django-admin startproject"
let appId = 'hello-world';
let templatePath = '';
let fileExtensions = '--extension=py';
let fileNames = '';
let openInVscode = '';

const $installPrerequisites = document.getElementById('install-prerequisites');
const $appId = document.getElementById('app-id');
const $templatePathTextbox = document.getElementById('template-path-textbox');
const $templatePathButton = document.getElementById('template-path-button');
const $fileNames = document.getElementById('file-names');
const $fileExtensions = document.getElementById('file-extensions');
const $openInVscode = document.getElementById('open-in-vscode');

const setCommand = () => {
  const value = `${installPrerequisites} ${initialCommand} ${appId} ${templatePath} ${fileExtensions} ${fileNames}; ${openInVscode}`;
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
      if (message.id === 'template-path') {
        templatePath = `--template="${message.value}"`;
        $templatePathTextbox.value = message.value;
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
$templatePathButton.addEventListener("click", function () {
  vscode.postMessage({
    action: 'get-location',
    id: `template-path`,
    canSelectFolders: false,
    canSelectFiles: true,
    filters: {
      'Archive': ["tar.gz", "tar.bz2", "tar.xz", "tar.lzma", "tgz", "tbz2", "txz", "tlz", 'zip']
    }
  });
})
$templatePathTextbox.addEventListener("input", function () {
  templatePath = this.value?.trim() ? `--template="${this.value}"` : '';
  setCommand();
})

// Set File Extensions
$fileExtensions.addEventListener("input", function () {
  fileExtensions = this.value?.trim() ? `--extension=${this.value}` : '';
  setCommand();
})

// Set File Names
$fileNames.addEventListener("change", function () {
  fileNames = this.value?.trim() ? `--name=${this.value}` : '';
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