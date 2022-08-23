import Canvas from './Util/Canvas.js';
import Renderer from './Rendering/WebGL/Renderer.js';
import SystemManager from './Systems/SystemManager.js';
import Time from './Util/Time.js';

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

		this.performance = {
			lastTimeStamp: 0,
			renderTime: 0,
			FPS: 0,
		};

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
		//setInterval(this.update.bind(this), 1000/this.config.fps);
		requestAnimationFrame(this.update.bind(this));

		// start systems
		this.systemManager.start(this.entities);
	}
	update(timestamp){
		// calculate performance data
		this.performance.renderTime = timestamp - this.performance.lastTimeStamp;
		this.performance.FPS = 1000/(this.performance.renderTime)
		
		this.performance.lastTimeStamp = timestamp;
		
		// delta time
		Time.deltaTime = this.performance.renderTime;

		//clear canvas
		this.renderer.clear();

		// call systems
		this.systemManager.update(this.entities);

		requestAnimationFrame(this.update.bind(this));
	}
	add(entity){
		this.entities[entity.id] = entity;
		this.systemManager.add(this.entities[entity.id]);
	}
	remove(id){
		delete this.entities[id];
	}
	print(){
		console.log(JSON.stringify(this, null, 4));
	}
}

export default Scene;