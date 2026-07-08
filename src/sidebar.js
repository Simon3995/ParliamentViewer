import { S } from "./main.js";
import { getHighlighted, isHighlighted } from "./controller.js";

export let selectedIcon = null;

// generate all tables in the sidebar
function buildSidebar() {
	seatDistTable();
	leftParliamentTable();
	changesTable();
	buildIconPickerMenu();
}

// generate a seat table for the current parliament object
function seatDistTable() {
	let parliament = S.originalParliament;
	let string = "";
	let totalSeats = 0;
	let totalHighlight = 0;
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

		totalSeats += frac.seatAmt;
		if (getHighlighted().includes(frac.party.id)) totalHighlight += frac.seatAmt;
	}

	string += `</tbody>`;
	string += `<tfoot><tr id="footer"></tr></tfoot>`;
	string += `</table>`;

	// insert HTML string into document
	document.getElementById("table").innerHTML = string;
}

// generate the table of parties that have left parliament if available
function leftParliamentTable() {
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
		let leftString = '<h2>&#8618; No longer in parliament</h2>';
		leftString += '<table><tr><th class="col_l">Party</th><th class="col_m">Full Name</th><th class="col_r">Seats</th></tr>';
		for (const party of leftParliament) {
			leftString += '<tr>';
			leftString += `<td>${party.name}</td>`;
			leftString += `<td>${party.fullname}</td>`;
			const prev_frac = prev_parl.fractions.find(f => f.party.name === party.name);
			leftString += `<td>0 (<span class="red">&#9660;${prev_frac ? prev_frac.seatAmt : 0}</span>)</td>`;
			leftString += '</tr>';
		}
		leftString += '</table>';
		document.getElementById("leftParliament").innerHTML = leftString;
	} else {
		document.getElementById("leftParliament").innerHTML = '';
	}
}


// generate the table indicating party mergers, rebrands and splits
function changesTable() { 
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
		let fullString = '<h2>Party Changes</h2>';
		fullString += '<table><tr><th class="col_l">New party</th><th class="col_m">How</th><th class="col_r">Previously</th></tr>';
		fullString += str;
		fullString += '</table>';
		document.getElementById("partyChanges").innerHTML = fullString;
	} else {
		document.getElementById("partyChanges").innerHTML = '';
	}
}

// generate an editable seat table for the current parliament object
function tableEditMode() {
	let parliament = S.originalParliament;
	let string = "";
	let totalSeats = 0;
	let totalHighlight = 0;
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

		totalSeats += frac.seatAmt;
		if (getHighlighted().includes(frac.party.id)) totalHighlight += frac.seatAmt;
	}

	string += `</tbody>`;
	string += `<tfoot><tr id="footer"></tr></tfoot>`;
	string += "</table>";
	
	// insert HTML string into document
	document.getElementById("table").innerHTML = string;
	document.getElementById("leftParliament").innerHTML = '';

	makeTableSortable();
}

// jQuery sortable table
function makeTableSortable() {
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
	const totalSeats = S.currentParliament.seatAmt();
	let totalHighlight = 0;
	for (const frac of S.currentParliament.fractions)
		if (isHighlighted(frac.party.id))
			totalHighlight += frac.seatAmt;
	let string = "";
	
	string += '<th>Total</th>';
	if (totalHighlight > 0) {
		let coalitionComment;
		if (totalHighlight * 2 == totalSeats) {
			coalitionComment = "<span class='chlf'>Half</span>";
		} else if (totalHighlight * 2 < totalSeats) {
			coalitionComment = "<span class='cmin'>Minority</span>";
			coalitionComment +=  `, ${Math.ceil((totalSeats / 2) + 0.2)} needed for majority`;
		} else {
			coalitionComment = "<span class='cmaj'>Majority</span>";
		}
		string += `<th class="ralign" colspan="2">${totalHighlight}/${totalSeats} (${coalitionComment})</th>`;
	} else {
		string += '<th class="ralign" colspan="2">' + totalSeats + '</th>';
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
	const btnReset = document.getElementById("btnReset");
	const btnAdd = document.getElementById("btnAdd");
	const btnDelete = document.getElementById("btnDelete");
	const btnLeft = document.getElementById("btnLeft");
	const btnRight = document.getElementById("btnRight");
	const btnSort = document.getElementById("btnSort");

	if (S.editMode) {
		btnEdit.style.backgroundColor = "#488cae";
		btnReset.style.display = "inline-block";
		btnAdd.style.display = "inline-block";
		btnAdd.disabled = false;
		btnSort.style.display = "inline-block";
		btnSort.disabled = false;
		btnLeft.style.display = "inline-block";
		btnLeft.disabled = (S.currentHighlight.length != 1);
		btnRight.style.display = "inline-block";
		btnRight.disabled = (S.currentHighlight.length != 1);
		btnDelete.style.display = "inline-block";
		btnDelete.disabled = (S.currentHighlight.length == 0);
	} else {
		btnEdit.style.backgroundColor = "#483d8b";
		btnReset.style.display = "none";
		btnAdd.style.display = "none";
		btnDelete.style.display = "none";
		btnLeft.style.display = "none";
		btnRight.style.display = "none";
		btnSort.style.display = "none";
	}
}

// update all sidebar info
export function updateSidebar() {
	if (S.editMode) {
		tableEditMode();
	} else {
		buildSidebar();
	}
	tableHighlight();
	updateTableFooter();
	updateButtons();
}

export async function buildIconPickerMenu() {
	const PATH = "/logos/manifest.json";
	const select = document.getElementById("country-select");
	const grid = document.getElementById("icon-grid");
	let countries = [];

	// fetch manifest.json
	try {
		const res = await fetch(PATH);
		countries = await res.json();
	} catch (e) {
		console.error("Failed to load manifest.json:", e);
	}

	// build country selector dropdown
	select.innerHTML = "";
	for (const c of countries) {
		const opt = document.createElement("option");
		opt.value = c.country;
		opt.textContent = c.country;
		select.appendChild(opt);
	}

	// render the icon list when a new country is selected
	select.addEventListener("change", () => renderIcons(select.value));

	// render the icon list
	function renderIcons(countryCode) {
		grid.innerHTML = "";
		if (!countryCode) return;

		const country = countries.find(c => c.country === countryCode);
		if (!country) return;

		// 'no icon' option
		const noneBtn = document.createElement("button");
		noneBtn.className = 'icon-btn none-btn selected';
		noneBtn.type = "button";
		noneBtn.title = "No icon";
		noneBtn.style.backgroundColor = document.getElementById("addColor").value;
		noneBtn.addEventListener("click", () => selectValue(null, noneBtn));
		grid.appendChild(noneBtn);

		// remaining options
		for (const party of country.parties) {
			const btn = document.createElement("button");
			btn.className = "icon-btn";
			btn.type = "button";
			btn.title = country.country + "-" + party.id;
			btn.style.backgroundColor = document.getElementById("addColor").value;
			btn.innerHTML = `<img src="${party.src}" alt="${party.id}">`;
			btn.addEventListener("click", () => selectValue(party, btn));
			grid.appendChild(btn);
		}
	}

	// select a new value and update classes
	function selectValue(value, button) {
		selectedIcon = value;
		grid.querySelectorAll(".icon-btn").forEach(b => b.classList.remove("selected"));
		button.classList.add("selected");
	}
}

export function setIconButtonColor(color) {
	document.querySelectorAll(".icon-btn").forEach(b => b.style.backgroundColor = color);
}