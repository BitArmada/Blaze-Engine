import * as Blaze from './Blaze/Blaze.js';

var scene = new Blaze.Scene('test');

class Circle extends Blaze.Script{
    time = 0;
    update(){
        this.Transform.position.x = (Math.cos(this.time));
        this.Transform.position.y = (Math.sin(this.time));

        this.Material.color.g = (Math.cos(this.time)/2)+0.5;
        this.Material.color.r = (Math.sin(this.time)/2)+0.5;

        this.Transform.quaternion.setFromAxisAngle(new Blaze.Vector(0,1,0), this.time);

        // this.Camera.direction = Blaze.Vector.subtract(box.Transform.position, this.Transform.position)
        // this.Camera.direction.normalize();
        this.time+= 0.01;
        //this.Transform.quaternion.setFromAxisAngle(new Blaze.Vector(0,1,0), time);
    }
}

class Pose extends Blaze.Script{
    time = 0;
    update(){
        var axis = new Blaze.Vector(0,1,1);
        axis.normalize();
        this.Transform.quaternion.setFromAxisAngle(axis, this.time);
        this.time+= 0.01;
    }
}

class Rotate extends Blaze.Script{
    time = 0;
    update(){
        this.Transform.position.x = (Math.cos(this.time));
        this.Transform.position.z = (Math.sin(this.time))-5;
        this.time+= 0.1;
    }
}

class Move extends Blaze.Script{
    time = 0;
    update(){
        this.Transform.position.x = this.time;
        this.time+= 0.01;
    }
}

var camera = new Blaze.Entity();
camera.add(new Blaze.Components.Camera())
camera.add(new Blaze.Components.Transform(new Blaze.Vector(0,0,10)))
// camera.addScript(new Blaze.Components.Script(new Move()));
scene.add(camera)

var box = new Blaze.Entity();
box.add(new Blaze.Components.Transform(new Blaze.Vector(1,0,-5), new Blaze.Vector(0.4, 0.4, 0.4)));
box.add(new Blaze.Components.Mesh());
box.add(new Blaze.Components.Material( new Blaze.Color(0.1,0.1,0.1)));
box.addScript(new Blaze.Components.Script(new Pose()));
scene.add(box);

var box = new Blaze.Entity();
box.add(new Blaze.Components.Transform(new Blaze.Vector(-1,0,-5), new Blaze.Vector(0.4, 0.4, 0.4)));
box.add(new Blaze.Components.Mesh(true));
box.add(new Blaze.Components.Material( new Blaze.Color(0.5,0.1,0.1)));
box.addScript(new Blaze.Components.Script(new Pose()));
scene.add(box);

Blaze.Input.keyPress("g", ()=>{
    scene.renderer.wireframe = !scene.renderer.wireframe;
});

Blaze.Input.keyPress("w", ()=>{
    var box = new Blaze.Entity();
    box.add(new Blaze.Components.Transform(new Blaze.Vector(0,0,-5), new Blaze.Vector(0.1, 0.1, 0.1)));
    box.add(new Blaze.Components.Mesh());
    box.add(new Blaze.Components.Material( new Blaze.Color(0.5,0.4,0.2)));
    box.addScript(new Blaze.Components.Script(new Circle()));
    scene.add(box);

    console.log(scene.performance.FPS)
});

scene.start();