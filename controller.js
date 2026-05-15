import { S } from "./main.js";
import { c, ctx, resize_canvas, transform_ctx } from "./canvas.js";
import { load_parliament, load_timeline } from "./loading.js";
import { table_highlight, update_table_footer, update_buttons } from "./sidebar.js";
import { add_party, cancel_add_party, delete_hlt, move_party_left, move_party_right, reset_plm, show_add_menu, sort_table_by_seats, toggle_edit_mode } from "./editing.js";

const btn_prev = document.getElementById("btn_prev");
const btn_next = document.getElementById("btn_next");
const btn_first = document.getElementById("btn_first");
const btn_last = document.getElementById("btn_last");

document.getElementById("btn_edit").onclick = toggle_edit_mode;
document.getElementById("btn_reset").onclick = reset_plm;
document.getElementById("btn_add").onclick = show_add_menu;
document.getElementById("btn_del").onclick = delete_hlt;
document.getElementById("btn_left").onclick = move_party_left;
document.getElementById("btn_right").onclick = move_party_right;
document.getElementById("btn_sort").onclick = sort_table_by_seats;
document.getElementById("btn_confirm_add").onclick = add_party;
document.getElementById("btn_cancel_add").onclick = cancel_add_party;
btn_prev.onclick = prev;
btn_next.onclick = next;
btn_first.onclick = first;
btn_last.onclick = last;

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
	
	if (!S.dragging) {
        highlight(e.currentTarget.id);
    }
});

// when timeline is selected, show sidebar and hide welcome message
document.getElementById("select-timeline").onchange = (e) => {
	document.getElementById("sidebar").style.display = "inline-block";
	document.getElementById("welcome").style.display = "none";
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
	} else if (S.cur_hlt.includes(id)) {
        // remove this party from highlighted
		S.cur_hlt.splice(S.cur_hlt.indexOf(id), 1);
	} else {
        // add this party to highlighted
		S.cur_hlt.push(id);
	}

	table_highlight();
	update_table_footer();
	update_buttons();
}