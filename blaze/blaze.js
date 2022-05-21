import Canvas from './Util/Canvas.js';
import Renderer from './Rendering/WebGL/Renderer.js';
import SystemManager from './Systems/SystemManager.js';

const Config = {
	//defualt global configurations
	width: 500,
	height: 500,
	fps: 60,
	canvasRoot: document.body,
	// the canvas and context get created Init
	canvas: null,
	ctx: null,
	//keep margin for body element
	fillWindow: true,
};

//scene class
class Scene{
	constructor(name, config){

		//name and configurations
		this.name = name;
		this.config = config ?? Config;

		//entitys
		this.entities = {};

		//init renderer and canvas
		this.canvas = new Canvas(this.config);

		this.systemManager = new SystemManager();

		if(this.config.fillWindow){
			//fill the window
			document.body.style.margin = 0;
			document.body.style.overflow = 'hidden';
			this.canvas.fillWindow();
		}

		this.renderer = new Renderer(this.canvas);

		// set the system managers renderer
		this.systemManager.renderer = this.renderer;
	}
	start(){
		setInterval(this.update.bind(this), 1000/this.config.fps);

		// start systems
		this.systemManager.start(this.entities);
	}
	update(){
		//clear canvas
		this.renderer.clear();

		// call systems
		this.systemManager.update(this.entities);
	}
	add(entity){
		this.entities[entity.id] = entity;
	}
	remove(id){
		delete this.entities[id];
	}
	print(){
		console.log(JSON.stringify(this, null, 4));
	}
}

export{Scene};