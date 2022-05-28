import Shader from './Shader.js';
import Matrix4 from '../../Util/Matrix4.js';
import Vector from '../../Util/Vector.js';

var fs = 
`
varying highp vec3 Normal;
varying highp vec3 viewPos;
varying highp vec3 fragPos;

void main() {
	highp vec3 base = vec3(0.8,0.5,0.2);//vec3(1.0, gl_FragCoord.xy*0.001);
	highp vec3 lightColor = vec3(1,1,1);
	lowp float specularStrength = 0.01;
	highp vec3 viewDir = normalize(viewPos - fragPos);
	highp vec3 lightDir = vec3(0,1,1);

	highp float diffuse = max(dot(Normal, lightDir), 0.0);

	highp vec3 reflectDir = reflect(-lightDir, Normal);
    highp float spec = pow(max(dot(viewDir, reflectDir), 0.0), 8.0);

	gl_FragColor = vec4((diffuse*base)+(0.4*base)+(spec*lightColor*specularStrength), 1.0);
	//gl_FragColor = vec4(Normal, 1.0);
}
`;
var vs = `
attribute vec4 a_position;
attribute vec3 normal;

uniform mat4 normalMatrix;
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform vec3 viewPosition;

varying highp vec3 Normal;
varying highp vec3 viewPos;
varying highp vec3 fragPos;

void main() {
	viewPos = viewPosition;
	fragPos = gl_Position.xyz;
	Normal = normalize((normalMatrix * vec4(normal, 1.0)).xyz);
    gl_Position = projection * model * view * a_position;
}
`;

class Renderer{
	static gl = null;
	constructor(canvas){
		this.canvas = canvas;
		this.element = canvas.canvas;

		this.gl = this.element.getContext('webgl');
		Renderer.gl = this.gl;

		this.clearColor = "black";
		this.shader = new Shader(this.gl, vs, fs);

		this.wireframe = false;

		//defualt camera
		const fov = 45 * Math.PI / 180;   // in radians
		const aspect = window.innerWidth / window.innerHeight;
		const zNear = 0.1;
		const zFar = 100.0;
		this.projection = Matrix4.Perspective2(fov, aspect, zNear, zFar).array;
		this.view = new Matrix4().array;
		this.view = Matrix4.translate(
			this.view,
			this.view,
			[-0.0, 0.0, 0.0]
		);
	}
	useCamera(camera){
		this.view = camera.view;
		this.projection = camera.projection;
	}
	useShader(shader){
		this.gl.useProgram(shader.shaderProgram);
	}
	clear(){
		const gl = this.gl;

		gl.clearColor(0.1, 0.1, 0.1, 1.0);  // Clear to black, fully opaque
  		gl.clearDepth(1.0);                 // Clear everything
		gl.enable(gl.DEPTH_TEST);           // Enable depth testing
		gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}
	renderMesh(mesh, shader){
		const gl = this.gl;
		
		// use the shader
		this.useShader(shader);

		// attributes
		//bind indices
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);

		// bind vertices
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.positionBuffer);
    	shader.assignAttribute('a_position');
		gl.enableVertexAttribArray(shader.attributes.a_position.location);

		// bind normals
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);
		shader.assignAttribute('normal');
		gl.enableVertexAttribArray(shader.attributes.normal.location);

		// uniforms
		shader.assignUniform('projection', this.projection);
		shader.assignUniform('view', this.view.array);
		shader.assignUniform('model', mesh.transform.array);

		mesh.normalMatrix = new Matrix4();
		Matrix4.invert(mesh.normalMatrix.array, this.view.array);
		mesh.normalMatrix.transpose();
		
		shader.assignUniform('normalMatrix', mesh.normalMatrix.array);
		shader.assignUniform('viewPosition', [-0.0, 0.0, 6.0]);
		
		// draw triangles
		gl.drawElements(
			((this.wireframe) ? gl.LINES : gl.TRIANGLES), // mode
			mesh.vertexCount, // vertex count
			gl.UNSIGNED_SHORT, //type
			0 // offset
		);
	}
	addShader(vs, fs){
	}
}

export default Renderer;