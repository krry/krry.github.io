document.addEventListener('DOMContentLoaded', () => {
    document
        .getElementById("filter_ctrl")
        .addEventListener("change", applyFilter);

    function applyFilter(e) {
        let fltr = e.target.value;
        if (!fltr) return false;
        let celloEl = document.getElementById("cello");
        let appliedFilters = celloEl.classList;
        // make sure it's a new filter
        if (appliedFilters.contains(fltr)) return true;
        let filterCtrl = document.getElementById("filter_ctrl");
        filterCtrl.value = fltr; // keep select in sync
        celloEl.classList.add(fltr); // apply the new filter
        for (let x of [...celloEl.classList]) {
            if (x !== "cello" && x !== fltr) {
                celloEl.classList.remove(x); // apply the new filter
            }
        }
    }
})
