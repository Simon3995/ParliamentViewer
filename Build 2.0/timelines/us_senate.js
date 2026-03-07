T = new Timeline("United States - Senate");

T.parties = {
    $dem: new Party("Dem", "Democratic Party", "$dem", "#3360db", new Image()),
    $rep: new Party("Rep", "Republican Party", "$rep", "#e02929", new Image()),
    $ind: new Party("Ind", "Independent", "$ind", "#808080", new Image()),
}

T.parties.$dem.image.src = "logos/us/dem.png";
T.parties.$rep.image.src = "logos/us/rep.png";

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 45),
    new Fraction(T.parties.$ind, 2),
    new Fraction(T.parties.$rep, 53),
], "2024 Senate Elections", new Date("2024-11-05")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 49),
    new Fraction(T.parties.$ind, 2),
    new Fraction(T.parties.$rep, 49),
], "2022 Senate Elections", new Date("2022-11-08")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 48),
    new Fraction(T.parties.$ind, 2),
    new Fraction(T.parties.$rep, 50),
], "2020 Senate Elections", new Date("2020-11-03")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 45),
    new Fraction(T.parties.$ind, 2),
    new Fraction(T.parties.$rep, 53),
], "2018 Senate Elections", new Date("2018-11-06")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 46),
    new Fraction(T.parties.$ind, 2),
    new Fraction(T.parties.$rep, 52),
], "2016 Senate Elections", new Date("2016-11-08")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 44),
    new Fraction(T.parties.$ind, 2),
    new Fraction(T.parties.$rep, 54),
], "2014 Senate Elections", new Date("2014-11-04")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 53),
    new Fraction(T.parties.$ind, 2),
    new Fraction(T.parties.$rep, 45),
], "2012 Senate Elections", new Date("2012-11-06")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 51),
    new Fraction(T.parties.$ind, 2),
    new Fraction(T.parties.$rep, 47),
], "2010 Senate Elections", new Date("2010-11-02")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 57),
    new Fraction(T.parties.$ind, 2),
    new Fraction(T.parties.$rep, 41),
], "2008 Senate Elections", new Date("2008-11-04")));

Timelines["us_senate"] = T;