import { S, scheduleFrame } from "./main.js";
import { Party, Fraction, Parliament, Timeline } from "./classes.js";
import { update_sidebar } from "./sidebar.js";
import { highlight, next, prev } from "./controller.js";
import { set_query_param } from "./query.js";

const SPRITE_SIZE = 200;

// load a new parliament and update sidebar info
export function loadParliament(parliament) {
	// set initial table order + visual order
	S.ordTab = [];
	S.ordVis = [];
	for (const frac of S.cur_plm.fractions) {
		S.ordTab.push(frac);
		S.ordVis.push(frac);
	}

	// sort the table order by seat amount
	S.ordTab.sort((a,b) => {return b.seatAmt - a.seatAmt});

	document.getElementById("title").innerHTML = parliament.description;
	document.getElementById("title_ps").innerHTML = "";
	document.getElementById("source").innerHTML = (parliament.source) ? `Source: <a target="#" href="${parliament.source}">${parliament.source}</a>` : "";
	update_sidebar();
	S.cur_plm.distributeSeats();
	scheduleFrame();
}

// load a new timeline
export async function loadTimeline(name) {
	const file = await fetch(`./timelines/${name}.json`);
	const data = await file.json();
	S.ordTab = [];
	S.ordVis = [];
	S.cur_tml = new Timeline(data.name);

	set_query_param("t", name);

	document.title = `${data.country} - ${data.title} | Parliament Viewer`;

	// track image loading
	const image_promises = [];
	
	// construct list of parties
	for (const partyId in data.parties) {
		const pdata = data.parties[partyId];
		const party = new Party(pdata.name, pdata.fullname, partyId, pdata.color, new Image(), pdata.established, pdata.foundedBy, pdata.splitFrom);
		image_promises.push(load_img(party, pdata.image));
		S.cur_tml.parties[partyId] = party;
	}

	// construct list of parliaments
	S.cur_tml.parliaments = data.parliaments.map(par => {
		return new Parliament(par.fractions.map(frac => {
			return new Fraction(S.cur_tml.parties[frac.id], frac.seats);
		}), par.name, new Date(par.date), par.source);
	});
	
	S.ori_plm = S.cur_tml.parliaments[0];
	S.cur_plm = S.ori_plm.clone();
	loadParliament(S.cur_plm);
	generate_partyImgs();
	highlight(null);
	next();
	await Promise.all(image_promises);
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
			build_party_sprite(party);
			scheduleFrame();
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
export function generate_partyImgs() {
	S.partyImgs = {};
	const s = SPRITE_SIZE;
	for (const name in S.cur_tml.parties) {
		const party = S.cur_tml.parties[name];
		if (!party.image_loaded) {
			build_base_img(party);
		} else {
			build_party_sprite(party);
		}
	}
}

// generates a base sprite for a party with no logo loaded
function build_base_img(party) {
	const sprite = document.createElement("canvas");
	const sctx = sprite.getContext("2d");
	sprite.width = sprite.height = SPRITE_SIZE;
	sctx.fillStyle = party.color;
	sctx.arc(SPRITE_SIZE/2, SPRITE_SIZE/2, SPRITE_SIZE/2, 0, 2*Math.PI);
	sctx.fill();
	sctx.fillStyle = "white";
	sctx.textAlign = "center";
	sctx.textBaseline = "middle";
	sctx.font = `bold ${0.56*SPRITE_SIZE}px Atkinson`;
	sctx.fillText(party.name, SPRITE_SIZE/2, 0.54*SPRITE_SIZE, 0.85*SPRITE_SIZE);
	S.partyImgs[party.id] = sprite;
}

// produces the sprite of a party logo and overwrites the party's base sprite
function build_party_sprite(party) {
	const sprite = document.createElement("canvas");
	const sctx = sprite.getContext("2d");
	sprite.width = sprite.height = SPRITE_SIZE;
	sctx.fillStyle = party.color;
	sctx.arc(SPRITE_SIZE/2, SPRITE_SIZE/2, SPRITE_SIZE/2, 0, 2*Math.PI);
	sctx.fill();
	const scale = SPRITE_SIZE/2;
	sctx.drawImage(party.image, SPRITE_SIZE/2-scale, SPRITE_SIZE/2-scale, 2*scale, 2*scale);
	S.partyImgs[party.id] = sprite;
}
