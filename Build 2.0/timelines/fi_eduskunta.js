T = new Timeline("fi_eduskunta");

T.parties = {
    $kok: new Party("Kok", "Kansallinen Kokoomus", "$kok", "#2f5578", new Image()),
    $ps: new Party("PS", "Perussuomalaiset", "$ps", "#ffd000", new Image()),
    $sdp: new Party("SDP", "Sosialidemokraatit", "$sdp", "#d53333", new Image()),
    $kesk: new Party("Kesk", "Suomen Keskusta", "$kesk", "#37a337", new Image()),
    $vihr: new Party("Vihr", "Vihreä liitto", "$vihr", "#256025", new Image()),
    $vas: new Party("Vas", "Vasemmistoliitto", "$vas", "#ff008c", new Image()),
    $sfp: new Party("SFP", "Svenska folkpartiet i Finland", "$sfp", "#ffe048", new Image()),
    $kd: new Party("KD", "Suomen Kristillisdemokraatit", "$kd", "#2c7bd5", new Image()),
    $liik: new Party("Liik", "Liike Nyt", "$liik", "#ff00b3", new Image()),
    $vkk: new Party("VKK", "Valta kuuluu kansalle", "$vkk", "#101010", new Image()),
    $fa: new Party("FÅ", "För Åland", "$fa", "#404040", new Image()),
}

T.add_parliament(new Parliament([
    new Fraction(T.parties.$vas, 11),
    new Fraction(T.parties.$sdp, 43),
    new Fraction(T.parties.$vihr, 13),
    new Fraction(T.parties.$kesk, 23),
    new Fraction(T.parties.$sfp, 9),
    new Fraction(T.parties.$liik, 1),
    new Fraction(T.parties.$kd, 5),
    new Fraction(T.parties.$kok, 48),
    new Fraction(T.parties.$ps, 46),
    new Fraction(T.parties.$vkk, 1),
], "2023 Parliamentary Election", new Date("2023-04-02")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$vas, 16),
    new Fraction(T.parties.$sdp, 40),
    new Fraction(T.parties.$vihr, 20),
    new Fraction(T.parties.$kesk, 31),
    new Fraction(T.parties.$fa, 1),
    new Fraction(T.parties.$sfp, 9),
    new Fraction(T.parties.$liik, 1),
    new Fraction(T.parties.$kd, 5),
    new Fraction(T.parties.$kok, 38),
    new Fraction(T.parties.$ps, 39),
], "2019 Parliamentary Election", new Date("2019-04-14")));

Timelines["fi_eduskunta"] = T;