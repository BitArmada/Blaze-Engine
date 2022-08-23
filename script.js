import * as Blaze from './Blaze/Blaze.js';

var scene = new Blaze.Scene('test');

Blaze.Input.keyPress("g", ()=>{
    scene.renderer.wireframe = !scene.renderer.wireframe;
});

class Orbit extends Blaze.Script {
    constructor(){
        super();
        this.time = 0;
        this.orbitAngles = new Blaze.Euler();
        this.cameraDistance = 5;
        this.focus = new Blaze.Vector(0,0,0);
    }

    start(){
    }

    update(){
        this.orbitAngles = new Blaze.Euler(0, 0, 0);
        this.Transform.quaternion.setFromEuler(this.orbitAngles);
    }
}

var camera = new Blaze.Entity();
camera.add(new Blaze.Components.Camera());
camera.add(new Blaze.Components.Transform(new Blaze.Vector(0,0,0)));
// camera.addScript(new Blaze.Components.Script(new Orbit()));
scene.add(camera);


var floor = new Blaze.Entity();
floor.add(new Blaze.Components.Transform(new Blaze.Vector(0,-1,-5), new Blaze.Vector(5, 0.1, 5)));
floor.add(new Blaze.Components.Mesh());
floor.add(new Blaze.Components.Physics(0));
floor.add(new Blaze.Components.Material( new Blaze.Color(0.7,0.7,0.7)));
scene.add(floor);

for(var i = 0; i < 10; i++) {
    var m = new Blaze.Entity();
    m.add(new Blaze.Components.Transform(new Blaze.Vector(Math.random()*2,Math.random(),Math.random()*2-6), new Blaze.Vector(0.1, 0.1, 0.1)));
    m.add(new Blaze.Components.Mesh());
    m.add(new Blaze.Components.Physics(1));
    m.add(new Blaze.Components.Material( null, './Assets/container.png'));
    scene.add(m);
}


scene.start();