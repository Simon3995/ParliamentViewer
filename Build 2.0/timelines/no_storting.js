T = new Timeline("Norway - Storting");

T.parties = {
    $ap: new Party("Ap", "Arbeiderpartiet", "$ap", "#e61515", new Image()),
    $frp: new Party("FrP", "Fremskrittspartiet", "$frp", "#186eb9", new Image()),
    $h: new Party("H", "Høyre", "$h", "#026ac5", new Image()),
    $sv: new Party("SV", "Sosialistisk Venstreparti", "$sv", "#d80b60", new Image()),
    $sp: new Party("Sp", "Senterpartiet", "$sp", "#109710", new Image()),
    $rodt: new Party("R", "Rødt", "#rodt", "#cc0000", new Image()),
    $mdg: new Party("MDG", "Miljøpartiet De Grønne", "$mdg", "#37a803", new Image()),
    $krf: new Party("KrF", "Kristelig Folkeparti", "$krf", "#ffe922", new Image()),
    $v: new Party("V", "Venstre", "$v", "#007575", new Image()),
}

T.parties.$ap.image.src = "logos/no/ap.png";
T.parties.$sv.image.src = "logos/no/sv.png";
T.parties.$rodt.image.src = "logos/no/rodt.png";
T.parties.$sp.image.src = "logos/no/sp.png";
T.parties.$mdg.image.src = "logos/no/mdg.png";
T.parties.$krf.image.src = "logos/no/krf.png";
T.parties.$v.image.src = "logos/no/v.png";
T.parties.$h.image.src = "logos/no/h.png";
T.parties.$frp.image.src = "logos/no/frp.png";

T.add_parliament(new Parliament([
    new Fraction(T.parties.$rodt, 9),
    new Fraction(T.parties.$sv, 9),
    new Fraction(T.parties.$ap, 53),
    new Fraction(T.parties.$sp, 9),
    new Fraction(T.parties.$mdg, 8),
    new Fraction(T.parties.$krf, 7),
    new Fraction(T.parties.$v, 3),
    new Fraction(T.parties.$h, 24),
    new Fraction(T.parties.$frp, 47),
], "2025 Parliamentary Election", new Date("2025-09-08")));

Timelines["no_storting"] = T;