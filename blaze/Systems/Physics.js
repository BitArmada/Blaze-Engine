
var Engine = Matter.Engine;
var Bodies = Matter.Bodies;
var World = Matter.World;

class Physics{
	constructor(){
		this.engine = Engine.create();
		this.world = this.engine.world;
		this.engine.world.gravity.y = -this.engine.world.gravity.y;
	}
	add(physicsObject){
		World.add(this.world, physicsObject);
	}
	update(entities){
		for( var entityId in entities ){
			var entity = entities[entityId];
			if(entity.Physics && entity.Transform){
				var transform = entity.Transform;
				var physics = entity.Physics;

				//if entity does not have physics object defined yet
				if(typeof entity.Physics.physicsObject == "function"){
					entity.Physics.physicsObject = new entity.Physics.physicsObject(transform.position, transform.scale, physics.isStatic);
					this.add(physics.physicsObject.body);
				}

				//set transform to physics object position
				transform.position.x = physics.physicsObject.body.position.x;
				transform.position.y = physics.physicsObject.body.position.y;
				transform.rotation = physics.physicsObject.body.angle;
			}
		}
		Engine.update(this.engine);
	}
	start(entities){
		for( var entityId in entities ){
			var entity = entities[entityId];
			if(entity.Physics && entity.Transform){
				var transform = entity.Transform;
				var physics = entity.Physics;

				//if entity does not have physics object defined yet
				if(typeof entity.Physics.physicsObject == "function"){
					entity.Physics.physicsObject = new entity.Physics.physicsObject(transform.position, transform.scale, physics.isStatic);
					this.add(physics.physicsObject.body);
				}

				//set transform to physics object position
				transform.position.x = physics.physicsObject.body.position.x;
				transform.position.y = physics.physicsObject.body.position.y;
				transform.rotation = physics.physicsObject.body.angle;
			}
		}
	}
}

export default Physics;


// import Vector from '../../Util/Vector.js';

// function AABB(box1, pos, box2){
// 	return (pos.x < box2.position.x + box2.scale.x &&
//    pos.x + box1.scale.x > box2.position.x &&
//    pos.y < box2.position.y + box2.scale.y &&
//    box1.scale.y + pos.y > box2.position.y);
// }

// function Physics(entities, engine){
// 	this.start()
// 	// update engine
// 	engine.update();

// 	// //loop through entities
// 	// for( var entityId in entities ){
// 	// 	//the curent entity
//     //    // var entity = entities[entityId];
// 	// 	//check if current entity has a transform component
// 	// 	if(entity.Physics){
// 	// 		var transform = entity.Transform;
// 	// 		var physics = entity.Physics;

// 	// 		if(!physics.movable){
// 	// 			continue;
// 	// 		}

// 	// 		//reset the force
// 	// 		physics.force.zero();

// 	// 		// force = force + (gravity * mass)
// 	// 		physics.force.add(Vector.multiply(physics.gravity, physics.mass));
			
// 	// 		physics.velocity.add(physics.force);

// 	// 		var nextpos = Vector.add(transform.position, physics.velocity);

// 	// 		//crapy box collisions
// 	// 		for(var otherEnt in entities){
// 	// 			var ent2 = entities[otherEnt];
// 	// 			if(ent2.id !== entity.id && AABB(entity.Transform, nextpos, ent2.components.Transform)){
// 	// 				if(physics.velocity.x !== 0){
// 	// 					physics.velocity.x = 0;
// 	// 				}
// 	// 				if(physics.velocity.y !== 0){
// 	// 					physics.velocity.y = 0;
// 	// 				}
// 	// 			}
// 	// 		}

// 	// 		// add velocity to position
// 	// 		transform.position.add(physics.velocity);
// 	// 	}
// 	// }
// }

// export default Physics;