let initialCommand = "npx gatsby new"
let appId = 'hello-world';
let templatePath = '';
let openInVscode = '';

const $appId = document.getElementById('app-id');
const $templatePath = document.getElementById('template-path');
const $openInVscode = document.getElementById('open-in-vscode');

const setCommand = () => {
  const value = `${initialCommand} ${appId} ${templatePath}; ${openInVscode}`;
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

// Set App Id
$appId.addEventListener("input", function () {
  appId = this.value;
  openInVscode = $openInVscode.value === 'yes' ? `code ${appId};` : '';
  setCommand();
})

// Set Custom Preset location
$templatePath.addEventListener("input", function () {
  templatePath = this.value;
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