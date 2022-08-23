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

	Transform(entity){
		Matrix4.fromRotationTranslationScale(
			entity.Transform.matrix,
			entity.Transform.quaternion.array,
			entity.Transform.position.array,
			entity.Transform.scale.array
		);
	}

	Camera (entity) {
		// Matrix4.lookAt(
		// 	entity.Camera.view.array, 
		// 	entity.Transform.position.invert().array,
		// 	Vector.add(entity.Transform.position, entity.Camera.direction).toArray(),
		// 	[0,1,0]
		// );

		Matrix4.invert(entity.Camera.view, entity.Transform.matrix);

		this.renderer.useCamera(entity.Camera);
	}

	Mesh (entity) {
		this.renderer.renderMesh(
			entity.Mesh.mesh, // mesh
			entity.Transform,
			entity.Material,
			this.renderer.shader // shader
		);
	}
}


export default Render;