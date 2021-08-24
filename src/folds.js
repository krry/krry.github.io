let scrollPosition

function jumpBackToPrevPos() {
	document.documentElement.style.scrollBehavior = 'auto'
	// return the document to its previous scroll point
	console.log('resuming scrollPosition', scrollPosition)
	document.documentElement.scrollTop = scrollPosition
	document.documentElement.style.scrollBehavior = 'smooth'
}

function adjustUrlWithModal() {
	// after removing the dialog from the DOM
	const uri = window.location.toString()
	// adjust the URL params to disinclude the project param
	window.history.replaceState({}, document.title, uri.substring(0, uri.indexOf('?')))
}

// provide hideJob wiring function
function hideJob(e) {
	let closeTarget = e.target.dataset.closer
	// find the modal to close matching this data attr
	let closingModal = document.body.querySelector('[data-modal=' + closeTarget + ']')
	if (typeof closingModal.close === 'function') {
		e.target.removeEventListener('click', hideJob)
		closeModal(closingModal)
	} else {
		console.error("No modal to hide. Maybe your browser doesn't support the Dialog API.")
	}
}

function closeModal(target) {
	target.close()
	document.documentElement.classList.remove('modal-open')
	jumpBackToPrevPos()
	adjustUrlWithModal()
}

// provide showJob wiring function
function showJob(e) {
	let triggerTarget = e.target.dataset.trigger
	// console.log("triggerTarget is", triggerTarget);

	// find the openingModal matching this trigger's data
	let openingModal = document.body.querySelector('[data-modal=' + triggerTarget + ']')
	// console.log("openingModal is", openingModal);
	document.body.appendChild(openingModal)
	scrollPosition = document.documentElement.scrollTop
	console.log('preserving scrollPosition', scrollPosition)
	if (typeof openingModal.showModal === 'function') {
		openingModal.showModal()
		// let the <html> know to cushion for modality
		document.documentElement.classList.add('modal-open')
		// start at the top of the job modal
		document.getElementById(triggerTarget).scrollTop = 0
		// set <ESC> key to hide modal
		document.body.addEventListener('keydown', function escapeTheModal(e) {
			if (e.key === 'Escape') {
				closeModal(openingModal)
			}
			document.body.removeEventListener('keydown', escapeTheModal)
		})
		// if showing openingModal, wire hider
		openingModal.querySelector('.closer').addEventListener('click', hideJob)
		// also adjust url search params for two-way linkability
		window.history.pushState({}, '', `?project=${triggerTarget}`)
	} else {
		console.error("No modal to show. Maybe your browser doesn't support the Dialog API.")
	}
}

function useFolds() {
	let triggers = document.getElementsByClassName('trigger')
	for (const trigger of triggers) {
		trigger.addEventListener('click', showJob)
	}

	const usp = new URLSearchParams(window.location.search)
	// console.log('// collect the search params from the URL', usp);
	const project = usp.get('project')
	// console.log('// if a project is mentioned', project);
	if (typeof project !== 'undefined') {
		// console.log('// and there is a project dialog in the DOM');
		if (document.getElementById(project)) {
			const triggerEvent = {target: {dataset: {trigger: project}}}
			// console.log('// show the dialog corresponding to the project', triggerEvent);
			showJob(triggerEvent)
		}
	}
}

export default useFolds
