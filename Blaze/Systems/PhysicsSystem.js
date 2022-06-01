import System from '../Systems/System.js';

var Engine = Matter.Engine;
var Bodies = Matter.Bodies;
var World = Matter.World;

class PhysicsSystem{
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
// class PhysicsSystem extends System{
// 	requirements = [
// 		'Physics',
// 		'Transform',
// 	];

// 	start (entity) {
// 		var transform = entity.Transform;
// 		var physics = entity.Physics;

// 		//if entity does not have physics object defined yet
// 		if(typeof entity.Physics.physicsObject == "function"){
// 			entity.Physics.physicsObject = new entity.Physics.physicsObject(transform.position, transform.scale, physics.isStatic);
// 			this.add(physics.physicsObject.body);
// 		}

// 		//set transform to physics object position
// 		transform.position.x = physics.physicsObject.body.position.x;
// 		transform.position.y = physics.physicsObject.body.position.y;
// 		transform.rotation = physics.physicsObject.body.angle;
// 	}

// 	update(entity){
// 		var transform = entity.Transform;
// 		var physics = entity.Physics;

// 		//if entity does not have physics object defined yet
// 		if(typeof entity.Physics.physicsObject == "function"){
// 			entity.Physics.physicsObject = new entity.Physics.physicsObject(transform.position, transform.scale, physics.isStatic);
// 			this.add(physics.physicsObject.body);
// 		}

// 		//set transform to physics object position
// 		transform.position.x = physics.physicsObject.body.position.x;
// 		transform.position.y = physics.physicsObject.body.position.y;
// 		transform.rotation = physics.physicsObject.body.angle;
// 	}
// }


export default PhysicsSystem;