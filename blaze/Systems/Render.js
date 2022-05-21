import Matrix4 from '../Util/Matrix4.js'

function Render(entities, Renderer){
	//loop through entities
	for( var entityId in entities ){
		//the curent entity
        var entity = entities[entityId];

		//check if current entity has a transform component
		if(entity.Transform){
			if(entity.Camera){
				entity.Camera.view = Matrix4.fromPositionRotation(entity.Transform.position, entity.Transform.rotation);
				Renderer.useCamera(entity.Camera);
			}
			if(entity.Mesh){
				var transform = entity.Transform;
				var mesh = entity.Mesh.mesh;
				mesh.transform = Matrix4.from(transform.position, transform.scale, transform.rotation);
				Renderer.renderMesh(
					mesh, // mesh
					Renderer.shader // shader
				);

			}
		}
	}
}

export default Render;