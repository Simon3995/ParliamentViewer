T = new Timeline("be_federalparliament");

T.parties = {
    $nva: new Party("N-VA", "Nieuw-Vlaamse Alliantie", "$nva", "#ffd000", new Image()),
    $vb: new Party("VB", "Vlaams Belang", "$vb", "#ffe600", new Image()),
    $mr: new Party("MR", "Mouvement réformateur", "$mr", "#6000FF", new Image()),
    $pvdaptb: new Party("PVDA-PTB", "Partij van de Arbeid/Parti du travail de Belgique", "$pvdaptb", "#e92020", new Image()),
    $ps: new Party("PS", "Parti socialiste", "$ps", "#ff0000", new Image()),
    $vooruit: new Party("Vooruit", "Vooruit", "$vooruit", "#ff0000", new Image()),
    $cdv: new Party("CD&V", "Christen-Democratisch en Vlaams", "$cdv", "#ff8000", new Image()),
    $le: new Party("LE", "Les Engagés", "$le", "#17cfba", new Image()),
    $anders: new Party("Anders", "Anders", "$anders", "#7100FF", new Image()),
    $groen: new Party("Groen", "Groen", "$groen", "#43b143", new Image()),
    $ecolo: new Party("Ecolo", "Écologistes Confédérés pour l'organisation de luttes originales", "$ecolo", "#21ce21", new Image()),
    $defi: new Party("DéFI", "Démocrate fédéraliste indépendant", "$defi", "#ff517c", new Image()),
}

T.parties.$pvdaptb.image.src = "logos/be/pvdaptb.png";
T.parties.$vooruit.image.src = "logos/be/vooruit.png";
T.parties.$ps.image.src = "logos/be/ps.png";
T.parties.$groen.image.src = "logos/be/groen.png";
T.parties.$ecolo.image.src = "logos/be/ecolo.png";
T.parties.$defi.image.src = "logos/be/defi.png";
T.parties.$le.image.src = "logos/be/le.png";
T.parties.$cdv.image.src = "logos/be/cdv.png";
T.parties.$anders.image.src = "logos/be/anders.png";
T.parties.$mr.image.src = "logos/be/mr.png";
T.parties.$nva.image.src = "logos/be/nva.png";
T.parties.$vb.image.src = "logos/be/vb.png";

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