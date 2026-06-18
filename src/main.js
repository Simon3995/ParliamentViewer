import { c, ctx } from "./canvas.js";
import "./controller.js";

// global state object
export const S = {
	ordTab: [],        // party order in the table
	ordVis: [],        // party order left-right in the chart
	currentTimeline: null,      // current timeline object
	currentParliament: null,      // current (editable) parliament object
	originalParliament: null,      // original unedited parliament object
	currentHighlight: [],        // current highlighted parties
	editMode: false,   // whether edit mode is enabled
	dragging: false,    // whether a dragging action is currently happening
	partyImgs: null,   // array of icons for all parties in current parliament
	mouseX: 0,
	mouseY: 0,
	ctxScale: 1,
	selectAncestors: document.getElementById("selectAncestors").checked,
}

let frameID = null;

export function scheduleFrame() {
	if (frameID !== null) return;
	frameID = requestAnimationFrame(update);
}

// main update function
function update() {

	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.restore();

	S.currentParliament?.draw();

	// clean up scheduled frame
	frameID = null;
}
