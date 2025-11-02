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

    draw(context) {
        for (let fraction of this.fractions) {
            const r = 0.75 * get_row_thickness(get_nrows_from_nseats(this.seat_amt())) * GMULT;
            for (const seat of fraction.seat_centers) {
                context.fillStyle = fraction.party.color;
                context.beginPath()
                context._arc(seat[0], seat[1], r, 0, 2*Math.PI);
                context.fill();

                let s = 0.0083 * GMULT * r;

                if (fraction.party.image.src) {
                    
                    context._drawImage(
                        fraction.party.image,
                        seat[0] - s,
                        seat[1] - s,
                        2*s,
                        2*s
                    );
                } else {
                    context.fillStyle = "white";
                    context.textAlign = "center";
                    context.textBaseline = "middle";
                    context.font = `bold ${1.2*s}px Atkinson`;
                    context._fillText(fraction.party.name, seat[0], seat[1] + s*0.1, s*2);
                }
            }
        }
    }
}