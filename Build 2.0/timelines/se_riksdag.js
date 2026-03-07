T = new Timeline("Sweden - Riksdag");

T.parties = {
    $v: new Party("V", "Vänsterpartiet", "$v", "#850000", new Image()),
    $mp: new Party("MP", "Miljöpartiet", "$mp", "#5fc951", new Image()),
    $s: new Party("S", "Socialdemokraterna", "$s", "#ff0000", new Image()),
    $c: new Party("C", "Centerpartiet", "$c", "#3f6b3f", new Image()),
    $l: new Party("L", "Liberalerna", "$l", "#3496f1", new Image()),
    $kd: new Party("KD", "Kristdemokraterna", "$kd", "#000083", new Image()),
    $m: new Party("M", "Moderaterna", "$m", "#2354da", new Image()),
    $sd: new Party("SD", "Sverigedemokraterna", "$sd", "#263f75", new Image()),
}

T.parties.$v.image.src = "logos/se/v.png";
T.parties.$s.image.src = "logos/se/s.png";
T.parties.$mp.image.src = "logos/se/mp.png";
T.parties.$c.image.src = "logos/se/c.png";
T.parties.$l.image.src = "logos/se/l.png";
T.parties.$kd.image.src = "logos/se/kd.png";
T.parties.$m.image.src = "logos/se/m.png";
T.parties.$sd.image.src = "logos/se/sd.png";

T.add_parliament(new Parliament([
    new Fraction(T.parties.$v, 24),
    new Fraction(T.parties.$s, 107),
    new Fraction(T.parties.$mp, 18),
    new Fraction(T.parties.$c, 24),
    new Fraction(T.parties.$l, 16),
    new Fraction(T.parties.$kd, 19),
    new Fraction(T.parties.$m, 68),
    new Fraction(T.parties.$sd, 73),
], "2022 General Election", new Date("2022-09-11")));

Timelines["se_riksdag"] = T;