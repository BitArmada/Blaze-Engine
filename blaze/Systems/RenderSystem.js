import Matrix4 from '../Util/Matrix4.js';
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
		entity.Camera.view = Matrix4.fromPositionRotation(entity.Transform.position, entity.Transform.rotation);
		this.renderer.useCamera(entity.Camera);
	}

	Mesh (entity) {
		var transform = entity.Transform;
		var mesh = entity.Mesh.mesh;

		mesh.transform = Matrix4.from(transform.position, transform.scale, transform.rotation);

		this.renderer.renderMesh(
			mesh, // mesh
			this.renderer.shader // shader
		);
	}
}


export default Render;