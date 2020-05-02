/**
 * A circle constraint
 * @param {Vector2} position The center position
 * @param {Number} radius The circle radius
 * @constructor
 */
const Circle = function(position, radius) {
    this.position = position;
    this.radius = radius;

    Constraint.call(this, 1.2);
};

Circle.prototype = Object.create(Constraint.prototype);

/**
 * Get the fish capacity of this constraint
 * @returns {Number} The maximum number of fish that fit within this constraint
 */
Circle.prototype.getCapacity = function() {
    return Math.floor(Math.PI * (this.radius - this.border) * (this.radius - this.border) / this.AREA_PER_FISH);
};

/**
 * Sample the distance to the nearest edge of this constraint
 * @param {Vector2} position The position to sample
 * @returns {Number} The proximity in the range [0, 1]
 */
Circle.prototype.sample = function(position) {
    const innerRadius = this.radius - this.border;
    const dx = position.x - this.position.x;
    const dy = position.y - this.position.y;
    const squaredDistance = dx * dx + dy * dy;

    if (squaredDistance < innerRadius * innerRadius)
        return 0;
    else {
        const distance = Math.sqrt(squaredDistance);

        this.normal.x = dx;
        this.normal.y = dy;
        this.normal.divide(-distance);

        return (distance - innerRadius) / this.border;
    }
};

/**
 * Draw the circle
 * @param {Renderer} renderer The renderer
 */
Circle.prototype.render = function(renderer) {
    let x, y, xp, yp;

    for (let i = 0; i <= 64; ++i) {
        const angle = Math.PI * 2 * i / 64;

        xp = x;
        yp = y;
        x = this.position.x + Math.cos(angle) * this.radius;
        y = this.position.y + Math.sin(angle) * this.radius;

        if (i !== 0)
            renderer.drawLine(xp, yp, Color.WHITE, x, y, Color.WHITE);
    }
};