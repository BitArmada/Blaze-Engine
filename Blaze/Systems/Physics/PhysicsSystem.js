import System from '../System.js';
import Time from '../../Util/Time.js';

class PhysicsSystem extends System{

	requirements = [
		'Transform',
		'Physics',
	];

	constructor(){
		super();
		// create physics worker
		this.physicsWorker = new Worker('./Blaze/Systems/Physics/PhysicsWorker.js');

		this.workerloaded = false;
		this.results = null;
		this.waitingMessages = [];

		this.physicsWorker.onmessage = function(event) {
			switch (event.data.type){

				case 'ready':
					this.workerloaded = true;
					this.disbatchMessages();
					break;

				case 'results':
					this.results = event.data.transformations;
					break;
			}
		}.bind(this);

	}

	disbatchMessages(){
		const messages = this.waitingMessages.length;
		for(var i = 0; i < messages; i++){
			this.physicsWorker.postMessage(this.waitingMessages[0]);
			this.waitingMessages.shift();
		}
	}

	onEntityInit(ent){
		this.waitingMessages.push({
			type: 'new entity',
			entity: {
				id: ent.id,
				mass: ent.Physics.mass,
				scale: ent.Transform.scale,
				position: ent.Transform.position,
				quaternion: ent.Transform.quaternion,
			}
		});
	}

	start(){

	}

	update(){
		// send data
		if(this.workerloaded){
			this.physicsWorker.postMessage({
				type: 'update',
				deltaTime: Time.deltaTime,
			});
		}
	}

	updateEntity(entity){

		// apply results
		if(this.results && this.results[entity.id]){
			entity.Transform.position.x = this.results[entity.id].position.x;
			entity.Transform.position.y = this.results[entity.id].position.y;
			entity.Transform.position.z = this.results[entity.id].position.z;

			entity.Transform.quaternion.x = this.results[entity.id].quaternion.x;
			entity.Transform.quaternion.y = this.results[entity.id].quaternion.y;
			entity.Transform.quaternion.z = this.results[entity.id].quaternion.z;
			entity.Transform.quaternion.w = this.results[entity.id].quaternion.w;
		}
	}
}

export default PhysicsSystem;