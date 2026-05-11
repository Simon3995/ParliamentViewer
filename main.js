// init
let cur_tml = null;		// current timeline object
let cur_plm = null;		// current (editable) parliament object
let ori_plm = null;		// original unedited parliament object
let cur_hlt = [];		// current highlighted parties
let edit_mode = false;	// whether edit mode is enabled
let dragging = false;	// whether a dragging action is currently happening
let party_imgs = null;	// array of icons for all parties in current parliament
let mouse_x = 0;		// current mouse X coord
let mouse_y = 0;		// current mouse Y coord
let ord_tab = [];		// party order in the table
let ord_vis = [];		// party order left-right visually

update();

// main update loop
function update() {
	//requestAnimationFrame(update);

	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.restore();

	cur_plm?.draw();
}