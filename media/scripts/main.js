var vscode = acquireVsCodeApi();

const $command = document.getElementById('command');

const $folder_location_textbox = document.getElementById('folder-location-textbox');
const $folder_location_button = document.getElementById('folder-location-button');

const $copyCommand = document.getElementById("copy-command")
const $execute = document.getElementById('execute');
const $appFilterInput = document.getElementById('app-list-filter-input');

// #region Form Manipulation

// Handle messages sent from the extension to the webview
window.addEventListener('message', event => {
  const message = event.data; // The json data that the extension sent
  switch (message.action) {
    case 'set-location':
      if (message.id === 'folder-location') {
        $folder_location_textbox.value = message.value;
      }
      break;
  }
});

// Set Folder Location
$folder_location_button.addEventListener("click", function () {
  vscode.postMessage({ action: 'get-location', id: `folder-location` });
})

// On Click op Copy Button Copy Command
$copyCommand.addEventListener("click", () => {
  vscode.postMessage({ action: 'copy-command', command: $command.value });
})

// On Click of Execute Button Execute Command
$execute.addEventListener("click", function () {
  if (!isValidConfiguration()) return;
  vscode.postMessage({
    action: 'execute-create-command',
    command: $command.value,
    location: $folder_location_textbox.value,
  });
})
// #endregion

// On App Switch
document.querySelectorAll('.app-card').forEach(appCard => {
  appCard.addEventListener('click', function () {
    vscode.postMessage({ action: 'switch-app', appName: this.id });
  })
})
document.getElementById("app-list-dropdown").addEventListener("change", function () {
  vscode.postMessage({ action: 'switch-app', appName: this.value });
})

// On App Filter input
$appFilterInput.addEventListener('input', () => {
  const filterValue = $appFilterInput.value.toLowerCase();
  document.querySelectorAll('#app-list .app-card').forEach(appCard => {
    const tags = appCard.querySelector('.tags').innerText.split(',');
    appCard.style.display = filterValue &&
      !tags.some(tag => tag.includes(filterValue)) ? 'none' : 'flex';
  })
})

// On Click of any Prerequisites or additional Commands
document.querySelectorAll(".additional-details-container .command-tag").forEach(tag => {
  tag.addEventListener("click", function () {
    vscode.postMessage({
      action: 'execute-command',
      command: this.dataset.command
    });
  })
})

// #region Form Validations

var isValidAppId = (rowId, value) => {
  if (/[^a-z0-9\-]/g.test(value)) {
    const validationMessage = 'Invalid. Can only have lowercase alphabets, numbers and minus (-). No spaces or special chars are allowed.'
    document.getElementById(rowId).querySelector(".error").innerHTML = validationMessage;
    return false;
  } else {
    document.getElementById(rowId).querySelector(".error").innerHTML = '';
    return true;
  }
}

var isNotEmpty = (rowId, value) => {
  if (value?.trim().length) {
    document.getElementById(rowId).querySelector(".error").innerHTML = '';
    return true;
  } else {
    const validationMessage = 'Required.'
    document.getElementById(rowId).querySelector(".error").innerHTML = validationMessage;
    return false;
  }
}

// #endregion