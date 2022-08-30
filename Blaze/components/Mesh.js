import Vector from '../Util/Vector.js';
import {default as WebGLMesh} from '../Rendering/WebGL/Mesh.js';

var Mesh = function (model) {
	if(model){
		this.meshLoaded = false;
		this.mesh = new WebGLMesh();

		// load file
		fetch(model)
		.then(response => response.text()) 
		.then(textData => {
			WebGLMesh.loadObj(this.mesh, textData);
			this.meshLoaded = true;
		});

	}else{
		this.mesh = new WebGLMesh();
		this.meshLoaded = true;
	}

	// console.log(this.mesh.vertices);

	return this;
}

Mesh.prototype.name = 'Mesh';

export default Mesh;