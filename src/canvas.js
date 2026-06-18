import { getDiagramBbox } from "./geometry.js";
import { S, scheduleFrame } from "./main.js";

export const c = document.getElementById("canvas");
export const ctx = c.getContext("2d");
export const RES_MULT = 2 * window.devicePixelRatio;  // render resolution multiplier

// resize canvas to fill viewport
export function resizeCanvas() {
	c.width = c.getBoundingClientRect().width * RES_MULT;
	c.height = c.getBoundingClientRect().height * RES_MULT;
}

// transform so that seats are drawn left of the sidebar
export function transformCtx() {
	const padding = 50;
	const targetW = c.width - 2 * padding;
	const targetH = c.height - 2 * padding;
	const bbox = getDiagramBbox();
	const diagramW = bbox.xmax - bbox.xmin;
	const diagramH = bbox.ymax - bbox.ymin;
	const scale = Math.min(targetW / diagramW, targetH / diagramH);
	const offsetX = (targetW - (scale * diagramW)) / 2 + padding;
	const offsetY = (targetH - (scale * diagramH)) / 2 - padding;
	S.ctxScale = scale;

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.translate(offsetX, targetH - offsetY);
	ctx.scale(scale, scale);
	ctx.translate(-bbox.xmin, bbox.ymin);
	scheduleFrame();
}
