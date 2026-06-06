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
                <button onclick="add_fraction(${id})">+ ADD FRACTION</button>
            </div>
            <button class="del-btn" onclick="delete_plm(${id})">✕ DELETE PARLIAMENT</button>
        </div>
    `);

    for (const fraction of (data?.fractions || [])) add_fraction(id, fraction);

    if (suppressRefresh) return;

    // insert this new parliament into every party's 'established' dropdown
    insert_plm_everywhere(id);
}

function rename_parliament(id, newName) {
    plms[id].name = newName;
    document.querySelectorAll(`[data-plm-ref="${id}"]`).forEach(s => s.textContent = newName);
}

// delete a parliament from the list entirely
function delete_plm(id) {
    const plm = plms[id];
    if (!confirm(`Delete parliament "${plm.name}"?`)) return;
    remove_plm_everywhere(id);
    document.getElementById('plm-' + id).remove();
    delete plms[id];
}

// insert this new parliament into every 'established' dropdown on parties.
function insert_plm_everywhere(new_id) {
    const q = plms[new_id];
    for (const [id, p] of Object.entries(parties)) {
        if (!p) continue;
        const select = document.getElementById('established-' + id);
        if (select) select.appendChild(make_plm_option(q, new_id, select.value));
    }
}

// remove this parliament from every 'established' dropdown on parties.
function remove_plm_everywhere(plm_id) {
    for (const [id, p] of Object.entries(parties)) {
        if (!p) continue;
        const select = document.getElementById('established-' + id);
        select?.querySelector(`[data-plm-ref="${plm_id}"]`)?.remove();
    }
}
