// a class for a political party, independent of year or election
class Party {
    constructor(name, fullname, color = "#000000", image = null) {
        this.name = name;
        this.fullname = fullname;
        this.color = color;
        this.image = image;
    }
}