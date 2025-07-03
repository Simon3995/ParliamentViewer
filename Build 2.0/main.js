let c = document.getElementById("canvas");
let ctx = TWO.getEnhancedContext(c);

let red_party = new Party("RP", "Red Party", "#ff0000");
let blue_party = new Party("BP", "Blue Party", "#0000ff");

let p = new Parliament();
p.add_fraction(new Fraction(red_party, 25));
p.add_fraction(new Fraction(blue_party, 30));

console.log(p);