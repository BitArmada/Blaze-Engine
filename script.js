import * as Blaze from './Blaze/Blaze.js';

var scene = new Blaze.Scene('test');

Blaze.Input.keyPress("g", ()=>{
    scene.renderer.wireframe = !scene.renderer.wireframe;
});

Blaze.Input.keyPress("w", ()=>{
    var m = new Blaze.Entity();
    m.add(new Blaze.Components.Transform(new Blaze.Vector(0,10,-8), new Blaze.Vector(Math.random()*0.1+0.1, 0.1, Math.random()*0.1+0.1)));
    m.add(new Blaze.Components.Mesh());
    m.add(new Blaze.Components.Physics(1));
    m.add(new Blaze.Components.Material( new Blaze.Color(Math.random(), Math.random(), Math.random())));
    scene.add(m);
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
camera.add(new Blaze.Components.Transform(new Blaze.Vector(0,2,15)));
// camera.addScript(new Blaze.Components.Script(new Orbit()));
scene.add(camera);


var floor = new Blaze.Entity();
floor.add(new Blaze.Components.Transform(new Blaze.Vector(0,-1,-5), new Blaze.Vector(5, 1, 5)));
floor.add(new Blaze.Components.Mesh());
floor.add(new Blaze.Components.Physics(0));
floor.add(new Blaze.Components.Material( new Blaze.Color(0.1,0.1,0.1)));
scene.add(floor);

var floor = new Blaze.Entity();
floor.add(new Blaze.Components.Transform(new Blaze.Vector(0,4,-10), new Blaze.Vector(5, 5, 0.1)));
floor.add(new Blaze.Components.Mesh());
floor.add(new Blaze.Components.Physics(0));
floor.add(new Blaze.Components.Material( new Blaze.Color(0.1,0.2,0.4)));
scene.add(floor);

var floor = new Blaze.Entity();
floor.add(new Blaze.Components.Transform(new Blaze.Vector(-5,4,-5), new Blaze.Vector(0.1, 5, 5)));
floor.add(new Blaze.Components.Mesh());
floor.add(new Blaze.Components.Physics(0));
floor.add(new Blaze.Components.Material( new Blaze.Color(0.1,0.2,0.4)));
scene.add(floor);

var floor = new Blaze.Entity();
floor.add(new Blaze.Components.Transform(new Blaze.Vector(5,4,-5), new Blaze.Vector(0.1, 5, 5)));
floor.add(new Blaze.Components.Mesh());
floor.add(new Blaze.Components.Physics(0));
floor.add(new Blaze.Components.Material( new Blaze.Color(0.1,0.2,0.4)));
scene.add(floor);

for(var y = 0; y < 10; y++) {
    for(var x = 0; x < 1; x++){
        var m = new Blaze.Entity();
        m.add(new Blaze.Components.Transform(new Blaze.Vector(x*0.5,y*0.5+1,-8), new Blaze.Vector(Math.random()*0.1+0.1, 0.1, Math.random()*0.1+0.1)));
        m.add(new Blaze.Components.Mesh());
        m.add(new Blaze.Components.Physics(1));
        m.add(new Blaze.Components.Material( new Blaze.Color(Math.random(), Math.random(), Math.random())));
        scene.add(m);
    }
}


scene.start();