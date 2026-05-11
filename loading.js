import { S } from "./main.js";
import { Party, Fraction, Parliament, Timeline } from "./classes.js";
import { update_sidebar } from "./sidebar.js";
import { highlight, next, prev } from "./controller.js";

// load a new parliament and update sidebar info
export function load_parliament(parliament) {
	// set initial table order + visual order
	S.ord_tab = [];
	S.ord_vis = [];
	for (const frac of S.cur_plm.fractions) {
		S.ord_tab.push(frac);
		S.ord_vis.push(frac);
	}

	// sort the table order by seat amount
	S.ord_tab.sort((a,b) => {return b.seat_amt - a.seat_amt});

	document.getElementById("title").innerHTML = parliament.description;
	document.getElementById("title_ps").innerHTML = "";
	update_sidebar();
}

// load a new timeline
export async function load_timeline(name) {
	const file = await fetch(`./timelines/${name}.json`);
	const data = await file.json();
	S.ord_tab = [];
	S.ord_vis = [];
	S.cur_tml = new Timeline(data.name);

	// track image loading
	const image_promises = [];
	
	// construct list of parties
	for (const party_id in data.parties) {
		const pdata = data.parties[party_id];
		const party = new Party(pdata.shortname, pdata.fullname, party_id, pdata.color, new Image());
		image_promises.push(load_img(party, pdata.image));
		S.cur_tml.parties[party_id] = party;
	}

	await Promise.all(image_promises);

	// construct list of parliaments
	S.cur_tml.parliaments = data.parliaments.map(par => {
		return new Parliament(par.fractions.map(frac => {
			return new Fraction(S.cur_tml.parties[frac.id], frac.seats);
		}), par.name, new Date(par.date));
	});
	
	S.ori_plm = S.cur_tml.parliaments[0];
	S.cur_plm = S.ori_plm.clone();
	load_parliament(S.cur_plm);
	generate_party_imgs();
	highlight(null);
	next();
}

// return a promise for loading an image
function load_img(party, src) {
    return new Promise((resolve) => {
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
            resolve(party);  // still resolve, not reject
        };
        party.image.src = src;
    });
}

// generate circular seat icons for each party in the current timeline
export function generate_party_imgs() {
	S.party_imgs = {};
	const s = 200;
	for (const name in S.cur_tml.parties) {
		const party = S.cur_tml.parties[name];
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
		S.party_imgs[party.id] = sprite;
	}
}