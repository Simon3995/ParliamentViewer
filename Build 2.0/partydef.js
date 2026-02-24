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
    $gm: new Party("GM", "Groep Markuszower", "#169793ff", new Image()),
    $fvd: new Party("FvD", "Forum voor Democratie", "#841818", new Image()),
    $lpf: new Party("LPF", "Lijst Pim Fortuyn", "rgb(18, 74, 158)", new Image()),
    $ln: new Party("LN", "Leefbaar Nederland", "#ff6600ff", new Image()),
    $rpf: new Party("RPF", "Reformatorische Politieke Federatie", "#000080", new Image()),
    $gpv: new Party("GPV", "Gereformeerd Politiek Verbond", "#ff7b00", new Image()),
    $aov: new Party("AOV", "Algemeen Ouderen Verbond", "#3083ff", new Image()),
    $u55p: new Party("U55+", "Unie 55+", "#44bec2", new Image()),
    $cd: new Party("CD", "Centrumdemocraten", "#c9dfff", new Image()),
    $psp: new Party("PSP", "Pacifistisch Socialistische Partij", "#e62525ff", new Image()),
    $ppr: new Party("PPR", "Politieke Partij Radikalen", "#e92f7cff", new Image()),
    $evp: new Party("EVP", "Evangelische Volkspartij", "rgb(240, 176, 0)", new Image()),
    $cpn: new Party("CPN", "Communistische Partij Nederland", "#ff0000", new Image()),
    $bp: new Party("BP", "Boerenpartij", "rgb(81, 148, 54)", new Image()),
    $ds70: new Party("DS'70", "Democratisch Socialisten '70", "#d40000ff", new Image()),
    $kvp: new Party("KVP", "Katholieke Volkspartij", "#362511ff", new Image()),
    $chu: new Party("CHU", "Christelijk-Historische Unie", "#0f1e53ff", new Image()),
    $arp: new Party("ARP", "Anti-Revolutonaire Partij", "rgb(99, 142, 197)", new Image()),
    $rkpn: new Party("RKPN", "Rooms Katholieke Partij Nederland", "rgb(206, 165, 31)", new Image()),
    $nmp: new Party("NMP", "Nederlandse Middenstands Partij", "rgb(51, 53, 167)", new Image()),
    $knp: new Party("KNP", "Katholieke Nationale Partij", "rgb(63, 170, 78)", new Image()),
    $pvdv: new Party("PvdV", "Partij voor de Vrijheid", "#092447ff", new Image()),
    $rksp: new Party("RKSP", "Rooms-Katholieke Staatspartij", "rgb(187, 90, 0)", new Image()),
    $sdap: new Party("SDAP", "Sociaal-Democratische Arbeiderspartij", "#e41919ff", new Image()),
    $vdb: new Party("VDB", "Vrijzinnig Democratische Bond", "#6e0e0eff", new Image()),
    $nsb: new Party("NSB", "Nationaal-Socialistische Beweging", "#000000ff", new Image()),
    $lsp: new Party("LSP", "Liberale Staatspartij", "#0d6486ff", new Image()),
    $cdu: new Party("CDU", "Christelijk-Democratische Unie", "#eb6c05ff", new Image()),
    $rsp: new Party("RSP", "Revolutionair Socialistische Partij", "#a70909ff", new Image()),
    // couldnt find *any* poster for NBTMP, just went for BBB color
    $nbtmp: new Party("NBTMP", "Nationale Boeren-, Tuinders- en Middenstandspartij", "#9ee65aff", new Image()),
    $rkvp: new Party("RKVP", "Rooms-Katholieke Volkspartij", "#802008ff", new Image()),
    // couldnt find *any* poster for HGSP, idk im just going dark blue why not
    $hgsp: new Party("HGSP", "Hervormd-Gereformeerde Staatspartij", "#030557ff", new Image()),
    $vnh: new Party("VNH", "Verbond voor Nationaal Herstel", "#ca8c19ff", new Image()),
    $lk: new Party("LK", "Lid Keijzer", "#378747ff", new Image()),
}

/**
 * Some notes about parties that we may need to deal with later.
 * Thought it was a good idea to keep track of these somewhere
 * - How do we display party fusions? Below is a known list:
 *      - GL + PvdA -> GL/PvdA
 *      - KVP + ARP + CHU -> CDA
 *      - PPR + PSP + CPN + EVP -> GL
 * 
 * - How do we display rebrands or renaming? Below is a known list:
 *      - Lijst Welter -> KNP (rebranded before 1952 election)
 *      - Plattelandersbond -> NBTMP (rebranded before 1933 election)
 * 
 * 
 * - Rebrands make me think, we can also consider supporting party logos throughout the ages,
 *   though this is probably not worth the effort.
 * 
 * - There's some post-WW2 rebrands, and a post-WW2 fusion.
 *   My recommendation would be to treat these rebrands as entirely new parties,
 *   but to treat the fusion as a regular party fusion.
 *   Reason for this being that the rebrands are typically considered
 *   separate organizations from their pre-war predecessors,
 *   which is abnormal for a rebranded party but not for a party fusion.
 *      - LSP -> PvdD (rebrand)
 *      - RKSP -> KVP (rebrand)
 *      - SDAP + VDB + CDU -> PvdA (fusion)
 * 
 * - Frank
 */

T.parties.$bij1.image.src = "logos/BIJ1.png";
T.parties.$ppnl.image.src = "logos/PPNL.png";
T.parties.$sp.image.src = "logos/SP.png";
T.parties.$pvdd.image.src = "logos/PvdD.png";
T.parties.$gl.image.src = "logos/GL.png";
T.parties.$glpvda.image.src = "logos/GvdL.png";
T.parties.$pvda.image.src = "logos/PvdA.png";
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
T.parties.$lpf.image.src = "logos/LPF.png";
T.parties.$ln.image.src = "logos/LN.png";
T.parties.$rpf.image.src = "logos/RPF.png";
T.parties.$gpv.image.src = "logos/GPV.png";
T.parties.$aov.image.src = "logos/AOV.png";
T.parties.$u55p.image.src = "logos/Unie55+.png";
T.parties.$cd.image.src = "logos/CD.png";
T.parties.$psp.image.src = "logos/PSP.png";
T.parties.$ppr.image.src = "logos/PPR.png";
T.parties.$cpn.image.src = "logos/CPN.png";
T.parties.$ds70.image.src = "logos/DS70.png";
T.parties.$kvp.image.src = "logos/KVP.png";
T.parties.$chu.image.src = "logos/CHU.png";
T.parties.$arp.image.src = "logos/ARP.png";
T.parties.$pvdv.image.src = "logos/PvdV.png";
T.parties.$sdap.image.src = "logos/SDAP.png";
T.parties.$vdb.image.src = "logos/VDB.png";
T.parties.$nsb.image.src = "logos/NSB.png";

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 3),
    new Fraction(T.parties.$pvdd, 3),
    new Fraction(T.parties.$glpvda, 20),
    new Fraction(T.parties.$denk, 3),
    new Fraction(T.parties.$volt, 1),
    new Fraction(T.parties.$d66, 26),
    new Fraction(T.parties.$cu, 3),
    new Fraction(T.parties.$50plus, 2),
    new Fraction(T.parties.$cda, 18),
    new Fraction(T.parties.$vvd, 22),
    new Fraction(T.parties.$bbb, 3),
    new Fraction(T.parties.$lk, 1),
    new Fraction(T.parties.$ja21, 9),
    new Fraction(T.parties.$sgp, 3),
    new Fraction(T.parties.$gm, 7),
    new Fraction(T.parties.$pvv, 19),
    new Fraction(T.parties.$fvd, 7)
], "Current Situation", new Date()));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 3),
    new Fraction(T.parties.$pvdd, 3),
    new Fraction(T.parties.$glpvda, 20),
    new Fraction(T.parties.$denk, 3),
    new Fraction(T.parties.$volt, 1),
    new Fraction(T.parties.$d66, 26),
    new Fraction(T.parties.$cu, 3),
    new Fraction(T.parties.$50plus, 2),
    new Fraction(T.parties.$cda, 18),
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
    new Fraction(T.parties.$50plus, 1),
    new Fraction(T.parties.$cda, 15),
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
    new Fraction(T.parties.$50plus, 4),
    new Fraction(T.parties.$cda, 19),
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
    new Fraction(T.parties.$50plus, 2),
    new Fraction(T.parties.$cda, 13),
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

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 3),
    new Fraction(T.parties.$psp, 3),
    new Fraction(T.parties.$ppr, 3),
    new Fraction(T.parties.$pvda, 44),
    new Fraction(T.parties.$d66, 17),
    new Fraction(T.parties.$cda, 48),
    new Fraction(T.parties.$rpf, 2),
    new Fraction(T.parties.$gpv, 1),
    new Fraction(T.parties.$vvd, 26),
    new Fraction(T.parties.$sgp, 3),
], "Tweede Kamerverkiezingen 1981", new Date("1981-05-26")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 2),
    new Fraction(T.parties.$psp, 1),
    new Fraction(T.parties.$ppr, 3),
    new Fraction(T.parties.$pvda, 53),
    new Fraction(T.parties.$ds70, 1),
    new Fraction(T.parties.$d66, 8),
    new Fraction(T.parties.$cda, 49),
    new Fraction(T.parties.$gpv, 1),
    new Fraction(T.parties.$vvd, 28),
    new Fraction(T.parties.$bp, 1),
    new Fraction(T.parties.$sgp, 3),
], "Tweede Kamerverkiezingen 1977", new Date("1977-05-25")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 7),
    new Fraction(T.parties.$psp, 2),
    new Fraction(T.parties.$ppr, 7),
    new Fraction(T.parties.$pvda, 43),
    new Fraction(T.parties.$ds70, 6),
    new Fraction(T.parties.$d66, 6),
    new Fraction(T.parties.$chu, 7),
    new Fraction(T.parties.$kvp, 27),
    new Fraction(T.parties.$arp, 14),
    new Fraction(T.parties.$gpv, 2),
    new Fraction(T.parties.$vvd, 22),
    new Fraction(T.parties.$rkpn, 1),
    new Fraction(T.parties.$bp, 3),
    new Fraction(T.parties.$sgp, 3),
], "Tweede Kamerverkiezingen 1972", new Date("1972-11-29")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 6),
    new Fraction(T.parties.$psp, 2),
    new Fraction(T.parties.$ppr, 2),
    new Fraction(T.parties.$pvda, 39),
    new Fraction(T.parties.$ds70, 8),
    new Fraction(T.parties.$d66, 11),
    new Fraction(T.parties.$chu, 10),
    new Fraction(T.parties.$kvp, 35),
    new Fraction(T.parties.$arp, 13),
    new Fraction(T.parties.$gpv, 2),
    new Fraction(T.parties.$vvd, 16),
    new Fraction(T.parties.$nmp, 2),
    new Fraction(T.parties.$bp, 1),
    new Fraction(T.parties.$sgp, 3),
], "Tweede Kamerverkiezingen 1971", new Date("1971-04-28")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 5),
    new Fraction(T.parties.$psp, 4),
    new Fraction(T.parties.$pvda, 37),
    new Fraction(T.parties.$d66, 7),
    new Fraction(T.parties.$chu, 12),
    new Fraction(T.parties.$kvp, 42),
    new Fraction(T.parties.$arp, 15),
    new Fraction(T.parties.$gpv, 1),
    new Fraction(T.parties.$vvd, 17),
    new Fraction(T.parties.$bp, 7),
    new Fraction(T.parties.$sgp, 3),
], "Tweede Kamerverkiezingen 1967", new Date("1967-02-15")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 4),
    new Fraction(T.parties.$psp, 4),
    new Fraction(T.parties.$pvda, 43),
    new Fraction(T.parties.$chu, 13),
    new Fraction(T.parties.$kvp, 50),
    new Fraction(T.parties.$arp, 13),
    new Fraction(T.parties.$gpv, 1),
    new Fraction(T.parties.$vvd, 16),
    new Fraction(T.parties.$bp, 3),
    new Fraction(T.parties.$sgp, 3),
], "Tweede Kamerverkiezingen 1963", new Date("1963-05-15")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 3),
    new Fraction(T.parties.$psp, 2),
    new Fraction(T.parties.$pvda, 48),
    new Fraction(T.parties.$chu, 12),
    new Fraction(T.parties.$kvp, 49),
    new Fraction(T.parties.$arp, 14),
    new Fraction(T.parties.$vvd, 19),
    new Fraction(T.parties.$sgp, 3),
], "Tweede Kamerverkiezingen 1959", new Date("1959-03-12")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 4),
    new Fraction(T.parties.$pvda, 34),
    new Fraction(T.parties.$chu, 8),
    new Fraction(T.parties.$kvp, 33),
    new Fraction(T.parties.$arp, 10),
    new Fraction(T.parties.$vvd, 9),
    new Fraction(T.parties.$sgp, 2),
], "Tweede Kamerverkiezingen 1956", new Date("1956-06-13")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 6),
    new Fraction(T.parties.$pvda, 30),
    new Fraction(T.parties.$chu, 9),
    new Fraction(T.parties.$kvp, 30),
    new Fraction(T.parties.$arp, 12),
    new Fraction(T.parties.$vvd, 9),
    new Fraction(T.parties.$knp, 2),
    new Fraction(T.parties.$sgp, 2),
], "Tweede Kamerverkiezingen 1952", new Date("1952-06-25")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 8),
    new Fraction(T.parties.$pvda, 27),
    new Fraction(T.parties.$chu, 9),
    new Fraction(T.parties.$kvp, 32),
    new Fraction(T.parties.$arp, 13),
    new Fraction(T.parties.$vvd, 8),
    new Fraction(T.parties.$knp, 1),
    new Fraction(T.parties.$sgp, 2),
], "Tweede Kamerverkiezingen 1948", new Date("1948-07-07")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 10),
    new Fraction(T.parties.$pvda, 29),
    new Fraction(T.parties.$chu, 8),
    new Fraction(T.parties.$kvp, 32),
    new Fraction(T.parties.$arp, 13),
    new Fraction(T.parties.$pvdv, 6),
    new Fraction(T.parties.$sgp, 2),
], "Tweede Kamerverkiezingen 1946", new Date("1946-05-17")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 3),
    new Fraction(T.parties.$sdap, 23),
    new Fraction(T.parties.$cdu, 2),
    new Fraction(T.parties.$vdb, 6),
    new Fraction(T.parties.$chu, 8),
    new Fraction(T.parties.$rksp, 31),
    new Fraction(T.parties.$arp, 17),
    new Fraction(T.parties.$lsp, 4),
    new Fraction(T.parties.$sgp, 2),
    new Fraction(T.parties.$nsb, 4),
], "Tweede Kamerverkiezingen 1937", new Date("1937-05-26")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$rsp, 1),
    new Fraction(T.parties.$cpn, 4),
    new Fraction(T.parties.$sdap, 22),
    new Fraction(T.parties.$cdu, 1),
    new Fraction(T.parties.$vdb, 6),
    new Fraction(T.parties.$rkvp, 1),
    new Fraction(T.parties.$chu, 10),
    new Fraction(T.parties.$rksp, 28),
    new Fraction(T.parties.$arp, 14),
    new Fraction(T.parties.$lsp, 7),
    new Fraction(T.parties.$nbtmp, 1),
    new Fraction(T.parties.$hgsp, 1),
    new Fraction(T.parties.$sgp, 3),
    new Fraction(T.parties.$vnh, 1),
], "Tweede Kamerverkiezingen 1933", new Date("1933-04-26")));