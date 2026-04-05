T = new Timeline("Denmark - Folketing");

T.parties = {
    $a: new Party("A", "Socialdemokratiet", "$a", "#c90000", new Image()),
    $rv: new Party("B", "Radikale Venstre", "$rv", "#e81dcd", new Image()),
    $sf: new Party("SF", "Socialistisk Folkeparti", "$sf", "#f21a1a", new Image()),
    $v: new Party("V", "Venstre", "$v", "#283267", new Image()),
    $la: new Party("LA", "Liberal Alliance", "$la", "#40d2b4", new Image()),
    $df: new Party("DF", "Dansk Folkeparti", "$df", "#ffd900", new Image()),
    $m: new Party("M", "Moderaterne", "$m", "#835aff", new Image()),
    $k: new Party("K", "Det Konservative Folkeparti", "$k", "#225d1b", new Image()),
    $ø: new Party("Ø", "Enhetslisten - De Rød-Grønne", "$ø", "#ff8000", new Image()),
    $æ: new Party("Æ", "Danmarksdemokraterne", "$æ", "#0088dd", new Image()),
    $å: new Party("Å", "Alternativet", "$å", "#56da56", new Image()),
    $h: new Party("H", "Borgernes Parti", "$h", "#3caaff", new Image()),

    $jf: new Party("JF", "Javnaðarflokkurin", "$jf", "#ff0000", new Image()),
    $b: new Party("B", "Sambandsflokkurin", "$b", "#439cdc", new Image()),
    $n: new Party("N", "Naleraq", "$n", "#ff7d3c", new Image()),
    $ia: new Party("IA", "Inuit Ataqatigiit", "$ia", "#8a0000", new Image()),
}

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
    new Fraction(T.parties.$k, 13),
    new Fraction(T.parties.$la, 16),
    new Fraction(T.parties.$æ, 10),
    new Fraction(T.parties.$df, 16),
    new Fraction(T.parties.$h, 4),
], "2026 General Election", new Date("2026-03-24")));

Timelines["dk_folketing"] = T;