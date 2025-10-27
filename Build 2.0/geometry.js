// translation from https://github.com/Gouvernathor/parliamentarch/blob/main/src/parliamentarch/geometry.py

const DEFAULT_SPAN_ANGLE = 180;
const GMULT = 100; // global scale multiplier

function sum(array) {
    let s = 0;
    for (let elem of array) s += elem;
    return s;
}

// Returns the thickness of a row in the same unit as the coordinates.
function get_row_thickness(nrows) {
    return 1 / (4*nrows - 2);
}

/*
    This indicates the maximal number of seats for each row for a given number of rows.
    Returns a list of number of seats per row, from inner to outer.
    The length of the list is nrows.
    span_angle, if provided, is the angle in degrees that the hemicycle, as an annulus arc, covers.
*/
function get_rows_from_nrows(nrows, span_angle = DEFAULT_SPAN_ANGLE) {
    const rv = [];
    const rad = get_row_thickness(nrows);
    const radian_span_angle = Math.PI * span_angle / 180;

    for (let r = 0; r < nrows; r++) {
        const row_arc_radius = 0.5 + 2 * r * rad;
        rv.push(Math.round(radian_span_angle * row_arc_radius / (2 * rad)));
    }

    return rv;
}

// Returns the minimal number of rows necessary to contain nseats seats.
function get_nrows_from_nseats(nseats, span_angle = DEFAULT_SPAN_ANGLE) {
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
function get_seats_centers(nseats, min_nrows = 0, span_angle = DEFAULT_SPAN_ANGLE, filling_strategy = "DEFAULT") {
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
        const row_arc_radius = 0.5 + 2 * r * row_thicc;

        if (nseats_this_row === 1) {
            positions.push([1 * GMULT, -row_arc_radius * GMULT, Math.PI/2]);
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
                positions.push([(row_arc_radius * Math.cos(angle) + 1) * GMULT, (-row_arc_radius * Math.sin(angle)) * GMULT, angle]);
            }
        }
    }
    return positions;
}