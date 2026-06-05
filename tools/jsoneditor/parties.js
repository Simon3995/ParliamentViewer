// add a new party (+editor menu) to the list
function add_party(data, suppressRefresh = false) {
    const id = new_party_index();
    parties[id] = data ? { ...data } : {};
    const p = parties[id];
    div_parties.insertAdjacentHTML('beforeend', `
        <div id="party-${id}" class="party">
            <div class="img-wrap"><img id="img-${id}" src="${esc(p.image || '')}" style="background-color:${p.color || '#ffffff'}"></div>
            <div class="row"><label>Unique ID:</label><input type="text" value="${esc(p.id)}" onchange="rename_party(${id}, this.value)"></div>
            <div class="row"><label>Abbreviation:</label><input type="text" value="${esc(p.name)}" onchange="parties[${id}].name=this.value"></div>
            <div class="row"><label>Full Name (Local):</label><input type="text" value="${esc(p.fullname)}" onchange="parties[${id}].fullname=this.value"></div>
            <div class="row"><label>Full Name (Local, Romanised):</label><input type="text" placeholder="(optional)" value="${esc(p.fullname_rm)}" onchange="parties[${id}].fullname_rm=this.value"></div>
            <div class="row"><label>Full Name (English):</label><input type="text" value="${esc(p.fullname_en || '')}" onchange="parties[${id}].fullname_en=this.value"></div>
            <div class="row"><label>Color:</label><input type="color" value="${p.color || '#ffffff'}" onchange="parties[${id}].color=this.value;document.getElementById('img-${id}').style.backgroundColor=this.value"></div>
            <div class="row"><label>Logo URL:</label><input type="text" placeholder="/logos/..." value="${esc(p.image || '')}" onchange="parties[${id}].image=this.value;document.getElementById('img-${id}').src=this.value"></div>
            <div class="row"><label>Established (parliament):</label><select id="established-${id}" onchange="parties[${id}].established=+this.value||null"><option value="">-- NONE --</option></select></div>
            <div class="row">
                <span class="collapsible-label">Founded by:</span>
                <div class="collapse-wrap">
                    <button class="collapse-toggle" onclick="toggle_collapse(this)">SHOW</button>
                    <div class="checkbox-list" id="merged-list-${id}"></div>
                </div>
            </div>
            <div class="row">
                <span class="collapsible-label">Split from:</span>
                <div class="collapse-wrap">
                    <button class="collapse-toggle" onclick="toggle_collapse(this)">SHOW</button>
                    <div class="checkbox-list" id="split-list-${id}"></div>
                </div>
            </div>
            <button class="del-btn" onclick="delete_party(${id})">✕ DELETE PARTY</button>
        </div>
    `);

    if (suppressRefresh) return;

    // populate this party's own "Founded by" and "Split from" lists
    build_checkbox_list('merged-list-' + id, id, 'founded_by', p.founded_by || []);
    build_checkbox_list('split-list-'  + id, id, 'split_from', p.split_from || []);

    // populate this party's "Established" dropdown with existing parliaments
    const estSelect = document.getElementById('established-' + id);
    for (const [i, q] of Object.entries(plms)) {
        if (q) estSelect.appendChild(make_plm_option(q, i, p.established));
    }

    // insert this new party into all existing other lists / dropdowns
    insert_party_everywhere(id);
}

function rename_party(id, newName) {
    parties[id].id = newName;
    document.querySelectorAll(`[data-party-ref="${id}"] span`).forEach(s => s.textContent = newName);
    document.querySelectorAll(`option[data-party-ref="${id}"]`).forEach(o => o.textContent = newName);
}

// delete a party from the list entirely
function delete_party(id) {
    const p = parties[id];
    if (!confirm(`Remove party?\n\n\tid: ${p.id}\n\tname: ${p.name}`)) return;
    remove_party_everywhere(id);
    document.getElementById('party-' + id).remove();
    delete parties[id];
}

// insert new party into every existing checkbox list and fraction dropdown
function insert_party_everywhere(new_id) {
    const p = parties[new_id];

    // checkbox lists on every other party
    for (const [id, op] of Object.entries(parties)) {
        if (!op || id == new_id) continue;
        for (const [list_id, field] of [
            ['merged-list-' + id, 'founded_by'],
            ['split-list-'  + id, 'split_from'],
        ]) {
            const container = document.getElementById(list_id);
            if (!container) continue;
            // remove "No other parties" placeholder if present
            if (container.firstChild?.nodeType === 3 || container.innerHTML === 'No other parties')
                container.innerHTML = '';
            container.appendChild(make_party_checkbox(id, field, p, new_id));
        }
    }

    // fraction dropdowns in all parliaments
    for (const [plm_id, q] of Object.entries(plms)) {
        if (!q) continue;
        for (let fi = 0; fi < q.fractions.length; fi++) {
            const select = document.querySelector(`#seat-${plm_id}-${fi} select`);
            if (select) select.appendChild(make_party_option(p, new_id, select.value));
        }
    }
}

// remove this party from every checkbox list and fraction dropdown.
function remove_party_everywhere(party_id) {
    const p = parties[party_id];
    const ref = p?.id;

    // checkbox lists on every other party
    for (const id of Object.keys(parties)) {
        if (id == party_id) continue;
        for (const suffix of ['merged-list-', 'split-list-']) {
            const container = document.getElementById(suffix + id);
            if (!container) continue;
            container.querySelector(`[data-party-ref="${ref}"]`)?.remove();
            if (!container.children.length) container.innerHTML = 'No other parties';
        }
    }

    // fraction dropdowns in all parliaments
    for (const [plm_id, q] of Object.entries(plms)) {
        if (!q) continue;
        for (let fi = 0; fi < q.fractions.length; fi++) {
            const select = document.querySelector(`#seat-${plm_id}-${fi} select`);
            select?.querySelector(`[data-party-ref="${ref}"]`)?.remove();
        }
    }
}