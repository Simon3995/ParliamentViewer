// init
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
const prev_btn = document.getElementById("prev_btn");
const next_btn = document.getElementById("next_btn");
let cur_tml, cur_plm, cur_hlt = [], party_imgs, mouse_x, mouse_y;
let dragging = false;
let edit_mode = false;
load_timeline("nl_tweedekamer");
update();

// main update loop
function update() {
	requestAnimationFrame(update);

	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.restore();

	cur_plm.draw();
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

function toggle_edit_mode() {
	edit_mode = !edit_mode;
	update_sidebar();
}

function delete_hlt() {
	for (const id of cur_hlt) {
		cur_plm.remove_fraction(id);
	}

	highlight(null);
	update_sidebar();
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

function prev() {
	const idx = cur_tml.parliaments.indexOf(cur_plm);
	const newIdx = Math.min(idx + 1, cur_tml.parliaments.length - 1);
	cur_plm = cur_tml.parliaments[newIdx];
	load_parliament(cur_plm);

	prev_btn.disabled = (newIdx+1 == cur_tml.parliaments.length);
	next_btn.disabled = (newIdx == 0);
}

function next() {
	const idx = cur_tml.parliaments.indexOf(cur_plm);
	const newIdx = Math.max(idx - 1, 0);
	cur_plm = cur_tml.parliaments[newIdx];
	load_parliament(cur_plm);

	prev_btn.disabled = (newIdx+1 == cur_tml.parliaments.length);
	next_btn.disabled = (newIdx == 0);
}

function load_parliament(parliament) {
	document.getElementById("title").innerHTML = parliament.description;
	
	update_sidebar();
}

function load_timeline(name) {
	cur_tml = Timelines[name];
	cur_plm = cur_tml.parliaments[0];
	load_parliament(cur_plm);
	generate_party_imgs();
	next();
}

function generate_party_imgs() {
	party_imgs = [];
	const s = 200;
	for (const name in cur_tml.parties) {
		const party = cur_tml.parties[name];
		const sprite = document.createElement("canvas");
		const sctx = sprite.getContext("2d");
		sprite.width = sprite.height = s;
		sctx.fillStyle = party.color;
		sctx.arc(s/2, s/2, s/2, 0, 2*Math.PI);
		sctx.fill();
		if (party.image.src) {
			const scale = s/2;
			sctx.drawImage(party.image, s/2-scale, s/2-scale, 2*scale, 2*scale);
		} else {
			sctx.fillStyle = "white";
			sctx.textAlign = "center";
			sctx.textBaseline = "middle";
			sctx.font = `bold ${0.56*s}px Atkinson`;
			sctx.fillText(party.name, s/2, 0.54*s, 0.85*s);
		}
		party_imgs[party.id] = sprite;
	}
}

// generate a seat table based on a parliament object
function table() {
	let parliament = cur_plm;
	let string = "";
	let total_seats = 0;
	let total_hlt = 0;
	edit_mode = false;
	string += `<table>`;
	string += `<thead>`
	
	let fracs = [...parliament.fractions];
	fracs.sort((a, b) => b.seat_amt - a.seat_amt);
	
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
		const prevIdx = (cur_tml.parliaments.indexOf(parliament) + 1);
		const prevParl = cur_tml.parliaments[prevIdx];
		if (prevParl) {
			const prevFrac = prevParl.fractions.find(f => f.party.name === frac.party.name);
			diff = prevFrac ? frac.seat_amt - prevFrac.seat_amt : frac.seat_amt;
		}
		
		if (diff == frac.seat_amt) {
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
		string += `<td>${frac.seat_amt} (${diff})</td>`;

		total_seats += frac.seat_amt;
		if (cur_hlt.includes(frac.party.id)) total_hlt += frac.seat_amt;
	}

	string += `<tr id="footer"></tr>`;

	string += "</tbody></table>";
	
	// insert HTML string into document
	document.getElementById("table").innerHTML = string;

	// find parties that left parliament
	let left_plm = [];
	const prev_idx = (cur_tml.parliaments.indexOf(parliament) + 1);
	const prev_parl = cur_tml.parliaments[prev_idx];
	if (prev_parl) {
		const curr_party_names = new Set(parliament.fractions.map(f => f.party.name));
		left_plm = prev_parl.fractions
			.filter(f => !curr_party_names.has(f.party.name))
			.map(f => f.party);
	} else {
		left_plm = [];
	}
	if (left_plm.length) {
		let left_string = '<h2>&#8618; Left Parliament</h2>';
		left_string += '<table><tr><th class="col_l">Party</th><th class="col_m">Full Name</th><th class="col_r">Seats</th></tr>';
		for (const party of left_plm) {
			left_string += '<tr>';
			left_string += `<td>${party.name}</td>`;
			left_string += `<td>${party.fullname}</td>`;
			const prev_frac = prev_parl.fractions.find(f => f.party.name === party.name);
			left_string += `<td>0 (<span class="red">&#9660;${prev_frac ? prev_frac.seat_amt : 0}</span>)</td>`;
			left_string += '</tr>';
		}
		left_string += '</table>';
		document.getElementById("left_plm").innerHTML = left_string;
	} else {
		document.getElementById("left_plm").innerHTML = '';
	}
}

function table_edit_mode() {
	let parliament = cur_plm;
	let string = "";
	let total_seats = 0;
	let total_hlt = 0;
	edit_mode = true;
	string += `<table class="sortable">`;
	string += `<thead>`
	
	let fracs = [...parliament.fractions];
	fracs.sort((a, b) => b.seat_amt - a.seat_amt);
	
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
		const prevIdx = (cur_tml.parliaments.indexOf(parliament) + 1);
		const prevParl = cur_tml.parliaments[prevIdx];
		if (prevParl) {
			const prevFrac = prevParl.fractions.find(f => f.party.name === frac.party.name);
			diff = prevFrac ? frac.seat_amt - prevFrac.seat_amt : frac.seat_amt;
		}
		
		if (diff == frac.seat_amt) {
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
		string += `<td><input name="${frac.party.id}" type="number" value="${frac.seat_amt}" min="0" max="5000"></td>`;

		total_seats += frac.seat_amt;
		if (cur_hlt.includes(frac.party.id)) total_hlt += frac.seat_amt;
	}

	string += `<tr id="footer"></tr>`;

	string += `</tbody>`;
	string += "</table>";
	
	// insert HTML string into document
	document.getElementById("table").innerHTML = string;
	document.getElementById("left_plm").innerHTML = '';

	make_table_sortable();
}

function update_table_footer() {
	const footer = document.getElementById("footer");
	const total_seats = cur_plm.seat_amt();
	let total_hlt = 0;
	for (const frac of cur_plm.fractions)
		if (cur_hlt.includes(frac.party.id))
			total_hlt += frac.seat_amt;
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

function update_buttons() {
	const edit_btn = document.getElementById("edit_btn");
	const add_btn = document.getElementById("add_btn");
	const delete_btn = document.getElementById("delete_btn");
	const left_btn = document.getElementById("left_btn");
	const right_btn = document.getElementById("right_btn");
	const sort_btn = document.getElementById("sort_btn");

	if (edit_mode) {
		edit_btn.style.backgroundColor = "#488cae";
		add_btn.disabled = false;
		sort_btn.disabled = false;
		left_btn.disabled = (cur_hlt.length != 1);
		right_btn.disabled = (cur_hlt.length != 1);
		delete_btn.disabled = (cur_hlt.length == 0);
	} else {
		edit_btn.style.backgroundColor = "#483d8b";
		add_btn.disabled = true;
		delete_btn.disabled = true;
		left_btn.disabled = true;
		right_btn.disabled = true;
		sort_btn.disabled = true;
	}
}

// add keyboard controls
document.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowLeft') {
		e.preventDefault();
		prev();
	}
	if (e.key === 'ArrowRight') {
		e.preventDefault();
		next();
	}
});

window.addEventListener('resize', (e) => {
	resize_canvas();
	transform_ctx();
});

window.addEventListener('load', (e) => {
	resize_canvas();
	transform_ctx();
	generate_party_imgs();
});

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

c.addEventListener("mousedown", (e) => {
	for (const fraction of cur_plm.fractions) {
		for (const seat of fraction.seat_centers) {
			const dist = Math.hypot(seat[0] - mouse_x, seat[1] - mouse_y);
			if (dist <= cur_plm.get_seat_hitbox_radius()) {
				highlight(fraction.party.id);
				return;
			}
		}
	}
	highlight(null);
});

document.getElementById("select-timeline").onchange = (e) => {
	load_timeline(e.target.value);
	cur_plm = cur_tml.parliaments[0];
	highlight(null);
	load_parliament(cur_plm);

	update();
}

// jQuery sortable table
function make_table_sortable() {
	$(".sortable tbody").sortable({
		distance: 10,
		start: function() {
			dragging = true;
		},
		stop: function() {
			setTimeout(() => { dragging = false; }, 100);
		},
		helper: fixWidth,        // keeps the row from collapsing while dragging
		cursor: "move",          // changes cursor to a 'move' icon
		update: function(event, ui) {
			// you can get the new order of IDs here if needed
		}
	}).disableSelection();
}

$(document).on("click", "tr", function(e) {
    if ($(e.target).is("input")) return;
	
	if (!dragging) {
        highlight(e.currentTarget.id);
    }
});

$(document).on("change", "input", function(e) {
	if (e.target.value == '') e.target.value = 0;
	cur_plm.set_party_seats(e.target.name, e.target.value);
	update_table_footer();
});

// // set seat amount on input change
// 	document.querySelectorAll("input[type=number]").forEach(function(input) {
// 		input.addEventListener("change", function(e) {
// 			if (e.target.value = '') e.target.value = 0;
// 			cur_plm.set_party_seats(e.target.name, e.target.value);
// 		});
// 	});

// lose focus on enter press in number input
$(document).on("keyup", "input", function(e) {
	if (e.key === 'Enter') e.currentTarget.blur();
});

// helper function to keep table cell widths consistent during drag
function fixWidth(e, ui) {
	ui.children().each(function() {
		$(this).width($(this).width());
	});
	return ui;
}