// This code is a translation (from Python to Javascript) and adaptation of
// https://github.com/Gouvernathor/parliamentarch/blob/main/src/parliamentarch/geometry.py
// 
// This code is licensed under the BSD 3-Clause License
//
// Copyright (c) 2024, Gouvernathor
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its
//    contributors may be used to endorse or promote products derived from
//    this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

let SpanAngle = 180;
let InnerRadius = 0.4;  // The inner radius of the arch relative to the outer radius

export function setSpanAngle(value) {
	SpanAngle = value;
}

export function setInnerRadius(value) {
	InnerRadius = value;
}

export function getDiagramBbox() {
	const upper = (SpanAngle < 180);
	const halfAngleRad = (SpanAngle / 2) * (Math.PI / 180);
	const xmin = upper ? (1 - Math.sin(halfAngleRad)) : 0;
	const xmax = 2 - xmin;
	const ymin = (upper ? InnerRadius : 1) * Math.cos(halfAngleRad);
	const ymax = 1;

	return { xmin, xmax, ymin, ymax };
}

function sum(array) {
	let s = 0;
	for (let elem of array) s += elem;
	return s;
}

// Returns the thickness of a row in the same unit as the coordinates.
export function getRowThickness(nrows) {
	return (1 - InnerRadius) / (2*nrows - 1);
}

/*
	This indicates the maximal number of seats for each row for a given number of rows.
	Returns a list of number of seats per row, from inner to outer.
	The length of the list is nrows.
	spanAngle, if provided, is the angle in degrees that the hemicycle, as an annulus arc, covers.
*/
function getRowsFromRowCount(nrows, spanAngle = SpanAngle) {
	const rv = [];
	const rad = getRowThickness(nrows);
	const radian_spanAngle = Math.PI * spanAngle / 180;

	for (let r = 0; r < nrows; r++) {
		const rowArcRadius = InnerRadius + 2 * r * rad;
		rv.push(Math.round(radian_spanAngle * rowArcRadius / (2 * rad)));
	}

	return rv;
}

// Returns the minimal number of rows necessary to contain nseats seats.
export function getRowCount(nseats, spanAngle = SpanAngle) {
	let i = 1;
	while (sum(getRowsFromRowCount(i, spanAngle)) < nseats) i++;
	return i;
}

/*
	Returns an array of nseats seat centers as [x, y, angle] arrays.
	The canvas is assumed to be of 2 in width and 1 in height, with the y axis pointing up.
	The angle is calculated from the (1., 0.) center of the hemicycle, in radians,
	with 0° for the leftmost seats, 90° for the center and 180° for the rightmost.

	The minimum number of rows required to contain the given number of seats
	will be computed automatically.
	If minRows is higher, that will be the number of rows, otherwise the parameter is ignored.
	Passing a higher number of rows will make the diagram sparser.

	seatRadiusFactor should be between 0 and 1,
	with seats touching their neighbors in packed rows at seatRadiusFactor=1.
	It is only taken into account when placing the seats at the extreme left and right of the hemicycle
	(which are the seats at the bottom of the diagram),
	although the placement of these seats impacts in turn the placement of the other seats.

	spanAngle is the angle in degrees from the rightmost seats,
	through the center, to the leftmost seats.
	It defaults to 180° to make a true hemicycle.
	Values above 180° are not supported.
*/
export function getSeatsCenters(nseats, minRows = 0, spanAngle = SpanAngle, fillingStrategy = "DEFAULT") {
	const nrows = Math.max(minRows, getRowCount(nseats, spanAngle));
	// thickness of a row in the same unit as the coordinates
	const rowThicc = getRowThickness(nrows);
	const spanAngleMargin = (1 - spanAngle / 180) * Math.PI / 2;
	const maxedRows = getRowsFromRowCount(nrows, spanAngle);

	let startingRow, fillingRatio, rows, seatsOnStartingRow;
	switch (fillingStrategy) {
		case "DEFAULT":
			startingRow = 0;
			fillingRatio = nseats / sum(maxedRows);
			break;
		case "EMPTY_INNER":
			rows = [...maxedRows];
			while (sum(rows.slice(1)) >= nseats) rows.shift();
			// here, rows represents the rows which are enough to contain nseats,
			// and their number of seats

			// this row will be the first one to be filled
			// the innermore ones are empty
			startingRow = nrows - rows.length;
			fillingRatio = nseats / sum(rows);
			rows = null;
			break;
		case "OUTER_PRIORITY":
			rows = [...maxedRows];
			while (sum(rows) > nseats) rows.shift();
			// here, rows represents the rows which will be fully filled,
			// and their number of seats

			// this row will be the only one to be partially filled
			// the innermore ones are empty, the outermore ones are fully filled
			startingRow = nrows - rows.length - 1;
			seatsOnStartingRow = nseats - sum(rows);
			rows = null;
			break;
		default:
			console.error(`Unrecognized strategy: ${fillingStrategy}`);
			break;
	}

	let positions = [];
	for (let r = startingRow; r < nrows; r++) {
		let nseatsThisRow;
		if (r === nrows - 1) { // if it's the last, outermost row
			// fit all the remaining seats
			nseatsThisRow = nseats - positions.length;
		} else if (fillingStrategy === "OUTER_PRIORITY") {
			if (r === startingRow) {
				nseatsThisRow = seatsOnStartingRow;
			} else {
				nseatsThisRow = maxedRows[r];
			}
		} else {
			// fullness of the diagram times the maximum number of seats in the row
			nseatsThisRow = Math.round(fillingRatio * maxedRows[r]);
			// actually more precise rounding : avoid rounding errors to accumulate too much
			// nseatsThisRow = round((nseats-len(positions)) * maxedRows[r]/sum(maxedRows[r:]))
		}

		// row radius : the radius of the circle crossing the center of each seat in the row
		const rowArcRadius = InnerRadius + 2 * r * rowThicc;

		if (nseatsThisRow === 1) {
			positions.push([1, -rowArcRadius, Math.PI/2]);
		} else {
			// the angle necessary in this row to put the first (and last) seats fully in the canvas
			let angleMargin = Math.asin(rowThicc/rowArcRadius);
			// add the margin to make up the side angle
			angleMargin += spanAngleMargin;
			// alternatively, allow the centers of the seats by the side to reach the angle's boundary
			// angleMargin = max(angleMargin, spanAngleMargin)

			// the angle separating two seats of that row
			let angleIncrement = (Math.PI - 2 * angleMargin) / (nseatsThisRow - 1);
			// a fraction of the remaining space,
			// keeping in mind that the same elevation on start and end limits that remaining place to less than 2pi

			for (let s = 0; s < nseatsThisRow; s++) {
				let angle = angleMargin + s * angleIncrement;
				// an oriented angle, so it goes trig positive (counterclockwise)
				positions.push([rowArcRadius * Math.cos(angle) + 1, -rowArcRadius * Math.sin(angle), angle]);
			}
		}
	}
	return positions;
}
