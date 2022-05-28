import Matrix4 from '../Util/Matrix4.js';
import Vector from '../Util/Vector.js';

var Camera = function () {
	//camera stuff move this somewere else later
	const fov = 45 * Math.PI / 180;   // in radians
	const aspect = window.innerWidth / window.innerHeight;
	const zNear = 0.1;
	const zFar = 100.0;
	this.projection = Matrix4.Perspective2(fov, aspect, zNear, zFar).array;
	this.view = new Matrix4().array;
	this.view = Matrix4.translate(
		this.view,
		this.view,
		[-0.0, 0.0, 0.0]
	);

	this.direction = new Vector(0,0,1);
	return this;
}

Camera.prototype.name = 'Camera';

export default Camera;