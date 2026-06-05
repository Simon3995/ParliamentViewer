// export current party and parliament lists to JSON file
function exportJSON() {
    const partiesObj = {};
    for (const p of parties.filter(Boolean)) {
        const { id, ...rest } = p;
        if (rest.founded_by) rest.founded_by = rest.founded_by.map(i => parties[i]?.id).filter(Boolean);
        if (rest.split_from) rest.split_from = rest.split_from.map(i => parties[i]?.id).filter(Boolean);
        if (rest.establised != null) rest.established = plms[rest.established]?.name ?? null;
        partiesObj[id] = rest;
    }

    const obj = {
        name:        document.getElementById('name').value,
        title:       document.getElementById('title').value,
        country:     document.getElementById('country').value,
        parties:     partiesObj,
        parliaments: plms.filter(Boolean).map(q => ({
            ...q,
            fractions: (q.fractions || []).filter(f => f.id !== null)
        }))
    };

    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(obj, 1, 1)], { type: 'application/json' }));
    a.download = (obj.name || 'parliament') + '.json';
    a.click();
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
            add_party({
                id, name: p.name || id,
                fullname: p.fullname || '', fullname_rm: p.fullname_rm || '',
                fullname_en: p.fullname_en || '', color: p.color || '#ffffff',
                image: p.image || '', established: p.established,
                founded_by: p.founded_by, split_from: p.split_from,
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
            for (const field of ['founded_by', 'split_from']) {
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