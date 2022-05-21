
class Canvas{
	constructor(config){
		//set width and height
		this.width = config.width;
		this.height = config.height;

		if(config.canvas){
			this.canvas = config.canvas;
		}else{
			this.canvas = Canvas.createCanvas(config);
		}

	}
	fillWindow = function(){
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}
	static createCanvas(config) {
		var canv = document.createElement("canvas");

		//set canvas width and height
		canv.width = config.width;
		canv.height = config.height;

		//add canvas to canvas root element specified in config.
		config.canvasRoot.appendChild(canv);

		//return created canvas
		return canv;
	}

}

export default Canvas;