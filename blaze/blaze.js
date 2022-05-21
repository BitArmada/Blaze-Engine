import Canvas from './Util/Canvas.js';
import Renderer from './Rendering/WebGL/Renderer.js';
import Render from './ECS/Systems/Render.js';
import ScriptSystem from './ECS/Systems/ScriptSystem.js';
import Physics from './ECS/Systems/Physics.js';

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

		//physics engine
		this.physics = new Physics();

		if(this.config.fillWindow){
			//fill the window
			document.body.style.margin = 0;
			document.body.style.overflow = 'hidden';
			this.canvas.fillWindow();
		}

		this.renderer = new Renderer(this.canvas);
	}
	start(){
		setInterval(this.update.bind(this), 1000/this.config.fps);
		this.physics.start(this.entities);
	}
	update(){
		//clear canvas
		this.renderer.clear();

		//run ScriptSystem
		ScriptSystem(this.entities);

		//render entities
		Render(this.entities, this.renderer);

		//calculate entities
		this.physics.update(this.entities);
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