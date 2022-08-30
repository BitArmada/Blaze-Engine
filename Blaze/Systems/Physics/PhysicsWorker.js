
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


    function loadMeshCollider(m, scale){
        const mesh = new Ammo.btTriangleMesh(true, true);
        mesh.setScaling(new Ammo.btVector3(scale.x, scale.y, scale.z));
        for (let i = 0; i * 3 < m.indices.length; i++) {
            mesh.addTriangle(
                new Ammo.btVector3(m.vertices[m.indices[i * 3] * 3], m.vertices[m.indices[i * 3] * 3 + 1], m.vertices[m.indices[i * 3] * 3 + 2]),
                new Ammo.btVector3(m.vertices[m.indices[i * 3 + 1] * 3], m.vertices[m.indices[i * 3 + 1] * 3 + 1], m.vertices[m.indices[i * 3 + 1] * 3 + 2]),
                new Ammo.btVector3(m.vertices[m.indices[i * 3 + 2] * 3], m.vertices[m.indices[i * 3 + 2] * 3 + 1], m.vertices[m.indices[i * 3 + 2] * 3 + 2]),
                false
            );
        }
        const shape = new Ammo.btBvhTriangleMeshShape(mesh, true, true);
        return shape;
    }

    function addBody(e){

        // transform
        let transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin( new Ammo.btVector3( e.position.x, e.position.y, e.position.z ) );
        transform.setRotation( new Ammo.btQuaternion( e.quaternion.x, e.quaternion.y, e.quaternion.z, e.quaternion.w ) );

        var shape;
        switch(e.collider.type){
            case 'Box':
                shape = new Ammo.btBoxShape(new Ammo.btVector3(e.scale.x, e.scale.y, e.scale.z));
                break;
            case 'Mesh':
                shape = loadMeshCollider(e.collider.mesh, e.scale);
                break;
        }

        var mass = e.mass;
        var localInertia = new Ammo.btVector3(0, 0, 0);
        shape.calculateLocalInertia(mass, localInertia);
  
        var motionState = new Ammo.btDefaultMotionState(transform);
        var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
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

    function readData(ents){
        for(const id in ents){
            let body = bodies[id];
            let ent = ents[id];
            var origin = body.getWorldTransform().getOrigin();
            origin.setX(ent.position.x);
            origin.setY(ent.position.y);
            origin.setZ(ent.position.z);
            var rotation = body.getWorldTransform().getRotation();
            rotation.setX(ent.quaternion.x);
            rotation.setY(ent.quaternion.y);
            rotation.setZ(ent.quaternion.z);
            rotation.setW(ent.quaternion.w);
        }
    }

    var previusTime = Date.now();
    var deltaTime = 1;

    function update(ents){
        deltaTime = Date.now()-previusTime;
        previusTime = Date.now();

        readData(ents);

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
                update(event.data.entities);
                break;
        }
    }

    postMessage({type: 'ready'});
});