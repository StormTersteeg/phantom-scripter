let settings;
let theme_index = 0;
let scriptCounter = 0;
const theme_map = [
  ["#5773ff", "#fff"],
  ["#fc5e41", "#fff"],
  ["#ff4061", "#fff"],
  ["#000", "#fff"],
  ["#5773ff", "#32323d"],
  ["#932cb3", "#171c28"],
  ["#10a4fe", "#0d0e10"],
  ["#ff808f", "#1d1f3e"],
  ["#e41818", "#080808"],
  ["#f5abce", "#f6e2ee"],
  ["#FDFFD2", "#667BC6"],
  ["#FEFFD2", "#FFBF78"],
  ["#4A249D", "#009FBD"],
];

async function load_settings() {
  settings = await window.pywebview.api.get_settings();
  if (!settings.scripts) settings.scripts = {};

  // figure out the highest existing script index, and set scriptCounter accordingly
  let largestScriptIndex = -1;
  Object.keys(settings.scripts).forEach((id) => {
    const idx = parseInt(id.split("-")[1]);
    if (idx > largestScriptIndex) {
      largestScriptIndex = idx;
    }
  });
  scriptCounter = largestScriptIndex + 1;

  theme_index = settings.theme_index;
  setTheme(theme_map[theme_index]);

  // Create a row for each script found in settings
  Object.keys(settings.scripts).forEach((id) => {
    const data = settings.scripts[id];
    createScriptRow(id, data.command, data.type, data.input);
  });
}

window.addEventListener("pywebviewready", load_settings);

document.addEventListener("DOMContentLoaded", function () {
  const scriptsContainer = document.getElementById("scripts");
  const addButton = scriptsContainer.querySelector(
    "span.d-block.btn.app-title.shadow-none"
  );

  addButton.addEventListener("click", function () {
    const scriptId = "script-" + scriptCounter;
    createScriptRow(scriptId, "", "", "");
    scriptCounter++;
  });
});

function createScriptRow(scriptId, cmd = "", type = "", inputVal = "") {
  const scriptsContainer = document.getElementById("scripts");
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  rowDiv.style.marginBottom = "19px";

  const colDiv = document.createElement("div");
  colDiv.classList.add("col");
  colDiv.id = scriptId;

  const commandInput = document.createElement("input");
  commandInput.type = "text";
  commandInput.classList.add("form-control", "app-title", "px-2");
  commandInput.placeholder = "!your-command";
  commandInput.value = cmd;

  const actionSelect = document.createElement("select");
  actionSelect.classList.add("form-control", "app-title", "px-2");
  const blankOption = document.createElement("option");
  blankOption.textContent = "Select action";
  blankOption.disabled = true;
  const startFileOption = document.createElement("option");
  startFileOption.textContent = "Start file";
  const openLinkOption = document.createElement("option");
  openLinkOption.textContent = "Open link";
  const runCommandOption = document.createElement("option");
  runCommandOption.textContent = "Run command";
  const getRequestOption = document.createElement("option");
  getRequestOption.textContent = "GET request";
  const postRequestOption = document.createElement("option");
  postRequestOption.textContent = "POST request";
  const putRequestOption = document.createElement("option");
  putRequestOption.textContent = "PUT request";
  const deleteRequestOption = document.createElement("option");
  deleteRequestOption.textContent = "DELETE request";

  actionSelect.appendChild(blankOption);
  actionSelect.appendChild(startFileOption);
  actionSelect.appendChild(openLinkOption);
  actionSelect.appendChild(runCommandOption);
  actionSelect.appendChild(getRequestOption);
  actionSelect.appendChild(postRequestOption);
  actionSelect.appendChild(putRequestOption);
  actionSelect.appendChild(deleteRequestOption);
  actionSelect.value = type;

  const pathInput = document.createElement("input");
  pathInput.type = "text";
  pathInput.classList.add("form-control", "app-title", "px-2");
  pathInput.placeholder = "Input";
  pathInput.value = inputVal;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "app-title", "shadow-none", "rounded-0");
  deleteBtn.textContent = "Delete";

  // Build the UI
  colDiv.appendChild(commandInput);
  colDiv.appendChild(actionSelect);
  colDiv.appendChild(pathInput);
  colDiv.appendChild(deleteBtn);
  rowDiv.appendChild(colDiv);
  scriptsContainer.appendChild(rowDiv);

  // Select the first option if none is selected
  if (!type) {
    actionSelect.selectedIndex = 0;
  }

  // Make sure we have a place for this script in settings
  if (!settings.scripts[scriptId]) settings.scripts[scriptId] = {};

  // Wire up input changes
  commandInput.addEventListener("input", function () {
    settings.scripts[scriptId].command = commandInput.value;
    window.pywebview.api.save_settings(settings);
  });
  actionSelect.addEventListener("change", function () {
    settings.scripts[scriptId].type = actionSelect.value;
    window.pywebview.api.save_settings(settings);
  });
  pathInput.addEventListener("input", function () {
    settings.scripts[scriptId].input = pathInput.value;
    window.pywebview.api.save_settings(settings);
  });

  // Deleting this script
  deleteBtn.addEventListener("click", function () {
    scriptsContainer.removeChild(rowDiv);
    delete settings.scripts[scriptId];
    window.pywebview.api.save_settings(settings);
  });
}

function setTheme(theme) {
  document.documentElement.style.setProperty("--colour-primary", theme[0]);
  document.documentElement.style.setProperty("--colour-secondary", theme[1]);
}

function progressTheme() {
  theme_index = (theme_index + 1) % theme_map.length;
  setTheme(theme_map[theme_index]);
  settings.theme_index = theme_index;
  window.pywebview.api.save_settings(settings);
}

function swapIcon(elem) {
  if (elem.firstElementChild.innerHTML === "play_arrow") {
    elem.firstElementChild.innerHTML = "pause";
  } else {
    elem.firstElementChild.innerHTML = "play_arrow";
  }
}
