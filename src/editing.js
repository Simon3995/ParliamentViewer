import { S } from "./main.js";
import { updateSidebar } from "./sidebar.js";
import { loadParliament } from "./loading.js";
import { Party, Fraction, Parliament, Timeline } from "./classes.js";
import { generatePartyImgs } from "./loading.js";
import { highlight, getHighlighted } from "./controller.js";


// toggle edit mode on/off and update the sidebar
export function toggleEditMode() {
	S.editMode = !S.editMode;
	if (S.editMode) {
		// steps to take if edit mode has just been turned on
		document.getElementById("title_ps").innerHTML = " (Edited)";
	} else {
		// steps to take if edit mode has just been disabled
		cancelAddParty();
	}
	document.getElementById("btnReset").disabled = false;
	document.getElementById("source").innerHTML = "";
	updateSidebar();
}

// sort the table by seats in descending order
export function sortTableBySeats() {
	S.ordTab.sort((a, b) => b.seatAmt - a.seatAmt);
	updateSidebar();
}

// move the selected party one step to the left on the parliament chart
export function movePartyLeft() {
	const idx = S.ordVis.findIndex(elem => elem.party.id === S.currentHighlight[0]);
	if (idx <= 0) return; // can't move further left
	[S.ordVis[idx - 1], S.ordVis[idx]] = [S.ordVis[idx], S.ordVis[idx - 1]];
	S.currentParliament.distributeSeats();
}

// move the selected party one step to the right on the parliament chart
export function movePartyRight() {
	const idx = S.ordVis.findIndex(elem => elem.party.id === S.currentHighlight[0]);
	if (idx === -1 || idx >= S.ordVis.length - 1) return; // can´t move further right
	[S.ordVis[idx + 1], S.ordVis[idx]] = [S.ordVis[idx], S.ordVis[idx + 1]];
	S.currentParliament.distributeSeats();
}

// show the dialog for adding a new party
export function showAddMenu() {
	document.getElementById("addParty").style.display = "block";
}

// add a new party to the current parliament
export function addParty() {
	const addShortname = document.getElementById("addShortname").value;
	const addFullname = document.getElementById("addFullname").value;
	const addColor = document.getElementById("addColor").value;

	if (addShortname === '') {
		alert("No short name entered!");
		return;
	}

	if (addFullname === '') {
		alert("No full name entered!");
		return;
	}

	// create unique id
	const id = addShortname.toLowerCase();
	let num = 0;
	while (S.currentTimeline.parties[id+num]) num++;

	// apply
	const new_party = new Party(addShortname, addFullname, addFullname, addFullname, id+num, addColor, new Image());
	S.currentTimeline.parties[id+num] = new_party;
	const new_frac = new Fraction(new_party, 1);
	S.ordTab.push(new_frac);
	S.ordVis.push(new_frac);
	S.currentParliament.addFraction(new_frac);
	generatePartyImgs();
	updateSidebar();
	cancelAddParty();
}

// reset inputs and hide add party dialog
export function cancelAddParty() {
	document.getElementById("addShortname").value = "";
	document.getElementById("addFullname").value = "";
	document.getElementById("addColor").value = "#000000";
	document.getElementById("addParty").style.display = "none";
}

// delete all currently highlighted parties
export function deleteHighlight() {
	for (const id of getHighlighted()) {
		S.currentParliament.removeFraction(id);
		S.ordTab = S.ordTab.filter((frac) => frac.party.id != id);
		S.ordVis = S.ordVis.filter((frac) => frac.party.id != id);
	}

	highlight(null);
	updateSidebar();
}

// undo all edits to current parliament
export function resetParliament() {
	document.getElementById("title_ps").innerHTML = "";
	document.getElementById("btnReset").disabled = true;
	document.getElementById("btnReset").style.display = "none";
	S.currentParliament = S.originalParliament.clone();
	loadParliament(S.currentParliament);
	S.editMode = false;
	cancelAddParty();
	updateSidebar();
	S.currentParliament.distributeSeats();
}
