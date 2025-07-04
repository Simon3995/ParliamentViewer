let c = document.getElementById("canvas");
let ctx = TWO.getEnhancedContext(c);
ctx.setCameraPosition(1, -0.5);
ctx.setZoom(c.width / 2.1);

let red_party = new Party("RP", "Red Party", "#ff0000");

let p = new Parliament();
p.add_fraction(new Fraction(red_party, 400));

p.draw(ctx);

console.log(p);