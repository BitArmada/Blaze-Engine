import Vector from '../../Util/Vector.js';


function Material (src) {
	
	this.image = new Image();
	this.image.src = src ?? "https://i.kym-cdn.com/entries/icons/original/000/022/134/elmo.jpg";
	
	return this;
}

Material.prototype.name = 'Material';

export default Material;