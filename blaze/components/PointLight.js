import Vector from '../Util/Vector.js';


var PointLight = function () {
	
	this.color = new Vector(1,1,1);
	this.intensity = 1.0;
	
	return this;
}

PointLight.prototype.name = 'PointLight';

export default PointLight;