import * as Blaze from './blaze/blaze.js';
import Entity from './blaze/Entity/Entity.js';
import Components from './blaze/components/Components.js';
import Vector from './blaze/Util/Vector.js';
import * as Input from './blaze/Events/Events.js';
import Script from './blaze/scripting/Script.js';
import {BoxPhysics, CirclePhysics} from './blaze/physics/PhysicsObjects.js';

var scene = new Blaze.Scene('test');

var player = new Entity();

//set default position of square to the center of the screen
var pos = new Vector(-1,0,-5);

class Movement extends Script{
	start(){
		this.velocity = new Vector();
		this.speed = 0.1;
	}
	update(){
		this.velocity.zero();
		if(Input.keys['KeyW']){
			this.velocity.z = this.speed;
		}
		if(Input.keys['KeyS']){
			this.velocity.z = -this.speed;
		}
		if(Input.keys['KeyA']){
			this.velocity.x = this.speed;
		}
		if(Input.keys['KeyD']){
			this.velocity.x = -this.speed;
		}
		if(Input.keys['Space']){
			this.velocity.y = -this.speed;
		}
		if(Input.keys['Shift']){
			this.velocity.y = this.speed;
		}
		if(Input.keys['KeyQ']){
			this.Transform.rotation+=0.1;
		}
		this.Transform.position.add(this.velocity);
		//cameraVelocity = new Vector();
	}
}

var camera = new Entity();
camera.add(new Components.Transform(new Vector(0,0,0)));
camera.add(new Components.Camera());
camera.addScript(new Components.Script(new Movement()));
scene.add(camera)

var pointLight = new Entity();
pointLight.add(new Components.PointLight());
pointLight.add(new Components.Transform(new Vector(0,0,-10)));
scene.add(pointLight);

player.add(new Components.Transform(pos, new Vector(1,1,1)));
player.add(new Components.Mesh(new Vector(-1,0,-10)));
scene.add(player);

var platform = new Entity();
platform.add(new Components.Transform(new Vector(1,0,-5), new Vector(1, 1, 1)));
platform.add(new Components.Mesh(new Vector(1,0,-10)));
scene.add(platform);

Input.keyPress("g", ()=>{
	scene.renderer.wireframe = !scene.renderer.wireframe;
});
// Input.keyPress("w",()=>{
// 	camera.components.Transform.position.z+=0.2;
// });
// Input.keyPress("s",()=>{
// 	camera.components.Transform.position.z-=0.2;
// });
// Input.keyPress("a",()=>{
// 	camera.components.Transform.position.x+=0.2;
// });
// Input.keyPress("d",()=>{
// 	camera.components.Transform.position.x-=0.2;
// });

// //create platform
// var platform = new Entity();
// platform.add(new Components.Transform(new Vector(0,-20,-110), new Vector(100, 10, 10)));
// platform.add(new Components.Mesh());
// platform.add(new Components.Physics(true));
// scene.add(platform);

// for(var i = 0; i < 10; i++){
// 	var size = Math.random()*5+5;
// 	var ent = new Entity();
// 	ent.add(new Components.Transform(new Vector(-Math.random()*100 + 50, 50-(Math.random()*20)-10, -110), new Vector(size,size,size)));
// 	ent.add(new Components.Mesh());
// 	ent.add(new Components.Physics());
// 	scene.add(ent);
// }

// keyPress("w",()=>{
//   	var size = Math.random()*5+5;
// 	var ent = new Entity();
// 	ent.add(new Components.Transform(new Vector(-Math.random()*100 + 50, 50-(Math.random()*20)-10, -110), new Vector(size,size,size)));
// 	ent.add(new Components.Mesh());
// 	ent.add(new Components.Physics());
// 	scene.add(ent);
// });

scene.print();

scene.start();