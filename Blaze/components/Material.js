import Color from '../Util/Color.js';
import Texture from '../Rendering/Texture.js';


function Material (color) {
	this.color = color ?? new Color();
	this.specular = 8.0;
	this.texture = new Texture('./Assets/container.png');
	
	return this;
}

Material.prototype.name = 'Material';

export default Material;