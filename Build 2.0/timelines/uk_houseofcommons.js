T = new Timeline("United Kingdom - House of Commons");

T.parties = {
    $s: new Party("Speaker", "Speaker of the House of Commons", "$s", "#202020", new Image()),
    $lab: new Party("Lab", "Labour Party", "$lab", "#ff0000", new Image()),
    $con: new Party("Con", "Conservative Party", "$con", "#3189e1", new Image()),
    $libdem: new Party("LibDem", "Liberal Democrats", "$libdem", "#ffbb00", new Image()),
    $snp: new Party("SNP", "Scottish National Party", "$snp", "#ffdd33", new Image()),
    $sf: new Party("SF", "Sinn Féin", "$sf", "#305b30", new Image()),
    $ind: new Party("Ind", "Independent", "$ind", "#a0a0a0", new Image()),
    $reform: new Party("Reform", "Reform UK", "$reform", "#12d4ff", new Image()),
    $dup: new Party("DUP", "Democratic Unionist Party", "$dup", "#b55f3e", new Image()),
    $greens: new Party("Greens", "Green Party of England and Wales", "$greens", "#4ab446", new Image()),
    $plaid: new Party("Plaid", "Plaid Cymru", "$plaid", "#3b8560", new Image()),
    $sdlp: new Party("SDLP", "Social Democratic and Labour Party", "$sdlp", "#519d51", new Image()),
    $apni: new Party("APNI", "Alliance Party of Northern Ireland", "$apni", "#ffbb00", new Image()),
    $uup: new Party("UUP", "Ulster Unionist Party", "$uup", "#254c73", new Image()),
    $tuv: new Party("TUV", "Traditional Unionist Voice", "$tuv", "#004080", new Image()),
}

T.parties.$lab.image.src = "logos/uk/lab.png";
T.parties.$con.image.src = "logos/uk/cns.png";
T.parties.$libdem.image.src = "logos/uk/libdem.png";
T.parties.$snp.image.src = "logos/uk/snp.png";
T.parties.$sf.image.src = "logos/uk/sf.png";
T.parties.$dup.image.src = "logos/uk/dup.png";
T.parties.$reform.image.src = "logos/uk/reform.png";
T.parties.$plaid.image.src = "logos/uk/plaid.png";
T.parties.$greens.image.src = "logos/uk/greens.png";
T.parties.$sdlp.image.src = "logos/uk/sdlp.png";
T.parties.$apni.image.src = "logos/uk/apni.png";
T.parties.$uup.image.src = "logos/uk/uup.png";
T.parties.$tuv.image.src = "logos/uk/tuv.png";

T.add_parliament(new Parliament([
    new Fraction(T.parties.$sf, 7),
    new Fraction(T.parties.$plaid, 4),
    new Fraction(T.parties.$greens, 4),
    new Fraction(T.parties.$snp, 9),
    new Fraction(T.parties.$sdlp, 2),
    new Fraction(T.parties.$lab, 411),
    new Fraction(T.parties.$libdem, 72),
    new Fraction(T.parties.$apni, 1),
    new Fraction(T.parties.$con, 121),
    new Fraction(T.parties.$uup, 1),
    new Fraction(T.parties.$dup, 5),
    new Fraction(T.parties.$tuv, 1),
    new Fraction(T.parties.$reform, 5),
    new Fraction(T.parties.$ind, 6),
    new Fraction(T.parties.$s, 1),
], "2024 General Election", new Date("2024-07-04")));

Timelines["uk_houseofcommons"] = T;