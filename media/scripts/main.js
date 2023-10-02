var vscode = acquireVsCodeApi();

let fieldProps = {};
let commandTemplate = "${fields['*']}";
let prerequisites = "";

const getCommand = (prefix = "", value = "", suffix = "") => (`${value}`.trim().length > 0 ? `${prefix}${value}${suffix}` : value);

const toSanitizedCommand = (str) =>
  str
    .replace(/ +(?= )/g, "")
    .replace(/;/g, ";\n")
    .replace(/\n\s+/g, "\n")
    .replace(/\s*;\s*/g, ";\n")
    .replace(/\n+/g, "\n")
    .trim();

const setCommand = () => {
  const fields = Object.fromEntries(
    Object.entries(fieldProps).map(([key, props]) => [key, getCommand(props.prefix, props.value, props.suffix)])
  );
  return vscode.postMessage({
    action: "get-command-template",
    formValues: { fields: { ...fields, "*": Object.values(fields).join(" ").trim() }, prerequisites },
    commandTemplate: `${prerequisites}${commandTemplate}`,
  });
};

function init(selectedApp) {
  const $command = document.getElementById("command");
  const $installPrerequisites = document.getElementById("install-prerequisites");
  const $copyCommand = document.getElementById("copy-command");
  const $execute = document.getElementById("execute");
  const $appFilterInput = document.getElementById("app-list-filter-input");
  const $appFolderLocationBtn = document.getElementById("app-folder-location-btn");
  const $appFolderLocation = document.getElementById("app-folder-location");
  const $copyJsonBtn = document.getElementById("copy-json");

  // Handle messages sent from the extension to the webview
  window.addEventListener("message", (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.action) {
      case "set-location":
        fieldProps[message.name].value = message.value;
        document.querySelector(`[name="${message.name}"]`).value = message.value;
        setCommand();
        break;
      case "set-app-location":
        $appFolderLocation.value = message.value;
        break;
      case "set-command-template":
        $command.value = toSanitizedCommand(message.value);
        break;
    }
  });

  // Set Default values
  commandTemplate = selectedApp.commandTemplate || "${fields['*']}";
  fieldProps = selectedApp.fields || {};
  setCommand();

  // Set Prerequisites
  $installPrerequisites?.addEventListener("change", function () {
    if (!selectedApp.prerequisites?.some((item) => item.command)) return;

    prerequisites = this.checked
      ? selectedApp.prerequisites
          ?.filter((preReq) => preReq.command)
          .map((preReq) => preReq.command)
          .join(";") + ";"
      : "";

    setCommand();
  });

  document.querySelectorAll("#create-app-form .control").forEach((control) => {
    function onChangeHandler(e) {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;

      const $errorDiv = document.querySelector(`.${fieldName}-error`);

      if (fieldProps[fieldName].required && !`${fieldValue}`.length) {
        $execute.disabled = true;
        if ($errorDiv) $errorDiv.innerHTML = fieldProps[fieldName].errors.required || "Required.";
        return;
      }

      if (`${fieldValue}`.length && fieldProps[fieldName].pattern && !new RegExp(fieldProps[fieldName].pattern).test(fieldValue)) {
        $execute.disabled = true;
        if ($errorDiv) $errorDiv.innerHTML = fieldProps[fieldName].errors.pattern || "Invalid Pattern.";
        return;
      }

      $execute.disabled = false;
      if ($errorDiv) $errorDiv.innerHTML = "";
      fieldProps[e.target.name].value = fieldValue;
      setCommand();
    }

    control.addEventListener("input", onChangeHandler);
    control.addEventListener("change", onChangeHandler);
  });

  // On Browse Button Click
  document.querySelectorAll("#create-app-form .browse-btn").forEach((browseButton) => {
    browseButton.addEventListener("click", function () {
      vscode.postMessage({ action: "get-location", name: this.dataset.name });
    });
  });

  // On Copy json button click
  $copyJsonBtn.addEventListener("click", function () {
    vscode.postMessage({ action: "copy-json" });
  });

  // On App location browse button click
  $appFolderLocationBtn.addEventListener("click", function () {
    vscode.postMessage({ action: "get-location", isAppLocation: true });
  });

  // On Click of additional Commands
  document.querySelectorAll(".additional-details-container .command-tag").forEach((tag) => {
    tag.addEventListener("click", function () {
      vscode.postMessage({
        action: "execute-command",
        command: this.dataset.command,
      });
    });
  });

  // On Click op Copy Button Copy Command
  $copyCommand.addEventListener("click", () => {
    vscode.postMessage({ action: "copy-command", command: $command.value });
  });

  // On Click of Execute Button Execute Command
  $execute.addEventListener("click", function () {
    vscode.postMessage({
      action: "execute-create-command",
      command: $command.value,
      location: $appFolderLocation.value,
    });
  });

  // On App Switch
  document.querySelectorAll(".app-card").forEach((appCard) => {
    appCard.addEventListener("click", function () {
      vscode.postMessage({ action: "switch-app", appName: this.id });
    });
  });

  document.getElementById("app-list-dropdown").addEventListener("change", function () {
    vscode.postMessage({ action: "switch-app", appName: this.value });
  });

  // On App Filter input
  $appFilterInput.addEventListener("input", () => {
    const filterValue = $appFilterInput.value.toLowerCase();
    document.querySelectorAll("#app-list .app-card").forEach((appCard) => {
      const tags = appCard.querySelector(".tags").innerText.split(",");
      appCard.style.display = filterValue && !tags.some((tag) => tag.includes(filterValue)) ? "none" : "flex";
    });
  });
}
