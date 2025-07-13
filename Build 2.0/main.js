let c = document.getElementById("canvas");
let ctx = TWO.getEnhancedContext(c);
ctx.setCameraPosition(1, -0.5);
ctx.setZoom(c.width / 2.1);


let red_party = new Party("RP", "Red Party", "#ff0000");
let green_party = new Party("GP", "Green Party", "#00cc00");
let blue_party = new Party("BPP", "Blue Party", "#0000ff");

let p = new Parliament();
p.add_fraction(new Fraction(red_party, 50));
p.add_fraction(new Fraction(green_party, 50));
p.add_fraction(new Fraction(blue_party, 50));

function update() {
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, c.width, c.height);
    p.draw(ctx);
}

update();