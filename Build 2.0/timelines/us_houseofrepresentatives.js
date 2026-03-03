T = new Timeline("United States - House of Representatives");

T.parties = {
    $dem: new Party("Dem", "Democratic Party", "#3360db", new Image()),
    $rep: new Party("Rep", "Republican Party", "#e02929", new Image()),
    $vac: new Party("Vac", "Vacant Seats", "#808080", new Image()),
}

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 215),
    new Fraction(T.parties.$rep, 220),
], "2024 United States House of Representatives Elections", new Date("2024-11-05")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 213),
    new Fraction(T.parties.$rep, 222),
], "2022 United States House of Representatives Elections", new Date("2022-11-08")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 222),
    new Fraction(T.parties.$rep, 213),
], "2020 United States House of Representatives Elections", new Date("2020-11-03")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 235),
    new Fraction(T.parties.$vac, 1),
    new Fraction(T.parties.$rep, 199),
], "2018 United States House of Representatives Elections", new Date("2018-11-06")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 194),
    new Fraction(T.parties.$rep, 241),
], "2016 United States House of Representatives Elections", new Date("2016-11-08")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 188),
    new Fraction(T.parties.$rep, 247),
], "2014 United States House of Representatives Elections", new Date("2014-11-04")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 201),
    new Fraction(T.parties.$rep, 234),
], "2012 United States House of Representatives Elections", new Date("2012-11-06")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 193),
    new Fraction(T.parties.$rep, 242),
], "2010 United States House of Representatives Elections", new Date("2010-11-02")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 257),
    new Fraction(T.parties.$rep, 178),
], "2008 United States House of Representatives Elections", new Date("2008-11-04")));

Timelines["us_houseofrepresentatives"] = T;