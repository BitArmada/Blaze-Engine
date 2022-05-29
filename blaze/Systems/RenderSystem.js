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
		Matrix4.lookAt(entity.Camera.view.array, entity.Transform.position.toArray(), Vector.add(entity.Transform.position, entity.Camera.direction).toArray(), [0,1,0]);
		this.renderer.useCamera(entity.Camera);
	}

	Mesh (entity) {
		var transform = entity.Transform;
		var mesh = entity.Mesh.mesh;

		mesh.transform = Matrix4.fromRotationTranslationScale(mesh.transform, transform.quaternion.array, transform.position.array, transform.scale.array);

		this.renderer.renderMesh(
			mesh, // mesh
			this.renderer.shader // shader
		);
	}
}


export default Render;