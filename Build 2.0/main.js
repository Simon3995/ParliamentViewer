let c = document.getElementById("canvas");
let ctx = TWO.getEnhancedContext(c);
TWO.maximize(c);
ctx.setCameraPosition(1.5, -0.5);

let p = new Parliament();
p.add_fraction(new Fraction($sp, 4));
p.add_fraction(new Fraction($pvdd, 4));
p.add_fraction(new Fraction($glpvda, 24));
p.add_fraction(new Fraction($denk, 3));
p.add_fraction(new Fraction($volt, 3));
p.add_fraction(new Fraction($d66, 21));
p.add_fraction(new Fraction($cu, 3));
p.add_fraction(new Fraction($cda, 20));
p.add_fraction(new Fraction($50plus, 2));
p.add_fraction(new Fraction($vvd, 16));
p.add_fraction(new Fraction($bbb, 3));
p.add_fraction(new Fraction($ja21, 12));
p.add_fraction(new Fraction($sgp, 3));
p.add_fraction(new Fraction($pvv, 28));
p.add_fraction(new Fraction($fvd, 4));

table(p);

update();

function update() {
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, c.width, c.height);
    p.draw(ctx);
    ctx.setZoom(c.width / 3.05);
}

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