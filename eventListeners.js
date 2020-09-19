// make sure highlight it set to null when mouse hovers outside table
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

// mousemove event
window.addEventListener("mousemove", function(evt) {
	let rect = document.getElementById("myCanvas").getBoundingClientRect();
	// update mouse coordinates
	mouseX = evt.clientX - rect.left;
	mouseY = evt.clientY - rect.top;
	// sort seats by distance from mouse
	seats.sort(sortByDistance);
}, false);

// mousedown event
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

// fit table in screen height
window.onload = function() {
	document.getElementById("table").style.height = window.innerHeight - 560 + "px";
}

// fit table in screen height
window.onresize = function() {
	document.getElementById("table").style.height = window.innerHeight - 560 + "px";
}