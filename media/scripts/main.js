// eslint-disable-next-line no-undef
var vscode = acquireVsCodeApi();

let appFields = {};

let commandTemplate = "${fields['*']}";

const getCommand = (prefix = '', value = '', suffix = '') => (`${value}`.trim().length > 0 ? `${prefix}${value}${suffix}` : value);

const toSanitizedCommand = (str) =>
  str
    .replace(/ +(?= )/g, '')
    .replace(/;/g, ';\n')
    .replace(/\n\s+/g, '\n')
    .replace(/\s*;\s*/g, ';\n')
    .replace(/\n+/g, '\n')
    .trim();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function init(selectedApp, filterValue) {
  const $command = document.getElementById('command');
  const $copyCommand = document.getElementById('copy-command');
  const $execute = document.getElementById('execute');
  const $appFilterInput = document.getElementById('app-list-filter-input');
  const $appFolderLocationBtn = document.getElementById('app-folder-location-btn');
  const $appFolderLocation = document.getElementById('app-folder-location');
  const $copyConfigBtn = document.getElementById('copy-config');

  const setCommand = () => {
    const fields = Object.fromEntries(
      Object.entries(appFields).map(([key, props]) => [key, getCommand(props.prefix, props.value, props.suffix)])
    );
    return vscode.postMessage({
      action: 'get-command-template',
      object: { fields, execPath: $appFolderLocation.value },
      commandTemplate
    });
  };

  // Handle messages sent from the extension to the webview
  window.addEventListener('message', (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.action) {
      case 'set-location':
        appFields[message.name].value = message.value;
        document.querySelector(`[name="${message.name}"]`).value = message.value;
        setCommand();
        break;
      case 'set-app-location':
        $appFolderLocation.value = message.value;
        setCommand();
        break;
      case 'set-command-template':
        $command.value = toSanitizedCommand(message.value);
        break;
    }
  });

  // Set Default values
  commandTemplate = [].concat(selectedApp.commandTemplate || "${fields.get('*')}").join(' ');
  appFields = selectedApp.fields || {};
  filterValue = filterValue || '';
  setCommand();

  // Add event listeners for all textbox, browse, dropdown, radio fields
  document.querySelectorAll('#create-app-form .control').forEach((control) => {
    function onChangeHandler() {
      const fieldName = this.name;
      const fieldValue = `${this.value ?? ''}`?.trim();

      const $errorDiv = document.querySelector(`.${fieldName}-error`);

      if (appFields[fieldName].required && !fieldValue.length) {
        $execute.disabled = true;
        if ($errorDiv) $errorDiv.innerHTML = appFields[fieldName].errors.required || 'Required.';
        return;
      }

      if (fieldValue.length && appFields[fieldName].pattern && !new RegExp(appFields[fieldName].pattern).test(fieldValue)) {
        $execute.disabled = true;
        if ($errorDiv) $errorDiv.innerHTML = appFields[fieldName].errors.pattern || 'Invalid Pattern.';
        return;
      }

      $execute.disabled = false;
      if ($errorDiv) $errorDiv.innerHTML = '';
      appFields[fieldName].value = fieldValue;
      setCommand();
    }

    control.addEventListener('input', onChangeHandler);
    control.addEventListener('change', onChangeHandler);
  });

  // Add event listeners for all checkbox fields
  document.querySelectorAll('#create-app-form .control-checkbox').forEach((control) => {
    control.addEventListener('change', function () {
      appFields[this.name].value = this.checked ? (this.dataset.checkedValue ?? true) : (this.dataset.unCheckedValue ?? '');
      setCommand();
    });
  });

  // On Browse Button Click
  document.querySelectorAll('#create-app-form .browse-btn').forEach((browseButton) => {
    browseButton.addEventListener('click', function () {
      vscode.postMessage({ action: 'get-location', name: this.dataset.name });
    });
  });

  // On App location browse button click
  $appFolderLocationBtn.addEventListener('click', function () {
    vscode.postMessage({ action: 'get-location', isAppLocation: true });
  });

  // On App location change
  $appFolderLocation.addEventListener('input', function () {
    setCommand();
  });

  // On Click of additional Commands
  document.querySelectorAll('.additional-details-container .command-tag').forEach((tag) => {
    tag.addEventListener('click', function () {
      vscode.postMessage({
        action: 'execute-command',
        command: this.dataset.command
      });
    });
  });

  // On Copy config button click
  $copyConfigBtn.addEventListener('click', function () {
    vscode.postMessage({ action: 'copy-config' });
  });

  // On Click op Copy Button Copy Command
  $copyCommand.addEventListener('click', () => {
    vscode.postMessage({ action: 'copy-command', command: $command.value });
  });

  // On Click of Execute Button Execute Command
  $execute.addEventListener('click', function () {
    vscode.postMessage({
      action: 'execute-create-command',
      command: $command.value,
      location: $appFolderLocation.value
    });
  });

  // On App Switch
  document.querySelectorAll('[data-switch-app]').forEach((appCard) => {
    appCard.addEventListener('click', function () {
      vscode.postMessage({ action: 'switch-app', appName: this.dataset.switchApp, groupName: this.dataset.switchGroup, filterValue });
    });
    appCard.addEventListener('keydown', function (event) {
      const isEnterOrSpace = event.code === 'Enter' || event.code === 'Space';
      if (!isEnterOrSpace) return;
      vscode.postMessage({ action: 'switch-app', appName: this.dataset.switchApp, groupName: this.dataset.switchGroup, filterValue });
    });
  });

  document.getElementById('app-list-dropdown').addEventListener('change', function () {
    vscode.postMessage({ action: 'switch-app', appName: this.value, groupName: this.dataset.switchGroup, filterValue });
  });

  // On App Filter input
  $appFilterInput.addEventListener('input', () => {
    filterValue = $appFilterInput.value.toLowerCase();
    let count = 0;
    const appCards = document.querySelectorAll('#app-list .app-card');
    appCards.forEach((appCard) => {
      const tags = appCard.querySelector('.tags').innerText.split(',');
      const shouldHideCard = filterValue && !tags.some((tag) => tag.includes(filterValue));
      appCard.style.display = shouldHideCard ? 'none' : 'flex';
      if (!shouldHideCard) count++;
    });
    document.querySelector('.searchbox-wrapper #count').innerHTML = appCards.length === count ? count : `${count}/${appCards.length}`;
  });
}
