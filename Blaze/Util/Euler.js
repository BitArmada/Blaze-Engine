

class Euler {
    constructor (x = 0, y = 0, z = 0, order = Euler.DefaultOrder) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.order = order;
    }
}

Euler.DefaultOrder = 'XYZ';
Euler.RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];

export default Euler;