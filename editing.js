function toggle_edit_mode() {
	edit_mode = !edit_mode;
	if (edit_mode) document.getElementById("title_ps").innerHTML = " (Edited)";
	document.getElementById("btn_reset").disabled = false;
	update_sidebar();
}

function sort_table_by_seats() {
	ord_tab.sort((a, b) => b.seat_amt - a.seat_amt);
	update_sidebar();
}

function move_party_left() {
	const idx = ord_vis.findIndex(elem => elem.party.id === cur_hlt[0]);
	if (idx <= 0) return; // can't move further left
	[ord_vis[idx - 1], ord_vis[idx]] = [ord_vis[idx], ord_vis[idx - 1]];
	cur_plm.distribute_seats();
}

function move_party_right() {
	const idx = ord_vis.findIndex(elem => elem.party.id === cur_hlt[0]);
	if (idx === -1 || idx >= ord_vis.length - 1) return; // can´t move further right
	[ord_vis[idx + 1], ord_vis[idx]] = [ord_vis[idx], ord_vis[idx + 1]];
	cur_plm.distribute_seats();
}

function show_add_menu() {
	document.getElementById("add_party").style.display = "inline-block";
}

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

	const id = add_shortname.toLowerCase();
	let num = 0;
	while (cur_tml.parties[id+num]) num++;
	const new_party = new Party(add_shortname, add_fullname, id+num, add_color, new Image());
	cur_tml.parties[id+num] = new_party;
	const new_frac = new Fraction(new_party, 1);
	ord_tab.push(new_frac);
	ord_vis.push(new_frac);
	cur_plm.add_fraction(new_frac);
	generate_party_imgs();
	update_sidebar();
	cancel_add_party();
}

function cancel_add_party() {
	document.getElementById("add_shortname").value = "";
	document.getElementById("add_fullname").value = "";
	document.getElementById("add_color").value = "#000000";
	document.getElementById("add_party").style.display = "none";
}

function delete_hlt() {
	for (const id of cur_hlt) {
		cur_plm.remove_fraction(id);
		ord_tab = ord_tab.filter((frac) => frac.party.id != id);
		ord_vis = ord_vis.filter((frac) => frac.party.id != id);
	}

	highlight(null);
	update_sidebar();
}

function reset_plm() {
	document.getElementById("title_ps").innerHTML = "";
	document.getElementById("btn_reset").disabled = true;
	cur_plm = ori_plm.clone();
	load_parliament(cur_plm);
	edit_mode = false;
	update_sidebar();
}