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
    $ja21: new Party("JA21", "Juiste Antwoord 2021", "#21276a", new Image()),
    $sgp: new Party("SGP", "Staatkundig Gereformeerde Partij", "#e95d0e", new Image()),
    $pvv: new Party("PVV", "Partij voor de Vrijheid", "#82b2ff", new Image()),
    $fvd: new Party("FvD", "Forum voor Democratie", "#841818", new Image()),
    $lpf: new Party("LPF", "Lijst Pim Fortuyn", "#f7be00ff", new Image()),
    $ln: new Party("LN", "Leefbaar Nederland", "#ff6600ff", new Image()),
    $rpf: new Party("RPF", "Reformatorische Politieke Federatie", "#000080", new Image()),
    $gpv: new Party("GPV", "Gereformeerd Politiek Verbond", "#0000ff", new Image()),
    $aov: new Party("AOV", "Algemeen Ouderen Verbond", "#808080", new Image()),
    $u55p: new Party("U55+", "Unie 55+", "#808080", new Image()),
    $cd: new Party("CD", "Centrumdemocraten", "#800000", new Image()),
    $psp: new Party("PSP", "Pacifistisch Socialistische Partij", "#e62525ff", new Image()),
    $ppr: new Party("PPR", "Politieke Partij Radikalen", "#e92f7cff", new Image()),
    $evp: new Party("EVP", "Evangelische Volkspartij", "#ffcc00ff", new Image()),
    $cpn: new Party("CPN", "Communistische Partij Nederland", "#ff0000", new Image())
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

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 14),
    new Fraction(T.parties.$pvdd, 5),
    new Fraction(T.parties.$gl, 14),
    new Fraction(T.parties.$pvda, 9),
    new Fraction(T.parties.$denk, 3),
    new Fraction(T.parties.$d66, 19),
    new Fraction(T.parties.$cu, 5),
    new Fraction(T.parties.$cda, 19),
    new Fraction(T.parties.$50plus, 4),
    new Fraction(T.parties.$vvd, 33),
    new Fraction(T.parties.$sgp, 3),
    new Fraction(T.parties.$pvv, 20),
    new Fraction(T.parties.$fvd, 2)
], "Tweede Kamerverkiezingen 2017", new Date("2017-03-15")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 15),
    new Fraction(T.parties.$pvdd, 2),
    new Fraction(T.parties.$gl, 4),
    new Fraction(T.parties.$pvda, 38),
    new Fraction(T.parties.$d66, 12),
    new Fraction(T.parties.$cu, 5),
    new Fraction(T.parties.$cda, 13),
    new Fraction(T.parties.$50plus, 2),
    new Fraction(T.parties.$vvd, 41),
    new Fraction(T.parties.$sgp, 3),
    new Fraction(T.parties.$pvv, 15)
], "Tweede Kamerverkiezingen 2012", new Date("2012-09-12")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 15),
    new Fraction(T.parties.$pvdd, 2),
    new Fraction(T.parties.$gl, 10),
    new Fraction(T.parties.$pvda, 30),
    new Fraction(T.parties.$d66, 10),
    new Fraction(T.parties.$cu, 5),
    new Fraction(T.parties.$cda, 21),
    new Fraction(T.parties.$vvd, 31),
    new Fraction(T.parties.$sgp, 2),
    new Fraction(T.parties.$pvv, 24)
], "Tweede Kamerverkiezingen 2010", new Date("2010-06-09")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 25),
    new Fraction(T.parties.$pvdd, 2),
    new Fraction(T.parties.$gl, 7),
    new Fraction(T.parties.$pvda, 33),
    new Fraction(T.parties.$d66, 3),
    new Fraction(T.parties.$cu, 6),
    new Fraction(T.parties.$cda, 41),
    new Fraction(T.parties.$vvd, 22),
    new Fraction(T.parties.$sgp, 2),
    new Fraction(T.parties.$pvv, 9)
], "Tweede Kamerverkiezingen 2006", new Date("2006-11-22")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 9),
    new Fraction(T.parties.$gl, 8),
    new Fraction(T.parties.$pvda, 42),
    new Fraction(T.parties.$d66, 6),
    new Fraction(T.parties.$cu, 3),
    new Fraction(T.parties.$cda, 44),
    new Fraction(T.parties.$vvd, 28),
    new Fraction(T.parties.$sgp, 2),
    new Fraction(T.parties.$lpf, 8)
], "Tweede Kamerverkiezingen 2003", new Date("2003-01-22")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 9),
    new Fraction(T.parties.$gl, 10),
    new Fraction(T.parties.$pvda, 23),
    new Fraction(T.parties.$d66, 7),
    new Fraction(T.parties.$cu, 4),
    new Fraction(T.parties.$cda, 43),
    new Fraction(T.parties.$vvd, 24),
    new Fraction(T.parties.$ln, 2),
    new Fraction(T.parties.$sgp, 2),
    new Fraction(T.parties.$lpf, 26)
], "Tweede Kamerverkiezingen 2002", new Date("2002-05-15")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 5),
    new Fraction(T.parties.$gl, 11),
    new Fraction(T.parties.$pvda, 45),
    new Fraction(T.parties.$d66, 14),
    new Fraction(T.parties.$cda, 29),
    new Fraction(T.parties.$rpf, 3),
    new Fraction(T.parties.$gpv, 2),
    new Fraction(T.parties.$vvd, 38),
    new Fraction(T.parties.$sgp, 3)
], "Tweede Kamerverkiezingen 1998", new Date("1998-05-06")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 2),
    new Fraction(T.parties.$gl, 5),
    new Fraction(T.parties.$pvda, 37),
    new Fraction(T.parties.$d66, 24),
    new Fraction(T.parties.$cda, 34),
    new Fraction(T.parties.$aov, 6),
    new Fraction(T.parties.$u55p, 1),
    new Fraction(T.parties.$rpf, 3),
    new Fraction(T.parties.$gpv, 2),
    new Fraction(T.parties.$vvd, 31),
    new Fraction(T.parties.$sgp, 2),
    new Fraction(T.parties.$cd, 3)
], "Tweede Kamerverkiezingen 1994", new Date("1994-05-03")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$gl, 6),
    new Fraction(T.parties.$pvda, 49),
    new Fraction(T.parties.$d66, 12),
    new Fraction(T.parties.$cda, 54),
    new Fraction(T.parties.$rpf, 1),
    new Fraction(T.parties.$gpv, 2),
    new Fraction(T.parties.$vvd, 22),
    new Fraction(T.parties.$sgp, 3),
    new Fraction(T.parties.$cd, 1)
], "Tweede Kamerverkiezingen 1989", new Date("1989-09-06")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$psp, 1),
    new Fraction(T.parties.$ppr, 2),
    new Fraction(T.parties.$pvda, 52),
    new Fraction(T.parties.$d66, 9),
    new Fraction(T.parties.$cda, 54),
    new Fraction(T.parties.$rpf, 1),
    new Fraction(T.parties.$gpv, 1),
    new Fraction(T.parties.$vvd, 27),
    new Fraction(T.parties.$sgp, 3)
], "Tweede Kamerverkiezingen 1986", new Date("1986-05-21")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 3),
    new Fraction(T.parties.$psp, 3),
    new Fraction(T.parties.$evp, 1),
    new Fraction(T.parties.$ppr, 2),
    new Fraction(T.parties.$pvda, 47),
    new Fraction(T.parties.$d66, 6),
    new Fraction(T.parties.$cda, 45),
    new Fraction(T.parties.$rpf, 2),
    new Fraction(T.parties.$gpv, 1),
    new Fraction(T.parties.$vvd, 36),
    new Fraction(T.parties.$sgp, 3),
    new Fraction(T.parties.$cd, 1)
], "Tweede Kamerverkiezingen 1982", new Date("1982-09-08")));