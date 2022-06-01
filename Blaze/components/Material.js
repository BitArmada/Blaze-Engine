import Color from '../Util/Color.js';


function Material (color) {
	this.color = color ?? new Color();
	
	return this;
}

Material.prototype.name = 'Material';

export default Material;