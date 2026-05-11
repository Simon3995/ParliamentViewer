// generate a seat table based on a parliament object
function table() {
	let parliament = ori_plm;
	let string = "";
	let total_seats = 0;
	let total_hlt = 0;
	string += `<table>`;
	string += `<thead>`
	
	let fracs = [...ord_tab];
	
	string += '<tr>';
	string += '<th class="col_l">Party</th>';
    string += '<th class="col_m">Full Name</th>';
    string += '<th class="col_r">Seats</th>';
    string += '</tr>';

	string += `</thead><tbody>`;

    // write all table HTML to a string
	for (let i in fracs) {
		i = Number(i);
        const frac = fracs[i];

		// find difference
		let diff = 0;
		const prevIdx = (cur_tml.parliaments.indexOf(parliament) + 1);
		const prevParl = cur_tml.parliaments[prevIdx];
		if (prevParl) {
			const prevFrac = prevParl.fractions.find(f => f.party.name === frac.party.name);
			diff = prevFrac ? frac.seat_amt - prevFrac.seat_amt : frac.seat_amt;
		}
		
		if (diff == frac.seat_amt) {
			diff = `<span class="greener">&#9650;${diff}</span>`;
		} else if (diff > 0) {
			diff = '<span class="green">&#9650;' + diff + '</span>';
		} else if (diff < 0) {
			diff = '<span class="red">&#9660;' + Math.abs(diff) + '</span>';
		} else if (diff === 0) {
			diff = '<span class="blue">=</span>';
		}

		// click event
		let id = `id=${frac.party.id}`;

		string += `<tr ${id} class="tablerow">`;
		string += "<td>" + frac.party.name + "</td>";
		string += "<td>" + frac.party.fullname + "</td>";
		string += `<td>${frac.seat_amt} (${diff})</td>`;

		total_seats += frac.seat_amt;
		if (cur_hlt.includes(frac.party.id)) total_hlt += frac.seat_amt;
	}

	string += `</tbody>`;
	string += `<tfoot><tr id="footer"></tr></tfoot>`;
	string += `</table>`;
	
	// insert HTML string into document
	document.getElementById("table").innerHTML = string;

	// find parties that left parliament
	let left_plm = [];
	const prev_idx = (cur_tml.parliaments.indexOf(parliament) + 1);
	const prev_parl = cur_tml.parliaments[prev_idx];
	if (prev_parl) {
		const curr_party_names = new Set(cur_plm.fractions.map(f => f.party.name));
		left_plm = prev_parl.fractions
			.filter(f => !curr_party_names.has(f.party.name))
			.map(f => f.party);
	} else {
		left_plm = [];
	}
	if (left_plm.length) {
		let left_string = '<h2>&#8618; Left Parliament</h2>';
		left_string += '<table><tr><th class="col_l">Party</th><th class="col_m">Full Name</th><th class="col_r">Seats</th></tr>';
		for (const party of left_plm) {
			left_string += '<tr>';
			left_string += `<td>${party.name}</td>`;
			left_string += `<td>${party.fullname}</td>`;
			const prev_frac = prev_parl.fractions.find(f => f.party.name === party.name);
			left_string += `<td>0 (<span class="red">&#9660;${prev_frac ? prev_frac.seat_amt : 0}</span>)</td>`;
			left_string += '</tr>';
		}
		left_string += '</table>';
		document.getElementById("left_plm").innerHTML = left_string;
	} else {
		document.getElementById("left_plm").innerHTML = '';
	}
}

function table_edit_mode() {
	let parliament = ori_plm;
	let string = "";
	let total_seats = 0;
	let total_hlt = 0;
	string += `<table class="sortable">`;
	string += `<thead>`
	
	let fracs = [...ord_tab];
	
	string += '<tr>';
	string += '<th class="col_l">Party</th>';
    string += '<th class="col_m">Full Name</th>';
    string += '<th class="col_r">Seats</th>';
    string += '</tr>';

	string += `</thead><tbody>`;

    // write all table HTML to a string
	for (let i in fracs) {
		i = Number(i);
        const frac = fracs[i];

		// find difference
		let diff = 0;
		const prevIdx = (cur_tml.parliaments.indexOf(parliament) + 1);
		const prevParl = cur_tml.parliaments[prevIdx];
		if (prevParl) {
			const prevFrac = prevParl.fractions.find(f => f.party.name === frac.party.name);
			diff = prevFrac ? frac.seat_amt - prevFrac.seat_amt : frac.seat_amt;
		}
		
		if (diff == frac.seat_amt) {
			diff = `<span class="greener">&#9650;${diff}</span>`;
		} else if (diff > 0) {
			diff = '<span class="green">&#9650;' + diff + '</span>';
		} else if (diff < 0) {
			diff = '<span class="red">&#9660;' + Math.abs(diff) + '</span>';
		} else if (diff === 0) {
			diff = '<span class="blue">=</span>';
		}

		// click event
		let id = `id=${frac.party.id}`;

		string += `<tr ${id} class="tablerow">`;
		string += "<td>" + frac.party.name + "</td>";
		string += "<td>" + frac.party.fullname + "</td>";
		string += `<td><input name="${frac.party.id}" type="number" value="${frac.seat_amt}" min="0" max="10000"></td>`;

		total_seats += frac.seat_amt;
		if (cur_hlt.includes(frac.party.id)) total_hlt += frac.seat_amt;
	}

	string += `</tbody>`;
	string += `<tfoot><tr id="footer"></tr></tfoot>`;
	string += "</table>";
	
	// insert HTML string into document
	document.getElementById("table").innerHTML = string;
	document.getElementById("left_plm").innerHTML = '';

	make_table_sortable();
}

function update_table_footer() {
	const footer = document.getElementById("footer");
	const total_seats = cur_plm.seat_amt();
	let total_hlt = 0;
	for (const frac of cur_plm.fractions)
		if (cur_hlt.includes(frac.party.id))
			total_hlt += frac.seat_amt;
	let string = "";
	
	string += '<th>Total</th>';
	if (total_hlt > 0) {
		let coalition_comment;
		if (total_hlt * 2 == total_seats) {
			coalition_comment = "<span class='chlf'>Half</span>";
		} else if (total_hlt * 2 < total_seats) {
			coalition_comment = "<span class='cmin'>Minority</span>";
			coalition_comment +=  `, ${Math.ceil((total_seats / 2) + 0.2)} needed for majority`;
		} else {
			coalition_comment = "<span class='cmaj'>Majority</span>";
		}
		string += `<th class="ralign" colspan="2">${total_hlt}/${total_seats} (${coalition_comment})</th>`;
	} else {
		string += '<th class="ralign" colspan="2">' + total_seats + '</th>';
	}

	footer.innerHTML = string;
}

function table_highlight() {
	document.querySelectorAll("tr.highlighted").forEach(row => {
		row.classList.remove("highlighted");
	});

	for (const pid of cur_hlt) {
		const hl_row = document.getElementById(pid);
		if (hl_row && hl_row.tagName === 'TR') {
			hl_row.classList.add("highlighted");
		}
	}
}

function update_buttons() {
	const btn_edit = document.getElementById("btn_edit");
	const btn_add = document.getElementById("btn_add");
	const btn_del = document.getElementById("btn_del");
	const btn_left = document.getElementById("btn_left");
	const btn_right = document.getElementById("btn_right");
	const btn_sort = document.getElementById("btn_sort");

	if (edit_mode) {
		btn_edit.style.backgroundColor = "#488cae";
		btn_add.disabled = false;
		btn_sort.disabled = false;
		btn_left.disabled = (cur_hlt.length != 1);
		btn_right.disabled = (cur_hlt.length != 1);
		btn_del.disabled = (cur_hlt.length == 0);
	} else {
		btn_edit.style.backgroundColor = "#483d8b";
		btn_add.disabled = true;
		btn_del.disabled = true;
		btn_left.disabled = true;
		btn_right.disabled = true;
		btn_sort.disabled = true;
	}
}

function update_sidebar() {
	if (edit_mode) {
		table_edit_mode();
	} else {
		table();
	}
	table_highlight();
	update_table_footer();
	update_buttons();
}