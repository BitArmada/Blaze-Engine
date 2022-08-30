import * as Blaze from './Blaze/Blaze.js';

var scene = new Blaze.Scene('test');

Blaze.Input.keyPress("g", ()=>{
    scene.renderer.wireframe = !scene.renderer.wireframe;
});

class FPS extends Blaze.Script {
    constructor(){
        super();
        this.time = 0;
        this.rotation = new Blaze.Euler();
        this.cameraDistance = 5;
        this.focus = new Blaze.Vector(0,0,0);
    }

    start(){
    }

    update(){
        this.rotation = new Blaze.Euler(-Blaze.Input.mousePosition.y, 0);

        // clamp rotation
        if(this.rotation.x < -Math.PI/2){
            this.rotation.x = -Math.PI/2;
        }


        this.Transform.quaternion.setFromEuler(this.rotation);

        this.Transform.quaternion.setFromAxisAngle(new Blaze.Vector(0,1,0), -Blaze.Input.mousePosition.x);
    }
}

var camera = new Blaze.Entity();
camera.add(new Blaze.Components.Camera());
camera.add(new Blaze.Components.Transform(new Blaze.Vector(0,0,0)));
camera.add(new Blaze.Components.Physics());
camera.addScript(new Blaze.Components.Script(new FPS()));
scene.add(camera);


var floor = new Blaze.Entity();
floor.add(new Blaze.Components.Transform(new Blaze.Vector(0,-5,-5), new Blaze.Vector(10, 1, 10)));
floor.add(new Blaze.Components.Mesh());
floor.add(new Blaze.Components.Physics(0));
floor.add(new Blaze.Components.Material( null, './Assets/default.jpg'));
scene.add(floor);

scene.start();