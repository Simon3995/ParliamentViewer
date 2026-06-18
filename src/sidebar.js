import { S } from "./main.js";
import { getHighlighted, isHighlighted } from "./controller.js";

// generate all tables in the sidebar
function build_sidebar() {
	seat_dist_table();
	left_parl_table();
	changes_table();
}

// generate a seat table for the current parliament object
function seat_dist_table() {
	let parliament = S.originalParliament;
	let string = "";
	let total_seats = 0;
	let total_hlt = 0;
	string += `<table>`;
	string += `<thead>`

	let fracs = [...S.ordTab];

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
		const prevIdx = (S.currentTimeline.parliaments.indexOf(parliament) + 1);
		const prevParl = S.currentTimeline.parliaments[prevIdx];
		if (prevParl) {
			const prevFrac = prevParl.fractions.find(f => f.party.name === frac.party.name);
			diff = prevFrac ? frac.seatAmt - prevFrac.seatAmt : frac.seatAmt;
			// subtract seats from diff if party is a merger or rebrand this election
			if (frac.party.established === S.currentParliament.description && frac.party.foundedBy) {
				for (const ancestor of prevParl.fractions) {
					if (!frac.party.foundedBy.includes(ancestor.party.id)) continue;
					diff -= ancestor.seatAmt;
				}
			}
		}

		if (diff == frac.seatAmt) {
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
		string += `<td>${frac.seatAmt} (${diff})</td>`;

		total_seats += frac.seatAmt;
		if (getHighlighted().includes(frac.party.id)) total_hlt += frac.seatAmt;
	}

	string += `</tbody>`;
	string += `<tfoot><tr id="footer"></tr></tfoot>`;
	string += `</table>`;

	// insert HTML string into document
	document.getElementById("table").innerHTML = string;
}

// generate the table of parties that have left parliament if available
function left_parl_table() {
	// find parties that left parliament
	let parliament = S.originalParliament;
	let fracs = [...S.ordTab];
	let leftParliament = [];
	const prev_idx = (S.currentTimeline.parliaments.indexOf(parliament) + 1);
	const prev_parl = S.currentTimeline.parliaments[prev_idx];
	if (prev_parl) {
		const curr_party_names = new Set(S.currentParliament.fractions.map(f => f.party.name));
		leftParliament = prev_parl.fractions
			.filter(f => !curr_party_names.has(f.party.name))
			.filter(f => !fracs.some(x => x.party.established === parliament.description && x.party.foundedBy?.includes(f.party.id)))
			.map(f => f.party);
	} else {
		leftParliament = [];
	}
	if (leftParliament.length) {
		let left_string = '<h2>&#8618; Left Parliament</h2>';
		left_string += '<table><tr><th class="col_l">Party</th><th class="col_m">Full Name</th><th class="col_r">Seats</th></tr>';
		for (const party of leftParliament) {
			left_string += '<tr>';
			left_string += `<td>${party.name}</td>`;
			left_string += `<td>${party.fullname}</td>`;
			const prev_frac = prev_parl.fractions.find(f => f.party.name === party.name);
			left_string += `<td>0 (<span class="red">&#9660;${prev_frac ? prev_frac.seatAmt : 0}</span>)</td>`;
			left_string += '</tr>';
		}
		left_string += '</table>';
		document.getElementById("leftParliament").innerHTML = left_string;
	} else {
		document.getElementById("leftParliament").innerHTML = '';
	}
}


// generate the table indicating party mergers, rebrands and splits
function changes_table() { 
	const parliament = S.originalParliament;
	const fracs = [...S.ordTab];
	let str = "";
	for (const frac of fracs) {
		const party = frac.party;
		if (party.established !== parliament.description) {
			continue;
		}
		if (party.foundedBy?.length === 1 && !party.splitFrom) {
			// case 1: single party rebranded
			str += '<tr>';
			str += `<td>${party.name}</td>`;
			str += '<td>Rebranded from</td>';
			str += `<td>${S.currentTimeline.parties[party.foundedBy[0]].name}</td>`;
			str += '</tr>';
		}
		if (party.foundedBy?.length > 1 && !party.splitFrom) {
			// case 2: parties merged
			str += '<tr>';
			str += `<td>${party.name}</td>`;
			str += '<td>Merged from</td>';
			str += `<td>${party.foundedBy.map(p => S.currentTimeline.parties[p].name).join(', ')}</td>`;
			str += '</tr>';
		}
		if (party.splitFrom && !party.foundedBy) {
			// case 3: party split
			str += '<tr>';
			str += `<td>${party.name}</td>`;
			str += '<td>Split from</td>';
			str += `<td>${party.splitFrom.map(p => S.currentTimeline.parties[p].name).join(', ')}</td>`;
			str += '</tr>';
		}
		if (party.splitFrom && party.foundedBy) {
			// case 4: split & merge
			str += '<tr>';
			str += `<td>${party.name}</td>`;
			str += '<td>Split & Merged from</td>';
			str += `<td>${[...party.splitFrom, ...party.foundedBy].map(p => S.currentTimeline.parties[p].name).join(', ')}</td>`;
			str += '</tr>';
		}
	}
	if (str) {
		let full_str = '<h2>Party Changes</h2>';
		full_str += '<table><tr><th class="col_l">New party</th><th class="col_m">How</th><th class="col_r">Previously</th></tr>';
		full_str += str;
		full_str += '</table>';
		document.getElementById("partyChanges").innerHTML = full_str;
	} else {
		document.getElementById("partyChanges").innerHTML = '';
	}
}

// generate an editable seat table for the current parliament object
function table_editMode() {
	let parliament = S.originalParliament;
	let string = "";
	let total_seats = 0;
	let total_hlt = 0;
	string += `<table class="sortable">`;
	string += `<thead>`
	
	let fracs = [...S.ordTab];
	
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
		const prevIdx = (S.currentTimeline.parliaments.indexOf(parliament) + 1);
		const prevParl = S.currentTimeline.parliaments[prevIdx];
		if (prevParl) {
			const prevFrac = prevParl.fractions.find(f => f.party.name === frac.party.name);
			diff = prevFrac ? frac.seatAmt - prevFrac.seatAmt : frac.seatAmt;
		}
		
		if (diff == frac.seatAmt) {
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
		string += `<td><input name="${frac.party.id}" type="number" value="${frac.seatAmt}" min="0" max="10000"></td>`;

		total_seats += frac.seatAmt;
		if (getHighlighted().includes(frac.party.id)) total_hlt += frac.seatAmt;
	}

	string += `</tbody>`;
	string += `<tfoot><tr id="footer"></tr></tfoot>`;
	string += "</table>";
	
	// insert HTML string into document
	document.getElementById("table").innerHTML = string;
	document.getElementById("leftParliament").innerHTML = '';

	make_table_sortable();
}

// jQuery sortable table
function make_table_sortable() {
	// helper function to keep table cell widths consistent during drag
	function fix_width(e, ui) {
		ui.children().each(function() {
			$(this).width($(this).width());
		});
		return ui;
	}
	
	$(".sortable tbody").sortable({
		distance: 10,
		start: function() {
			S.dragging = true;
		},
		stop: function() {
			setTimeout(() => { S.dragging = false }, 100);
		},
		helper: fix_width,  // keeps the row from collapsing while dragging
		cursor: "move",
		update: function(event, ui) {
			// sort S.ordTab to match the new table order
			const new_order = [...event.target.childNodes].map(x => x.id);
			S.ordTab.sort((a, b) => { return new_order.indexOf(a.party.id) - new_order.indexOf(b.party.id) });
		}
	}).disableSelection();
}

// update table footer with seat totals and minority/majority stats
export function updateTableFooter() {
	const footer = document.getElementById("footer");
	const total_seats = S.currentParliament.seatAmt();
	let total_hlt = 0;
	for (const frac of S.currentParliament.fractions)
		if (isHighlighted(frac.party.id))
			total_hlt += frac.seatAmt;
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

// set the correct rows of the table as highlighted
export function tableHighlight() {
	document.querySelectorAll("tr.highlighted").forEach(row => {
		row.classList.remove("highlighted");
	});

	for (const frac of S.currentParliament.fractions) {
		const pid = frac.party.id;
		if (!isHighlighted(pid)) continue;
		const hl_row = document.getElementById(pid);
		if (hl_row && hl_row.tagName === 'TR') {
			hl_row.classList.add("highlighted");
		}
	}
}

// update all buttons enabled/disabled based on context
export function updateButtons() {
	const btnEdit = document.getElementById("btnEdit");
	const btnAdd = document.getElementById("btnAdd");
	const btnDelete = document.getElementById("btnDelete");
	const btnLeft = document.getElementById("btnLeft");
	const btnRight = document.getElementById("btnRight");
	const btnSort = document.getElementById("btnSort");

	if (S.editMode) {
		btnEdit.style.backgroundColor = "#488cae";
		btnAdd.disabled = false;
		btnSort.disabled = false;
		btnLeft.disabled = (S.currentHighlight.length != 1);
		btnRight.disabled = (S.currentHighlight.length != 1);
		btnDelete.disabled = (S.currentHighlight.length == 0);
	} else {
		btnEdit.style.backgroundColor = "#483d8b";
		btnAdd.disabled = true;
		btnDelete.disabled = true;
		btnLeft.disabled = true;
		btnRight.disabled = true;
		btnSort.disabled = true;
	}
}

// update all sidebar info
export function updateSidebar() {
	if (S.editMode) {
		table_editMode();
	} else {
		build_sidebar();
	}
	tableHighlight();
	updateTableFooter();
	updateButtons();
}
