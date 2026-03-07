T = new Timeline("Germany - Bundestag");

T.parties = {
    $linke: new Party("Linke", "Die Linke", "$linke", "#ba0076ff", new Image()),
    $grune: new Party("Grüne", "Bündnis 90/Die Grünen", "$grune", "#3aab3a", new Image()),
    $spd: new Party("SPD", "Sozialdemokratische Partei Deutschlands", "$spd", "#ee2121", new Image()),
    $cducsu: new Party("CDU/CSU", "Unionsparteien", "$cducsu", "#303030", new Image()),
    $fdp: new Party("FDP", "Freie Demokratische Partei", "$fdp", "#ffe600", new Image()),
    $afd: new Party("AfD", "Alternative für Deutschland", "$afd", "#3d9eff", new Image()),
    $ssw: new Party("SSW", "Südschleswigscher Wählerverband", "$ssw", "rgb(22, 40, 122)", new Image()),
    $pds: new Party("PDS", "Partei des Demokratischen Sozialismus", "$pds", "#ff5e00", new Image()),
}

T.parties.$linke.image.src = "logos/de/linke.png";
T.parties.$grune.image.src = "logos/de/grune.png";
T.parties.$spd.image.src = "logos/de/spd.png";
T.parties.$ssw.image.src = "logos/de/ssw.png";
T.parties.$cducsu.image.src = "logos/de/cducsu.png";
T.parties.$afd.image.src = "logos/de/afd.png";
T.parties.$fdp.image.src = "logos/de/fdp.png";
T.parties.$pds.image.src = "logos/de/pds.png";

T.add_parliament(new Parliament([
    new Fraction(T.parties.$linke, 64),
    new Fraction(T.parties.$spd, 120),
    new Fraction(T.parties.$grune, 85),
    new Fraction(T.parties.$ssw, 1),
    new Fraction(T.parties.$cducsu, 208),
    new Fraction(T.parties.$afd, 152),
], "2025 Federal Election", new Date("2025-02-23")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$linke, 39),
    new Fraction(T.parties.$spd, 206),
    new Fraction(T.parties.$grune, 118),
    new Fraction(T.parties.$ssw, 1),
    new Fraction(T.parties.$fdp, 91),
    new Fraction(T.parties.$cducsu, 197),
    new Fraction(T.parties.$afd, 83),
], "2021 Federal Election", new Date("2021-09-26")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$linke, 69),
    new Fraction(T.parties.$spd, 153),
    new Fraction(T.parties.$grune, 67),
    new Fraction(T.parties.$fdp, 80),
    new Fraction(T.parties.$cducsu, 246),
    new Fraction(T.parties.$afd, 94),
], "2017 Federal Election", new Date("2017-09-24")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$linke, 64),
    new Fraction(T.parties.$spd, 193),
    new Fraction(T.parties.$grune, 63),
    new Fraction(T.parties.$cducsu, 311),
], "2013 Federal Election", new Date("2013-09-22")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$linke, 76),
    new Fraction(T.parties.$spd, 146),
    new Fraction(T.parties.$grune, 68),
    new Fraction(T.parties.$fdp, 93),
    new Fraction(T.parties.$cducsu, 239),
], "2009 Federal Election", new Date("2009-09-27")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$linke, 54),
    new Fraction(T.parties.$spd, 222),
    new Fraction(T.parties.$grune, 51),
    new Fraction(T.parties.$fdp, 61),
    new Fraction(T.parties.$cducsu, 226),
], "2005 Federal Election", new Date("2005-09-18")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$pds, 2),
    new Fraction(T.parties.$spd, 251),
    new Fraction(T.parties.$grune, 55),
    new Fraction(T.parties.$fdp, 47),
    new Fraction(T.parties.$cducsu, 248),
], "2002 Federal Election", new Date("2002-09-22")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$pds, 36),
    new Fraction(T.parties.$spd, 298),
    new Fraction(T.parties.$grune, 47),
    new Fraction(T.parties.$fdp, 43),
    new Fraction(T.parties.$cducsu, 245),
], "1998 Federal Election", new Date("1998-09-27")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$pds, 30),
    new Fraction(T.parties.$spd, 252),
    new Fraction(T.parties.$grune, 49),
    new Fraction(T.parties.$fdp, 47),
    new Fraction(T.parties.$cducsu, 294),
], "1994 Federal Election", new Date("1994-10-16")));

Timelines["de_bundestag"] = T;