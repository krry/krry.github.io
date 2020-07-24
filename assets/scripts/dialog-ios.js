document.addEventListener("DOMContentLoaded", () => {
  var dialogs = document.querySelectorAll("dialog");

  for (const dialog of dialogs) {
    dialogPolyfill.registerDialog(dialog);
  }
});
