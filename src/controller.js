import { S, scheduleFrame } from "./main.js";
import { c, ctx, resizeCanvas, transformCtx, RES_MULT } from "./canvas.js";
import { loadParliament, loadTimeline } from "./loading.js";
import { tableHighlight, updateTableFooter, updateButtons, updateSidebar } from "./sidebar.js";
import { addParty, cancelAddParty, deleteHighlight, movePartyLeft, movePartyRight, resetParliament, showAddMenu, sortTableBySeats, toggleEditMode } from "./editing.js";
import { setSpanAngle, setInnerRadius } from "./geometry.js";
import { getQueryParam, setQueryParam } from "./query.js";

const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnFirst = document.getElementById("btnFirst");
const btnLast = document.getElementById("btnLast");

let pointerMovement = 0;

// The globals, function and body-eventlistener below all solve a problem with the button animations.
// When a button is pressed, it moves due to an animation.
// If the mouse is at a part where the button moved away from, 
// it will no longer be captured by btn.onclick.
let pressedRect = null;
let mouseupFunc = null;

function onClick(btn, fn) {
	btn.addEventListener('pointerdown', function (e) {
		pressedRect = btn.getBoundingClientRect();
		mouseupFunc = fn;
	});
}

document.body.addEventListener('pointerup', function (e) {	
	if (pressedRect &&
		e.clientX >= pressedRect.left &&
		e.clientX <= pressedRect.right &&
		e.clientY >= pressedRect.top &&
		e.clientY <= pressedRect.bottom
	) {
		mouseupFunc();
	}
	pressedRect = null;
	mouseupFunc = null;
});

onClick(btnPrev, prev);
onClick(btnNext, next);
onClick(btnFirst, first);
onClick(btnLast, last);
onClick(document.getElementById("btnEdit"), toggleEditMode);
onClick(document.getElementById("btnReset"), resetParliament);
onClick(document.getElementById("btnAdd"), showAddMenu);
onClick(document.getElementById("btnDelete"), deleteHighlight);
onClick(document.getElementById("btnLeft"), movePartyLeft);
onClick(document.getElementById("btnRight"), movePartyRight);
onClick(document.getElementById("btnSort"), sortTableBySeats);
onClick(document.getElementById("btnConfirmAdd"), addParty);
onClick(document.getElementById("btnCancelAdd"), cancelAddParty);
onClick(document.getElementById("btnResetSettings"), reset_settings);

// lose focus on enter press in number input
$(document).on("keyup", "input", function(e) {
	if (e.key === 'Enter') e.currentTarget.blur();
});

// process number input changes
$(document).on("change", "input", function(e) {
	if (e.target.type === 'number') {
		let value = Number(e.target.value);
		e.target.value = value;  // if value is empty, this sets it to 0

		// don´t allow negative value in number field
		if (value < 0) e.target.value = 0;

		// find new total seat amount, possible surplus
		S.currentParliament.setPartySeats(e.target.name, e.target.value);
		let newAmt = S.currentParliament.seatAmt();
		const surplus = Math.max(0, newAmt - 10000);

		// subtract surplus if there is one
		if (surplus > 0) {
			value -= surplus;
			S.currentParliament.setPartySeats(e.target.name, value);
		}

		// apply changes
		e.target.value = value;
		updateTableFooter();
	}
});

// click a table row to highlight it
$(document).on("click", "tbody tr", function(e) {
	if ($(e.target).is("input")) return;

	const tableId = e.currentTarget.parentElement.parentElement.parentElement.id;
	
	if (!S.dragging && tableId === "table") {
		highlight(e.currentTarget.id);
	}
});

function show_sidebar() {
	document.getElementById("sidebar").style.display = "inline-block";
	document.getElementById("welcome").style.display = "none";
	document.getElementById("parliamentSelector").appendChild(document.getElementById("selectTimeline"));
}

// when timeline is selected, show sidebar and hide welcome message
document.getElementById("selectTimeline").onchange = (e) => {
	show_sidebar();
	loadTimeline(e.target.value);
}

// if party seat is clicked, highlight that party
c.addEventListener("pointerdown", (e) => {
	pointerMovement = 0;

	if (!S.currentTimeline) return;

	// for touch, update mouse coords before hit-test, then clear to avoid hovering
	if (e.pointerType !== 'mouse') {
		const rect = c.getBoundingClientRect();
		const mx = (e.clientX - rect.left) * RES_MULT;
		const my = (e.clientY - rect.top) * RES_MULT;
		const transform = ctx.getTransform();
		const inverse = transform.inverse();
		const mousePoint = new DOMPoint(mx, my);
		const mouse = mousePoint.matrixTransform(inverse);
		S.mouseX = mouse.x;
		S.mouseY = mouse.y;
	}
});

c.addEventListener("pointerup", (e) => {
	if (pointerMovement < 20) {
		for (const fraction of S.currentParliament.fractions) {
			for (const seat of fraction.seatCenters) {
				const dist = Math.hypot(seat[0] - S.mouseX, seat[1] - S.mouseY);
				if (dist <= S.currentParliament.getSeatHitboxRadius()) {
					highlight(fraction.party.id);

					// avoid hovering on touch screens
					if (e.pointerType !== 'mouse') {
						S.mouseX = null;
						S.mouseY = null;
					}

					return;
				}
			}
		}

		// if no seat is clicked, remove highlights
		highlight(null);
	}
});

// resize canvas to fill the screen
window.addEventListener('load', (e) => {
	resizeCanvas();
	transformCtx();

	// check for query strings
	const t = getQueryParam("t");
	const p = Number(getQueryParam("p"));
	if (t) {
		show_sidebar();
		loadTimeline(t).then(() => {
			document.getElementById("selectTimeline").value = t;
			if (p) navigate(p);
		});
	}
});

// continue resizing canvas to fill the screen
window.addEventListener('resize', (e) => {
	resizeCanvas();
	transformCtx();
});

// transform mouse coords
window.addEventListener('pointermove', (e) => {
	pointerMovement += Math.hypot(e.movementX, e.movementY);
	if (e.pointerType !== 'mouse') return;  // ignore touch
	const rect = c.getBoundingClientRect();
	const mx = (e.clientX - rect.left) * RES_MULT;
	const my = (e.clientY - rect.top) * RES_MULT;
	const transform = ctx.getTransform();
	const inverse = transform.inverse();
	const mousePoint = new DOMPoint(mx, my);
	const mouse = mousePoint.matrixTransform(inverse);
	S.mouseX = mouse.x;
	S.mouseY = mouse.y;
	scheduleFrame();
});

// add keyboard controls
document.addEventListener('keydown', (e) => {
	if (e.target.closest('input[type="number"]')) return;
	
	if (e.key === 'ArrowLeft') {
		e.preventDefault();
		prev();
	}
	if (e.key === 'ArrowRight') {
		e.preventDefault();
		next();
	}
});

document.getElementById("spanAngle").onchange = function(e) {
	setSpanAngle(Number(e.target.value));
	S.currentParliament.distributeSeats();
	transformCtx();
	
}

document.getElementById("innerRadius").onchange = function(e) {
	setInnerRadius(Number(e.target.value));
	S.currentParliament.distributeSeats();
	transformCtx();
}

document.getElementById("selectAncestors").onchange = function(e) {
	S.selectAncestors = document.getElementById("selectAncestors").checked;
}

document.getElementById("partyLang").onchange = function(e) {
	updateSidebar();
}

// go to previous parliament in the timeline
export function prev() {
	const idx = S.currentTimeline.parliaments.indexOf(S.originalParliament);
	const newIdx = Math.min(idx + 1, S.currentTimeline.parliaments.length - 1);
	navigate(newIdx);
}

// go to next parliament in the timeline
export function next() {
	const idx = S.currentTimeline.parliaments.indexOf(S.originalParliament);
	const newIdx = Math.max(idx - 1, 0);
	navigate(newIdx);
}

export function first() {
	navigate(S.currentTimeline.parliaments.length - 1);
}

export function last() {
	navigate(0);
}

export function navigate(idx) {
	S.originalParliament = S.currentTimeline.parliaments[idx];
	S.currentParliament = S.originalParliament.clone();
	S.editMode = false;
	loadParliament(S.currentParliament);

	setQueryParam("p", idx);

	btnPrev.disabled = btnFirst.disabled = (idx+1 == S.currentTimeline.parliaments.length);
	btnNext.disabled = btnLast.disabled = (idx == 0);
}

// add or remove party from the list of highlighted
export function highlight(id) {
	if (id == null) {
		// remove all highlighted
		S.currentHighlight = [];
	} else if (isHighlighted(id)) {
		const parties = [id];
		if (S.selectAncestors === true) {
			// remove this party and its ancestors from highlighted
			parties.push(... S.currentTimeline.getAncestors(id));
		} 

		S.currentHighlight = S.currentHighlight.filter(p => !parties.includes(p));
	} else {
		if (S.selectAncestors === true) {
			S.currentHighlight.push(id, ... S.currentTimeline.getAncestors(id));
		} else {
			S.currentHighlight.push(id);
		}
	}

	tableHighlight();
	updateTableFooter();
	updateButtons();
	scheduleFrame();
}

// helper function to determine whether or not a party is highlighted
export function isHighlighted(id) {
	return S.currentHighlight.includes(id);
}

// get a list of all highlighted parties
export function getHighlighted() {
	return S.currentHighlight;
}

export function reset_settings() {
	setInnerRadius(0.4);
	document.getElementById("innerRadius").value = 0.4;
	document.getElementById("innerRadius").oninput();
	setSpanAngle(180);
	document.getElementById("spanAngle").value = 180;
	document.getElementById("spanAngle").oninput();

	S.selectAncestors = document.getElementById("selectAncestors").checked = false;

	S.currentParliament.distributeSeats();
	transformCtx();
}
