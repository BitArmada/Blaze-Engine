import * as Math from '../Util/math.js';

class Renderer{
	constructor(canvas){
		this.canvas = canvas;
		this.element = canvas.canvas;
		this.ctx = this.element.getContext('2d');
		this.clearColor = "black";
	}
	clear(){
		this.ctx.clearRect(0,0,this.element.width, this.element.height);
		this.fillRect(0,0,this.element.width, this.element.height, this.clearColor);
	}
	fillRect(x, y, width, height, color){
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, width, height)
	}
	drawLine(x1, y1, x2, y2, color, lineWidth){
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = lineWidth;
		this.ctx.beginPath();
		this.ctx.moveTo(x1,y1);
		this.ctx.lineTo(x2,y2);
		this.ctx.stroke();
	}
	drawImage(image, x, y, width, height, rotation){
		if(rotation){
			this.ctx.save();
			this.ctx.translate(x, y);
			this.ctx.rotate(rotation);
			this.ctx.drawImage(image, -(width/2), -(height/2), width, height);
			this.ctx.restore();
		}else{
			this.ctx.drawImage(image, x-(width/2), y-(height/2), width, height);
		}
	}
	drawVector(vector, magnitude, color){
		this.drawLine(0,0,vector.x, vector.y,);
	}
	fillShape(){}
}

export default Renderer;