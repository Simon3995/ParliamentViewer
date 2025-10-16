let c = document.getElementById("canvas");
let ctx = TWO.getEnhancedContext(c);
TWO.maximize(c);
ctx.setCameraPosition(1.5, -0.5);

let red_party = new Party("RP", "Staatkundig Gereformeerde Partij", "#ff0000");
let green_party = new Party("GP", "GroenLinks / Partij van de Arbeid", "#00cc00");
let blue_party = new Party("BP", "Volkspartij voor Vrijheid en Democratie", "#0000ff");

let p = new Parliament();
p.add_fraction(new Fraction(red_party, 50));
p.add_fraction(new Fraction(green_party, 27000));
p.add_fraction(new Fraction(blue_party, 50));

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
	string += `<table>`;
	
	let fracs = [...parliament.fractions];
	fracs.sort((a, b) => b.seat_amt - a.seat_amt);
	
	string += '<tr>';
    string += '<th>Party</th>';
    string += '<th>Full Name</th>';
    string += '<th>Seats</th>';
    string += '<th>Difference</th>';
    string += '</tr>';

    // write all table HTML to a string
	for (let i in fracs) {
		i = Number(i);
        const frac = fracs[i];

        string += '<tr class="tablerow">';
		string += "<td>" + frac.party.name + "</td>";
		string += "<td>" + frac.party.fullname + "</td>";
		string += "<td>" + frac.seat_amt + "</td>";
		string += "<td>diff</td>";
	}
	string += "</table>";
	
	// insert HTML string into document
	document.getElementById("table").innerHTML = string;
}