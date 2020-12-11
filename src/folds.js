const folds = function () {
  // provide hideJob wiring function
  const hideJob = function hideJob(e) {
    let closeTarget = e.target.dataset.closer;
    // find the modal to close matching this data attr
    let closingModal = document.body.querySelector('[data-modal='+ closeTarget +']');
    if (typeof closingModal.close === "function") {
      closingModal.close();
      document.documentElement.classList.remove("modal-open");
      e.target.removeEventListener("click", hideJob);
    } else {
      console.error(
        "No modal to hide. Maybe your browser doesn't support the Dialog API."
      );
    }
  };
  // provide showJob wiring function
  const showJob = function(e) {
    let triggerTarget = e.target.dataset.trigger;
    console.log("triggerTarget is", triggerTarget);

    // find the openingModal matching this trigger's data
    let openingModal = document.body.querySelector("[data-modal=" + triggerTarget + "]");
    console.log("openingModal is", openingModal);
    document.body.appendChild(openingModal);

    if (typeof openingModal.showModal === "function") {
      openingModal.showModal();
      // let the <html> know to cushion for modality
      document.documentElement.classList.add("modal-open");
      // set <ESC> key to hide modal
      document.body.addEventListener("keydown", function escapeTheModal(e) {
        if (e.key === "Escape") {
          document.documentElement.classList.remove("modal-open");
        }
        document.body.removeEventListener("keydown", escapeTheModal);
      });
      // if showing openingModal, wire hider
      openingModal.querySelector(".closer").addEventListener("click", hideJob);
    } else {
      console.error(
        "No modal to show. Maybe your browser doesn't support the Dialog API."
      );
    }
  };

  let triggers = document.getElementsByClassName("trigger");
  for (const trigger of triggers) {
    trigger.addEventListener("click", showJob);
  }
};

export default folds;
