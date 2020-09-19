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
		seat.tx = (3*seat.tx + vx)/4;		// trail towards visual coords
		seat.ty = (3*seat.ty + vy)/4;
		
		let visualSize = seat.size;
		// increase visual size if mouse is close
		if (distToMouse < 80) {
			visualSize = seat.size + (0.5*(80-distToMouse))*(dim ? 1-coAmt : 1);
		}
		// make seat smaller if dimmed
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
		
		// draw img / party logo
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
		
		// draw half transparent white circle over dimmed seats
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
	let dist = getDist(year); // distribution
	
	string += `<table>`;
	
	let listCopy = [...dist.involved];
	listCopy.sort((a,b)=>b.amt-a.amt);
	
	// write all table HTML to a string
	for (let party of listCopy) {
		string += '<tr class="tablerow" onmouseover="highlight(`'+party.name+'`)">';
		string += "<td width='100px'>" + party.name + "</td>";
		string += "<td width='400px'>" + getParty(party.name).fullname[lang] + "</td>";
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
	
	// insert HTML string into document
	document.getElementById("table").innerHTML = string;
}