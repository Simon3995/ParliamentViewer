let T = new Timeline("Netherlands");

T.parties = {
    $bij1: new Party("BIJ1", "BIJ1", "#000000", new Image()),
    $ppnl: new Party("PPNL", "Piratenpartij", "#8300c5ff", new Image()),
    $sp: new Party("SP", "Socialistische Partij", "#ed1b24", new Image()),
    $pvdd: new Party("PvdD", "Partij voor de Dieren", "#016b2d", new Image()),
    $gl: new Party("GL", "GroenLinks", "#00cc00", new Image()),
    $glpvda: new Party("GL/PvdA", "GroenLinks / Partij voor de Arbeid", "#01af40", new Image()),
    $pvda: new Party("PvdA", "Partij van de Arbeid", "#ff0000", new Image()),
    $denk: new Party("DENK", "DENK", "#38bfc2", new Image()),
    $volt: new Party("Volt", "Volt", "#683ba8", new Image()),
    $d66: new Party("D66", "Democraten 66", "#01af40", new Image()),
    $cu: new Party("CU", "ChristenUnie", "#8fd1eb", new Image()),
    $fnp: new Party("FNP", "Fryske Nasjonale Partij", "#003366", new Image()),
    $cda: new Party("CDA", "Christen-Democratisch Appèl", "#007c5e", new Image()),
    $nsc: new Party("NSC", "Nieuw Sociaal Contract", "#181d57", new Image()),
    $50plus: new Party("50PLUS", "50PLUS", "#92278f", new Image()),
    $vvd: new Party("VVD", "Volkspartij voor Vrijheid en Democratie", "#21276a", new Image()),
    $bbb: new Party("BBB", "BoerBurgerBeweging", "#8fbb1f", new Image()),
    $ja21: new Party("JA21", "Juiste Antwoord 21", "#21276a", new Image()),
    $sgp: new Party("SGP", "Staatkundig Gereformeerde Partij", "#e95d0e", new Image()),
    $pvv: new Party("PVV", "Partij voor de Vrijheid", "#82b2ff", new Image()),
    $fvd: new Party("FvD", "Forum voor Democratie", "#841818", new Image())
}

T.parties.$bij1.image.src = "logos/BIJ1.png";
T.parties.$ppnl.image.src = "logos/PPNL.png";
T.parties.$sp.image.src = "logos/SP.png";
T.parties.$pvdd.image.src = "logos/PvdD.png";
T.parties.$glpvda.image.src = "logos/GvdL.png";
T.parties.$denk.image.src = "logos/DENK.png";
T.parties.$volt.image.src = "logos/Volt.png";
T.parties.$d66.image.src = "logos/D66.png";
T.parties.$cu.image.src = "logos/CU.png";
T.parties.$fnp.image.src = "logos/FNP.png";
T.parties.$cda.image.src = "logos/CDA.png";
T.parties.$nsc.image.src = "logos/NSC.png";
T.parties.$50plus.image.src = "logos/50PLUS.png";
T.parties.$vvd.image.src = "logos/VVD.png";
T.parties.$bbb.image.src = "logos/BBB.png";
T.parties.$ja21.image.src = "logos/JA21.png";
T.parties.$sgp.image.src = "logos/SGP.png";
T.parties.$pvv.image.src = "logos/PVV.png";
T.parties.$fvd.image.src = "logos/FvD.png";

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 3),
    new Fraction(T.parties.$pvdd, 3),
    new Fraction(T.parties.$glpvda, 20),
    new Fraction(T.parties.$denk, 3),
    new Fraction(T.parties.$volt, 1),
    new Fraction(T.parties.$d66, 26),
    new Fraction(T.parties.$cu, 3),
    new Fraction(T.parties.$cda, 18),
    new Fraction(T.parties.$50plus, 2),
    new Fraction(T.parties.$vvd, 22),
    new Fraction(T.parties.$bbb, 4),
    new Fraction(T.parties.$ja21, 9),
    new Fraction(T.parties.$sgp, 3),
    new Fraction(T.parties.$pvv, 26),
    new Fraction(T.parties.$fvd, 7)
], "Tweede Kamerverkiezingen 2025", new Date("2025-10-29")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 5),
    new Fraction(T.parties.$pvdd, 3),
    new Fraction(T.parties.$glpvda, 25),
    new Fraction(T.parties.$denk, 3),
    new Fraction(T.parties.$volt, 2),
    new Fraction(T.parties.$d66, 9),
    new Fraction(T.parties.$cu, 3),
    new Fraction(T.parties.$cda, 5),
    new Fraction(T.parties.$nsc, 20),
    new Fraction(T.parties.$vvd, 24),
    new Fraction(T.parties.$bbb, 7),
    new Fraction(T.parties.$ja21, 1),
    new Fraction(T.parties.$sgp, 3),
    new Fraction(T.parties.$pvv, 37),
    new Fraction(T.parties.$fvd, 3)
], "Tweede Kamerverkiezingen 2023", new Date("2023-11-22")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$bij1, 1),
    new Fraction(T.parties.$sp, 9),
    new Fraction(T.parties.$pvdd, 6),
    new Fraction(T.parties.$gl, 8),
    new Fraction(T.parties.$pvda, 9),
    new Fraction(T.parties.$denk, 3),
    new Fraction(T.parties.$volt, 3),
    new Fraction(T.parties.$d66, 24),
    new Fraction(T.parties.$cu, 5),
    new Fraction(T.parties.$cda, 15),
    new Fraction(T.parties.$50plus, 1),
    new Fraction(T.parties.$vvd, 34),
    new Fraction(T.parties.$bbb, 1),
    new Fraction(T.parties.$ja21, 3),
    new Fraction(T.parties.$sgp, 3),
    new Fraction(T.parties.$pvv, 17),
    new Fraction(T.parties.$fvd, 8)
], "Tweede Kamerverkiezingen 2021", new Date("2021-03-17")));