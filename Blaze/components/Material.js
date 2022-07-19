import Color from '../Util/Color.js';
import Texture from '../Rendering/Texture.js';


function Material (color, texture) {
	this.color = color ?? new Color(1, 1, 1);
	this.specular = 8.0;
	this.texture = new Texture(texture);
	
	return this;
}

Material.prototype.name = 'Material';

export default Material;