const btn_prev = document.getElementById("btn_prev");
const btn_next = document.getElementById("btn_next");

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
		cur_plm.set_party_seats(e.target.name, e.target.value);
		let new_amt = cur_plm.seat_amt();
		const surplus = Math.max(0, new_amt - 10000);

		// subtract surplus if there is one
		if (surplus > 0) {
			value -= surplus;
			cur_plm.set_party_seats(e.target.name, value);
		}

        // apply changes
		e.target.value = value;
		update_table_footer();
	}
});

// click a table row to highlight it
$(document).on("click", "tbody tr", function(e) {
    if ($(e.target).is("input")) return;
	
	if (!dragging) {
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
	if (!cur_tml) return;
	for (const fraction of cur_plm.fractions) {
		for (const seat of fraction.seat_centers) {
			const dist = Math.hypot(seat[0] - mouse_x, seat[1] - mouse_y);
			if (dist <= cur_plm.get_seat_hitbox_radius()) {
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
	mouse_x = mouse.x;
	mouse_y = mouse.y;
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

// jQuery sortable table
function make_table_sortable() {
	$(".sortable tbody").sortable({
		distance: 10,
		start: function() {
			dragging = true;
		},
		stop: function() {
			setTimeout(() => { dragging = false }, 100);
		},
		helper: fixWidth,  // keeps the row from collapsing while dragging
		cursor: "move",
		update: function(event, ui) {
			// sort ord_tab to match the new table order
			const new_order = [...event.target.childNodes].map(x => x.id);
			ord_tab.sort((a, b) => { return new_order.indexOf(a.party.id) - new_order.indexOf(b.party.id) });
		}
	}).disableSelection();
}

// helper function to keep table cell widths consistent during drag
function fixWidth(e, ui) {
	ui.children().each(function() {
		$(this).width($(this).width());
	});
	return ui;
}

// go to previous parliament in the timeline
function prev() {
	const idx = cur_tml.parliaments.indexOf(ori_plm);
	const newIdx = Math.min(idx + 1, cur_tml.parliaments.length - 1);
	ori_plm = cur_tml.parliaments[newIdx];
	cur_plm = ori_plm.clone();
	edit_mode = false;
	load_parliament(cur_plm);

	btn_prev.disabled = (newIdx+1 == cur_tml.parliaments.length);
	btn_next.disabled = (newIdx == 0);
}

// go to next parliament in the timeline
function next() {
	const idx = cur_tml.parliaments.indexOf(ori_plm);
	const newIdx = Math.max(idx - 1, 0);
	ori_plm = cur_tml.parliaments[newIdx];
	cur_plm = ori_plm.clone();
	edit_mode = false;
	load_parliament(cur_plm);

	btn_prev.disabled = (newIdx+1 == cur_tml.parliaments.length);
	btn_next.disabled = (newIdx == 0);
}

// add or remove party from the list of highlighted
function highlight(id) {
	if (id == null) {
		// remove all highlighted
        cur_hlt = [];
	} else if (cur_hlt.includes(id)) {
        // remove this party from highlighted
		cur_hlt.splice(cur_hlt.indexOf(id), 1);
	} else {
        // add this party to highlighted
		cur_hlt.push(id);
	}

	table_highlight();
	update_table_footer();
	update_buttons();
}