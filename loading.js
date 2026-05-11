function load_parliament(parliament) {
	// set initial table order + visual order
	ord_tab = [];
	ord_vis = [];
	for (const frac of cur_plm.fractions) {
		ord_tab.push(frac);
		ord_vis.push(frac);
	}

	// sort the table order by seat amount
	ord_tab.sort((a,b) => {return b.seat_amt - a.seat_amt});

	document.getElementById("title").innerHTML = parliament.description;
	document.getElementById("title_ps").innerHTML = "";
	update_sidebar();
}

async function load_timeline(name) {
	const file = await fetch(`./timelines/${name}.json`);
	const data = await file.json();
	ord_tab = [];
	ord_vis = [];
	cur_tml = new Timeline(data.name);

	// track image loading
	const image_promises = [];
	
	// construct list of parties
	for (const party_id in data.parties) {
		const pdata = data.parties[party_id];
		const party = new Party(pdata.shortname, pdata.fullname, party_id, pdata.color, new Image());
		image_promises.push(load_img(party, pdata.image));
		cur_tml.parties[party_id] = party;
	}

	await Promise.all(image_promises);

	// construct list of parliaments
	cur_tml.parliaments = data.parliaments.map(par => {
		return new Parliament(par.fractions.map(frac => {
			return new Fraction(cur_tml.parties[frac.id], frac.seats);
			//return "bingus";
		}), par.name, new Date(par.date));
	});
	
	ori_plm = cur_tml.parliaments[0];
	cur_plm = ori_plm.clone();
	load_parliament(cur_plm);
	generate_party_imgs();
	highlight(null);
	next();
	update();
}

function load_img(party, src) {
    return new Promise((resolve) => {  // no reject parameter!
        if (!src) {
			party.image_loaded = false;
			resolve(party);
			return;
		}
		party.image.onload = () => {
            party.image_loaded = true;
            resolve(party);
        };
        party.image.onerror = () => {
            party.image_loaded = false;  // mark as failed
            resolve(party);             // still resolve, not reject
        };
        party.image.src = src;
    });
}

function generate_party_imgs() {
	party_imgs = {};
	const s = 200;
	for (const name in cur_tml.parties) {
		const party = cur_tml.parties[name];
		const sprite = document.createElement("canvas");
		const sctx = sprite.getContext("2d");
		sprite.width = sprite.height = s;
		sctx.fillStyle = party.color;
		sctx.arc(s/2, s/2, s/2, 0, 2*Math.PI);
		sctx.fill();
		if (party.image_loaded) {
			const scale = s/2;
			sctx.drawImage(party.image, s/2-scale, s/2-scale, 2*scale, 2*scale);
		} else {
			sctx.fillStyle = "white";
			sctx.textAlign = "center";
			sctx.textBaseline = "middle";
			sctx.font = `bold ${0.56*s}px Atkinson`;
			sctx.fillText(party.name, s/2, 0.54*s, 0.85*s);
		}
		party_imgs[party.id] = sprite;
	}
}