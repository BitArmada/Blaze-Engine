
importScripts('./Ammo/ammo.wasm.js');

var config = {
    locateFile: () => './Ammo/ammo.wasm.wasm'
}

Ammo(config).then(function(Ammo) {

    var collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    var dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    var overlappingPairCache = new Ammo.btDbvtBroadphase();
    var solver = new Ammo.btSequentialImpulseConstraintSolver();
    var physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
    physicsWorld.setGravity(new Ammo.btVector3(0, -10, 0));

    var bodies = {};

    var boxShape = new Ammo.btBoxShape(new Ammo.btVector3(1, 1, 1));

    function addBody(e){


        // transform
        let transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin( new Ammo.btVector3( e.position.x, e.position.y, e.position.z ) );
        transform.setRotation( new Ammo.btQuaternion( e.quaternion.x, e.quaternion.y, e.quaternion.z, e.quaternion.w ) );

        var mass = 1;
        var localInertia = new Ammo.btVector3(0, 0, 0);
        boxShape.calculateLocalInertia(mass, localInertia);
  
        var motionState = new Ammo.btDefaultMotionState(transform);
        var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, boxShape, localInertia);
        var body = new Ammo.btRigidBody(rbInfo);
  
        physicsWorld.addRigidBody(body);

        bodies[e.id] = body;
    }

    var tmpTransform = new Ammo.btTransform();

    function generateData(){
        var data = {};
        for(id in bodies){
            let ms = bodies[id].getMotionState();
            bodies[id].getMotionState().getWorldTransform(tmpTransform);
            if(ms){
                ms.getWorldTransform(tmpTransform);
                let p = tmpTransform.getOrigin();
                let q = tmpTransform.getRotation();
                data[id] = {};
                data[id].position = {
                    x: p.x(),
                    y: p.y(),
                    z: p.z(),
                }
                data[id].quaternion = {
                    x: q.x(),
                    y: q.y(),
                    z: q.z(),
                    w: q.w(),
                }
            }
        }
        return data;
    }

    function update(deltaTime){
        
        physicsWorld.stepSimulation( deltaTime, 1 );
        
        const data = generateData();

        // send position data back
        postMessage({
            type: 'results',
            transformations: data,
        });
    }

    onmessage = function(event) {
        switch (event.data.type){
            case 'new entity':
                addBody(event.data.entity);
                break;
            case 'update':
                update(event.data.deltaTime);
                break;
        }
    }

    postMessage({type: 'ready'});
});