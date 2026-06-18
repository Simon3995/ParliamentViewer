import { S } from "./main.js";
import { update_sidebar } from "./sidebar.js";
import { loadParliament } from "./loading.js";
import { Party, Fraction, Parliament, Timeline } from "./classes.js";
import { generate_partyImgs } from "./loading.js";
import { highlight, get_highlighted } from "./controller.js";


// toggle edit mode on/off and update the sidebar
export function toggle_edit_mode() {
	S.edit_mode = !S.edit_mode;
	if (S.edit_mode) document.getElementById("title_ps").innerHTML = " (Edited)";
	document.getElementById("btn_reset").disabled = false;
	document.getElementById("source").innerHTML = "";
	update_sidebar();
}

// sort the table by seats in descending order
export function sort_table_by_seats() {
	S.ordTab.sort((a, b) => b.seatAmt - a.seatAmt);
	update_sidebar();
}

// move the selected party one step to the left on the parliament chart
export function move_party_left() {
	const idx = S.ordVis.findIndex(elem => elem.party.id === S.currentHighlight[0]);
	if (idx <= 0) return; // can't move further left
	[S.ordVis[idx - 1], S.ordVis[idx]] = [S.ordVis[idx], S.ordVis[idx - 1]];
	S.cur_plm.distributeSeats();
}

// move the selected party one step to the right on the parliament chart
export function move_party_right() {
	const idx = S.ordVis.findIndex(elem => elem.party.id === S.currentHighlight[0]);
	if (idx === -1 || idx >= S.ordVis.length - 1) return; // can´t move further right
	[S.ordVis[idx + 1], S.ordVis[idx]] = [S.ordVis[idx], S.ordVis[idx + 1]];
	S.cur_plm.distributeSeats();
}

// show the dialog for adding a new party
export function show_add_menu() {
	document.getElementById("add_party").style.display = "inline-block";
}

// add a new party to the current parliament
export function add_party() {
	const add_shortname = document.getElementById("add_shortname").value;
	const add_fullname = document.getElementById("add_fullname").value;
	const add_color = document.getElementById("add_color").value;

	if (add_shortname === '') {
		alert("No short name entered!");
		return;
	}

	if (add_fullname === '') {
		alert("No full name entered!");
		return;
	}

	// create unique id
	const id = add_shortname.toLowerCase();
	let num = 0;
	while (S.cur_tml.parties[id+num]) num++;

	// apply
	const new_party = new Party(add_shortname, add_fullname, id+num, add_color, new Image());
	S.cur_tml.parties[id+num] = new_party;
	const new_frac = new Fraction(new_party, 1);
	S.ordTab.push(new_frac);
	S.ordVis.push(new_frac);
	S.cur_plm.addFraction(new_frac);
	generate_partyImgs();
	update_sidebar();
	cancel_add_party();
}

// reset inputs and hide add party dialog
export function cancel_add_party() {
	document.getElementById("add_shortname").value = "";
	document.getElementById("add_fullname").value = "";
	document.getElementById("add_color").value = "#000000";
	document.getElementById("add_party").style.display = "none";
}

// delete all currently highlighted parties
export function delete_hlt() {
	for (const id of get_highlighted()) {
		S.cur_plm.removeFraction(id);
		S.ordTab = S.ordTab.filter((frac) => frac.party.id != id);
		S.ordVis = S.ordVis.filter((frac) => frac.party.id != id);
	}

	highlight(null);
	update_sidebar();
}

// undo all edits to current parliament
export function reset_plm() {
	document.getElementById("title_ps").innerHTML = "";
	document.getElementById("btn_reset").disabled = true;
	S.cur_plm = S.ori_plm.clone();
	loadParliament(S.cur_plm);
	S.edit_mode = false;
	update_sidebar();
	S.cur_plm.distributeSeats();
}
