import Vector from '../Util/Vector.js';

function Physics (mass) {
	
	this.mass = mass ?? 1;
	// this.velocity = new Vector();
	// this.force = new Vector();
	// this.gravity = new Vector(0,9.8);

	// this.movable = movable ?? false;

	return this;
}

Physics.prototype.name = 'Physics';

export default Physics;