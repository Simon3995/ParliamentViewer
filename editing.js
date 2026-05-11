import { S } from "./main.js";

// toggle edit mode on/off and update the sidebar
function toggle_edit_mode() {
	edit_mode = !edit_mode;
	if (edit_mode) document.getElementById("title_ps").innerHTML = " (Edited)";
	document.getElementById("btn_reset").disabled = false;
	update_sidebar();
}

// sort the table by seats in descending order
function sort_table_by_seats() {
	S.ord_tab.sort((a, b) => b.seat_amt - a.seat_amt);
	update_sidebar();
}

// move the selected party one step to the left on the parliament chart
function move_party_left() {
	const idx = S.ord_vis.findIndex(elem => elem.party.id === cur_hlt[0]);
	if (idx <= 0) return; // can't move further left
	[S.ord_vis[idx - 1], S.ord_vis[idx]] = [S.ord_vis[idx], S.ord_vis[idx - 1]];
	cur_plm.distribute_seats();
}

// move the selected party one step to the right on the parliament chart
function move_party_right() {
	const idx = S.ord_vis.findIndex(elem => elem.party.id === cur_hlt[0]);
	if (idx === -1 || idx >= S.ord_vis.length - 1) return; // can´t move further right
	[S.ord_vis[idx + 1], S.ord_vis[idx]] = [S.ord_vis[idx], S.ord_vis[idx + 1]];
	cur_plm.distribute_seats();
}

// show the dialog for adding a new party
function show_add_menu() {
	document.getElementById("add_party").style.display = "inline-block";
}

// add a new party to the current parliament
function add_party() {
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
	while (cur_tml.parties[id+num]) num++;

    // apply
	const new_party = new Party(add_shortname, add_fullname, id+num, add_color, new Image());
	cur_tml.parties[id+num] = new_party;
	const new_frac = new Fraction(new_party, 1);
	S.ord_tab.push(new_frac);
	S.ord_vis.push(new_frac);
	cur_plm.add_fraction(new_frac);
	generate_party_imgs();
	update_sidebar();
	cancel_add_party();
}

// reset inputs and hide add party dialog
function cancel_add_party() {
	document.getElementById("add_shortname").value = "";
	document.getElementById("add_fullname").value = "";
	document.getElementById("add_color").value = "#000000";
	document.getElementById("add_party").style.display = "none";
}

// delete all currently highlighted parties
function delete_hlt() {
	for (const id of cur_hlt) {
		cur_plm.remove_fraction(id);
		S.ord_tab = S.ord_tab.filter((frac) => frac.party.id != id);
		S.ord_vis = S.ord_vis.filter((frac) => frac.party.id != id);
	}

	highlight(null);
	update_sidebar();
}

// undo all edits to current parliament
function reset_plm() {
	document.getElementById("title_ps").innerHTML = "";
	document.getElementById("btn_reset").disabled = true;
	cur_plm = ori_plm.clone();
	load_parliament(cur_plm);
	edit_mode = false;
	update_sidebar();
}