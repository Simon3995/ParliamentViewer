// a class for a parliament timeline, containing a series of election results
class Timeline {
    constructor (country = null) {
        this.parliaments = [];
        this.parties = {};
        this.country = country;
    }

    add_parliament(parliament) {
        this.parliaments.push(parliament);
    }
}