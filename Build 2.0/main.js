let c = document.getElementById("canvas");
let ctx = TWO.getEnhancedContext(c);
TWO.maximize(c);
ctx.setCameraPosition(1.5, -0.5);

let $sp = new Party("SP", "Socialistische Partij", "#ff0000");
let $pvdd = new Party("PvdD", "Partij voor de Dieren", "#008300ff");
let $glpvda = new Party("GL/PvdA", "GroenLinks / Partij voor de Arbeid", "#27c527ff");
let $denk = new Party("DENK", "DENK", "#25e4e4ff");
let $volt = new Party("Volt", "Volt", "#7719f3ff");
let $d66 = new Party("D66", "Democraten 66", "#4bb90bff");
let $cu = new Party("CU", "ChristenUnie", "#43e3ffff");
let $cda = new Party("CDA", "Christen-Democratisch Appèl", "#49814cff");
let $nsc = new Party("NSC", "Nieuw Sociaal Contract", "#003d66ff");
let $vvd = new Party("VVD", "Volkspartij voor Vrijheid en Democratie", "#1c5c86ff");
let $bbb = new Party("BBB", "BoerBurgerBeweging", "#b0e730ff");
let $ja21 = new Party("JA21", "Juiste Antwoord 21", "#003d66ff");
let $sgp = new Party("SGP", "Staatkundig Gereformeerde Partij", "#ff8800");
let $pvv = new Party("PVV", "Partij voor de Vrijheid", "#90dfffff");
let $fvd = new Party("FvD", "Forum voor Democratie", "#5c1414ff");

let p = new Parliament();
p.add_fraction(new Fraction($sp, 5));
p.add_fraction(new Fraction($pvdd, 3));
p.add_fraction(new Fraction($glpvda, 25));
p.add_fraction(new Fraction($denk, 3));
p.add_fraction(new Fraction($volt, 2));
p.add_fraction(new Fraction($d66, 9));
p.add_fraction(new Fraction($cu, 3));
p.add_fraction(new Fraction($cda, 5));
p.add_fraction(new Fraction($nsc, 20));
p.add_fraction(new Fraction($vvd, 24));
p.add_fraction(new Fraction($bbb, 7));
p.add_fraction(new Fraction($ja21, 1));
p.add_fraction(new Fraction($sgp, 3));
p.add_fraction(new Fraction($pvv, 37));
p.add_fraction(new Fraction($fvd, 3));

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