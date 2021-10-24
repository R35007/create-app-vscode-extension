let installPrerequisites = "";
let initialCommand = "ionic start"
let appName = '"Hello World"';
let appId = '--project-id=hello-world';
let type = '--type=angular'
let template = 'tabs';
let includeCapacitor = '';
let includeCordova = '';
let gitInit = '--gitInit';
let skipInstall = '';
let openInVscode = '';

const $installPrerequisites = document.getElementById('install-prerequisites');
const $appName = document.getElementById('app-name');
const $appId = document.getElementById('app-id');
const $type = document.getElementById('type');
const $template = document.getElementById('template');
const $includeCapacitor = document.getElementById('include-capacitor');
const $includeCordova = document.getElementById('include-cordova');
const $gitInit = document.getElementById('git-init');
const $skipInstall = document.getElementById('skip-install');
const $openInVscode = document.getElementById('open-in-vscode');

const setCommand = () => {
  const value = `${installPrerequisites} ${initialCommand} ${appName} ${appId} ${type}` +
    ` ${template} ${includeCapacitor} ${includeCordova} ${gitInit} ${skipInstall}; ${openInVscode}`;
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

  if (this.checked) {
    const appType = type.replace("--type=", '').trim();
    const [ionicCli, angularCli, vueCli, reactCli] = this.dataset.command.split(';');
    const prereq = [ionicCli];

    appType === 'angular' && prereq.push(angularCli);
    appType === 'ionic-angular' && prereq.push(angularCli);
    appType === 'vue' && prereq.push(vueCli);
    appType === 'react' && prereq.push(reactCli);

    installPrerequisites = prereq.join('; ') + "; ";
  } else {
    installPrerequisites = '';
  }
  setCommand();
})

// Set Extension Id
$appId.addEventListener("input", function () {
  appId = this.value ? `--project-id=${this.value}` : '';
  openInVscode = $openInVscode.value === 'yes' ? `code ${this.value};` : '';
  setCommand();
})

// Set Extension Display Name
$appName.addEventListener("input", function () {
  if (this.value) {
    appName = `"${this.value}"`;
    const _appId = this.value.toLowerCase().replace(/\s{2,}/g, ' ').replace(/\s/g, '-');
    appId = _appId ? `--project-id=${_appId}` : '';
    $appId.value = _appId;
    openInVscode = $openInVscode.value === 'yes' ? `code ${_appId};` : '';
  } else {
    appName = '';
    appId = '';
    openInVscode = '';
    $appId.value = '';
  }
  setCommand();
})


// Set Type
$type.addEventListener("change", function () {
  type = `--type=${this.value}`;

  if ($installPrerequisites.checked) {
    const [ionicCli, angularCli, vueCli, reactCli] = $installPrerequisites.dataset.command.split(';');
    const prereq = [ionicCli];

    this.value === 'angular' && prereq.push(angularCli);
    this.value === 'ionic-angular' && prereq.push(angularCli);
    this.value === 'vue' && prereq.push(vueCli);
    this.value === 'react' && prereq.push(reactCli);

    installPrerequisites = prereq.join('; ') + "; ";
  }

  setCommand();
})

// Set Template
$template.addEventListener("change", function () {
  template = `${this.value}`;
  setCommand();
})

// Set Include Capacitor
$includeCapacitor.addEventListener("change", function () {
  includeCapacitor = this.value === 'yes' ? `--capacitor` : '';
  setCommand();
})

// Set Include Cordova
$includeCordova.addEventListener("change", function () {
  includeCordova = this.value === 'yes' ? `--cordova` : '';
  setCommand();
})

// Set Git Init
$gitInit.addEventListener("change", function () {
  gitInit = this.value !== 'yes' ? `--no-git` : '';
  setCommand();
})

// Set Open in Vs Code
$skipInstall.addEventListener("change", function () {
  skipInstall = this.value === 'yes' ? `--no-deps` : '';
  setCommand();
})

// Set Open In VSCode
$openInVscode.addEventListener("change", function () {
  openInVscode = this.value === 'yes' ? `code ${$appId.value};` : '';
  setCommand();
})

const isValidConfiguration = () => {
  const _isValidDisplayName = isNotEmpty('row-app-name', $appName.value) && isNotEmpty('row-app-name', $appName.value);
  const _isValidAppId = isNotEmpty('row-app-id', $appId.value) && isValidAppId('row-app-id', $appId.value);
  return _isValidAppId && _isValidDisplayName;
}