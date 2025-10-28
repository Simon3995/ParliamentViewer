let T = new Timeline("Netherlands");

const $bij1 = new Party("BIJ1", "BIJ1", "#000000", new Image());
const $ppnl = new Party("PPNL", "Piratenpartij", "#8300c5ff", new Image());
const $sp = new Party("SP", "Socialistische Partij", "#ed1b24", new Image());
const $pvdd = new Party("PvdD", "Partij voor de Dieren", "#016b2d", new Image());
const $glpvda = new Party("GL/PvdA", "GroenLinks / Partij voor de Arbeid", "#01af40", new Image());
const $denk = new Party("DENK", "DENK", "#38bfc2", new Image());
const $volt = new Party("Volt", "Volt", "#683ba8", new Image());
const $d66 = new Party("D66", "Democraten 66", "#01af40", new Image());
const $cu = new Party("CU", "ChristenUnie", "#8fd1eb", new Image());
const $fnp = new Party("FNP", "Fryske Nasjonale Partij", "#003366", new Image());
const $cda = new Party("CDA", "Christen-Democratisch Appèl", "#007c5e", new Image());
const $nsc = new Party("NSC", "Nieuw Sociaal Contract", "#181d57", new Image());
const $50plus = new Party("50PLUS", "50PLUS", "#92278f", new Image());
const $vvd = new Party("VVD", "Volkspartij voor Vrijheid en Democratie", "#21276a", new Image());
const $bbb = new Party("BBB", "BoerBurgerBeweging", "#8fbb1f", new Image());
const $ja21 = new Party("JA21", "Juiste Antwoord 21", "#21276a", new Image());
const $sgp = new Party("SGP", "Staatkundig Gereformeerde Partij", "#e95d0e", new Image());
const $pvv = new Party("PVV", "Partij voor de Vrijheid", "#82b2ff", new Image());
const $fvd = new Party("FvD", "Forum voor Democratie", "#841818", new Image());

$bij1.image.src = "logos/BIJ1.png";
$ppnl.image.src = "logos/PPNL.png";
$sp.image.src = "logos/SP.png";
$pvdd.image.src = "logos/PvdD.png";
$glpvda.image.src = "logos/GvdL.png";
$denk.image.src = "logos/DENK.png";
$volt.image.src = "logos/Volt.png";
$d66.image.src = "logos/D66.png";
$cu.image.src = "logos/CU.png";
$fnp.image.src = "logos/FNP.png";
$cda.image.src = "logos/CDA.png";
$nsc.image.src = "logos/NSC.png";
$50plus.image.src = "logos/50PLUS.png";
$vvd.image.src = "logos/VVD.png";
$bbb.image.src = "logos/BBB.png";
$ja21.image.src = "logos/JA21.png";
$sgp.image.src = "logos/SGP.png";
$pvv.image.src = "logos/PVV.png";
$fvd.image.src = "logos/FvD.png";

T.add_parliament(new Parliament([
    new Fraction($sp, 4),
    new Fraction($pvdd, 4),
    new Fraction($glpvda, 23),
    new Fraction($denk, 3),
    new Fraction($volt, 3),
    new Fraction($d66, 22),
    new Fraction($cu, 3),
    new Fraction($cda, 20),
    new Fraction($50plus, 2),
    new Fraction($vvd, 16),
    new Fraction($bbb, 4),
    new Fraction($ja21, 12),
    new Fraction($sgp, 3),
    new Fraction($pvv, 26),
    new Fraction($fvd, 5)
], "Ipsos I&O Peiling 25 oktober 2025", 2025));