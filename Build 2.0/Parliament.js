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
            }
        }
    }
}