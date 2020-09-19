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

// draw seats on canvas
function drawSeats(dist) {
	for (seat of seats) {
		// true if current seat is NOT part of coalition (seat should be dimmed)
		let dim = !getDist(currentYear).coalition.includes(seat.party.name);
		
		// determine size
		if (highlighted) {
			if (highlighted == seat.party.name) {
				// highlighted seat; bigger size
				seat.size = ((9 * seat.size) + 25) / 10;
			} else {
				// non highlighted seat; smaller size
				seat.size = ((9 * seat.size) + 7) / 10;
			}
		} else {
			// no highlight, all seats have same size
			seat.size = ((9 * seat.size) + 18) / 10;
		}
		
		let distToMouse = distanceToMouse(seat.x, seat.y);
		let vx = seat.x;					// 'visual' coords, real coords aren't affected
		let vy = seat.y;
		let pushX = (seat.x - mouseX)*1;	// amount to push seat away
		let pushY = (seat.y - mouseY)*1;
											// push amt changes based on distance to mouse
		pushX *= 2.5 * (0.07*distToMouse) * (2.7 ** -(0.07*distToMouse));
		pushY *= 2.5 * (0.07*distToMouse) * (2.7 ** -(0.07*distToMouse));
		vx += pushX * (dim ? 1-coAmt : 1);	// add push to visual coords
		vy += pushY * (dim ? 1-coAmt : 1);
		seat.tx = (3*seat.tx + vx)/4;
		seat.ty = (3*seat.ty + vy)/4;
		
		let visualSize = seat.size;
		if (distToMouse < 80) {
			visualSize = seat.size + (0.5*(80-distToMouse))*(dim ? 1-coAmt : 1);
		}
		if (dim) {
			visualSize *= 1 - coAmt/4;
		}
		
		// draw circle
		ctx.fillStyle = seat.party.color;
		ctx.beginPath();
		ctx.arc(
			seat.tx,
			seat.ty,
			visualSize,
			0,
			2*Math.PI
		);
		ctx.fill();
		
		// draw img
		if (imgs[seat.party.name]) {
			ctx.drawImage(
				imgs[seat.party.name],
				seat.tx-0.78*visualSize,
				seat.ty-0.78*visualSize,
				0.78*visualSize*2,
				0.78*visualSize*2
			);
		}
		
		if (dim) {
			ctx.globalAlpha = coAmt;
		} else {
			ctx.globalAlpha = 0;
		}
		
		ctx.fillStyle = "#FFFFFFCC";
		ctx.beginPath();
		ctx.arc(
			seat.tx,
			seat.ty,
			visualSize + 1,
			0,
			2*Math.PI
		);
		ctx.fill();
		ctx.globalAlpha = 1;
	}
}

function drawYearMenu() {
	// "Tweede Kamerverkiezingen"
	ctx.fillStyle = "#111";
	ctx.font = "bold 16px Arial";
	ctx.textAlign = "center";
	ctx.fillText("TWEEDE KAMERVERKIEZINGEN", c.width/2, 440);
	
	// draw year text
	ctx.fillStyle = "#000";
	ctx.font = "80px Arial";
	ctx.fillText(currentYear, c.width/2, 510);
	
	// arrow button circles
	ctx.beginPath();
	if (Math.sqrt((mouseX - 475)**2 + (mouseY - 485)**2) <= 27) {
		ctx.fillStyle = "#555"
	} else {
		ctx.fillStyle = "#000";
	}
	ctx.arc(475, 485, 25, 0, 2*Math.PI);
	ctx.fill();
	
	ctx.beginPath();
	if (Math.sqrt((mouseX - 725)**2 + (mouseY - 485)**2) <= 27) {
		ctx.fillStyle = "#555";
	} else {
		ctx.fillStyle = "#000";
	}
	ctx.arc(725, 485, 25, 0, 2*Math.PI);
	ctx.fill();
	
	// arrow button arrows
	ctx.drawImage(arrow_left, 460, 470, 30, 30);
	ctx.drawImage(arrow_right, 710, 470, 30, 30);
}

function table(year) {
	let string = "";
	let dist = getDist(year);
	
	string += `<table>`;
	
	let listCopy = [...dist.involved];
	listCopy.sort((a,b)=>b.amt-a.amt);
	
	for (let party of listCopy) {
		string += '<tr class="tablerow" onmouseover="highlight(`'+party.name+'`)">';
		string += "<td width='100px'>" + party.name + "</td>";
		string += "<td width='400px'>" + getParty(party.name).fullname_nl + "</td>";
		string += "<td width='80px'>" + party.amt + "</td>";
		string += "<td width='100px'>";

		let previous = dists[dists.indexOf(dist)+1];
		if (previous == null || previous.involved.filter(a=>a.name==party.name).length == 0) {
			string += new_sprite.outerHTML + "Nieuw";
		} else {
			previous = previous.involved.filter(a=>a.name==party.name)[0];
			if (previous.amt == party.amt) {
				string += nch_sprite.outerHTML + "0";
			} else if (previous.amt < party.amt) {
				string += inc_sprite.outerHTML + "+ "+(party.amt - previous.amt);
			} else {
				string += dec_sprite.outerHTML + "- "+(previous.amt - party.amt);
			}
		}
		
		string += "</td></tr>";
	}
	string += "</table>";
	
	document.getElementById("table").innerHTML = string;
}

function highlight(name) {
	if (name) {
		coalition = false;
		let button = document.getElementById("coalition");
		button.style.backgroundColor = "#d4d4d4";
		button.style.color = "#a3a3a3";
	}
	
	highlighted = name;
}

function getParty(name) {
	for (let party of parties) {
		if (party.name == name) return party;
	}
	return null;
}

function getDist(year) {
	for (let dist of dists) {
		if (dist.year == year) return dist;
	}
	return null;
}

function distanceToMouse(x, y) {
	return Math.sqrt((x - mouseX)**2 + (y - mouseY)**2);
}

function sortByDistance(a, b) {
	return distanceToMouse(b.x, b.y) - distanceToMouse(a.x, a.y);
}

function toggleCoalition() {
	coalition = !coalition;
	
	let button = document.getElementById("coalition");
	
	if (coalition) {
		button.style.backgroundColor = "#a2e0f5";
		button.style.color = "#000000";
	} else {
		button.style.backgroundColor = "#d4d4d4";
		button.style.color = "#a3a3a3";
	}
}

function fixTableEventListeners() {
	window.addEventListener("mouseover", function(evt) {
		highlight(null);
	}, false);
	document.querySelectorAll('.tablerow').forEach(item => {
		item.addEventListener("mouseover", function (evt) {
			evt.stopPropagation();
		});
	});
}

window.addEventListener("mousemove", function(evt) {
	let rect = document.getElementById("myCanvas").getBoundingClientRect();
	mouseX = evt.clientX - rect.left;
	mouseY = evt.clientY - rect.top;
	seats.sort(sortByDistance);
}, false);

window.addEventListener("mousedown", function(evt) {
	// arrow left
	if (Math.sqrt((mouseX - 475)**2 + (mouseY - 485)**2) <= 27) {
		for (let i=0; i<dists.length; i++) {
			if (dists[i].year < currentYear) {
				currentYear = dists[i].year;
				setSeats(dists[i].year);
				table(dists[i].year);
				fixTableEventListeners();
				return;
			}
		}
	}
	
	// arrow right
	if (Math.sqrt((mouseX - 721)**2 + (mouseY - 485)**2) <= 27) {
		for (let i=dists.length-1; i>=0; i--) {
			if (dists[i].year > currentYear) {
				currentYear = dists[i].year;
				setSeats(dists[i].year);
				table(dists[i].year);
				fixTableEventListeners();
				return;
			}
		}
	}
}, false);

window.onload = function() {
	document.getElementById("table").style.height = window.innerHeight - 560 + "px";
}

window.onresize = function() {
	document.getElementById("table").style.height = window.innerHeight - 560 + "px";
}