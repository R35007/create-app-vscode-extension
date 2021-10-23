let installPrerequisites = "";
let initialCommand = "ng new"
let appId = 'hello-world';
let prefix = '';
let routing = '';
let stylesheetFormat = '';
let includeInlineStyles = '';
let includeInlineTemplate = '';
let learningPurpose = '';
let strict = '';
let packageManager = '';
let gitInit = '';
let skipInstall = '';
let openInVscode = '';

const $installPrerequisites = document.getElementById('install-prerequisites');
const $appId = document.getElementById('app-id');
const $prefix = document.getElementById('prefix');
const $routing = document.getElementById('routing');
const $stylesheetFormat = document.getElementById('stylesheet-format');
const $includeInlineStyles = document.getElementById('include-inline-styles');
const $includeInlineTemplate = document.getElementById('include-inline-template');
const $learningPurpose = document.getElementById('learning-purpose');
const $strict = document.getElementById('strict');
const $packageManager = document.getElementById('package-manager');
const $gitInit = document.getElementById('git-init');
const $skipInstall = document.getElementById('skip-install');
const $openInVscode = document.getElementById('open-in-vscode');

const setCommand = () => {
  const value = `${installPrerequisites} ${initialCommand} ${appId} ${prefix} ${routing} ${stylesheetFormat} ${includeInlineStyles} ${includeInlineTemplate}` +
    ` ${learningPurpose} ${strict} ${packageManager} ${gitInit} ${skipInstall} --defaults ${extras}; ${openInVscode}`;
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
  openInVscode = $openInVscode.value === 'yes' ? `cd ${appId}; code .;` : '';
  setCommand();
})

// Set Prefix
$prefix.addEventListener("input", function () {
  prefix = this.value ? `--prefix=${this.value}` : '';
  setCommand();
})

// Set Routing
$routing.addEventListener("change", function () {
  routing = this.value === "yes" ? `--routing` : '';
  setCommand();
})

// Set Style Sheet Format
$stylesheetFormat.addEventListener("change", function () {
  stylesheetFormat = this.value !== 'css' ? `--style=${this.value}` : '';
  setCommand();
})

// Set Include Inline Styles
$includeInlineStyles.addEventListener("change", function () {
  includeInlineStyles = this.value === 'yes' ? `--inline-style` : '';
  setCommand();
})

// Set Include Inline Template
$includeInlineTemplate.addEventListener("change", function () {
  includeInlineTemplate = this.value === 'yes' ? `--inline-template` : '';
  setCommand();
})

// Set Learning Purpose
$learningPurpose.addEventListener("change", function () {
  learningPurpose = this.value === 'yes' ? `--minimal` : '';
  setCommand();
})

// Set Learning Purpose
$strict.addEventListener("change", function () {
  strict = this.value !== 'yes' ? `--strict=false` : '';
  setCommand();
})

// Set Package Manager
$packageManager.addEventListener("change", function () {
  packageManager = this.value !== 'npm' ? `--package-manager=${this.value}` : '';
  setCommand();
})

// Set Git Init
$gitInit.addEventListener("change", function () {
  gitInit = this.value === 'no' ? `--skip-git` : '';
  setCommand();
})

// Set Skip Install
$skipInstall.addEventListener("change", function () {
  skipInstall = this.value === 'yes' ? `--skip-install` : '';
  setCommand();
})

// Set Open In VSCode
$openInVscode.addEventListener("change", function () {
  openInVscode = this.value === 'yes' ? `cd ${appId}; code .;` : '';
  setCommand();
})

const isValidConfiguration = () => {
  const _isValidAppId = isNotEmpty('row-app-id', appId) && isValidAppId('row-app-id', appId);
  const _isValidPrefix = isValidAppId('row-prefix', prefix.replace('--prefix=', '').trim());
  return _isValidAppId && _isValidPrefix;
}