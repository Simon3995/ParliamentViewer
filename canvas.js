import { get_diagram_bbox } from "./geometry.js";
import { S, schedule_frame } from "./main.js";

export const c = document.getElementById("canvas");
export const ctx = c.getContext("2d");

// resize canvas to fill viewport
export function resize_canvas() {
	c.width = c.getBoundingClientRect().width;
	c.height = c.getBoundingClientRect().height;
}

// transform so that seats are drawn left of the sidebar
export function transform_ctx() {
	const padding = 50;
	const target_w = c.width - 2 * padding;
	const target_h = c.height - 2 * padding;
	const bbox = get_diagram_bbox();
	const diagram_w = bbox.xmax - bbox.xmin;
	const diagram_h = bbox.ymax - bbox.ymin;
	const scale = Math.min(target_w / diagram_w, target_h / diagram_h);
	const offset_x = (target_w - (scale * diagram_w)) / 2 + padding;
	const offset_y = (target_h - (scale * diagram_h)) / 2 - padding;
	S.ctx_scale = scale;

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.translate(offset_x, target_h - offset_y);
	ctx.scale(scale, scale);
	ctx.translate(-bbox.xmin, bbox.ymin);
	schedule_frame();
}