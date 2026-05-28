import { c, ctx } from "./canvas.js";
import "./controller.js";

// global state object
export const S = {
	ord_tab: [],		// party order in the table
	ord_vis: [],		// party order left-right in the chart
	cur_tml: null,		// current timeline object
	cur_plm: null,		// current (editable) parliament object
	ori_plm: null,		// original unedited parliament object
	cur_hlt: [],		// current highlighted parties
	edit_mode: false,	// whether edit mode is enabled
	dragging: false,	// whether a dragging action is currently happening
	party_imgs: null,	// array of icons for all parties in current parliament
	mouse_x: 0,
	mouse_y: 0,
	ctx_scale: 1,
}

let frameID = null;

export function schedule_frame() {
	if (frameID !== null) return;
	frameID = requestAnimationFrame(update);
}

// main update function
function update() {

	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.restore();

	S.cur_plm?.draw();

	// clean up scheduled frame
	frameID = null;
}
