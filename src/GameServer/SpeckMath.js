class Point {
    constructor(ptX, ptY) {
        this.reset();
        this.setPointX(ptX);
        this.setPointY(ptY);
    }

    reset() {
        this.model = {};
    }

    assertValidClass(point) {
        if (!(point instanceof Point)) {
            throw new Error('SpeckMath / Not a "Point" model');
        }
    }

    // Set

    setPointX(ptX) {
        this.model.ptX = ptX;
    }

    setPointY(ptY) {
        this.model.ptY = ptY;
    }

    updatePoint(ptX, ptY) {
        this.setPointX(ptX);
        this.setPointX(ptY);
    }

    // Get

    fetchPointX() {
        return this.model.ptX;
    }

    fetchPointY() {
        return this.model.ptY;
    }

    fetchPointZ() {
        return 0;
    }

    // Abstract

    distance(toPoint) {
        this.assertValidClass(toPoint);

        const dX = toPoint.fetchPointX() - this.fetchPointX();
        const dY = toPoint.fetchPointY() - this.fetchPointY();

        return Math.sqrt((dX ** 2) + (dY ** 2));
    }

    midPoint(toPoint, t) {
        this.assertValidClass(toPoint);

        return new Point(
            ((1 - t) * this.fetchPointX()) + (t * toPoint.fetchPointX()),
            ((1 - t) * this.fetchPointY()) + (t * toPoint.fetchPointY()),
        );
    }

    toCoords() {
        return {
            locX: this.fetchPointX(),
            locY: this.fetchPointY(),
        };
    }
}

class Point3D extends Point {
    constructor(ptX, ptY, ptZ) {
        // Class inheritance
        super(ptX, ptY); this.setPointZ(ptZ);
    }

    // Set

    setPointZ(ptz) {
        this.model.ptZ = ptz;
    }

    updatePoint(ptX, ptY, ptZ) {
        this.setPointX(ptX);
        this.setPointX(ptY);
        this.setPointX(ptZ);
    }

    // Get

    fetchPointZ() {
        return this.model.ptZ ?? 0;
    }

    // Abstract

    distance(toPoint) {
        this.assertValidClass(toPoint);

        const dX = toPoint.fetchPointX() - this.fetchPointX();
        const dY = toPoint.fetchPointY() - this.fetchPointY();
        const dZ = toPoint.fetchPointZ() - this.fetchPointZ();

        return Math.sqrt((dX ** 2) + (dY ** 2) + (dZ ** 2));
    }

    midPoint(toPoint, t) {
        this.assertValidClass(toPoint);

        return new Point3D(
            ((1 - t) * this.fetchPointX()) + (t * toPoint.fetchPointX()),
            ((1 - t) * this.fetchPointY()) + (t * toPoint.fetchPointY()),
            ((1 - t) * this.fetchPointZ()) + (t * toPoint.fetchPointZ()),
        );
    }

    toCoords() {
        return {
            locX: this.fetchPointX(),
            locY: this.fetchPointY(),
            locZ: this.fetchPointZ(),
        };
    }
}

class Circle extends Point {
    constructor(ptX, ptY, radius) {
        // Class inheritance
        super(ptX, ptY); this.setRadius(radius);
    }

    // Set

    setRadius(radius) {
        this.model.radius = radius;
    }

    // Get

    fetchRadius() {
        return this.model.radius;
    }

    // Abstract

    createPointWithin() {
        const r = this.fetchRadius() * Math.sqrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;

        return new Point(
            this.fetchPointX() + r * Math.cos(theta),
            this.fetchPointY() + r * Math.sin(theta),
        );
    }

    contains(point) {
        this.assertValidClass(point);

        const dX = point.fetchPointX() - this.fetchPointX();
        const dY = point.fetchPointY() - this.fetchPointY();

        return ((dX ** 2) + (dY ** 2)) < (this.fetchRadius() ** 2);
    }
}

module.exports = {
    Point   : Point,
    Point3D : Point3D,
    Circle  : Circle
};
