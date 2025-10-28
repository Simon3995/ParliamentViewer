// init
const c = document.getElementById("canvas");
const ctx = TWO.getEnhancedContext(c);
TWO.maximize(c);
ctx.setCameraPosition(1.5 * GMULT, -0.5 * GMULT);

set_zoom_level();
table(T.parliaments[0]);

update();

// main update loop
function update() {
    requestAnimationFrame(update);
    
	// draw seats
	ctx.clearRect(0, 0, c.width, c.height);
    T.parliaments[0].draw(ctx);
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