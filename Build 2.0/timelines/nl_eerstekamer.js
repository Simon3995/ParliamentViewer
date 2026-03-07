T = new Timeline("Netherlands - Eerste Kamer");

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
    $u55p: new Party("U55+", "Unie 55+", "#44bec2", "$u55p", new Image()),
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
    $nbtmp: new Party("NBTMP", "Nationale Boeren-, Tuinders- en Middenstandspartij", "$nbtmp", "#79aa4aff", new Image()),
    $pb: new Party("PB", "Plattelandersbond", "$pb", "#79aa4aff", new Image()),
    $rkvp: new Party("RKVP", "Rooms-Katholieke Volkspartij", "$rkvp", "#802008ff", new Image()),
    $hgsp: new Party("HGSP", "Hervormd-Gereformeerde Staatspartij", "$hgsp", "#030557ff", new Image()),
    $vnh: new Party("VNH", "Verbond voor Nationaal Herstel", "$vnh", "#ca8c19ff", new Image()),
    $mpsl: new Party("MPSL", "Middenpartij voor Stad en Land", "$mpsl", "#000000FF", new Image()),
    $ab: new Party("AB", "Algemeene Bond", "$ab", "#000000FF", new Image()),
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
    $opnl: new Party("OPNL", "Onafhankelijke Politiek Nederland", "$opnl", "#505050", new Image()),
    $osf: new Party("OSF", "Onafhankelijke Senaatsfractie", "$osf", "#505050", new Image()),
    $fvh: new Party("FVH", "Fractie-Visseren-Hamakers", "$fvh", "#808080", new Image()),
    $fvds: new Party("FVdS", "Fractie-Van de Sanden", "$fvds", "#808080", new Image()),
    $fw: new Party("FW", "Fractie-Walenkamp", "$fw", "#808080", new Image()),
    $fb: new Party("FB", "Fractie-Beukering", "$fb", "#808080", new Image()),
}

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
T.parties.$opnl.image.src = "logos/nl/OPNL.png";
T.parties.$osf.image.src = "logos/nl/OPNL.png";

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 3),
    new Fraction(T.parties.$fvh, 1),
    new Fraction(T.parties.$pvdd, 2),
    new Fraction(T.parties.$glpvda, 14),
    new Fraction(T.parties.$volt, 2),
    new Fraction(T.parties.$d66, 7),
    new Fraction(T.parties.$cu, 3),
    new Fraction(T.parties.$opnl, 1),
    new Fraction(T.parties.$50plus, 1),
    new Fraction(T.parties.$cda, 6),
    new Fraction(T.parties.$fvds, 1),
    new Fraction(T.parties.$vvd, 9),
    new Fraction(T.parties.$fw, 1),
    new Fraction(T.parties.$bbb, 12),
    new Fraction(T.parties.$fb, 1),
    new Fraction(T.parties.$ja21, 2),
    new Fraction(T.parties.$sgp, 2),
    new Fraction(T.parties.$pvv, 4),
    new Fraction(T.parties.$fvd, 3)
], "Current Situation", new Date()));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 3),
    new Fraction(T.parties.$pvdd, 3),
    new Fraction(T.parties.$gl, 7),
    new Fraction(T.parties.$pvda, 7),
    new Fraction(T.parties.$volt, 2),
    new Fraction(T.parties.$d66, 5),
    new Fraction(T.parties.$cu, 3),
    new Fraction(T.parties.$opnl, 1),
    new Fraction(T.parties.$50plus, 1),
    new Fraction(T.parties.$cda, 6),
    new Fraction(T.parties.$vvd, 10),
    new Fraction(T.parties.$bbb, 16),
    new Fraction(T.parties.$ja21, 3),
    new Fraction(T.parties.$sgp, 2),
    new Fraction(T.parties.$pvv, 4),
    new Fraction(T.parties.$fvd, 2)
], "Eerste Kamerverkiezingen 2023", new Date("2023-06-01")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 4),
    new Fraction(T.parties.$pvdd, 3),
    new Fraction(T.parties.$gl, 8),
    new Fraction(T.parties.$pvda, 6),
    new Fraction(T.parties.$d66, 7),
    new Fraction(T.parties.$cu, 4),
    new Fraction(T.parties.$osf, 1),
    new Fraction(T.parties.$50plus, 2),
    new Fraction(T.parties.$cda, 9),
    new Fraction(T.parties.$vvd, 12),
    new Fraction(T.parties.$sgp, 2),
    new Fraction(T.parties.$pvv, 5),
    new Fraction(T.parties.$fvd, 12)
], "Eerste Kamerverkiezingen 2019", new Date("2019-05-31")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 9),
    new Fraction(T.parties.$pvdd, 2),
    new Fraction(T.parties.$gl, 4),
    new Fraction(T.parties.$pvda, 8),
    new Fraction(T.parties.$d66, 10),
    new Fraction(T.parties.$cu, 3),
    new Fraction(T.parties.$osf, 1),
    new Fraction(T.parties.$50plus, 2),
    new Fraction(T.parties.$cda, 12),
    new Fraction(T.parties.$vvd, 13),
    new Fraction(T.parties.$sgp, 2),
    new Fraction(T.parties.$pvv, 9)
], "Eerste Kamerverkiezingen 2015", new Date("2015-05-28")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sp, 8),
    new Fraction(T.parties.$pvdd, 1),
    new Fraction(T.parties.$gl, 5),
    new Fraction(T.parties.$pvda, 14),
    new Fraction(T.parties.$d66, 5),
    new Fraction(T.parties.$cu, 2),
    new Fraction(T.parties.$osf, 1),
    new Fraction(T.parties.$50plus, 1),
    new Fraction(T.parties.$cda, 11),
    new Fraction(T.parties.$vvd, 16),
    new Fraction(T.parties.$sgp, 1),
    new Fraction(T.parties.$pvv, 10)
], "Eerste Kamerverkiezingen 2011", new Date("2011-05-25")));

Timelines["nl_eerstekamer"] = T;