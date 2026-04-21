T = new Timeline("New Zealand - House of Representatives");

T.parties = {
    $nats: new Party("Nats", "New Zealand National Party", "$nats", "#00529f", new Image()),
    $lab: new Party("Labour", "New Zealand Labour Party", "$lab", "#d82a20", new Image()),
    $green: new Party("Green", "Green Party of Aotearoa New Zealand", "$green", "#098137", new Image()),
    $act: new Party("ACT", "ACT New Zealand", "$act", "#fde401", new Image()),
    $nzf: new Party("NZF", "New Zealand First", "$nzf", "#000000", new Image()),
    $maori: new Party("Māori", "Te Pāti Māori", "$maori", "#000000", new Image()),
}

T.parties.$nats.image.src = "logos/nz/nats.png";
T.parties.$lab.image.src = "logos/nz/lab.png";
T.parties.$green.image.src = "logos/nz/green.png";
T.parties.$act.image.src = "logos/nz/act.png";
T.parties.$nzf.image.src = "logos/nz/nzf.png";
T.parties.$maori.image.src = "logos/nz/maori.png";

T.add_parliament(new Parliament([
    new Fraction(T.parties.$green, 15),
    new Fraction(T.parties.$maori, 6),
    new Fraction(T.parties.$lab, 34),
    new Fraction(T.parties.$nats, 48),
    new Fraction(T.parties.$act, 11),
    new Fraction(T.parties.$nzf, 8),
], "2023 General Election", new Date("2023-10-14")));

Timelines["nz_houseofrepresentatives"] = T;