// init
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
let cur_tml = null;		// current timeline object
let cur_plm = null;		// current (editable) parliament object
let ori_plm = null;		// original unedited parliament object
let cur_hlt = [];		// current highlighted parties
let edit_mode = false;	// whether edit mode is enabled
let dragging = false;	// whether a dragging action is currently happening
let party_imgs = null;	// array of icons for all parties in current parliament
let mouse_x = 0;		// current mouse X coord
let mouse_y = 0;		// current mouse Y coord
let ord_tab = [];		// party order in the table
let ord_vis = [];		// party order left-right visually

const btn_prev = document.getElementById("btn_prev");
const btn_next = document.getElementById("btn_next");

update();

// main update loop
function update() {
	requestAnimationFrame(update);

	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.restore();

	cur_plm?.draw();
}

function resize_canvas() {
	c.width = window.innerWidth;
	c.height = window.innerHeight;
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

function highlight(id) {
	if (id == null) {
		cur_hlt = [];
	} else if (cur_hlt.includes(id)) {
		cur_hlt.splice(cur_hlt.indexOf(id), 1);
	} else {
		cur_hlt.push(id);
	}

	table_highlight();
	update_table_footer();
	update_buttons();
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

function transform_ctx() {
	const target_w = c.width * (2/3);
	const target_h = c.height;
	const scale = Math.min(target_w / 2, target_h / 1);
	const offset_x = (target_w - (scale * 2)) / 2;
	const offset_y = (target_h - (scale * 1)) / 2;
	
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.translate(offset_x, canvas.height - offset_y);
	ctx.scale(scale, scale);
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