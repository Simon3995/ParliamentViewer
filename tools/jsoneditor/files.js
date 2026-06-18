// export current party and parliament lists to JSON file
function exportJSON() {
	if (!verify_data()) return;

	const partiesObj = {};
	for (const p of parties.filter(Boolean)) {
		const { id, ...rest } = p;
		if (rest.foundedBy) rest.foundedBy = rest.foundedBy.map(i => parties[i]?.id).filter(Boolean);
		if (rest.splitFrom) rest.splitFrom = rest.splitFrom.map(i => parties[i]?.id).filter(Boolean);
		if (rest.established != null) rest.established = plms[rest.established]?.name ?? null;
		partiesObj[id] = rest;
	}

	const obj = {
		name:        document.getElementById('name').value,
		title:       document.getElementById('title').value,
		country:     document.getElementById('country').value,
		parties:     partiesObj,
		parliaments: plms.filter(Boolean).map(q => ({
			...q,
			fractions: (q.fractions || [])
				.filter(f => f.id !== null)
				.map(f => ({ ...f, id: parties[f.id]?.id ?? null}))
				.filter(f => f.id !== null)
		}))
	};

	const a = document.createElement('a');
	a.href = URL.createObjectURL(new Blob([JSON.stringify(obj, 1, 1)], { type: 'application/json' }));
	a.download = (obj.name || 'parliament') + '.json';
	a.click();
}

function verify_data() {
	const errors = [];

	// check general info
	if (!document.getElementById('name').value)
		errors.push("General info: Missing name");
	if (!document.getElementById('title').value)
		errors.push("General info: Missing title");
	if (!document.getElementById('country').value)
		errors.push("General info: Missing country");

	// check parties
	const seenPartyIDs = new Set();
	for (const [i, p] of parties.entries()) {
		if (!p) continue;
		const label = `Party ${i}`;
		if (!p.id?.trim())   errors.push(`${label}: missing unique ID`);
		if (!p.name?.trim()) errors.push(`${label} (${p.id}): missing abbreviation`);
		if (p.id) {
			if (seenPartyIDs.has(p.id)) errors.push(`Duplicate party ID: "${p.id}"`);
			else seenPartyIDs.add(p.id);
		}
	}

	// check parliaments
	const seenPlmNames = new Set();
	for (const [i, q] of plms.entries()) {
		if (!q) continue;
		const label = `Parliament ${i}`;
		if (!q.name?.trim()) errors.push(`${label}: missing name`);
		if (q.name) {
			if (seenPlmNames.has(q.name)) errors.push(`Duplicate parliament name: "${q.name}"`);
			else seenPlmNames.add(q.name);
		}
		if (q.date && !/^\d{4}-\d{2}-\d{2}$/.test(q.date))
			errors.push(`${label}: date "${q.date}" is not in YYYY-MM-DD format`);

		// check fractions
		if (q.fractions.length == 0) {
			errors.push(`${label} has no fractions`);
		}
		for (const [fi, f] of (q.fractions || []).entries()) {
			const flabel = `${label}, fraction ${fi}`;
			if (!Number.isInteger(f.id)) errors.push(`${flabel}: no party assigned`);
			if (!Number.isInteger(f.seats) || f.seats < 0)
				errors.push(`${flabel}: invalid seat count "${f.seats}"`);
		}

		// check for duplicate parties within one parliament
		const seenFractionIDs = new Set();
		for (const f of (q.fractions || [])) {
			if (!Number.isInteger(f.id)) continue;
			if (seenFractionIDs.has(f.id)) errors.push(`Parliament "${q.name}": party "${parties[f.id]?.id}" appears more than once`);
			else seenFractionIDs.add(f.id);
		}
	}

	if (errors.length) {
		alert('Please fix the following issues before exporting:\n\n' + errors.map(e => '• ' + e).join('\n'));
		return false;
	}
	return true;
}

// import party and parliament data from JSON file
function importJSON(text) {
	try {
		const obj = JSON.parse(text);

		document.getElementById('name').value    = obj.name    || '';
		document.getElementById('title').value   = obj.title   || '';
		document.getElementById('country').value = obj.country || '';

		parties.length = 0;
		plms.length    = 0;
		div_parties.innerHTML = '';
		div_plms.innerHTML    = '';

		for (const [id, p] of Object.entries(obj.parties || {})) {
			addParty({
				id, name: p.name || id,
				fullname: p.fullname || '', fullname_rm: p.fullname_rm || '',
				fullname_en: p.fullname_en || '', color: p.color || '#ffffff',
				image: p.image || '', established: p.established,
				foundedBy: p.foundedBy, splitFrom: p.splitFrom,
			}, true);
		}

		// convert established strings to plm array indices
		for (const p of Object.values(parties)) {
			if (!p || !p.established) continue;
			p.established = plms.findIndex(q => q && q.name === p.established);
			if (p.established === -1) p.established = null;
		}

		// resolve string IDs to actual party IDs
		for (const p of Object.values(parties)) {
			if (!p) continue;
			for (const field of ['foundedBy', 'splitFrom']) {
				if (!p[field]) continue;
				p[field] = p[field].map(sid => parties.findIndex(q => q && q.id === sid)).filter(i => i !== -1);
			}
		}

		for (const q of (obj.parliaments || [])) {
			for (const f of q.fractions) {
				f.id = parties.findIndex(q => q && q.id === f.id);
			}
			add_plm(q, true);
		}

		refresh_all_checkbox_lists();
		refresh_all_fraction_dropdowns();
		refresh_all_established_dropdowns();
	} catch(e) {
		alert('Invalid JSON file:' + e);
	}
}

// listen for changes in file import
document.getElementById('import').addEventListener('change', function(e) {
	const file = e.target.files[0];
	if (!file) return;
	const reader = new FileReader();
	reader.onload = e => importJSON(e.target.result);
	reader.readAsText(file);
});
