import Vector from '../Util/Vector.js';
import Quaternion from '../Util/Quaternion.js';
import Euler from '../Util/Euler.js';
import Matrix4 from '../Util/Matrix4.js';

/**
 * transform component
 * @param (vector) position - position
 * @param (vector) scale - scale
 */
// var Transform = function (position, scale) {


class Transform {
	constructor(position, scale){
		this.position = position ?? new Vector();
		this.scale = scale ?? new Vector(1,1,1);

		this.quaternion = new Quaternion();

		this.matrix = new Matrix4();
	}
}

Transform.prototype.name = 'Transform';

export default Transform;