import Vector from '../Util/Vector.js';

function Physics (mass, collider) {
	
	this.mass = mass ?? 1;
	this.collider = collider ?? 'Box';

	return this;
}

Physics.prototype.name = 'Physics';

export default Physics;