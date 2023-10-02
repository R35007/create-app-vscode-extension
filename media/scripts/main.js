var vscode = acquireVsCodeApi();

let fieldProps = {};
let commandTemplate = "";
let prerequisites = "";

const getCommand = (prefix = "", value = "", suffix = "") => (`${value}`.trim().length > 0 ? `${prefix}${value}${suffix}` : value);

const hasValidValue = (e) => {
  if (e.target.pattern && !new RegExp(e.target.pattern).test(e.target.value)) return false;
  if (e.target.required && !`${e.target.value}`.length) return false;
  return true;
};

const toSanitizedCommand = (str) =>
  str
    .replace(/ +(?= )/g, "")
    .replace(/;/g, ";\n")
    .replace(/\n\s+/g, "\n")
    .replace(/\s*;\s*/g, ";\n")
    .replace(/\n+/g, "\n")
    .trim();

const setCommand = () => {
  const formValues = Object.fromEntries(
    Object.entries(fieldProps).map(([key, props]) => [key, getCommand(props.prefix, props.value, props.suffix)])
  );
  return vscode.postMessage({
    action: "get-command-template",
    formValues: { ...formValues, prerequisites },
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
      case "set-command-template":
        $command.value = toSanitizedCommand(message.value);
        break;
    }
  });

  // Set Default values
  commandTemplate = selectedApp.commandTemplate;
  fieldProps = selectedApp.fields;
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
      if (fieldName === "app-folder-location") return;

      if (fieldProps[fieldName].required && !`${fieldValue}`.length) {
        $execute.disabled = true;
        this.parentNode.parentNode.children[2].innerText = fieldProps[fieldName].errors.required || "Required.";
        return;
      }

      if (fieldProps[fieldName].pattern && !new RegExp(fieldProps[fieldName].pattern).test(fieldValue)) {
        $execute.disabled = true;
        this.parentNode.parentNode.children[2].innerText = fieldProps[fieldName].errors.pattern || "Invalid pattern.";
        return;
      }

      $execute.disabled = false;
      this.parentNode.parentNode.children[2].innerText = "";
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
