let installPrerequisites = "";
let initialCommand = "yo code --quick";
let extensionDisplayName = '--extensionDisplayName="Hello World"';
let extensionId = '--extensionId=hello-world';
let extensionDescription = '';
let extensionType = '--extensionType=ts';
let packageManager = '';
let webpack = '';
let gitInit = '--gitInit';
let skipInstall = '';
let openInVsCode = '';

const $installPrerequisites = document.getElementById('install-prerequisites');
const $extensionDisplayName = document.getElementById('extension-display-name');
const $extensionId = document.getElementById('extension-id');
const $extensionDescription = document.getElementById('extension-description');
const $extensionType = document.getElementById('extension-type');
const $packageManager = document.getElementById('package-manager');
const $webpack = document.getElementById('webpack');
const $gitInit = document.getElementById('git-init');
const $skipInstall = document.getElementById('skip-install');
const $openInVsCode = document.getElementById('open-in-vscode');

const setCommand = () => {
  const value = `${installPrerequisites} ${initialCommand} ${extensionId} ${extensionDisplayName} ${extensionDescription} ${extensionType}` +
    ` ${packageManager} ${webpack} ${gitInit} ${skipInstall} ${openInVsCode} ${extras}`;
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

// Set Extension Display Name
$extensionDisplayName.addEventListener("input", function () {
  if (this.value) {
    extensionDisplayName = `--extensionDisplayName="${this.value}"`;
    const _extensionId = this.value.toLowerCase().replace(/\s{2,}/g, ' ').replace(/\s/g, '-');
    extensionId = _extensionId ? `--extensionId=${_extensionId}` : '';
    $extensionId.value = _extensionId || '';
  } else {
    extensionDisplayName = '';
    extensionId = '';
    $extensionId.value = '';
  }
  setCommand();
})

// Set Extension Id
$extensionId.addEventListener("input", function () {
  extensionId = this.value ? `--extensionId=${this.value}` : '';
  setCommand();
})

// Set Extension Description
$extensionDescription.addEventListener("input", function () {
  extensionDescription = this.value ? `--extensionDescription="${this.value}"` : '';
  setCommand();
})

// Set Extension Type
$extensionType.addEventListener("change", function () {
  extensionType = `--extensionType=${this.value}`;
  setCommand();
})

// Set Package Manager
$packageManager.addEventListener("change", function () {
  packageManager = this.value !== 'npm' ? `--pkgManager=${this.value}` : '';
  setCommand();
})

// Set Webpack
$webpack.addEventListener("change", function () {
  webpack = this.value === 'yes' ? `--webpack` : '';
  setCommand();
})

// Set Git Init
$gitInit.addEventListener("change", function () {
  gitInit = this.value === 'yes' ? `--gitInit` : '';
  setCommand();
})

// Set Open in Vs Code
$skipInstall.addEventListener("change", function () {
  skipInstall = this.value === 'yes' ? `--skip-install` : '';
  setCommand();
})

// Set Open in Vs Code
$openInVsCode.addEventListener("change", function () {
  openInVsCode = this.value === 'yes' ? `--open` : '';
  setCommand();
})

const isValidConfiguration = () => {
  const _extensionId = extensionId.replace('--extensionId=', '').trim();
  const _extensionDisplayName = extensionDisplayName.replace('--extensionDisplayName=', '').replace('"', '').trim()

  const _isValidAppId = isNotEmpty('row-extension-id', _extensionId) && isValidAppId('row-extension-id', _extensionId);
  const _isValidDisplayName = isNotEmpty('row-extension-display-name', _extensionDisplayName);

  return _isValidAppId && _isValidDisplayName
}