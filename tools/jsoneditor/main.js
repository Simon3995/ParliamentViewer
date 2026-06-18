const div_parties = document.getElementById("parties");
const div_plms    = document.getElementById("parliaments");
let parties = [];
let plms    = [];

// find lowest unused index in sparse array
const new_party_index = () => { let i = 0; while (parties[i]) i++; return i; };
const new_plm_index   = () => { let i = 0; while (plms[i])    i++; return i; };

// escape text for HTML attribute / content use
function esc(s) {
	return String(s || '')
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;');
}

// toggle visibility of a collapsible checkbox list
function toggle_collapse(el) {
	const open = el.nextElementSibling.classList.toggle('open');
	el.textContent = open ? 'HIDE' : 'SHOW';
}

// update merged/split array after a checkbox has been clicked
function toggle_checkbox(partyId, field, other_id, checked) {
	const arr = parties[partyId][field] ||= [];
	const idx = arr.indexOf(other_id);
	if (checked && idx === -1) arr.push(other_id);
	else if (!checked && idx > -1) arr.splice(idx, 1);
}
