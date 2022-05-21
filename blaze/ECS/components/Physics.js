import Vector from '../../Util/Vector.js';
import {BoxPhysics, CirclePhysics} from '../../physics/PhysicsObjects.js';


function Physics (STATIC, body) {
	
	// this.mass = 0.02;
	// this.velocity = new Vector();
	// this.force = new Vector();
	// this.gravity = new Vector(0,9.8);

	// this.movable = movable ?? false;
	this.isStatic = STATIC;

	this.physicsObject = body ?? BoxPhysics;

	return this;
}

Physics.prototype.name = 'Physics';

export default Physics;