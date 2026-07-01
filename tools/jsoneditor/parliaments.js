// add a new parliament (+editor menu) to the list
function add_plm(data, suppressRefresh = false) {
	const id = new_plm_index();
	plms[id] = data ? { ...data, fractions: [] } : { name: null, date: null, fractions: [] };
	const q = plms[id];

	div_plms.insertAdjacentHTML('beforeend', `
		<div id="plm-${id}" class="plm">
			<div class="row"><label>Name:</label><input type="text" value="${esc(q.name || '')}" onchange="rename_parliament(${id}, this.value)"></div>
			<div class="row"><label>Date (YYYY-MM-DD):</label><input type="text" value="${esc(q.date || '')}" onchange="plms[${id}].date=this.value"></div>
			<div class="row"><label>Source:</label><textarea rows="2" cols="40" onchange="plms[${id}].source=this.value">${esc(q.source || '')}</textarea>
			<div class="row"><label>Fractions:</label>
				<div id="fraction-${id}" class="fraction-row"></div>
				<button onclick="addFraction(${id})">+ ADD FRACTION</button>
			</div>
			<button class="del-btn" onclick="delete_plm(${id})">✕ DELETE PARLIAMENT</button>
		</div>
	`);

	for (const fraction of (data?.fractions || [])) addFraction(id, fraction);

	if (suppressRefresh) return;
}

function rename_parliament(id, newName) {
	plms[id].name = newName;
	document.querySelectorAll(`[data-plm-ref="${id}"]`).forEach(s => s.textContent = newName);
}

// delete a parliament from the list entirely
function delete_plm(id) {
	const plm = plms[id];
	if (!confirm(`Delete parliament "${plm.name}"?`)) return;
	document.getElementById('plm-' + id).remove();
	delete plms[id];
}
