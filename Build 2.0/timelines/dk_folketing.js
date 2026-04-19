T = new Timeline("Denmark - Folketing");

T.parties = {
    $a: new Party("A", "Socialdemokratiet", "$a", "#c90000", new Image()),
    $rv: new Party("B", "Radikale Venstre", "$rv", "#E50F7F", new Image()),
    $sf: new Party("SF", "Socialistisk Folkeparti", "$sf", "#f21a1a", new Image()),
    $v: new Party("V", "Venstre", "$v", "#283267", new Image()),
    $la: new Party("LA", "Liberal Alliance", "$la", "#0f5d81", new Image()),
    $df: new Party("DF", "Dansk Folkeparti", "$df", "#2a5b89", new Image()),
    $m: new Party("M", "Moderaterne", "$m", "#835aff", new Image()),
    $c: new Party("C", "Det Konservative Folkeparti", "$k", "#466742", new Image()),
    $ø: new Party("Ø", "Enhetslisten - De Rød-Grønne", "$ø", "#D0004D", new Image()),
    $æ: new Party("Æ", "Danmarksdemokraterne", "$æ", "#0088dd", new Image()),
    $å: new Party("Å", "Alternativet", "$å", "#56da56", new Image()),
    $h: new Party("H", "Borgernes Parti", "$h", "#0091ff", new Image()),

    $jf: new Party("JF", "Javnaðarflokkurin", "$jf", "#D71635", new Image()),
    $b: new Party("B", "Sambandsflokkurin", "$b", "#439cdc", new Image()),
    $n: new Party("N", "Naleraq", "$n", "#ff6d24", new Image()),
    $ia: new Party("IA", "Inuit Ataqatigiit", "$ia", "#8a0000", new Image()),
}

T.parties.$a.image.src = "logos/dk/a.png";
T.parties.$å.image.src = "logos/dk/å.png";
T.parties.$sf.image.src = "logos/dk/sf.png";
T.parties.$ia.image.src = "logos/dk/ia.png";
T.parties.$ø.image.src = "logos/dk/ø.png";
T.parties.$jf.image.src = "logos/dk/jf.png";
T.parties.$rv.image.src = "logos/dk/rv.png";
T.parties.$m.image.src = "logos/dk/m.png";
T.parties.$n.image.src = "logos/dk/n.png";
T.parties.$v.image.src = "logos/dk/v.png";
T.parties.$b.image.src = "logos/dk/b.png";
T.parties.$c.image.src = "logos/dk/c.png";
T.parties.$la.image.src = "logos/dk/la.png";
T.parties.$æ.image.src = "logos/dk/æ.png";
T.parties.$df.image.src = "logos/dk/df.png";
T.parties.$h.image.src = "logos/dk/h.png";

T.add_parliament(new Parliament([
    new Fraction(T.parties.$ø, 11),
    new Fraction(T.parties.$ia, 1),
    new Fraction(T.parties.$sf, 20),
    new Fraction(T.parties.$å, 5),
    new Fraction(T.parties.$a, 38),
    new Fraction(T.parties.$jf, 1),
    new Fraction(T.parties.$rv, 10),
    new Fraction(T.parties.$m, 14),
    new Fraction(T.parties.$n, 1),
    new Fraction(T.parties.$v, 18),
    new Fraction(T.parties.$b, 1),
    new Fraction(T.parties.$c, 13),
    new Fraction(T.parties.$la, 16),
    new Fraction(T.parties.$æ, 10),
    new Fraction(T.parties.$df, 16),
    new Fraction(T.parties.$h, 4),
], "2026 General Election", new Date("2026-03-24")));

Timelines["dk_folketing"] = T;