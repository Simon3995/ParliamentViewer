var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var rows = [30,26,24,21,19,16,14];
var seats = [];

var mouseX = 0;
var mouseY = 0;

var currentYear = 2017;		// i think you can guess what this one does
var highlighted = null;		// party hovered over in table
var coalition = false;		// coalition view toggled
var coAmt = 0;				// variable for smooth transition in coalition view

var lang = "nl";

// main update loop
function update() {
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
	
	window.requestAnimationFrame(update);
}

setSeats(currentYear);		// calculate seat layout
table(currentYear);			// print table with data
fixTableEventListeners();	// highlight null when mouse is outside table
update();					// start update loop

// calculate seat layout for given year
function setSeats(year) {
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
	for (let i=0; i<7; i++) colors[i] = [];
	
	// create distribution of seats over rows
	for (party of dist.involved) {
		for (let k=0; k<party.amt; k++) {
			let proportion = (1 / rows[0])*colors[0].length;
			let index = 0;
			for (let i=1; i<7; i++) {
				if ((1 / rows[i])*colors[i].length < proportion) {
					proportion = (1 / rows[i])*colors[i].length;
					index = i;
				}
			}
			colors[index].push({
				party: getParty(party.name),
			});
		}
	}
	
	// calculate coordinates and set size
	for (let i=0; i<=7; i++) {
		for (let j=0; j<rows[i]; j++) {
			seats.push({
				party: colors[i][j].party,
				x: c.width/2 + (450-42*i)*Math.cos(Math.PI - Math.PI*j/(rows[i]-1)),
				y: 500 - (450-42*i)*Math.sin(Math.PI - Math.PI*j/(rows[i]-1)),
				tx: c.width/2 + (450-42*i)*Math.cos(Math.PI - Math.PI*j/(rows[i]-1)),
				ty: 500 - (450-42*i)*Math.sin(Math.PI - Math.PI*j/(rows[i]-1)),
				size: 18,
			});
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