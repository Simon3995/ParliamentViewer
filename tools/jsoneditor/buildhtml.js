// helper function to create one party checkbox
function make_party_checkbox(party_id, field, p, i) {
    const label = document.createElement('label');
    label.className = 'checkbox-item';
    label.dataset.partyRef = i;  // stable key for targeted removal
    label.innerHTML = `<input type="checkbox" onchange="toggle_checkbox(${party_id},'${field}',${i},this.checked)"><span>${p.id || ('unnamed party ' + i)}</span>`;
    return label;
}

// helper function to create one party option for a select element
function make_party_option(p, i, currentValue) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = p.id || 'unnamed party ' + i;
    if (currentValue == i) opt.selected = true;
    opt.dataset.partyRef = i;  // stable key for targeted removal
    return opt;
}

// helper function to create one parliament option for a select element
function make_plm_option(q, i, currentValue) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = q.name || 'unnamed parliament ' + i;
    if (currentValue === i) opt.selected = true;
    opt.dataset.plmRef = i;  // stable key for targeted removal
    return opt;
}

// rebuild full merged/split checkbox list
function build_checkbox_list(container_id, party_id, field, selected_ids) {
    const container = document.getElementById(container_id);
    if (!container) return;
    container.innerHTML = '';
    for (const [i, p] of Object.entries(parties)) {
        console.log("p", p, "i", i, "party_id", party_id);
        if (!p || i == party_id) continue;
        const label = make_party_checkbox(party_id, field, p, i);
        label.querySelector('input').checked = selected_ids.includes(Number(i));
        container.appendChild(label);
    }
    if (!container.children.length) container.innerHTML = 'No other parties';
}

// rebuild all merged/split checkbox lists
function refresh_all_checkbox_lists() {
    for (const [id, p] of Object.entries(parties)) {
        if (!p) continue;
        build_checkbox_list('merged-list-' + id, id, 'founded_by', p.founded_by || []);
        build_checkbox_list('split-list-'  + id, id, 'split_from', p.split_from || []);
    }
}

// rebuild all fraction dropdowns in parliament editor menu
function refresh_all_fraction_dropdowns() {
    for (const [plm_id, q] of Object.entries(plms)) {
        if (!q) continue;
        for (let fi = 0; fi < q.fractions.length; fi++) {
            const select = document.querySelector(`#seat-${plm_id}-${fi} select`);
            if (!select) continue;
            const cur = select.value;
            select.innerHTML = '<option value="">-- NONE --</option>';
            for (const [i, p] of parties.entries()) {
                if (!p) continue;
                select.appendChild(make_party_option(p, i, cur));
            }
        }
    }
}

// rebuild all 'established' dropdowns in party editor menu
function refresh_all_established_dropdowns() {
    for (const [id, p] of Object.entries(parties)) {
        if (!p) continue;
        const select = document.getElementById('established-' + id);
        if (!select) continue;
        const cur = select.value;
        select.innerHTML = '<option value="">-- NONE --</option>';
        for (const [i, q] of Object.entries(plms)) {
            if (!q) continue;
            select.appendChild(make_plm_option(q, i, cur || p.established));
        }
    }
}