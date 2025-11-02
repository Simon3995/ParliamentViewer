// init
const c = document.getElementById("canvas");
const ctx = TWO.getEnhancedContext(c);
TWO.maximize(c);
ctx.setCameraPosition(1.5 * GMULT, -0.5 * GMULT);

set_zoom_level();
let cur_plm = T.parliaments[0];
load_parliament(cur_plm);

update();

// main update loop
function update() {
	requestAnimationFrame(update);
	
	// draw seats
	ctx.clearRect(0, 0, c.width, c.height);
	cur_plm.draw(ctx);
}

function prev() {
	const idx = T.parliaments.indexOf(cur_plm);
	const newIdx = (idx >= 0 ? (idx + 1) % T.parliaments.length : 0);
	cur_plm = T.parliaments[newIdx];
	load_parliament(cur_plm);
}

function next() {
	const idx = T.parliaments.indexOf(cur_plm);
	const newIdx = (idx >= 0 ? (idx - 1 + T.parliaments.length) % T.parliaments.length : 0);
	cur_plm = T.parliaments[newIdx];
	load_parliament(cur_plm);
}

function load_parliament(parliament) {
	document.getElementById("title").innerHTML = parliament.description;
	table(parliament);
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
		const prevIdx = (T.parliaments.indexOf(parliament) + 1);
		const prevParl = T.parliaments[prevIdx];
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

		string += '<tr class="tablerow">';
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
	const prev_idx = (T.parliaments.indexOf(parliament) + 1);
	const prev_parl = T.parliaments[prev_idx];
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

// set the correct zoom level for the canvas for the current window size
function set_zoom_level() {
	ctx.setZoom(0.325 * c.width / GMULT);
}

// fix zoom level when window size changes
window.addEventListener("resize", set_zoom_level, false);

// add keyboard controls
document.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowLeft') prev();
	if (e.key === 'ArrowRight') next();
});