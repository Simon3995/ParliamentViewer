class Parliament {
    constructor(year = 0) {
        this.fractions = [];
        this.year = year;
    }

    add_fraction(fraction) {
        this.fractions.push(fraction);
    }

    remove_fraction(name) {
        for (let i = 0; i < this.fractions.length; i++) {
            if (this.fractions[i].party.name === name) {
                this.fractions.splice(i, 1);
                return;
            }
        }
        console.warn(`Removing fraction "${name}" failed!`);
    }

    seat_amt() {
        let amt = 0;
        for (const frac of this.fractions) {
            amt += frac.seat_amt;
        }
        return amt;
    }

    draw(context) {
        let seats_centers = get_seats_centers(this.seat_amt());

        let s = 0.01;
        for (let seat of seats_centers) {
            ctx._fillRect(seat[0] - s, -seat[1] - s, 2*s, 2*s);
        }
    }
}