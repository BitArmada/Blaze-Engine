import * as Blaze from './Blaze/Blaze.js';

var scene = new Blaze.Scene('test');

class Movement extends Blaze.Script{
    front = new Blaze.Vector(0,0,-1);
    direction = new Blaze.Vector(0,0,-1);
    update(){
        this.direction.x = Blaze.Input.mousePosition.x;
        this.direction.y = -Blaze.Input.mousePosition.y;

        this.Transform.quaternion.fromUnitVectors(this.front.normalize(), this.direction.normalize());

        this.Transform.position.add(Blaze.Vector.scale(this.direction, 0.02));
        camera.Transform.position.x+=0.1;
    }
}

var camera = new Blaze.Entity();
camera.add(new Blaze.Components.Camera())
camera.add(new Blaze.Components.Transform(new Blaze.Vector(0,0,10)))
// camera.addScript(new Blaze.Components.Script(new Move()));
scene.add(camera)

var box = new Blaze.Entity();
box.add(new Blaze.Components.Transform(new Blaze.Vector(0,0,-5), new Blaze.Vector(0.2, 0.2, 0.2)));
box.add(new Blaze.Components.Mesh('./Assets/ghibliplane.obj'));
box.add(new Blaze.Components.Material(null, './Assets/ghibliplane_Albedo.png'));
box.addScript(new Blaze.Components.Script(new Movement()));
scene.add(box);


// create landscape
for(var y = -20; y < 2; y++){
    for(var x = -20; x < 20; x++){
        var m = new Blaze.Entity();
        m.add(new Blaze.Components.Transform(new Blaze.Vector(x,0,y-5), new Blaze.Vector(0.1, 0.1, 0.1)));
        m.add(new Blaze.Components.Mesh());
        m.add(new Blaze.Components.Material( new Blaze.Color(Math.random(),Math.random(),Math.random())));
        scene.add(m);
    }
}



Blaze.Input.keyPress("g", ()=>{
    scene.renderer.wireframe = !scene.renderer.wireframe;
});

scene.start();