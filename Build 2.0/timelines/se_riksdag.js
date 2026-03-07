T = new Timeline("Sweden - Riksdag");

T.parties = {
    $v: new Party("V", "Vänsterpartiet", "$v", "#a30000", new Image()),
    $mp: new Party("MP", "Miljöpartiet", "$mp", "#5fc951", new Image()),
    $sap: new Party("S", "Socialdemokraterna", "$s", "#ff0000", new Image()),
    $c: new Party("C", "Centerpartiet", "$c", "#3f6b3f", new Image()),
    $l: new Party("L", "Liberalerna", "$l", "#54acff", new Image()),
    $kd: new Party("KD", "Kristdemokraterna", "$kd", "#000083", new Image()),
    $m: new Party("M", "Moderaterna", "$m", "#0080f0", new Image()),
    $sd: new Party("SD", "Sverigedemokraterna", "$sd", "#ffc400", new Image()),
}

T.add_parliament(new Parliament([
    new Fraction(T.parties.$v, 24),
    new Fraction(T.parties.$sap, 107),
    new Fraction(T.parties.$mp, 18),
    new Fraction(T.parties.$c, 24),
    new Fraction(T.parties.$l, 16),
    new Fraction(T.parties.$kd, 19),
    new Fraction(T.parties.$m, 68),
    new Fraction(T.parties.$sd, 73),
], "2022 General Election", new Date("2022-09-11")));

Timelines["se_riksdag"] = T;