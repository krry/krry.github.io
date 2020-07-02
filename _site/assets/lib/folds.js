document.addEventListener('DOMContentLoaded', () => {
    var showJob = function(e) {
        var job;
        if (e.target.classList.contains("work-logo")) {
            job = e.target.parentElement.nextElementSibling;
        } else {
            job = e.target.nextElementSibling;
        }
        if (typeof job.showModal === "function") {
            job.showModal();
            document.documentElement.classList.add('modal-open');
            document.body.addEventListener("keydown", (e) => {if (e.keyCode === 27) {document.documentElement.classList.remove("modal-open");}});
        } else {
            console.error("Da dialog API ainnot supported by yo browsmo");
        }
    };

    var hideJob = function(e) {
        let job = e.target.parentElement.parentElement;
        if (typeof job.close === "function") {
            job.close();
            document.documentElement.classList.remove('modal-open');
        } else {
            console.error("Dialog API not supported by yo browsmo");
        }
    };

    let folders = document.getElementsByClassName("unfolder");
    for (var i = 0; i < folders.length; i++) {
        folders[i].addEventListener("click", showJob);
    }

    let closers = document.getElementsByClassName("closer");
    for (var i = 0; i < closers.length; i++) {
        closers[i].addEventListener("click", hideJob);
    }
});
