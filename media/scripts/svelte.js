let initialCommand = "npx degit sveltejs/template";
let appId = 'hello-world';
let useTypescript = '';
let openInVscode = '';

const $appId = document.getElementById('app-id');
const $useSvelteKit = document.getElementById('use-svelte-kit');
const $useTypescript = document.getElementById('use-typescript');
const $openInVscode = document.getElementById('open-in-vscode');

const setCommand = () => {
  const value = `${initialCommand} ${appId}; ${useTypescript} ${openInVscode}`;
  const cleanCommand = value.replace(/\s{2,}/g, ' ') // replace all multiple spaces with single space
    .trim().split(';')
    .map(c => c.trim())
    .join(';\n');
  $command.value = cleanCommand;
}

// Set Initial Command
setCommand();

// Switch to Svelte Kit
const setUseSvelteKit = () => {
  if ($useSvelteKit.value === 'yes') {
    initialCommand = "npm init svelte@next";
    $useTypescript.value = "no";
    useTypescript = '';
    $useTypescript.disabled = true;
  } else {
    initialCommand = "npx degit sveltejs/template";
    $useTypescript.disabled = false;
  }
  setOpenInVscode();
}

// Set Template
const setUseTypescript = () => {
  useTypescript = $useTypescript.value === 'yes' ? `cd ${$appId.value}; node scripts/setupTypeScript.js;` : '';
  setOpenInVscode();
}

// Set Open In VSCode
const setOpenInVscode = () => {
  openInVscode = $openInVscode.value === 'yes'
    ? $useTypescript.value === 'yes'
      ? `code .;`
      : `code ${$appId.value};`
    : '';
  setCommand();
}

// Set App Id
$appId.addEventListener("input", function () {
  appId = this.value;
  setUseTypescript();
})
$useSvelteKit.addEventListener("change", setUseSvelteKit);
$useTypescript.addEventListener("change", setUseTypescript);
$openInVscode.addEventListener("change", setOpenInVscode);



const isValidConfiguration = () => {
  const _isValidAppId = isNotEmpty('row-app-id', $appId.value) && isValidAppId('row-app-id', $appId.value);
  return _isValidAppId;
}