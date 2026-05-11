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

function reset_plm() {
	document.getElementById("title_ps").innerHTML = "";
	document.getElementById("btn_reset").disabled = true;
	cur_plm = ori_plm.clone();
	load_parliament(cur_plm);
	edit_mode = false;
	update_sidebar();
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
	if (edit_mode) document.getElementById("title_ps").innerHTML = " (Edited)";
	document.getElementById("btn_reset").disabled = false;
	update_sidebar();
}

function delete_hlt() {
	for (const id of cur_hlt) {
		cur_plm.remove_fraction(id);
		ord_tab = ord_tab.filter((frac) => frac.party.id != id);
		ord_vis = ord_vis.filter((frac) => frac.party.id != id);
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
	const idx = cur_tml.parliaments.indexOf(ori_plm);
	const newIdx = Math.min(idx + 1, cur_tml.parliaments.length - 1);
	ori_plm = cur_tml.parliaments[newIdx];
	cur_plm = ori_plm.clone();
	edit_mode = false;
	load_parliament(cur_plm);

	btn_prev.disabled = (newIdx+1 == cur_tml.parliaments.length);
	btn_next.disabled = (newIdx == 0);
}

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

// dankjewel claude
function load_img(party, src) {
    return new Promise((resolve) => {  // no reject parameter!
        if (!src) {
			party.image_loaded = false;
			resolve(party);
			return;
		}
		party.image.onload = () => {
            party.image_loaded = true;
            resolve(party);
        };
        party.image.onerror = () => {
            party.image_loaded = false;  // mark as failed
            resolve(party);             // still resolve, not reject
        };
        party.image.src = src;
    });
}

async function load_timeline(name) {
	const file = await fetch(`./timelines/${name}.json`);
	const data = await file.json();
	ord_tab = [];
	ord_vis = [];
	cur_tml = new Timeline(data.name);

	// track image loading
	const image_promises = [];
	
	// construct list of parties
	for (const party_id in data.parties) {
		const pdata = data.parties[party_id];
		const party = new Party(pdata.shortname, pdata.fullname, party_id, pdata.color, new Image());
		image_promises.push(load_img(party, pdata.image));
		cur_tml.parties[party_id] = party;
	}

	await Promise.all(image_promises);

	// construct list of parliaments
	cur_tml.parliaments = data.parliaments.map(par => {
		return new Parliament(par.fractions.map(frac => {
			return new Fraction(cur_tml.parties[frac.id], frac.seats);
			//return "bingus";
		}), par.name, new Date(par.date));
	});
	
	ori_plm = cur_tml.parliaments[0];
	cur_plm = ori_plm.clone();
	load_parliament(cur_plm);
	generate_party_imgs();
	highlight(null);
	next();
	update();
}

function load_parliament(parliament) {
	// set initial table order + visual order
	ord_tab = [];
	ord_vis = [];
	for (const frac of cur_plm.fractions) {
		ord_tab.push(frac);
		ord_vis.push(frac);
	}

	// sort the table order by seat amount
	ord_tab.sort((a,b) => {return b.seat_amt - a.seat_amt});

	document.getElementById("title").innerHTML = parliament.description;
	document.getElementById("title_ps").innerHTML = "";
	update_sidebar();
}

function generate_party_imgs() {
	party_imgs = {};
	const s = 200;
	for (const name in cur_tml.parties) {
		const party = cur_tml.parties[name];
		const sprite = document.createElement("canvas");
		const sctx = sprite.getContext("2d");
		sprite.width = sprite.height = s;
		sctx.fillStyle = party.color;
		sctx.arc(s/2, s/2, s/2, 0, 2*Math.PI);
		sctx.fill();
		if (party.image_loaded) {
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
	let parliament = ori_plm;
	let string = "";
	let total_seats = 0;
	let total_hlt = 0;
	string += `<table>`;
	string += `<thead>`
	
	let fracs = [...ord_tab];
	
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

	string += `</tbody>`;
	string += `<tfoot><tr id="footer"></tr></tfoot>`;
	string += `</table>`;
	
	// insert HTML string into document
	document.getElementById("table").innerHTML = string;

	// find parties that left parliament
	let left_plm = [];
	const prev_idx = (cur_tml.parliaments.indexOf(parliament) + 1);
	const prev_parl = cur_tml.parliaments[prev_idx];
	if (prev_parl) {
		const curr_party_names = new Set(cur_plm.fractions.map(f => f.party.name));
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
	let parliament = ori_plm;
	let string = "";
	let total_seats = 0;
	let total_hlt = 0;
	string += `<table class="sortable">`;
	string += `<thead>`
	
	let fracs = [...ord_tab];
	
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
		string += `<td><input name="${frac.party.id}" type="number" value="${frac.seat_amt}" min="0" max="10000"></td>`;

		total_seats += frac.seat_amt;
		if (cur_hlt.includes(frac.party.id)) total_hlt += frac.seat_amt;
	}

	string += `</tbody>`;
	string += `<tfoot><tr id="footer"></tr></tfoot>`;
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

window.addEventListener('resize', (e) => {
	resize_canvas();
	transform_ctx();
});

window.addEventListener('load', (e) => {
	resize_canvas();
	transform_ctx();
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
	highlight(null);
});

document.getElementById("select-timeline").onchange = (e) => {
	document.getElementById("sidebar").style.display = "inline-block";
	load_timeline(e.target.value);
}

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

function sort_table_by_seats() {
	ord_tab.sort((a, b) => b.seat_amt - a.seat_amt);

	update_sidebar();
}

function move_party_left() {
	const idx = ord_vis.findIndex(elem => elem.party.id === cur_hlt[0]);
	if (idx <= 0) return; // can't move further left
	[ord_vis[idx - 1], ord_vis[idx]] = [ord_vis[idx], ord_vis[idx - 1]];
	cur_plm.distribute_seats();
}

function move_party_right() {
	const idx = ord_vis.findIndex(elem => elem.party.id === cur_hlt[0]);
	if (idx === -1 || idx >= ord_vis.length - 1) return; // can´t move further right
	[ord_vis[idx + 1], ord_vis[idx]] = [ord_vis[idx], ord_vis[idx + 1]];
	cur_plm.distribute_seats();
}

function show_add_menu() {
	document.getElementById("add_party").style.display = "inline-block";
}

function add_party() {
	const add_shortname = document.getElementById("add_shortname").value;
	const add_fullname = document.getElementById("add_fullname").value;
	const add_color = document.getElementById("add_color").value;

	if (add_shortname === '') {
		alert("No short name entered!");
		return;
	}

	if (add_fullname === '') {
		alert("No full name entered!");
		return;
	}

	const id = add_shortname.toLowerCase();
	let num = 0;
	while (cur_tml.parties[id+num]) num++;
	const new_party = new Party(add_shortname, add_fullname, id+num, add_color, new Image());
	cur_tml.parties[id+num] = new_party;
	const new_frac = new Fraction(new_party, 1);
	ord_tab.push(new_frac);
	ord_vis.push(new_frac);
	cur_plm.add_fraction(new_frac);
	generate_party_imgs();
	update_sidebar();
	cancel_add_party();
}

function cancel_add_party() {
	document.getElementById("add_shortname").value = "";
	document.getElementById("add_fullname").value = "";
	document.getElementById("add_color").value = "#000000";
	document.getElementById("add_party").style.display = "none";
}

$(document).on("click", "tbody tr", function(e) {
    if ($(e.target).is("input")) return;
	
	if (!dragging) {
        highlight(e.currentTarget.id);
    }
});

$(document).on("change", "input", function(e) {
	if (e.target.type === 'number') {
		let value = Number(e.target.value);
		e.target.value = value;

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

		e.target.value = value;
		update_table_footer();
	}
});

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