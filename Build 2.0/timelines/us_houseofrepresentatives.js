T = new Timeline("United States - House of Representatives");

T.parties = {
    $dem: new Party("Dem", "Democratic Party", "$dem", "#3360db", new Image()),
    $rep: new Party("Rep", "Republican Party", "$rep", "#e02929", new Image()),
    $vac: new Party("Vac", "Vacant Seats", "$vac", "#808080", new Image()),
    $ind: new Party("Ind", "Independent", "$ind", "#808080", new Image()),
    $con: new Party("Con", "Conservative", "$con", "#ff8000", new Image()),
    $alp: new Party("ALP", "American Labor Party", "$alp", "#ee1f1f", new Image()),
}

T.parties.$dem.image.src = "logos/us/dem.png";
T.parties.$rep.image.src = "logos/us/rep.png";

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 215),
    new Fraction(T.parties.$rep, 220),
], "2024 House of Representatives Elections", new Date("2024-11-05")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 213),
    new Fraction(T.parties.$rep, 222),
], "2022 House of Representatives Elections", new Date("2022-11-08")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 222),
    new Fraction(T.parties.$rep, 213),
], "2020 House of Representatives Elections", new Date("2020-11-03")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 235),
    new Fraction(T.parties.$vac, 1),
    new Fraction(T.parties.$rep, 199),
], "2018 House of Representatives Elections", new Date("2018-11-06")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 194),
    new Fraction(T.parties.$rep, 241),
], "2016 House of Representatives Elections", new Date("2016-11-08")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 188),
    new Fraction(T.parties.$rep, 247),
], "2014 House of Representatives Elections", new Date("2014-11-04")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 201),
    new Fraction(T.parties.$rep, 234),
], "2012 House of Representatives Elections", new Date("2012-11-06")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 193),
    new Fraction(T.parties.$rep, 242),
], "2010 House of Representatives Elections", new Date("2010-11-02")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 257),
    new Fraction(T.parties.$rep, 178),
], "2008 House of Representatives Elections", new Date("2008-11-04")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 233),
    new Fraction(T.parties.$rep, 202),
], "2006 House of Representatives Elections", new Date("2006-11-07")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 202),
    new Fraction(T.parties.$ind, 1),
    new Fraction(T.parties.$rep, 232),
], "2004 House of Representatives Elections", new Date("2004-11-02")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 205),
    new Fraction(T.parties.$ind, 1),
    new Fraction(T.parties.$rep, 229),
], "2002 House of Representatives Elections", new Date("2002-11-05")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 212),
    new Fraction(T.parties.$ind, 2),
    new Fraction(T.parties.$rep, 221),
], "2000 House of Representatives Elections", new Date("2000-11-07")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 211),
    new Fraction(T.parties.$ind, 1),
    new Fraction(T.parties.$rep, 223),
], "1998 House of Representatives Elections", new Date("1998-11-03")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 207),
    new Fraction(T.parties.$ind, 2),
    new Fraction(T.parties.$rep, 226),
], "1996 House of Representatives Elections", new Date("1996-11-05")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 204),
    new Fraction(T.parties.$ind, 1),
    new Fraction(T.parties.$rep, 230),
], "1994 House of Representatives Elections", new Date("1994-11-08")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 258),
    new Fraction(T.parties.$ind, 1),
    new Fraction(T.parties.$rep, 176),
], "1992 House of Representatives Elections", new Date("1992-11-03")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 267),
    new Fraction(T.parties.$ind, 1),
    new Fraction(T.parties.$rep, 167),
], "1990 House of Representatives Elections", new Date("1990-11-06")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 260),
    new Fraction(T.parties.$rep, 175),
], "1988 House of Representatives Elections", new Date("1988-11-08")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 258),
    new Fraction(T.parties.$rep, 177),
], "1986 House of Representatives Elections", new Date("1986-11-04")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 253),
    new Fraction(T.parties.$rep, 181),
    new Fraction(T.parties.$con, 1),
], "1984 House of Representatives Elections", new Date("1984-11-06")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 269),
    new Fraction(T.parties.$rep, 165),
    new Fraction(T.parties.$con, 1),
], "1982 House of Representatives Elections", new Date("1982-11-02")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 242),
    new Fraction(T.parties.$ind, 1),
    new Fraction(T.parties.$rep, 191),
    new Fraction(T.parties.$con, 1),
], "1980 House of Representatives Elections", new Date("1980-11-04")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 277),
    new Fraction(T.parties.$rep, 157),
    new Fraction(T.parties.$con, 1),
], "1978 House of Representatives Elections", new Date("1978-11-07")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 292),
    new Fraction(T.parties.$rep, 143),
], "1976 House of Representatives Elections", new Date("1976-11-02")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 291),
    new Fraction(T.parties.$rep, 144),
], "1974 House of Representatives Elections", new Date("1974-11-05")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 242),
    new Fraction(T.parties.$ind, 1),
    new Fraction(T.parties.$rep, 192),
], "1972 House of Representatives Elections", new Date("1972-11-07")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 255),
    new Fraction(T.parties.$rep, 180),
], "1970 House of Representatives Elections", new Date("1970-11-03")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 243),
    new Fraction(T.parties.$rep, 192),
], "1968 House of Representatives Elections", new Date("1968-11-05")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 248),
    new Fraction(T.parties.$rep, 187),
], "1966 House of Representatives Elections", new Date("1966-11-08")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 295),
    new Fraction(T.parties.$rep, 140),
], "1964 House of Representatives Elections", new Date("1964-11-03")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 259),
    new Fraction(T.parties.$rep, 176),
], "1962 House of Representatives Elections", new Date("1962-11-06")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 262),
    new Fraction(T.parties.$rep, 175),
], "1960 House of Representatives Elections", new Date("1960-11-08")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 283),
    new Fraction(T.parties.$rep, 153),
], "1958 House of Representatives Elections", new Date("1958-11-04")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 234),
    new Fraction(T.parties.$rep, 201),
], "1956 House of Representatives Elections", new Date("1956-11-06")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 232),
    new Fraction(T.parties.$rep, 203),
], "1954 House of Representatives Elections", new Date("1954-11-02")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 213),
    new Fraction(T.parties.$ind, 1),
    new Fraction(T.parties.$rep, 221),
], "1952 House of Representatives Elections", new Date("1952-11-04")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$dem, 235),
    new Fraction(T.parties.$ind, 1),
    new Fraction(T.parties.$rep, 199),
], "1950 House of Representatives Elections", new Date("1950-11-07")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$alp, 1),
    new Fraction(T.parties.$dem, 263),
    new Fraction(T.parties.$rep, 171),
], "1948 House of Representatives Elections", new Date("1948-11-02")));

Timelines["us_houseofrepresentatives"] = T;