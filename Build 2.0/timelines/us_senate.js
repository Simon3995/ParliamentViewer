T = new Timeline("United States - Senate");

T.parties = {
    $dem: new Party("Dem", "Democratic Party", "#3360db", new Image()),
    $rep: new Party("Rep", "Republican Party", "#e02929", new Image()),
    $ind: new Party("Ind", "Independent", "#808080", new Image()),
}

T.parties.$dem.image.src = "logos/us/dem.png";
T.parties.$rep.image.src = "logos/us/rep.png";

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 45),
    new Fraction(T.parties.$ind, 2),
    new Fraction(T.parties.$rep, 53),
], "2024 Senate Elections", new Date("2024-11-05")));

Timelines["us_senate"] = T;