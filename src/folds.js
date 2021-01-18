// provide hideJob wiring function
function hideJob (e) {
  let closeTarget = e.target.dataset.closer;
  // find the modal to close matching this data attr
  let closingModal = document.body.querySelector('[data-modal='+ closeTarget +']');
  if (typeof closingModal.close === "function") {
    closingModal.close();
    document.documentElement.classList.remove("modal-open");
    e.target.removeEventListener("click", hideJob);
    // after removing the dialog from the DOM
    const uri = window.location.toString();
    // adjust the URL params to disinclude the client param
    window.history.replaceState({}, document.title, uri.substring(0, uri.indexOf("?")));
  } else {
    console.error(
      "No modal to hide. Maybe your browser doesn't support the Dialog API."
    );
  }
}

// provide showJob wiring function
function showJob (e) {
  let triggerTarget = e.target.dataset.trigger;
  // console.log("triggerTarget is", triggerTarget);

  // find the openingModal matching this trigger's data
  let openingModal = document.body.querySelector("[data-modal=" + triggerTarget + "]");
  // console.log("openingModal is", openingModal);
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
    // also adjust url search params for two-way linkability
    window.history.pushState({}, '', `?client=${triggerTarget}`);
  } else {
    console.error(
      "No modal to show. Maybe your browser doesn't support the Dialog API."
    );
  }
}

function useFolds () {
  let triggers = document.getElementsByClassName("trigger");
  for (const trigger of triggers) {
    trigger.addEventListener("click", showJob);
  }

  const usp = new URLSearchParams(window.location.search);
  // console.log('// collect the search params from the URL', usp);
  const client = usp.get('client');
  // console.log('// if a client is mentioned', client);
  if (typeof client !== "undefined") {
    // console.log('// and there is a client dialog in the DOM');
    if (document.getElementById(client)) {
      const triggerEvent = {target: {dataset: {trigger: client}}}
      // console.log('// show the dialog corresponding to the client', triggerEvent);
      showJob(triggerEvent);
    }
  }
}

export default useFolds;
