let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let rows = [];
rows[150] = [30,26,24,21,19,16,14];
rows[100] = [23,20,18,15,13,11];
rows[68]  = [18,16,14,11,9];
let seats = [];

let mouseX = 0;
let mouseY = 0;

let currentYear = 2021;		// i think you can guess what this one does
let seatAmt;
let highlighted = null;		// party hovered over in table
let coalition = false;		// coalition view toggled
let coAmt = 0;				// variable for smooth transition in coalition view

let lang = "nl";

// main update loop
const update = function() {
	// clear screen
	ctx.clearRect(0,0,c.width,c.height);
	
	// smooth transition between coalition enabled and disabled
	if (coalition) {
		coAmt = (19 * coAmt + 1) / 20;
	} else {
		coAmt *= 0.98;
	}
	
	// graphics on canvas
	drawSeats();
	drawYearMenu();
	
	requestAnimationFrame(update);
}

setSeats(currentYear);		// calculate seat layout
table(currentYear);			// print table with data
fixTableEventListeners();	// highlight null when mouse is outside table
update();					// start update loop

// calculate seat layout for given year
function setSeats(year) {
	// get seat amt
	if (year >= 1959) {
		seatAmt = 150;
	} else if (year < 1959 && year >= 1888) {
		seatAmt = 100;
	} else {
		seatAmt = 68;
	}
	let rings = rows[seatAmt].length;
	
	let dist = getDist(year);
	let colors = [];
	/* colors is a 2D array, first index is row,
	 * 2nd index is seat within row. contains only
	 * the party name. yes "colors" is kind of an
	 * odd name for this but I don't feel like
	 * changing it.
	 */
	 seats = [];
	 /* seats is basically an extended version of
	  * colors that now also contains the coordinates
	  * (real x/y, and trailing coords for smooth animation
	  * tx/ty) and the size. I don't really remember
	  * why I implemented it this way but it works so ¯\_(ツ)_/¯
	  * 
	  * I might make this solution more elegant in the future
	  */
	
	// make 2D array
	for (let i=0; i<rings; i++) colors[i] = [];
	
	// create distribution of seats over rows
	for (party of dist.involved) {
		for (let k=0; k<party.amt; k++) {
			let proportion = (1 / rows[seatAmt][0])*colors[0].length;
			let index = 0;
			for (let i=1; i<rings; i++) {
				if ((1 / rows[seatAmt][i])*colors[i].length < proportion) {
					proportion = (1 / rows[seatAmt][i])*colors[i].length;
					index = i;
				}
			}
			colors[index].push({
				party: getParty(party.name),
			});
		}
	}
	
	let d, s;
	switch (seatAmt) {
		case 150:
			d = 42; // ring distance
			s = 18; // circle size
			break;
		case 100:
			d = 51;
			s = 22;
			break;
		case 68:
			d = 42;
			s = 18;
			break;
	}
	
	// calculate coordinates and set size
	for (let i=0; i<=rings; i++) {
		for (let j=0; j<rows[seatAmt][i]; j++) {
			seats.push({
				party: colors[i][j].party,
				x: c.width/2 + (450-d*i)*Math.cos(Math.PI - Math.PI*j/(rows[seatAmt][i]-1)),
				y: 500 - (450-d*i)*Math.sin(Math.PI - Math.PI*j/(rows[seatAmt][i]-1)),
				tx: c.width/2 + (450-d*i)*Math.cos(Math.PI - Math.PI*j/(rows[seatAmt][i]-1)),
				ty: 500 - (450-d*i)*Math.sin(Math.PI - Math.PI*j/(rows[seatAmt][i]-1)),
				size: s,
			});
		}
	}
}

function setSeats_altMethod(year) {
	// get seat amt
	if (year >= 1959) {
		seatAmt = 150;
	} else if (year < 1959 && year >= 1888) {
		seatAmt = 100;
	} else {
		seatAmt = 68;
	}
	
	let rings = rows[seatAmt].length;
	seats = [];
	let dist = getDist(year);
	
	let d, s;
	switch (seatAmt) {
		case 150:
			d = 42; // ring distance
			s = 18; // circle size
			break;
		case 100:
			d = 51;
			s = 22;
			break;
		case 68:
			d = 42;
			s = 18;
			break;
	}
	
	// calculate coordinates and set size
	for (let i=0; i<=rings; i++) {
		for (let j=0; j<rows[seatAmt][i]; j++) {
			seats.push({
				party: null,
				x: c.width/2 + (450-d*i)*Math.cos(Math.PI - Math.PI*j/(rows[seatAmt][i]-1)),
				y: 500 - (450-d*i)*Math.sin(Math.PI - Math.PI*j/(rows[seatAmt][i]-1)),
				tx: c.width/2 + (450-d*i)*Math.cos(Math.PI - Math.PI*j/(rows[seatAmt][i]-1)),
				ty: 500 - (450-d*i)*Math.sin(Math.PI - Math.PI*j/(rows[seatAmt][i]-1)),
				size: s,
			});
		}
	}
	
	// distribute parties
	for (let party of dist.involved) {
		// sort by x coordinate
		seats.sort((a,b) => a.x - b.x);
		
		// assign leftmost free seat
		for (let seat of seats) {
			if (!seat.party) {
				seat.party = getParty(party.name);
				// sort seats by distance from this seat
				seats.sort((a,b) => Math.sqrt((a.x-seat.x)**2 + (a.y-seat.y)**2) - Math.sqrt((b.x-seat.x)**2 + (b.y-seat.y)**2));
				break;
			}
		}
		
		console.log(seats);
		
		// assign the rest of the seats
		for (let i=0; i<party.amt-1; i++) {
			for (let seat of seats) {
				if (!seat.party) {
					seat.party = getParty(party.name);
					break;
				}
			}
		}
	}
}

// highlights party with given name
function highlight(name) {
	if (name) {
		coalition = false; // disable coalition view when party is highlighted
		let button = document.getElementById("coalition");
		button.style.backgroundColor = "#d4d4d4";
		button.style.color = "#a3a3a3";
	}
	
	highlighted = name; // set highlight
}

// returns party with given name
function getParty(name) {
	for (let party of parties) {
		if (party.name == name) return party;
	}
	return null;
}

// returns seat distribution of given year
function getDist(year) {
	for (let dist of dists) {
		if (dist.year == year) return dist;
	}
	return null;
}

// returns distance to mouse from given point
function distanceToMouse(x, y) {
	return Math.sqrt((x - mouseX)**2 + (y - mouseY)**2);
}

// sorts given objects by distance from mouse
function sortByDistance(a, b) {
	return distanceToMouse(b.x, b.y) - distanceToMouse(a.x, a.y);
}

// toggles coalition view
function toggleCoalition() {
	coalition = !coalition;
	
	let button = document.getElementById("coalition");
	
	// change button color in CSS
	if (coalition) {
		button.style.backgroundColor = "#a2e0f5";
		button.style.color = "#000000";
	} else {
		button.style.backgroundColor = "#d4d4d4";
		button.style.color = "#a3a3a3";
	}
}