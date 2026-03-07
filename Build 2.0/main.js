// init
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
let cur_tml, cur_plm, cur_hlt = null, party_imgs, mouse_x, mouse_y;
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

function highlight(id) {
	cur_hlt = id;

	document.querySelectorAll("tr.highlighted").forEach(row => {
		row.classList.remove("highlighted");
	});

	const hl_row = document.getElementById(id);
	if (hl_row && hl_row.tagName === 'TR') {
		hl_row.classList.add("highlighted");
	}
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
}

function next() {
	const idx = cur_tml.parliaments.indexOf(cur_plm);
	const newIdx = Math.max(idx - 1, 0);
	cur_plm = cur_tml.parliaments[newIdx];
	load_parliament(cur_plm);
}

function load_parliament(parliament) {
	document.getElementById("title").innerHTML = parliament.description;
	table(parliament);
}

function load_timeline(name) {
	cur_tml = Timelines[name];
	cur_plm = cur_tml.parliaments[0];
	load_parliament(cur_plm);
	generate_party_imgs();
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
			const scale = 0.4*s;
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
function table(parliament) {
	let string = "";
	let total_seats = 0;
	string += `<table>`;
	
	let fracs = [...parliament.fractions];
	fracs.sort((a, b) => b.seat_amt - a.seat_amt);
	
	string += '<tr>';
	string += '<th class="col_l">Party</th>';
    string += '<th class="col_m">Full Name</th>';
    string += '<th class="col_r">Seats</th>';
    string += '</tr>';

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
		if (diff > 0)
			diff = '<span class="green">&#9650;' + diff + '</span>';
		if (diff < 0) {
			diff = '<span class="red">&#9660;' + Math.abs(diff) + '</span>';
		} else if (diff === 0) {
			diff = '<span class="blue">=</span>';
		}

		// click event
		let onclick = `onclick="highlight('${frac.party.id}')"`;
		let id = `id=${frac.party.id}`;

		string += `<tr ${id} ${onclick} class="tablerow">`;
		string += "<td>" + frac.party.name + "</td>";
		string += "<td>" + frac.party.fullname + "</td>";
		string += `<td>${frac.seat_amt} (${diff})</td>`;

		total_seats += frac.seat_amt;
	}

	string += '<tr>';
	string += '<th>Total</th>';
	string += '<th></th>';
	string += '<th>' + total_seats + '</th>';
	string += '</tr>';

	string += "</table>";
	
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

	highlight(cur_hlt);  // re-highlight
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
			if (dist <= cur_plm.get_seat_radius() && cur_hlt == null) {
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