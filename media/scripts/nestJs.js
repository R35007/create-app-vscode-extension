let installPrerequisites = "";
let initialCommand = "nest new"
let appId = 'hello-world';
let language = '--language=javascript';
let strict = '';
let packageManager = '';
let gitInit = '';
let skipInstall = '';
let openInVscode = '';

const $installPrerequisites = document.getElementById('install-prerequisites');
const $appId = document.getElementById('app-id');
const $language = document.getElementById('language');
const $strict = document.getElementById('strict');
const $packageManager = document.getElementById('package-manager');
const $gitInit = document.getElementById('git-init');
const $skipInstall = document.getElementById('skip-install');
const $openInVscode = document.getElementById('open-in-vscode');

const setCommand = () => {
  const value = `${installPrerequisites} ${initialCommand} ${appId} ${language} ${strict}` +
    ` ${gitInit} ${skipInstall} ${packageManager}; ${openInVscode}`;
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

const setStrict = () => {
  strict = $strict.value === 'yes' && $language.value === "typescript" ? `--strict` : '';
  setCommand();
}

// Set Language
$language.addEventListener("change", function () {
  language = `--language=${this.value}`;
  if (this.value === 'javascript') {
    $strict.value = "no";
    $strict.disabled = true;
  } else {
    $strict.disabled = false;
  }
  setStrict();
})

// Set Strict
$strict.addEventListener("change", setStrict)

// Set Package
$packageManager.addEventListener("change", function () {
  packageManager = this.value === 'npm' ? `--npm` : '';
  setCommand();
})

// Set Git Init
$gitInit.addEventListener("change", function () {
  gitInit = this.value !== 'yes' ? `--skip-git` : '';
  setCommand();
})

// Set Git Init
$skipInstall.addEventListener("change", function () {
  skipInstall = this.value === 'yes' ? `--skip-install` : '';
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