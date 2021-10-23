let installPrerequisites = "";
let initialCommand = "create-react-app"
let appId = 'hello-world';
let template = '';
let packageManager = '';

const $installPrerequisites = document.getElementById('install-prerequisites');
const $appId = document.getElementById('app-id');
const $template = document.getElementById('template');
const $packageManager = document.getElementById('package-manager');

const setCommand = () => {
  const value = `${installPrerequisites} ${initialCommand} ${appId} ${template} ${packageManager} ${extras}`;
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

// Set App Id
$appId.addEventListener("input", function () {
  appId = this.value;
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

const isValidConfiguration = () => {
  const _isValidAppId = isNotEmpty('row-app-id', appId) && isValidAppId('row-app-id', appId);
  return _isValidAppId;
}