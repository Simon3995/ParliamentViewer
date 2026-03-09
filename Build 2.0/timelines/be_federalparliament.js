T = new Timeline("be_federalparliament");

T.parties = {
    $nva: new Party("N-VA", "Nieuw-Vlaamse Alliantie", "$nva", "#ffd000", new Image()),
    $vb: new Party("VB", "Vlaams Belang", "$vb", "#ffe600", new Image()),
    $mr: new Party("MR", "Mouvement réformateur", "$mr", "#1100ff", new Image()),
    $pvdaptb: new Party("PVDA-PTB", "Partij van de Arbeid/Parti du travail de Belgique", "$pvdaptb", "#e92020", new Image()),
    $ps: new Party("PS", "Parti socialiste", "$ps", "#ff0000", new Image()),
    $vooruit: new Party("Vooruit", "Vooruit", "$vooruit", "#ff0000", new Image()),
    $cdv: new Party("CD&V", "Christen-Democratisch en Vlaams", "$cdv", "#ff8000", new Image()),
    $le: new Party("LE", "Les Engagés", "$le", "#438551", new Image()),
    $anders: new Party("Anders", "Anders", "$anders", "#4929ff", new Image()),
    $groen: new Party("Groen", "Groen", "$groen", "#43b143", new Image()),
    $ecolo: new Party("Ecolo", "Écologistes Confédérés pour l'organisation de luttes originales", "$ecolo", "#21ce21", new Image()),
    $defi: new Party("DéFI", "Démocrate fédéraliste indépendant", "$defi", "#ff517c", new Image()),
}

T.add_parliament(new Parliament([
    new Fraction(T.parties.$pvdaptb, 15),
    new Fraction(T.parties.$vooruit, 13),
    new Fraction(T.parties.$ps, 16),
    new Fraction(T.parties.$ecolo, 3),
    new Fraction(T.parties.$groen, 6),
    new Fraction(T.parties.$defi, 1),
    new Fraction(T.parties.$le, 14),
    new Fraction(T.parties.$cdv, 11),
    new Fraction(T.parties.$anders, 7),
    new Fraction(T.parties.$mr, 20),
    new Fraction(T.parties.$nva, 24),
    new Fraction(T.parties.$vb, 20),
], "2024 Federal Election", new Date("2024-06-09")));

Timelines["be_federalparliament"] = T;