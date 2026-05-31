import { S, schedule_frame } from "./main.js";
import { c, ctx } from "./canvas.js";
import { get_seats_centers, get_row_thickness, get_nrows_from_nseats, get_diagram_bbox } from "./geometry.js";
import { is_highlighted } from "./controller.js";

// a class for a parliament timeline, containing a series of election results
export class Timeline {
    constructor (name = null) {
        this.parliaments = [];
        this.parties = {};
        this.name = name;
    }

    // add a new election result to the timeline
    add_parliament(parliament) {
        this.parliaments.push(parliament);
    }

    get_ancestors(party_id) {
        if (this.parties[party_id].founded_by === null)
            return [];
        const ancestors = [...this.parties[party_id].founded_by];
        for (const p of this.parties[party_id].founded_by) {
            ancestors.push(... this.get_ancestors(p));
        }
        return ancestors;
    }

    get_descendants(party_id) {
        for (const [id, party] of Object.entries(this.parties)) {
            if (party.founded_by?.includes(party_id)) {
                return [id, ...this.get_descendants(id)];
            }
        }
        return [];
    }
}

// a class for one election result
export class Parliament {
    constructor(fractions = [], description = "Parliament", date = new Date(), source = "") {
        this.fractions = fractions;
        this.description = description;
        this.date = date;
        this.source = source;

        this.distribute_seats();
    }

    // get seat amount of a fraction
    get_party_seats(id) {
        for (const fraction of this.fractions)
            if (fraction.party.id == id)
                return fraction.seat_amt;
        return 0;
    }

    // set seat amount of a fraction
    set_party_seats(id, amt) {
        amt = Number(amt);
        if (isNaN(amt)) {
            console.error("Tried to set non-number seat amount.");
            return;
        }
        for (let fraction of this.fractions) {
            if (fraction.party.id == id) {
                fraction.seat_amt = amt;
            }
        }
        this.distribute_seats();
    }

    // add a new fraction to this parliament
    add_fraction(fraction) {
        this.fractions.push(fraction);
        this.distribute_seats();
    }

    // remove a fraction from this parliament
    remove_fraction(id) {
        for (let i = 0; i < this.fractions.length; i++) {
            if (this.fractions[i].party.id === id) {
                this.fractions.splice(i, 1);
                this.distribute_seats();
                return;
            }
        }
        console.warn(`Removing fraction "${name}" failed!`);
    }

    // recalculate seat locations and seat distribution across fractions
    distribute_seats() {
        // empty existing
        for (const fraction of this.fractions) {
            fraction.seat_centers = [];
        }
        
        // distribute seats
        let seats_centers = get_seats_centers(this.seat_amt());
        seats_centers.sort((a, b) => b[2] - a[2]);
        const order = (S.ord_vis.length > 0) ? S.ord_vis : this.fractions;
        for (let fraction of order) {
            while (fraction.seat_centers.length < fraction.seat_amt) {
                fraction.seat_centers.push(seats_centers.shift());
            }
        }
        schedule_frame();
    }

    // get total parliament seat amount
    seat_amt() {
        let amt = 0;
        for (const frac of this.fractions) {
            amt += frac.seat_amt;
        }
        return amt;
    }

    // get visual radius of one seat circle
    get_seat_radius() {
        return 0.8 * get_row_thickness(get_nrows_from_nseats(this.seat_amt()));
    }

    // get hitbox/clickable radius of one seat circle
    get_seat_hitbox_radius() {
        return this.get_seat_radius() * 1.7;
    }

    // draw the parliament chart
    draw() {
        let cur_hover = null;
        const r = this.get_seat_radius();
        const hb = this.get_seat_hitbox_radius();

        outer:
        for (let fraction of this.fractions) {
            for (const seat of fraction.seat_centers) {
                if (Math.hypot(S.mouse_x - seat[0], S.mouse_y - seat[1]) < hb) {
                    cur_hover = fraction.party.id;
                    break outer;
                }
            }
        }

        let has_enlarged = false;
        for (let fraction of this.fractions) {
            let opacity = (is_highlighted(fraction.party.id)) ? 1 : (S.cur_hlt.length ? (cur_hover === fraction.party.id ? 0.6 : 0.2) : 1);

            for (const seat of fraction.seat_centers) {
                
                let f;
                if (!has_enlarged && Math.hypot(S.mouse_x - seat[0], S.mouse_y - seat[1]) < hb && opacity == 1) {
                    has_enlarged = true;
                    f = Math.max(60 / S.ctx_scale, r * 1.5);
                    ctx.globalCompositeOperation = "source-over";
                } else {
                    f = r;
                    ctx.globalCompositeOperation = "destination-over";
                }
                
                ctx.globalAlpha = opacity;
                
                ctx.drawImage(
                    S.party_imgs[fraction.party.id],
                    seat[0] - f,
                    seat[1] - f,
                    2 * f, 2 * f
                );
            }
        }
    }

    // clone this parliament without reference to the original
    clone() {
        const p = new Parliament(
            this.fractions.map(frac => frac.clone()),
            this.description,
            this.date,
            this.source
        );
        // restore seat_centers
        p.fractions.forEach((frac, i) => {
            frac.seat_centers = structuredClone(this.fractions[i].seat_centers);
        });
        return p;
    }
}

// a class for a party fraction in one election
export class Fraction {
    constructor(party, seat_amt) {
        this.party = party;
        this.seat_amt = seat_amt;
        this.seat_centers = [];
    }

    // clone this fraction without reference to the original
    clone() {
        let frac = new Fraction(this.party.clone(), this.seat_amt);
        frac.seat_centers = structuredClone(this.seat_centers);
        return frac;
    }
}

// a class for a political party, independent of year or election
export class Party {
    constructor(name, fullname, id, color = "#000000", image = null, established = null, founded_by = null, split_from = null) {
        this.name = name;
        this.fullname = fullname;
        this.id = id;
        this.color = color;
        this.image = image;
        this.established = established;
        this.founded_by = founded_by;
        this.split_from = split_from;
    }

    // clone this party without reference to the original
    clone() {
        return new Party(this.name, this.fullname, this.id, this.color, this.image, this.established, this.founded_by, this.split_from);
    }
}