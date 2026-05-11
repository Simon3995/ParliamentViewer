export const c = document.getElementById("canvas");
export const ctx = c.getContext("2d");

// resize canvas to fill viewport
export function resize_canvas() {
	c.width = window.innerWidth;
	c.height = window.innerHeight;
}

// transform so that seats are drawn left of the sidebar
export function transform_ctx() {
	const target_w = c.width * (2/3);
	const target_h = c.height;
	const scale = Math.min(target_w / 2, target_h / 1);
	const offset_x = (target_w - (scale * 2)) / 2;
	const offset_y = (target_h - (scale * 1)) / 2;
	
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.translate(offset_x, canvas.height - offset_y);
	ctx.scale(scale, scale);
}