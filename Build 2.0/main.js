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

        string += '<tr class="tablerow">';
		string += "<td>" + frac.party.name + "</td>";
		string += "<td>" + frac.party.fullname + "</td>";
		string += "<td>" + frac.seat_amt + "</td>";

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