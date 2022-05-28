import Vector from '../Util/Vector.js';

/**
 * transform component
 * @param (vector) position - position
 * @param (vector) scale - scale
 */
var Transform = function (position, scale) {
	
	this.position = position ?? new Vector();
	this.scale = scale ?? new Vector(1,1,1);
	this.rotation = 0;

	return this;
}

Transform.prototype.name = 'Transform';

export default Transform;