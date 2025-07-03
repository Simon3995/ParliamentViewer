let TWO = {};

TWO._clearRect = function(x, y, w, h) {
    this.applyTransformations();
    this.clearRect(x, y, w, h);
    this.resetTransform();
}

TWO._fillRect = function(x, y, w, h) {
    this.applyTransformations();
    this.fillRect(x, y, w, h);
    this.resetTransform();
}

TWO._strokeRect = function(x, y, w, h) {
    this.applyTransformations();
    this.strokeRect(x, y, w, h);
    this.resetTransform();
}

TWO._fillText = function(text, x, y, maxWidth=undefined) {
    this.applyTransformations();
    maxWidth ? this.fillText(text. x, y, maxWidth) : this.fillText(text, x, y);
    this.resetTransform();
}

TWO._strokeText = function(text, x, y, maxWidth=undefined) {
    this.applyTransformations();
    maxWidth ? this.strokeText(text, x, y, maxWidth) : this.strokeText(text, x, y);
    this.resetTransform();
}

TWO._moveTo = function(x, y) {
    this.applyTransformations();
    this.moveTo(x, y);
    this.resetTransform();
}

TWO._lineTo = function(x, y) {
    this.applyTransformations();
    this.lineTo(x, y);
    this.resetTransform();
}

TWO._bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
    this.applyTransformations();
    this.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    this.resetTransform();
}

TWO._quadraticCurveTo = function(cpx, cpy, x, y) {
    this.applyTransformations();
    this.quadraticCurveTo(cpx, cpy, x, y);
    this.resetTransform();
}

TWO._arc = function(x, y, radius, startAngle, endAngle, counterClockwise = false) {
    this.applyTransformations();
    this.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    this.resetTransform();
}

TWO._arcTo = function(x1, y1, x2, y2, radius) {
    this.applyTransformations();
    this.arcTo(x1, y1, x2, y2, radius);
    this.resetTransform();
}

TWO._ellipse = function(x, y, rx, ry, rot, startAngle, endAngle, counterClockwise = false) {
    this.applyTransformations();
    this.ellipse(x, y, rx, ry, rot, startAngle, endAngle, counterClockwise);
    this.resetTransform();
}

TWO._rect = function(x, y, w, h) {
    this.applyTransformations();
    this.rect(x, y, w, h);
    this.resetTransform();
}

TWO._roundRect = function(x, y, w, h, radii) {
    this.applyTransformations();
    this.roundRect(x, y, w, h, radii);
    this.resetTransform();
}

TWO._stroke = function() {
    this.applyTransformations();
    this.stroke();
    this.resetTransform();
}

TWO._rotate = function(angle) {
    this.$virtual_context.rotate(angle);
}

TWO._scale = function(x, y) {
    this.$virtual_context.scale(x, y);
}

TWO._translate = function(x, y) {
    this.$virtual_context.translate(x, y);
}

TWO._transform = function(a, b, c, d, e, f) {
    this.$virtual_context.transform(a, b, c, d, e, f);
}

TWO._getTransform = function() {
    return this.$virtual_context.getTransform();
}

TWO._setTransform = function(a, b, c, d, e, f) {
    this.$virtual_context.setTransform(a, b, c, d, e, f);
}

TWO._resetTransform = function() {
    this.$virtual_context.resetTransform();
}

TWO._drawImage = function(image, sx, sy, sWidth=undefined, sHeight=undefined, dx=undefined, dy=undefined, dWidth=undefined, dHeight=undefined) {
    this.applyTransformations();
    switch(arguments.length) {
        case 3:
            this.drawImage(image, sx, sy);
            break;
        case 5:
            this.drawImage(image, sx, sy, sWidth, sHeight);
            break;
        case 9:
            this.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            break;
        default:
            console.error("Incorrect number of arguments in _drawImage: " + arguments.length);
    }
    this.resetTransform();
}

// apply scaling/rotation/translation to the canvas
TWO.applyTransformations = function() {
    this.resetTransform();
    this.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.scale(this.$zoom, this.$zoom);
    this.rotate(this.$cam_rot);
    this.translate(-this.$cam_x, -this.$cam_y);
    let vt = this.$virtual_context.getTransform();
    this.transform(vt.a, vt.b, vt.c, vt.d, vt.e, vt.f);
}

// convert viewport coordinates into world coordinates
TWO.v2w = function(x, y) {
    this.applyTransformations();
    const originalPoint = new DOMPoint(x, y);
    const transformedPoint = this.getTransform().invertSelf().transformPoint(originalPoint);
    this.setTransform(1, 0, 0, 1, 0, 0);
    return {
        x: transformedPoint.x,
        y: transformedPoint.y
    }
}

TWO.w2v = function(x, y) {
    this.applyTransformations();
    const originalPoint = new DOMPoint(x, y);
    const transformedPoint = this.getTransform().transformPoint(originalPoint);
    this.setTransform(1, 0, 0, 1, 0, 0);
    return {
        x: transformedPoint.x,
        y: transformedPoint.y
    }
}

// makes canvas full-screen, and automatically resizes
TWO.maximize = function(canvas) {
    canvas.style.position = "absolute";
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    addEventListener("resize", event => {
        canvas.width = canvas.getBoundingClientRect().width;
        canvas.height = canvas.getBoundingClientRect().height;
    }, false);

    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;
}

TWO.rotateCamera = function(angle) {
    this.$cam_rot = (this.$cam_rot + angle) % (Math.PI*2);
}

TWO.setCameraRotation = function(angle) {
    this.$cam_rot = angle % (Math.PI*2);
}

TWO.getCameraRotation = function() {
    return this.$cam_rot;
}

TWO.zoom = function(amt) {
    this.$zoom *= amt;
}

TWO.setZoom = function(amt) {
    this.$zoom = amt;
}

TWO.getZoom = function() {
    return this.$zoom;
}

TWO.translateCamera = function(x, y) {
    let new_coord = this.v2w(
        this.canvas.width/2 + x,
        this.canvas.height/2 + y
    );
    this.$cam_x = new_coord.x;
    this.$cam_y = new_coord.y;
}

TWO._translateCamera = function(x, y) {
    this.$cam_x += x;
    this.$cam_y += y;
}

TWO.setCameraPosition = function(x, y) {
    this.$cam_x = x;
    this.$cam_y = y;
}

TWO.setCameraX = function(x) {
    this.$cam_x = x;
}

TWO.setCameraY = function(y) {
    this.$cam_y = y;
}

TWO.getCameraPosition = function() {
    return {
        x: this.$cam_x,
        y: this.$cam_y
    }
}

// adds TWO.js drawing functions to context object
TWO.getEnhancedContext = function(canvas, settings={}) {
    let context = canvas.getContext("2d");
    
    // variables: camera settings
    context.$zoom = 1;
    context.$cam_x = 0;
    context.$cam_y = 0;
    context.$cam_rot = 0;

    // variables: virtual canvas
    context.$virtual_canvas = document.createElement("canvas");
    context.$virtual_context = context.$virtual_canvas.getContext("2d");

    // variables: misc
    context.$mouse_down = false;
    
    // functions: drawing rectangles
    context._clearRect = TWO._clearRect;
    context._fillRect = TWO._fillRect;
    context._strokeRect = TWO._strokeRect;

    // functions: drawing text
    context._fillText = TWO._fillText;
    context._strokeText = TWO._strokeText;

    // functions: paths
    context._moveTo = TWO._moveTo;
    context._lineTo = TWO._lineTo;
    context._bezierCurveTo = TWO._bezierCurveTo; // def
    context._quadraticCurveTo = TWO._quadraticCurveTo; // def
    context._arc = TWO._arc;
    context._arcTo = TWO._arcTo; // def
    context._ellipse = TWO._ellipse; // def
    context._rect = TWO._rect; // def
    context._roundRect = TWO._roundRect; // def
    context._stroke = TWO._stroke;

    // functions: transformations
    context._rotate = TWO._rotate;
    context._scale = TWO._scale;
    context._translate = TWO._translate;
    context._transform = TWO._transform;
    context._getTransform = TWO._getTransform;
    context._setTransform = TWO._setTransform;
    context._resetTransform = TWO._resetTransform;
    
    // functions: drawing images
    context._drawImage = TWO._drawImage;

    // functions: misc
    context.applyTransformations = TWO.applyTransformations;
    context.rotateCamera = TWO.rotateCamera;
    context.setCameraRotation = TWO.setCameraRotation;
    context.getCameraRotation = TWO.getCameraRotation;
    context.zoom = TWO.zoom;
    context.setZoom = TWO.setZoom;
    context.getZoom = TWO.getZoom;
    context.translateCamera = TWO.translateCamera;
    context._translateCamera = TWO._translateCamera;
    context.setCameraPosition = TWO.setCameraPosition;
    context.setCameraX = TWO.setCameraX;
    context.setCameraY = TWO.setCameraY;
    context.getCameraPosition = TWO.getCameraPosition;
    context.v2w = TWO.v2w;
    context.w2v = TWO.w2v;

    // events
    if (settings.zooming) {
        canvas.onwheel = event => {
            event.preventDefault();
            let rect = canvas.getBoundingClientRect();
            let mouse_pre = context.v2w(
                event.clientX - rect.left,
                event.clientY - rect.top
            );
            if (event.deltaY < 0) context.$zoom *= 1.1;
            if (event.deltaY > 0) context.$zoom /= 1.1;
            let mouse_post = context.v2w(
                event.clientX - rect.left,
                event.clientY - rect.top
            );
            if (settings.panning) {
                context.$cam_x -= (mouse_post.x - mouse_pre.x);
                context.$cam_y -= (mouse_post.y - mouse_pre.y);
            }
        }
    }

    if (settings.panning) {
        canvas.onmousedown = event => {
            event.preventDefault();
            if (event.button === 0) context.$mouse_down = true;
        }

        addEventListener("mousemove", function(event) {
            if (context.$mouse_down) {
                const move_x = event.movementX / context.$zoom;
                const move_y = event.movementY / context.$zoom;
                const cos = Math.cos(context.$cam_rot);
                const sin = Math.sin(context.$cam_rot);
                context.$cam_x -= cos * move_x + sin * move_y;
                context.$cam_y -= cos * move_y - sin * move_x;
            }
        }, false);

        addEventListener("mouseup", function(event) {
            context.$mouse_down = false;
        }, false);
    }

    return context;
}