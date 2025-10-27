class Timeline {
    constructor (country = null) {
        this.parliaments = [];
        this.country = country;
    }

    add_parliament(parliament) {
        this.parliaments.push(parliament);
    }
}