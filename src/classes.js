import { S, scheduleFrame } from "./main.js";
import { c, ctx, RES_MULT } from "./canvas.js";
import { getSeatsCenters, getRowThickness, getRowCount, getDiagramBbox } from "./geometry.js";
import { isHighlighted } from "./controller.js";

// a class for a parliament timeline, containing a series of election results
export class Timeline {
	constructor (name = null) {
		this.parliaments = [];
		this.parties = {};
		this.name = name;
	}

	// add a new election result to the timeline
	addParliament(parliament) {
		this.parliaments.push(parliament);
	}

	getAncestors(partyId) {
		if (this.parties[partyId].foundedBy === null)
			return [];
		const ancestors = [...this.parties[partyId].foundedBy];
		for (const p of this.parties[partyId].foundedBy) {
			ancestors.push(... this.getAncestors(p));
		}
		return ancestors;
	}

	getDescendants(partyId) {
		for (const [id, party] of Object.entries(this.parties)) {
			if (party.foundedBy?.includes(partyId)) {
				return [id, ...this.getDescendants(id)];
			}
		}
		return [];
	}
}

// a class for one election result
export class Parliament {
	constructor(fractions = [], description = "Parliament", date = new Date(), source = "") {
		this.fractions = fractions;
		this.description = description;
		this.date = date;
		this.source = source;

		this.distributeSeats();
	}

	// get seat amount of a fraction
	getPartySeats(id) {
		for (const fraction of this.fractions)
			if (fraction.party.id == id)
				return fraction.seatAmt;
		return 0;
	}

	// set seat amount of a fraction
	setPartySeats(id, amt) {
		amt = Number(amt);
		if (isNaN(amt)) {
			console.error("Tried to set non-number seat amount.");
			return;
		}
		for (let fraction of this.fractions) {
			if (fraction.party.id == id) {
				fraction.seatAmt = amt;
			}
		}
		this.distributeSeats();
	}

	// add a new fraction to this parliament
	addFraction(fraction) {
		this.fractions.push(fraction);
		this.distributeSeats();
	}

	// remove a fraction from this parliament
	removeFraction(id) {
		for (let i = 0; i < this.fractions.length; i++) {
			if (this.fractions[i].party.id === id) {
				this.fractions.splice(i, 1);
				this.distributeSeats();
				return;
			}
		}
		console.warn(`Removing fraction "${name}" failed!`);
	}

	// recalculate seat locations and seat distribution across fractions
	distributeSeats() {
		// empty existing
		for (const fraction of this.fractions) {
			fraction.seatCenters = [];
		}
		
		// distribute seats
		let seatsCenters = getSeatsCenters(this.seatAmt());
		seatsCenters.sort((a, b) => b[2] - a[2]);
		const order = (S.ordVis.length > 0) ? S.ordVis : this.fractions;
		for (let fraction of order) {
			while (fraction.seatCenters.length < fraction.seatAmt) {
				fraction.seatCenters.push(seatsCenters.shift());
			}
		}
		scheduleFrame();
	}

	// get total parliament seat amount
	seatAmt() {
		let amt = 0;
		for (const frac of this.fractions) {
			amt += frac.seatAmt;
		}
		return amt;
	}

	// get visual radius of one seat circle
	getSeatRadius() {
		return 0.8 * getRowThickness(getRowCount(this.seatAmt()));
	}

	// get hitbox/clickable radius of one seat circle
	getSeatHitboxRadius() {
		return this.getSeatRadius() * 1.7;
	}

	// draw the parliament chart
	draw() {
		let currentHover = null;
		const r = this.getSeatRadius();
		const hb = this.getSeatHitboxRadius();

		outer:
		for (let fraction of this.fractions) {
			for (const seat of fraction.seatCenters) {
				if (Math.hypot(S.mouseX - seat[0], S.mouseY - seat[1]) < hb) {
					currentHover = fraction.party.id;
					break outer;
				}
			}
		}

		let hasEnlarged = false;
		for (let fraction of this.fractions) {
			let opacity = (isHighlighted(fraction.party.id)) ? 1 : (S.currentHighlight.length ? (currentHover === fraction.party.id ? 0.6 : 0.2) : 1);

			for (const seat of fraction.seatCenters) {
				
				let f;
				if (!hasEnlarged && Math.hypot(S.mouseX - seat[0], S.mouseY - seat[1]) < hb && opacity == 1) {
					hasEnlarged = true;
					f = RES_MULT * Math.max(60 / S.ctxScale, r * 1.5);
					ctx.globalCompositeOperation = "source-over";
				} else {
					f = r;
					ctx.globalCompositeOperation = "destination-over";
				}
				
				ctx.globalAlpha = opacity;
				
				ctx.drawImage(
					S.partyImgs[fraction.party.id],
					seat[0] - f,
					seat[1] - f,
					2 * f, 2 * f
				);
			}
		}
	}

	// clone this parliament without reference to the original
	clone() {
		const p = new Parliament(
			this.fractions.map(frac => frac.clone()),
			this.description,
			this.date,
			this.source
		);
		// restore seatCenters
		p.fractions.forEach((frac, i) => {
			frac.seatCenters = structuredClone(this.fractions[i].seatCenters);
		});
		return p;
	}
}

// a class for a party fraction in one election
export class Fraction {
	constructor(party, seatAmt) {
		this.party = party;
		this.seatAmt = seatAmt;
		this.seatCenters = [];
	}

	// clone this fraction without reference to the original
	clone() {
		let frac = new Fraction(this.party.clone(), this.seatAmt);
		frac.seatCenters = structuredClone(this.seatCenters);
		return frac;
	}
}

// a class for a political party, independent of year or election
export class Party {
	#fullname;
	#fullname_rm;
	#fullname_en;

	constructor(name, fullname, fullname_rm, fullname_en, id, color = "#000000", image = null, established = null, foundedBy = null, splitFrom = null) {
		this.name = name;
		this.#fullname = fullname;
		this.#fullname_rm = fullname_rm;
		this.#fullname_en = fullname_en;
		this.id = id;
		this.color = color;
		this.image = image;
		this.established = established;
		this.foundedBy = foundedBy;
		this.splitFrom = splitFrom;
	}

	// clone this party without reference to the original
	clone() {
		return new Party(this.name, this.#fullname, this.#fullname_rm, this.#fullname_en, this.id, this.color, this.image, this.established, this.foundedBy, this.splitFrom);
	}

	get fullname() {
		const lang = document.getElementById("partyLang").value;
		switch (lang) {
			case "fullname":
				return this.#fullname || this.#fullname_en;
			case "fullname_en":
				return this.#fullname_en || this.#fullname;
			case "fullname_rm":
				return this.#fullname_rm || this.#fullname || this.#fullname_en;
			default:
				throw("Invalid party name language");
		}
	}
}
