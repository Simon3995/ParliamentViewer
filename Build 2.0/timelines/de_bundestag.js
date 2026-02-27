T = new Timeline("Germany - Bundestag");

T.parties = {
    $linke: new Party("Linke", "Die Linke", "#ba0076ff", new Image()),
    $grune: new Party("Grüne", "Bündnis 90/Die Grünen", "#3aab3a", new Image()),
    $spd: new Party("SPD", "Sozialdemokratische Partei Deutschlands", "#ff0000", new Image()),
    $cducsu: new Party("CDU/CSU", "Unionsparteien", "#303030", new Image()),
    $afd: new Party("AfD", "Alternative für Deutschland", "#3d9eff", new Image()),
    $ssw: new Party("SSW", "Südschleswigscher Wählerverband", "#2424aeff", new Image()),
}

T.add_parliament(new Parliament([
    new Fraction(T.parties.$linke, 64),
    new Fraction(T.parties.$grune, 85),
    new Fraction(T.parties.$spd, 120),
    new Fraction(T.parties.$ssw, 1),
    new Fraction(T.parties.$cducsu, 208),
    new Fraction(T.parties.$afd, 152),

], "2025 Federal Election", new Date("2025-02-23")));

Timelines["de_bundestag"] = T;