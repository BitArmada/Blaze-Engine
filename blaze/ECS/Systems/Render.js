import Matrix4 from '../../Util/Matrix4.js'

function Render(entities, Renderer){
	//loop through entities
	for( var entityId in entities ){
		//the curent entity
        var entity = entities[entityId];

		//check if current entity has a transform component
		if(entity.components.Transform){
			if(entity.components.Camera){
				// entity.components.Camera.view = Matrix4.translate(
				// 	entity.components.Camera.view,
				// 	entity.components.Camera.view,
				// 	entity.components.Transform.position.toArray()
				// );
				entity.components.Camera.view = Matrix4.fromPositionRotation(entity.components.Transform.position, entity.components.Transform.rotation);
				Renderer.useCamera(entity.components.Camera);
			}
			if(entity.components.Mesh){
				var transform = entity.components.Transform;
				var mesh = entity.components.Mesh.mesh;
				mesh.transform = Matrix4.from(transform.position, transform.scale, transform.rotation);
				//mesh.modelViewMatrix.rotateZ(0.1);
				Renderer.renderMesh(
					mesh, // mesh
					Renderer.shader // shader
				);
			}
			//fill a blue square at the transform cordinates
			// renderer.fillRect(entity.components.Transform.position.x, entity.components.Transform.position.y, 100,100,"blue");
		}
	}
}

export default Render;