import Matrix4 from '../Util/Matrix4.js';
import Vector from '../Util/Vector.js';
import System from './System.js';

class Render extends System{
	requirements = [
		'Transform',
	];

	constructor(renderer){
		super();
		this.renderer = renderer;
	}

	start () {
		
	}

	update () {

	}

	Camera (entity) {
		Matrix4.lookAt(
			entity.Camera.view.array, 
			entity.Transform.position.toArray(),
			Vector.add(entity.Transform.position, entity.Camera.direction).toArray(),
			[0,1,0]
		);
		// console.log(Vector.add(entity.Transform.position, new Vector(0,0,1)).toArray())
		// console.log(entity.Transform.position.toArray());
		//Matrix4.lookAt(entity.Camera.view.array, entity.Transform.position.toArray(), [0,0,0], [0,1,0]);
		this.renderer.useCamera(entity.Camera);
	}

	Mesh (entity) {
		var transform = entity.Transform;
		var mesh = entity.Mesh.mesh;
		var material = entity.Material;

		mesh.transform = Matrix4.fromRotationTranslationScale(mesh.transform, transform.quaternion.array, transform.position.array, transform.scale.array);

		//mesh.transform = Matrix4.fromRotationTranslationScaleOrigin(
		// 	mesh.transform,
		// 	transform.quaternion,
		// 	new Vector(0,0,0),
		// 	transform.scale,
		// 	transform.position
		// );
		// mesh.transform.scale(transform.scale);
		// mesh.transform = new Matrix4();
		// var scale = Matrix4.createScale(transform.scale);
		// mesh.transform.translate(transform.position);

		// mesh.transform = Matrix4.from(transform.position, transform.scale);
		// var rotation = Matrix4.fromQuat(transform.quaternion);
		// mesh.transform = Matrix4.multiply(mesh.transform, mesh.transform, scale);
		//console.log(mesh.transform)
		
		this.renderer.renderMesh(
			mesh, // mesh
			material,
			this.renderer.shader // shader
		);
	}
}


export default Render;