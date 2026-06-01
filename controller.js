import { S, schedule_frame } from "./main.js";
import { c, ctx, resize_canvas, transform_ctx } from "./canvas.js";
import { load_parliament, load_timeline } from "./loading.js";
import { table_highlight, update_table_footer, update_buttons } from "./sidebar.js";
import { add_party, cancel_add_party, delete_hlt, move_party_left, move_party_right, reset_plm, show_add_menu, sort_table_by_seats, toggle_edit_mode } from "./editing.js";
import { set_span_angle, set_inner_radius } from "./geometry.js";

const btn_prev = document.getElementById("btn_prev");
const btn_next = document.getElementById("btn_next");
const btn_first = document.getElementById("btn_first");
const btn_last = document.getElementById("btn_last");

// The globals, function and body-eventlistener below all solve a problem with the button animations.
// When a button is pressed, it moves due to an animation.
// If the mouse is at a part where the button moved away from, 
// it will no longer be captured by btn.onclick.
let pressed_rect = null;
let mouseup_fn = null;
function on_click(btn, fn) {
	btn.addEventListener('mousedown', function (e) {
		pressed_rect = btn.getBoundingClientRect();
		mouseup_fn = fn;
	});
}
document.body.addEventListener('mouseup', function (e) {
	if (pressed_rect &&
		e.clientX >= pressed_rect.left &&
		e.clientX <= pressed_rect.right &&
		e.clientY >= pressed_rect.top &&
		e.clientY <= pressed_rect.bottom
	) {
		mouseup_fn();
	}
	pressed_rect = null;
	mouseup_fn = null;
});

on_click(btn_prev, prev);
on_click(btn_next, next);
on_click(btn_first, first);
on_click(btn_last, last);
on_click(document.getElementById("btn_edit"), toggle_edit_mode);
on_click(document.getElementById("btn_reset"), reset_plm);
on_click(document.getElementById("btn_add"), show_add_menu);
on_click(document.getElementById("btn_del"), delete_hlt);
on_click(document.getElementById("btn_left"), move_party_left);
on_click(document.getElementById("btn_right"), move_party_right);
on_click(document.getElementById("btn_sort"), sort_table_by_seats);
on_click(document.getElementById("btn_confirm_add"), add_party);
on_click(document.getElementById("btn_cancel_add"), cancel_add_party);
on_click(document.getElementById("btn_reset_settings"), reset_settings);

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
		S.cur_plm.set_party_seats(e.target.name, e.target.value);
		let new_amt = S.cur_plm.seat_amt();
		const surplus = Math.max(0, new_amt - 10000);

		// subtract surplus if there is one
		if (surplus > 0) {
			value -= surplus;
			S.cur_plm.set_party_seats(e.target.name, value);
		}

        // apply changes
		e.target.value = value;
		update_table_footer();
	}
});

// click a table row to highlight it
$(document).on("click", "tbody tr", function(e) {
    if ($(e.target).is("input")) return;

	const table_id = e.currentTarget.parentElement.parentElement.parentElement.id;
	
	if (!S.dragging && table_id === "table") {
        highlight(e.currentTarget.id);
    }
});

// when timeline is selected, show sidebar and hide welcome message
document.getElementById("select-timeline").onchange = (e) => {
	document.getElementById("sidebar_hidden").style.display = "inline-block";
	document.getElementById("welcome").style.display = "none";
	document.getElementById("plm_selector").appendChild(document.getElementById("select-timeline"))
	load_timeline(e.target.value);
}

// if party seat is clicked, highlight that party
c.addEventListener("mousedown", (e) => {
	if (!S.cur_tml) return;
	for (const fraction of S.cur_plm.fractions) {
		for (const seat of fraction.seat_centers) {
			const dist = Math.hypot(seat[0] - S.mouse_x, seat[1] - S.mouse_y);
			if (dist <= S.cur_plm.get_seat_hitbox_radius()) {
				highlight(fraction.party.id);
				return;
			}
		}
	}

    // if no seat is clicked, remove highlights
	highlight(null);
});

// resize canvas to fill the screen
window.addEventListener('load', (e) => {
	resize_canvas();
	transform_ctx();
});

// continue resizing canvas to fill the screen
window.addEventListener('resize', (e) => {
	resize_canvas();
	transform_ctx();
});

// transform mouse coords
window.addEventListener('mousemove', (e) => {
	const rect = c.getBoundingClientRect();
	const mx = e.clientX - rect.left;
	const my = e.clientY - rect.top;
	const transform = ctx.getTransform();
	const inverse = transform.inverse();
	const mouse_point = new DOMPoint(mx, my);
	const mouse = mouse_point.matrixTransform(inverse);
	S.mouse_x = mouse.x;
	S.mouse_y = mouse.y;
	schedule_frame();
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

document.getElementById("span_angle").onchange = function(e) {
    set_span_angle(Number(e.target.value));
	S.cur_plm.distribute_seats();
	transform_ctx();
	
}

document.getElementById("inner_radius").onchange = function(e) {
    set_inner_radius(Number(e.target.value));
	S.cur_plm.distribute_seats();
	transform_ctx();
}

document.getElementById("sel_ancestors").onchange = function(e) {
	S.sel_ancestors = document.getElementById("sel_ancestors").checked;
}

// go to previous parliament in the timeline
export function prev() {
	const idx = S.cur_tml.parliaments.indexOf(S.ori_plm);
	const newIdx = Math.min(idx + 1, S.cur_tml.parliaments.length - 1);
	S.ori_plm = S.cur_tml.parliaments[newIdx];
	S.cur_plm = S.ori_plm.clone();
	S.edit_mode = false;
	load_parliament(S.cur_plm);

	btn_prev.disabled = btn_first.disabled = (newIdx+1 == S.cur_tml.parliaments.length);
	btn_next.disabled = btn_last.disabled = (newIdx == 0);
}

// go to next parliament in the timeline
export function next() {
	const idx = S.cur_tml.parliaments.indexOf(S.ori_plm);
	const newIdx = Math.max(idx - 1, 0);
	S.ori_plm = S.cur_tml.parliaments[newIdx];
	S.cur_plm = S.ori_plm.clone();
	S.edit_mode = false;
	load_parliament(S.cur_plm);

	btn_prev.disabled = btn_first.disabled = (newIdx+1 == S.cur_tml.parliaments.length);
	btn_next.disabled = btn_last.disabled = (newIdx == 0);
}

export function first() {
	S.ori_plm = S.cur_tml.parliaments[S.cur_tml.parliaments.length - 1];
	S.cur_plm = S.ori_plm.clone();
	S.edit_mode = false;
	load_parliament(S.cur_plm);

	btn_prev.disabled = btn_first.disabled = true;
	btn_next.disabled = btn_last.disabled = false;
	
}

export function last() {
	S.ori_plm = S.cur_tml.parliaments[0];
	S.cur_plm = S.ori_plm.clone();
	S.edit_mode = false;
	load_parliament(S.cur_plm);

	btn_prev.disabled = btn_first.disabled = false;
	btn_next.disabled = btn_last.disabled = true;
}

// add or remove party from the list of highlighted
export function highlight(id) {
	if (id == null) {
		// remove all highlighted
        S.cur_hlt = [];
	} else if (is_highlighted(id)) {
		const parties = [id];
		if (S.sel_ancestors === true) {
			// remove this party and its ancestors from highlighted
			parties.push(... S.cur_tml.get_ancestors(id));
		} 

		S.cur_hlt = S.cur_hlt.filter(p => !parties.includes(p));
	} else {
		if (S.sel_ancestors === true) {
			S.cur_hlt.push(id, ... S.cur_tml.get_ancestors(id));
		} else {
			S.cur_hlt.push(id);
		}
	}

	table_highlight();
	update_table_footer();
	update_buttons();
	schedule_frame();
}

// helper function to determine whether or not a party is highlighted
export function is_highlighted(id) {
	return S.cur_hlt.includes(id);
}

// get a list of all highlighted parties
export function get_highlighted() {
	return S.cur_hlt;
}

export function reset_settings() {
	set_inner_radius(0.4);
	document.getElementById("inner_radius").value = 0.4;
	document.getElementById("inner_radius").oninput();
	set_span_angle(180);
	document.getElementById("span_angle").value = 180;
	document.getElementById("span_angle").oninput();

	S.sel_ancestors = document.getElementById("sel_ancestors").checked = false;

	S.cur_plm.distribute_seats();
	transform_ctx();
}