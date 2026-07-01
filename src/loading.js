import { S, scheduleFrame } from "./main.js";
import { Party, Fraction, Parliament, Timeline } from "./classes.js";
import { updateSidebar } from "./sidebar.js";
import { highlight, next, prev } from "./controller.js";
import { setQueryParam } from "./query.js";

const SPRITE_SIZE = 200;

// load a new parliament and update sidebar info
export function loadParliament(parliament) {
	// set initial table order + visual order
	S.ordTab = [];
	S.ordVis = [];
	for (const frac of S.currentParliament.fractions) {
		S.ordTab.push(frac);
		S.ordVis.push(frac);
	}

	// sort the table order by seat amount
	S.ordTab.sort((a,b) => {return b.seatAmt - a.seatAmt});

	document.getElementById("title").innerHTML = parliament.description;
	document.getElementById("title_ps").innerHTML = "";
	document.getElementById("source").innerHTML = (parliament.source) ? `Source: <a target="#" href="${parliament.source}">${parliament.source}</a>` : "";
	updateSidebar();
	S.currentParliament.distributeSeats();
	scheduleFrame();
}

// load a new timeline
export async function loadTimeline(name) {
	const file = await fetch(`./timelines/${name}.json`);
	const data = await file.json();
	S.ordTab = [];
	S.ordVis = [];
	S.currentTimeline = new Timeline(data.name);

	setQueryParam("t", name);

	document.title = `${data.country} - ${data.title} | Parliament Viewer`;

	// track image loading
	const image_promises = [];
	
	// construct list of parties
	for (const partyId in data.parties) {
		const pdata = data.parties[partyId];

		// dynamically determine in which parliament the party was established
		let established;
		if (pdata.foundedBy !== null || pdata.splitFrom !== null) {
			const plm = data.parliaments.findLastIndex(plm => plm.fractions.some(frac => frac.id === partyId));
			if (plm === -1) {
				established = -1;
			} else {
				established = data.parliaments[plm].name;
			}
		} else {
			established = null
		}
		const party = new Party(pdata.name, pdata.fullname, pdata.fullname_rm, pdata.fullname_en, partyId, pdata.color, new Image(), established, pdata.foundedBy, pdata.splitFrom);
		image_promises.push(loadImage(party, pdata.image));
		S.currentTimeline.parties[partyId] = party;
	}

	// construct list of parliaments
	S.currentTimeline.parliaments = data.parliaments.map(par => {
		return new Parliament(par.fractions.map(frac => {
			return new Fraction(S.currentTimeline.parties[frac.id], frac.seats);
		}), par.name, new Date(par.date), par.source);
	});
	
	S.originalParliament = S.currentTimeline.parliaments[0];
	S.currentParliament = S.originalParliament.clone();
	loadParliament(S.currentParliament);
	generatePartyImgs();
	highlight(null);
	next();
	await Promise.all(image_promises);
}

// return a promise for loading an image
function loadImage(party, src) {
	return new Promise((resolve) => {
		if (!src) {
			party.imageLoaded = false;
			resolve(party);
			return;
		}
		party.image.onload = () => {
			party.imageLoaded = true;
			buildPartySprite(party);
			scheduleFrame();
			resolve(party);
		};
		party.image.onerror = () => {
			party.imageLoaded = false;  // mark as failed
			resolve(party);  // still resolve, not reject
		};
		party.image.src = src;
	});
}

// generate circular seat icons for each party in the current timeline
export function generatePartyImgs() {
	S.partyImgs = {};
	const s = SPRITE_SIZE;
	for (const name in S.currentTimeline.parties) {
		const party = S.currentTimeline.parties[name];
		if (!party.imageLoaded) {
			buildBaseImage(party);
		} else {
			buildPartySprite(party);
		}
	}
}

// generates a base sprite for a party with no logo loaded
function buildBaseImage(party) {
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
function buildPartySprite(party) {
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
