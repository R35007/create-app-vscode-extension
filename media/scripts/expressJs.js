let installPrerequisites = "";
let initialCommand = "express"
let appId = 'hello-world';
let viewType = '';
let stylesheetFormat = '';
let addEjs = '';
let addHandlebar = '';
let addPug = '';
let addHogan = '';
let noViews = '';
let openInVscode = '';

const $installPrerequisites = document.getElementById('install-prerequisites');
const $appId = document.getElementById('app-id');
const $viewType = document.getElementById('view-type');
const $stylesheetFormat = document.getElementById('stylesheet-format');
const $addEjs = document.getElementById('add-ejs');
const $addHandlebar = document.getElementById('add-handlebar');
const $addPug = document.getElementById('add-pug');
const $addHogan = document.getElementById('add-hogan');
const $noViews = document.getElementById('no-views');
const $openInVscode = document.getElementById('open-in-vscode');

const setCommand = () => {
  const value = `${installPrerequisites} ${initialCommand} ${appId} ${viewType} ${stylesheetFormat} ${addEjs}` +
    ` ${addHandlebar} ${addPug} ${addHogan} ${noViews} --force ${extras}; ${openInVscode}`;
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

// Set View Type
$viewType.addEventListener("change", function () {
  viewType = this.value !== 'jade' ? `--view=${this.value}` : '';
  noViews = '';
  $noViews.value = 'no';
  setCommand();
})

// Set Stylesheet Format
$stylesheetFormat.addEventListener("change", function () {
  stylesheetFormat = this.value !== 'css' ? `--css=${this.value}` : '';
  setCommand();
})

// Set Ejs Support
$addEjs.addEventListener("change", function () {
  addEjs = this.value === 'yes' ? `--ejs` : '';
  setCommand();
})

// Set Handlebar Support
$addHandlebar.addEventListener("change", function () {
  addHandlebar = this.value === 'yes' ? `--hbs` : '';
  setCommand();
})

// Set Pug Support
$addPug.addEventListener("change", function () {
  addPug = this.value === 'yes' ? `--pug` : '';
  setCommand();
})

// Set Hogan Support
$addHogan.addEventListener("change", function () {
  addHogan = this.value === 'yes' ? `--hogan` : '';
  setCommand();
})

// Set No Views
$noViews.addEventListener("change", function () {
  if (this.value === "yes") {
    noViews = "--no-view";
    viewType = '';
  } else {
    noViews = "";
    const viewTypeValue = $viewType.value;
    viewType = viewTypeValue !== 'jade' ? `--view=${viewTypeValue}` : '';
  }
  setCommand();
})

// Set Open In VSCode
$openInVscode.addEventListener("change", function () {
  openInVscode = this.value === 'yes' ? `cd ${appId}; code .;` : '';
  setCommand();
})

const isValidConfiguration = () => {
  const _isValidAppId = isNotEmpty('row-app-id', appId) && isValidAppId('row-app-id', appId);
  return _isValidAppId
}