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

export function set_span_angle(value) {
    SpanAngle = value;
}

export function set_inner_radius(value) {
    InnerRadius = value;
}

export function get_diagram_bbox() {
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
export function get_row_thickness(nrows) {
    return (1 - InnerRadius) / (2*nrows - 1);
}

/*
    This indicates the maximal number of seats for each row for a given number of rows.
    Returns a list of number of seats per row, from inner to outer.
    The length of the list is nrows.
    span_angle, if provided, is the angle in degrees that the hemicycle, as an annulus arc, covers.
*/
function get_rows_from_nrows(nrows, span_angle = SpanAngle) {
    const rv = [];
    const rad = get_row_thickness(nrows);
    const radian_span_angle = Math.PI * span_angle / 180;

    for (let r = 0; r < nrows; r++) {
        const row_arc_radius = InnerRadius + 2 * r * rad;
        rv.push(Math.round(radian_span_angle * row_arc_radius / (2 * rad)));
    }

    return rv;
}

// Returns the minimal number of rows necessary to contain nseats seats.
export function get_nrows_from_nseats(nseats, span_angle = SpanAngle) {
    let i = 1;
    while (sum(get_rows_from_nrows(i, span_angle)) < nseats) i++;
    return i;
}

/*
    Returns an array of nseats seat centers as [x, y, angle] arrays.
    The canvas is assumed to be of 2 in width and 1 in height, with the y axis pointing up.
    The angle is calculated from the (1., 0.) center of the hemicycle, in radians,
    with 0° for the leftmost seats, 90° for the center and 180° for the rightmost.

    The minimum number of rows required to contain the given number of seats
    will be computed automatically.
    If min_nrows is higher, that will be the number of rows, otherwise the parameter is ignored.
    Passing a higher number of rows will make the diagram sparser.

    seat_radius_factor should be between 0 and 1,
    with seats touching their neighbors in packed rows at seat_radius_factor=1.
    It is only taken into account when placing the seats at the extreme left and right of the hemicycle
    (which are the seats at the bottom of the diagram),
    although the placement of these seats impacts in turn the placement of the other seats.

    span_angle is the angle in degrees from the rightmost seats,
    through the center, to the leftmost seats.
    It defaults to 180° to make a true hemicycle.
    Values above 180° are not supported.
*/
export function get_seats_centers(nseats, min_nrows = 0, span_angle = SpanAngle, filling_strategy = "DEFAULT") {
    const nrows = Math.max(min_nrows, get_nrows_from_nseats(nseats, span_angle));
    // thickness of a row in the same unit as the coordinates
    const row_thicc = get_row_thickness(nrows);
    const span_angle_margin = (1 - span_angle / 180) * Math.PI / 2;
    const maxed_rows = get_rows_from_nrows(nrows, span_angle);

    let starting_row, filling_ratio, rows, seats_on_starting_row;
    switch (filling_strategy) {
        case "DEFAULT":
            starting_row = 0;
            filling_ratio = nseats / sum(maxed_rows);
            break;
        case "EMPTY_INNER":
            rows = [...maxed_rows];
            while (sum(rows.slice(1)) >= nseats) rows.shift();
            // here, rows represents the rows which are enough to contain nseats,
            // and their number of seats

            // this row will be the first one to be filled
            // the innermore ones are empty
            starting_row = nrows - rows.length;
            filling_ratio = nseats / sum(rows);
            rows = null;
            break;
        case "OUTER_PRIORITY":
            rows = [...maxed_rows];
            while (sum(rows) > nseats) rows.shift();
            // here, rows represents the rows which will be fully filled,
            // and their number of seats

            // this row will be the only one to be partially filled
            // the innermore ones are empty, the outermore ones are fully filled
            starting_row = nrows - rows.length - 1;
            seats_on_starting_row = nseats - sum(rows);
            rows = null;
            break;
        default:
            console.error(`Unrecognized strategy: ${filling_strategy}`);
            break;
    }

    let positions = [];
    for (let r = starting_row; r < nrows; r++) {
        let nseats_this_row;
        if (r === nrows - 1) { // if it's the last, outermost row
            // fit all the remaining seats
            nseats_this_row = nseats - positions.length;
        } else if (filling_strategy === "OUTER_PRIORITY") {
            if (r === starting_row) {
                nseats_this_row = seats_on_starting_row;
            } else {
                nseats_this_row = maxed_rows[r];
            }
        } else {
            // fullness of the diagram times the maximum number of seats in the row
            nseats_this_row = Math.round(filling_ratio * maxed_rows[r]);
            // actually more precise rounding : avoid rounding errors to accumulate too much
            // nseats_this_row = round((nseats-len(positions)) * maxed_rows[r]/sum(maxed_rows[r:]))
        }

        // row radius : the radius of the circle crossing the center of each seat in the row
        const row_arc_radius = InnerRadius + 2 * r * row_thicc;

        if (nseats_this_row === 1) {
            positions.push([1, -row_arc_radius, Math.PI/2]);
        } else {
            // the angle necessary in this row to put the first (and last) seats fully in the canvas
            let angle_margin = Math.asin(row_thicc/row_arc_radius);
            // add the margin to make up the side angle
            angle_margin += span_angle_margin;
            // alternatively, allow the centers of the seats by the side to reach the angle's boundary
            // angle_margin = max(angle_margin, span_angle_margin)

            // the angle separating two seats of that row
            let angle_increment = (Math.PI - 2 * angle_margin) / (nseats_this_row - 1);
            // a fraction of the remaining space,
            // keeping in mind that the same elevation on start and end limits that remaining place to less than 2pi

            for (let s = 0; s < nseats_this_row; s++) {
                let angle = angle_margin + s * angle_increment;
                // an oriented angle, so it goes trig positive (counterclockwise)
                positions.push([row_arc_radius * Math.cos(angle) + 1, -row_arc_radius * Math.sin(angle), angle]);
            }
        }
    }
    return positions;
}