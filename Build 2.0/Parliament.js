// a class for one election result
class Parliament {
    constructor(fractions = [], description = "Parliament", date = new Date()) {
        this.fractions = fractions;
        this.description = description;
        this.date = date;

        this.distribute_seats();
    }

    get_party_seats(party) {
        for (const fraction of this.fractions) {
            if (fraction.party.name == party) {
                return fraction.seat_amt;
            }
        }
        return 0;
    }

    add_fraction(fraction) {
        this.fractions.push(fraction);
        this.distribute_seats();
    }

    remove_fraction(name) {
        for (let i = 0; i < this.fractions.length; i++) {
            if (this.fractions[i].party.name === name) {
                this.fractions.splice(i, 1);
                this.distribute_seats();
                return;
            }
        }
        console.warn(`Removing fraction "${name}" failed!`);
    }

    distribute_seats() {
        // empty existing
        for (const fraction of this.fractions) {
            fraction.seat_centers = [];
        }
        
        // distribute seats
        let seats_centers = get_seats_centers(this.seat_amt());
        seats_centers.sort((a, b) => b[2] - a[2]);
        for (let fraction of this.fractions) {
            while (fraction.seat_centers.length < fraction.seat_amt) {
                fraction.seat_centers.push(seats_centers.shift());
            }
        }
    }

    seat_amt() {
        let amt = 0;
        for (const frac of this.fractions) {
            amt += frac.seat_amt;
        }
        return amt;
    }

    get_seat_radius() {
        return 0.8 * get_row_thickness(get_nrows_from_nseats(this.seat_amt()));
    }

    get_seat_hitbox_radius() {
        return this.get_seat_radius() * 1.7;
    }

    draw() {
        let cur_hover = null;
        const r = this.get_seat_radius();
        const hb = this.get_seat_hitbox_radius();

        outer:
        for (let fraction of this.fractions) {
            for (const seat of fraction.seat_centers) {
                if (Math.hypot(mouse_x - seat[0], mouse_y - seat[1]) < hb) {
                    cur_hover = fraction.party.id;
                    break outer;
                }
            }
        }

        let has_enlarged = false;
        for (let fraction of this.fractions) {
            let opacity = (cur_hlt.includes(fraction.party.id)) ? 1 : (cur_hlt.length ? (cur_hover === fraction.party.id ? 0.6 : 0.2) : 1);

            for (const seat of fraction.seat_centers) {
                
                let f;
                if (!has_enlarged && Math.hypot(mouse_x - seat[0], mouse_y - seat[1]) < hb && opacity == 1) {
                    has_enlarged = true;
                    f = 0.12;
                    ctx.globalCompositeOperation = "source-over";
                } else {
                    f = r;
                    ctx.globalCompositeOperation = "destination-over";
                }
                
                ctx.globalAlpha = opacity;
                
                ctx.drawImage(
                    party_imgs[fraction.party.id],
                    seat[0] - f,
                    seat[1] - f,
                    2 * f, 2 * f
                );
            }
        }
    }
}