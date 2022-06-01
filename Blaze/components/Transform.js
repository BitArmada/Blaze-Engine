import Vector from '../Util/Vector.js';
import Quaternion from '../Util/Quaternion.js';
import Euler from '../Util/Euler.js';

/**
 * transform component
 * @param (vector) position - position
 * @param (vector) scale - scale
 */
var Transform = function (position, scale) {
	
	this.position = position ?? new Vector();
	this.scale = scale ?? new Vector(1,1,1);
	this.rotation = new Euler();

	this.quaternion = new Quaternion();
	//this.quaternion.setFromAxisAngle(new Vector(0,1,0), 50);

	return this;
}

Transform.prototype.name = 'Transform';

export default Transform;