document.addEventListener('DOMContentLoaded', () => {
    // provide hideJob wiring function
    let hideJob = function hideJob(e) {
        let job = e.target.closest('.work-zoom');
        if (typeof job.close === "function") {
            job.close();
            document.documentElement.classList.remove('modal-open');
            e.target.removeEventListener('click', hideJob);
        } else {
            console.error("No modal to hide. Maybe your browser doesn't support the Dialog API.");
        }
    };
    // provide showJob wiring function
    let showJob = function(e) {
        // find the dialog adjacent to this trigger
        let dialog = e.target.nextElementSibling;
        if (typeof dialog.showModal === "function") {
            dialog.showModal();
            // let the <html> know to cushion for modality
            document.documentElement.classList.add('modal-open');
            // set <ESC> key to hide modal
            document.body.addEventListener("keydown", (e) => {
                if (e.keyCode === 27) {
                    document.documentElement.classList.remove("modal-open");
                }
            });
            // if showing dialog, wire hider
            dialog.querySelector('.closer').addEventListener("click", hideJob);
        } else {
            console.error("No modal to show. Maybe your browser doesn't support the Dialog API.");
        }
    };

    let triggers = document.getElementsByClassName("trigger");
    // wire triggers to show modal dialogs
    for (var i = 0; i < triggers.length; i++) {
        triggers[i].addEventListener("click", showJob);
    }
});
