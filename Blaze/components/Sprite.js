import Vector from '../Util/Vector.js';


function Sprite (src) {
	
	this.image = new Image();
	this.image.src = src ?? "https://i.kym-cdn.com/entries/icons/original/000/022/134/elmo.jpg";

	return this;
}

Sprite.prototype.name = 'Sprite';

export default Sprite;