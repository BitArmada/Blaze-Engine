import Color from '../Util/Color.js';


function Material (color) {
	this.color = color ?? new Color();
	this.specular = 8.0;
	
	return this;
}

Material.prototype.name = 'Material';

export default Material;