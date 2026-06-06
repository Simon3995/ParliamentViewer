// add new fraction to a parliament
function add_fraction(plm_id, data) {
    const fraction_id = plms[plm_id].fractions.length;
    plms[plm_id].fractions.push(data || { id: null, seats: 0 });
    const f = plms[plm_id].fractions[fraction_id];

    const el = document.createElement('div');
    el.className = 'seat-entry';
    el.id = `seat-${plm_id}-${fraction_id}`;

    const select = document.createElement('select');
    select.onchange = () => {
        const num = Number(select.value);
        plms[plm_id].fractions[fraction_id].id = Number.isInteger(num) ? num : null;
    }
    select.innerHTML = '<option value="">-- NONE --</option>';
    for (const [i, p] of parties.entries()) {
        if (!p) continue;
        select.appendChild(make_party_option(p, i, f.id));
    }

    el.innerHTML = `
        <div class="fraction-arrows">
            <button onclick="move_fraction(${plm_id}, ${fraction_id}, -1)">▲</button>
            <button onclick="move_fraction(${plm_id}, ${fraction_id},  1)">▼</button>
        </div>
        <input type="number" value="${f.seats || 0}" style="width:70px" onchange="plms[${plm_id}].fractions[${fraction_id}].seats=+this.value">
        <button onclick="delete_fraction(${plm_id}, ${fraction_id})" style="padding:2px 6px">✕</button>
    `;
    // insert the select before the number input
    el.querySelector('input[type="number"]').before(select);

    document.getElementById('fraction-' + plm_id).appendChild(el);
}

// delete fraction from a parliament
function delete_fraction(plm_id, fraction_id) {
    plms[plm_id].fractions.splice(fraction_id, 1);
    rebuild_fractions(plm_id);
}

// move a fraction up or down one step in the list
function move_fraction(plm_id, fraction_id, direction) {
    const fractions = plms[plm_id].fractions;
    const target = fraction_id + direction;
    if (target < 0 || target >= fractions.length) return;
    [fractions[fraction_id], fractions[target]] = [fractions[target], fractions[fraction_id]];
    rebuild_fractions(plm_id);
}

// fully rebuild the fractions list
function rebuild_fractions(plm_id) {
    const fractions = [...plms[plm_id].fractions];
    plms[plm_id].fractions = [];
    document.getElementById('fraction-' + plm_id).innerHTML = '';
    for (const fraction of fractions) add_fraction(plm_id, fraction);
}