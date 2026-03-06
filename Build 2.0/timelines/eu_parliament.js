T = new Timeline("European Union - European Parliament");

T.parties = {
    $independent: new Party("NI", "Non-attached Members", "$independent", "#696969", new Image()),

    $epp: new Party("EPP", "European People's Party Group", "$epp", "#3399FF", new Image()),
    $sd: new Party("S&D", "Progressive Alliance of Socialists and Democrats", "$sd", "#FF0000", new Image()),
    $pfe: new Party("PfE", "Patriots for Europe", "$pfe", "#013366", new Image()),
    $ecr: new Party("ECR", "European Conservatives and Reformists Group", "$ecr", "#0054A5", new Image()),
    $re: new Party("Renew", "Renew Europe", "$re", "#0099FF", new Image()),
    $greens: new Party("Greens/EFA", "The Greens/European Free Alliance", "$greens", "#009900", new Image()),
    $left: new Party("Left", "The Left in the European Parliament - GUE/NGL", "$left", "#990000", new Image()),
    $esn: new Party("ESN", "Europe of Severeign Nations Group", "$esn", "#13517E", new Image()),
    $id: new Party("ID", "Identity and Democracy", "$id", "#164289", new Image()),
    $alde: new Party("ALDE", "Alliance of Liberals and Democrats for Europe Group", "$alde", "#FFFF00", new Image()),
    $guengl: new Party("GUE/NGL", "Confederated Group of the European United Left - Nordic Green Left", "$guengl", "#990000", new Image()),
    $efdd: new Party("EFDD", "Europe of Freedom and Direct Democracy", "$efdd", "#24B9B9", new Image()),
    $enf: new Party("ENF", "Europe of Nations and Freedom", "$enf", "#2B3856", new Image()),
    $efd: new Party("EFD", "Europe of Freedom and Democracy", "$efd", "#24B9B9", new Image()),
}

T.add_parliament(new Parliament([
    new Fraction(T.parties.$left, 46),
    new Fraction(T.parties.$sd, 136),
    new Fraction(T.parties.$greens, 53),
    new Fraction(T.parties.$re, 77),
    new Fraction(T.parties.$epp, 188),
    new Fraction(T.parties.$ecr, 78),
    new Fraction(T.parties.$pfe, 84),
    new Fraction(T.parties.$esn, 25),
    new Fraction(T.parties.$independent, 33),
], "2024 European Parliament Elections", new Date("2024-06-09")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$left, 37),
    new Fraction(T.parties.$sd, 138),
    new Fraction(T.parties.$greens, 70),
    new Fraction(T.parties.$re, 98),
    new Fraction(T.parties.$epp, 179),
    new Fraction(T.parties.$ecr, 69),
    new Fraction(T.parties.$id, 49),
    new Fraction(T.parties.$independent, 63),
], "2019 European Parliament Elections", new Date("2019-05-26")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$guengl, 52),
    new Fraction(T.parties.$sd, 185),
    new Fraction(T.parties.$greens, 52),
    new Fraction(T.parties.$alde, 69),
    new Fraction(T.parties.$epp, 216),
    new Fraction(T.parties.$ecr, 77),
    new Fraction(T.parties.$efdd, 42),
    new Fraction(T.parties.$enf, 36),
    new Fraction(T.parties.$independent, 20),
], "2014 European Parliament Elections", new Date("2014-05-25")));

T.add_parliament(new Parliament([
    new Fraction(T.parties.$guengl, 35),
    new Fraction(T.parties.$sd, 195),
    new Fraction(T.parties.$greens, 57),
    new Fraction(T.parties.$alde, 83),
    new Fraction(T.parties.$epp, 273),
    new Fraction(T.parties.$ecr, 57),
    new Fraction(T.parties.$efd, 31),
    new Fraction(T.parties.$independent, 33),
], "2009 European Parliament Elections", new Date("2009-06-07")));



Timelines["eu_parliament"] = T;