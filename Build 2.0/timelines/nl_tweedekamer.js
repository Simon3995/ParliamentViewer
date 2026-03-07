T = new Timeline("Netherlands - Tweede Kamer");

T.parties = {
    $bij1: new Party("BIJ1", "BIJ1", "$bij1", "#000000", new Image()),
    $ppnl: new Party("PPNL", "Piratenpartij", "$ppnl", "#8300c5ff", new Image()),
    $sp: new Party("SP", "Socialistische Partij", "$sp", "#ed1b24", new Image()),
    $pvdd: new Party("PvdD", "Partij voor de Dieren", "$pvdd", "#016b2d", new Image()),
    $gl: new Party("GL", "GroenLinks", "$gl", "#00cc00", new Image()),
    $glpvda: new Party("GL/PvdA", "GroenLinks / Partij van de Arbeid", "$glpvda", "#01af40", new Image()),
    $pvda: new Party("PvdA", "Partij van de Arbeid", "$pvda", "#ff0000", new Image()),
    $denk: new Party("DENK", "DENK", "$denk", "#38bfc2", new Image()),
    $volt: new Party("Volt", "Volt", "$volt", "#683ba8", new Image()),
    $d66: new Party("D66", "Democraten 66", "$d66", "#01af40", new Image()),
    $cu: new Party("CU", "ChristenUnie", "$cu", "#8fd1eb", new Image()),
    $fnp: new Party("FNP", "Fryske Nasjonale Partij", "$fnp", "#003366", new Image()),
    $cda: new Party("CDA", "Christen-Democratisch Appèl", "$cda", "#007c5e", new Image()),
    $nsc: new Party("NSC", "Nieuw Sociaal Contract", "$nsc", "#181d57", new Image()),
    $50plus: new Party("50PLUS", "50PLUS", "$50plus", "#92278f", new Image()),
    $vvd: new Party("VVD", "Volkspartij voor Vrijheid en Democratie", "$vvd", "#21276a", new Image()),
    $bbb: new Party("BBB", "BoerBurgerBeweging", "$bbb", "#8fbb1f", new Image()),
    $ja21: new Party("JA21", "Juiste Antwoord 2021", "$ja21", "#21276a", new Image()),
    $sgp: new Party("SGP", "Staatkundig Gereformeerde Partij", "$sgp", "#e95d0e", new Image()),
    $pvv: new Party("PVV", "Partij voor de Vrijheid", "$pvv", "#82b2ff", new Image()),
    $gm: new Party("GM", "Groep Markuszower", "$gm", "#169793ff", new Image()),
    $fvd: new Party("FvD", "Forum voor Democratie", "$fvd", "#841818", new Image()),
    $lpf: new Party("LPF", "Lijst Pim Fortuyn", "$lpf", "rgb(18, 74, 158)", new Image()),
    $ln: new Party("LN", "Leefbaar Nederland", "$ln", "#ff6600ff", new Image()),
    $rpf: new Party("RPF", "Reformatorische Politieke Federatie", "$rpf", "#000080", new Image()),
    $gpv: new Party("GPV", "Gereformeerd Politiek Verbond", "$gpv", "#ff7b00", new Image()),
    $aov: new Party("AOV", "Algemeen Ouderen Verbond", "$aov", "#3083ff", new Image()),
    $u55p: new Party("U55+", "Unie 55+", "$u55p", "#44bec2", new Image()),
    $cd: new Party("CD", "Centrumdemocraten", "$cd", "#c9dfff", new Image()),
    $psp: new Party("PSP", "Pacifistisch Socialistische Partij", "$psp", "#e62525ff", new Image()),
    $ppr: new Party("PPR", "Politieke Partij Radikalen", "$ppr", "#e92f7cff", new Image()),
    $evp: new Party("EVP", "Evangelische Volkspartij", "$evp", "rgb(240, 176, 0)", new Image()),
    $cpn: new Party("CPN", "Communistische Partij Nederland", "$cpn", "#ff0000", new Image()),
    $sdp: new Party("SDP", "Sociaal-Democratische Partij", "$sdp", "#ff0000", new Image()),
    $bp: new Party("BP", "Boerenpartij", "$bp", "#519436", new Image()),
    $ds70: new Party("DS'70", "Democratisch Socialisten '70", "$ds70", "#d40000ff", new Image()),
    $kvp: new Party("KVP", "Katholieke Volkspartij", "$kvp", "#362511ff", new Image()),
    $chu: new Party("CHU", "Christelijk-Historische Unie", "$chu", "#0f1e53ff", new Image()),
    $arp: new Party("ARP", "Anti-Revolutonaire Partij", "$arp", "#638ec5", new Image()),
    $rkpn: new Party("RKPN", "Rooms Katholieke Partij Nederland", "$rkpn", "rgb(206, 165, 31)", new Image()),
    $nmp: new Party("NMP", "Nederlandse Middenstands Partij", "$nmp", "rgb(51, 53, 167)", new Image()),
    $knp: new Party("KNP", "Katholieke Nationale Partij", "$knp", "#3faa4e", new Image()),
    $pvdv: new Party("PvdV", "Partij voor de Vrijheid", "$pvdv", "#092447ff", new Image()),
    $rksp: new Party("RKSP", "Rooms-Katholieke Staatspartij", "$rksp", "rgb(187, 90, 0)", new Image()),
    $sdap: new Party("SDAP", "Sociaal-Democratische Arbeiderspartij", "$sdap", "#e41919ff", new Image()),
    $vdb: new Party("VDB", "Vrijzinnig Democratische Bond", "$vdb", "#6e0e0eff", new Image()),
    $nsb: new Party("NSB", "Nationaal-Socialistische Beweging", "$nsb", "#000000ff", new Image()),
    $lsp: new Party("LSP", "Liberale Staatspartij", "$lsp", "#0d6486ff", new Image()),
    $cdu: new Party("CDU", "Christelijk-Democratische Unie", "$cdu", "#eb6c05ff", new Image()),
    $rsp: new Party("RSP", "Revolutionair Socialistische Partij", "$rsp", "#a70909ff", new Image()),
    // A decent amount of prties below don't seem to have any known associated colors
    // Nor could I find posters for them. 
    $nbtmp: new Party("NBTMP", "Nationale Boeren-, Tuinders- en Middenstandspartij", "$nbtmp", "#79aa4aff", new Image()),
    $pb: new Party("PB", "Plattelandersbond", "$pb", "#79aa4aff", new Image()),
    $rkvp: new Party("RKVP", "Rooms-Katholieke Volkspartij", "$rkvp", "#802008ff", new Image()),
    $hgsp: new Party("HGSP", "Hervormd-Gereformeerde Staatspartij", "$hgsp", "#030557ff", new Image()),
    $vnh: new Party("VNH", "Verbond voor Nationaal Herstel", "$vnh", "#ca8c19ff", new Image()),
    $lk: new Party("LK", "Lid Keijzer", "$lk", "#378747ff", new Image()),
    $mpsl: new Party("MPSL", "Middenpartij voor Stad en Land", "$mpsl", "#000000FF", new Image()),
    $ab: new Party("AB", "Algemeene Bond", "$ab", "#37313d", new Image()),
    $lp: new Party("LP", "Liberale Partij", "$lp", "#1f5192ff", new Image()),
    $mp: new Party("MP", "Middenstandspartij", "$mp", "#b8bb19ff", new Image()),
    $eb: new Party("EB", "Economische Bond", "$eb", "#591ba0ff", new Image()),
    $lu: new Party("LU", "Liberale Unie", "$lu", "#1b76a0ff", new Image()),
    $bvl: new Party("BVL", "Bond van Vrije Liberalen", "$bvl", "#5879e9ff", new Image()),
    $cdp: new Party("CDP", "Christen-Democratische Partij", "$cdp", "#464040ff", new Image()),
    $sp_1918: new Party("SP", "Socialistische Partij", "$sp_1918", "#df0e0eff", new Image()),
    $bcs: new Party("BCS", "Bond van Christen-Socialisten", "$bcs", "#681010ff", new Image()),
    $csp: new Party("CSP", "Christelijk-Sociale Partij", "$csp", "#8b5c14ff", new Image()),
    $np: new Party("NP", "Neutrale Partij", "$np", "#8b1481ff", new Image()),
    $vdw: new Party("VDW", "Verbond tot Democratisering der Weermacht", "$vdw", "#0c501bff", new Image()),
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

T.parties.$bij1.image.src = "logos/nl/BIJ1.png";
T.parties.$ppnl.image.src = "logos/nl/PPNL.png";
T.parties.$sp.image.src = "logos/nl/SP.png";
T.parties.$pvdd.image.src = "logos/nl/PvdD.png";
T.parties.$gl.image.src = "logos/nl/GL.png";
T.parties.$glpvda.image.src = "logos/nl/GvdL.png";
T.parties.$pvda.image.src = "logos/nl/PvdA.png";
T.parties.$denk.image.src = "logos/nl/DENK.png";
T.parties.$volt.image.src = "logos/nl/Volt.png";
T.parties.$d66.image.src = "logos/nl/D66.png";
T.parties.$cu.image.src = "logos/nl/CU.png";
T.parties.$fnp.image.src = "logos/nl/FNP.png";
T.parties.$cda.image.src = "logos/nl/CDA.png";
T.parties.$nsc.image.src = "logos/nl/NSC.png";
T.parties.$50plus.image.src = "logos/nl/50PLUS.png";
T.parties.$vvd.image.src = "logos/nl/VVD.png";
T.parties.$bbb.image.src = "logos/nl/BBB.png";
T.parties.$ja21.image.src = "logos/nl/JA21.png";
T.parties.$sgp.image.src = "logos/nl/SGP.png";
T.parties.$pvv.image.src = "logos/nl/PVV.png";
T.parties.$fvd.image.src = "logos/nl/FvD.png";
T.parties.$lpf.image.src = "logos/nl/LPF.png";
T.parties.$ln.image.src = "logos/nl/LN.png";
T.parties.$rpf.image.src = "logos/nl/RPF.png";
T.parties.$gpv.image.src = "logos/nl/GPV.png";
T.parties.$aov.image.src = "logos/nl/AOV.png";
T.parties.$u55p.image.src = "logos/nl/Unie55+.png";
T.parties.$cd.image.src = "logos/nl/CD.png";
T.parties.$psp.image.src = "logos/nl/PSP.png";
T.parties.$ppr.image.src = "logos/nl/PPR.png";
T.parties.$cpn.image.src = "logos/nl/CPN.png";
T.parties.$ds70.image.src = "logos/nl/DS70.png";
T.parties.$kvp.image.src = "logos/nl/KVP.png";
T.parties.$chu.image.src = "logos/nl/CHU.png";
T.parties.$arp.image.src = "logos/nl/ARP.png";
T.parties.$pvdv.image.src = "logos/nl/PvdV.png";
T.parties.$sdap.image.src = "logos/nl/SDAP.png";
T.parties.$vdb.image.src = "logos/nl/VDB.png";
T.parties.$nsb.image.src = "logos/nl/NSB.png";

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

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 2),
    new Fraction(T.parties.$sdap, 24),
    new Fraction(T.parties.$vdb, 7),
    new Fraction(T.parties.$chu, 11),
    new Fraction(T.parties.$rksp, 30),
    new Fraction(T.parties.$arp, 12),
    new Fraction(T.parties.$lsp, 8),
    new Fraction(T.parties.$mpsl, 1),
    new Fraction(T.parties.$pb, 1),
    new Fraction(T.parties.$hgsp, 1),
    new Fraction(T.parties.$sgp, 3),
], "Tweede Kamerverkiezingen 1929", new Date("1929-07-03")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 1),
    new Fraction(T.parties.$sdap, 24),
    new Fraction(T.parties.$vdb, 7),
    new Fraction(T.parties.$rkvp, 1),
    new Fraction(T.parties.$chu, 11),
    new Fraction(T.parties.$ab, 30),
    new Fraction(T.parties.$arp, 13),
    new Fraction(T.parties.$lsp, 9),
    new Fraction(T.parties.$pb, 1),
    new Fraction(T.parties.$hgsp, 1),
    new Fraction(T.parties.$sgp, 2),
], "Tweede Kamerverkiezingen 1925", new Date("1925-07-01")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$cpn, 2),
    new Fraction(T.parties.$sdap, 20),
    new Fraction(T.parties.$vdb, 5),
    new Fraction(T.parties.$chu, 11),
    new Fraction(T.parties.$ab, 32),
    new Fraction(T.parties.$arp, 16),
    new Fraction(T.parties.$lsp, 10),
    new Fraction(T.parties.$lp, 1),
    new Fraction(T.parties.$pb, 2),
    new Fraction(T.parties.$sgp, 1),
], "Tweede Kamerverkiezingen 1922", new Date("1922-07-05")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sdp, 2),
    new Fraction(T.parties.$sp_1918, 1),
    new Fraction(T.parties.$bcs, 1),
    new Fraction(T.parties.$sdap, 22),
    new Fraction(T.parties.$csp, 1),
    new Fraction(T.parties.$vdb, 5),
    new Fraction(T.parties.$np, 1),
    new Fraction(T.parties.$cdp, 1),
    new Fraction(T.parties.$chu, 7),
    new Fraction(T.parties.$ab, 30),
    new Fraction(T.parties.$arp, 13),
    new Fraction(T.parties.$mp, 1),
    new Fraction(T.parties.$eb, 3),
    new Fraction(T.parties.$lu, 6),
    new Fraction(T.parties.$bvl, 4),
    new Fraction(T.parties.$vdw, 1),
    new Fraction(T.parties.$pb, 1),
], "Tweede Kamerverkiezingen 1918", new Date("1918-07-03")));

Timelines["nl_tweedekamer"] = T;