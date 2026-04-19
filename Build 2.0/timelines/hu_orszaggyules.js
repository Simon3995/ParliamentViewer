T = new Timeline("hu_orszaggyules");

T.parties = {
    $tisza: new Party("TISZA", "Tisztelet és Szabadság Párt", "$tisza", "#4dbbff", new Image()),
    $fidesz: new Party("Fidesz", "Fidesz – Magyar Polgári Szövetség", "fidesz", "#FF5800", new Image()),
    $mh: new Party("MH", "Mi Hazánk Mozgalom", "$mh", "#2f9d2f", new Image()),
    $em: new Party("EM", "Egységben Magyarországért", "$em", "#3ae2b2", new Image()),
    $ldu: new Party("LdU", "Landesselbstverwaltung der Ungarndeutschen", "$ldu", "#325699", new Image()),
}

T.parties.$tisza.image.src = "logos/hu/tisza.png";
T.parties.$fidesz.image.src = "logos/hu/fidesz.png";
T.parties.$mh.image.src = "logos/hu/mh.png";
T.parties.$ldu.image.src = "logos/hu/ldu.png";
T.parties.$em.image.src = "logos/hu/em.png";

T.add_parliament(new Parliament([
    new Fraction(T.parties.$tisza, 138),
    new Fraction(T.parties.$fidesz, 55),
    new Fraction(T.parties.$mh, 6),
], "2026 Parliamentary Election", new Date("2026-04-12")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$em, 57),
    new Fraction(T.parties.$ldu, 1),
    new Fraction(T.parties.$fidesz, 135),
    new Fraction(T.parties.$mh, 6),
], "2022 Parliamentary Election", new Date("2022-04-03")));

Timelines["hu_orszaggyules"] = T;