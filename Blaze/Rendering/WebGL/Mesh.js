import Matrix4 from '../../Util/Matrix4.js';
import Vector from '../../Util/Vector.js';
import Renderer from './Renderer.js';

class Mesh{
	constructor(){
		const gl = Renderer.gl;
		//model view matrix
		this.transform = new Matrix4([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		]);

		this.normalMatrix = new Matrix4();
		
		//stores vertex positions
		this.positionBuffer = gl.createBuffer();
		//stores indice data
		this.indexBuffer = gl.createBuffer();
		//stores normal data
		this.normalBuffer = gl.createBuffer();

		this.textureCoordBuffer = gl.createBuffer();

		// data
		this.vertices = [
			// Front face
			-1.0, -1.0,  1.0,
			1.0, -1.0,  1.0,
			1.0,  1.0,  1.0,
			-1.0,  1.0,  1.0,

			// Back face
			-1.0, -1.0, -1.0,
			-1.0,  1.0, -1.0,
			1.0,  1.0, -1.0,
			1.0, -1.0, -1.0,

			// Top face
			-1.0,  1.0, -1.0,
			-1.0,  1.0,  1.0,
			1.0,  1.0,  1.0,
			1.0,  1.0, -1.0,

			// Bottom face
			-1.0, -1.0, -1.0,
			1.0, -1.0, -1.0,
			1.0, -1.0,  1.0,
			-1.0, -1.0,  1.0,

			// Right face
			1.0, -1.0, -1.0,
			1.0,  1.0, -1.0,
			1.0,  1.0,  1.0,
			1.0, -1.0,  1.0,

			// Left face
			-1.0, -1.0, -1.0,
			-1.0, -1.0,  1.0,
			-1.0,  1.0,  1.0,
			-1.0,  1.0, -1.0,
		];

		this.indices = [
			0,  1,  2,      0,  2,  3,    // front
			4,  5,  6,      4,  6,  7,    // back
			8,  9,  10,     8,  10, 11,   // top
			12, 13, 14,     12, 14, 15,   // bottom
			16, 17, 18,     16, 18, 19,   // right
			20, 21, 22,     20, 22, 23,   // left
		];

		this.normals = [
			// Front
			0.0,  0.0,  1.0,
			0.0,  0.0,  1.0,
			0.0,  0.0,  1.0,
			0.0,  0.0,  1.0,

			// Back
			0.0,  0.0, -1.0,
			0.0,  0.0, -1.0,
			0.0,  0.0, -1.0,
			0.0,  0.0, -1.0,

			// Top
			0.0,  1.0,  0.0,
			0.0,  1.0,  0.0,
			0.0,  1.0,  0.0,
			0.0,  1.0,  0.0,

			// Bottom
			0.0, -1.0,  0.0,
			0.0, -1.0,  0.0,
			0.0, -1.0,  0.0,
			0.0, -1.0,  0.0,

			// Right
			1.0,  0.0,  0.0,
			1.0,  0.0,  0.0,
			1.0,  0.0,  0.0,
			1.0,  0.0,  0.0,

			// Left
			-1.0,  0.0,  0.0,
			-1.0,  0.0,  0.0,
			-1.0,  0.0,  0.0,
			-1.0,  0.0,  0.0
		];

		this.textureCoordinates = [
			// Front
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			// Back
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			// Top
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			// Bottom
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			// Right
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			// Left
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
		];
		
		this.initData();
	}
	initData(){
		const gl = Renderer.gl;

		// VERTICES
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array(this.vertices),
			gl.STATIC_DRAW
		);

		// INDICES
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

		this.vertexCount = this.indices.length;

		gl.bufferData(
			gl.ELEMENT_ARRAY_BUFFER,
			new Uint16Array(this.indices),
			gl.STATIC_DRAW
		);


		// NORMALS
		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);

		gl.bufferData(
			gl.ARRAY_BUFFER, 
			new Float32Array(this.normals),
			gl.STATIC_DRAW
		);

		// TEXTURE COORDS
		gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);

		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array(this.textureCoordinates),
            gl.STATIC_DRAW
		);
	}

	containsVertex(vector){
		var child = [vector.x, vector.y, vector.z]
		var parStr = JSON.stringify(this.vertices);
		var childStr = JSON.stringify(child).replace('[', '').replace(']', '');
		return parStr.indexOf(childStr);
	}

	getVertexIndex(vertex){
		var v = [vertex.x, vertex.y, vertex.z];
		var indexes = [];
		indexes = this.vertices.flatMap((value, i) => (value === v[0] && i%3 == 0) ? i : []);//this.vertices.indexOf(v[0]);
		var count = 0;
		for(var x = 0; x < indexes.length; x++){
			for(var i = 0; i < v.length; i++){
				if(this.vertices[i+(indexes[x])] == v[i]){
					count++;
					if(count == 3){
						return indexes[x]/3;
					}
					continue;
				}else{
					count = 0;
				}
			}
		}
		return -1;
	}
	getAllVertexInstances(vertex){
		var v = [vertex.x, vertex.y, vertex.z];
		var out = [];
		for(var x = 0; x < this.vertices.length; x+=3){
			if(
				this.indices[x] == v[0] &&
				this.indices[x+1] == v[1] &&
				this.indices[x+2] == v[2]
			  ){
				out.push(this.indices[x]/3)
			}
		}
		return out;
	}
	addNormal(a,b,c){
		var n = Vector.cross(Vector.subtract(b,a), Vector.subtract(c, a));
		//n.normalize();
		// n.absolute();
		this.normals.push(n.x);
		this.normals.push(n.y);
		this.normals.push(n.z);
	}
	calculateVertexNormal(v){
		this.getVertexIndex(a);
	}
	calculateFaceNormal(){
		var n = Vector.cross(Vector.subtract(b,a), Vector.subtract(c, a));
		return n;
	}
	addVertex(vector){
		this.vertices.push(vector.x);
		this.vertices.push(vector.y);
		this.vertices.push(vector.z);
	}
	addFace(a, b, c){
		//a
		// var v = this.getVertexIndex(a);
		// if(v >= 0){
		// 	this.indices.push(v);
		// }else{
		// 	this.addVertex(a);
		// 	this.addNormal(a, b, c);
		// 	this.indices.push((this.vertices.length/3)-1);
		// }
		this.addVertex(a);
		this.addNormal(a, b, c);
		this.indices.push((this.vertices.length/3)-1);

		//b
		// v = this.getVertexIndex(b);
		// if(v >= 0){
		// 	this.indices.push(v);
		// }else{
		// 	this.addVertex(b);
		// 	this.addNormal(a, b, c);
		// 	this.indices.push((this.vertices.length/3)-1);
		// }
		this.addVertex(b);
		this.addNormal(a, b, c);
		this.indices.push((this.vertices.length/3)-1);

		//c
		// v = this.getVertexIndex(c);
		// if(v >= 0){
		// 	this.indices.push(v);
		// }else{
		// 	this.addVertex(c);
		// 	this.addNormal(a, b, c);
		// 	this.indices.push((this.vertices.length/3)-1);
		// }
		this.addVertex(c);
		this.addNormal(a, b, c);
		this.indices.push((this.vertices.length/3)-1);
	}
	getVertices(vertices, indices, face){
		return [
			new Vector(
				vertices[indices[face]*3],
				vertices[(indices[face])*3+1],
				vertices[(indices[face])*3+2],
			),
			new Vector(
				vertices[indices[face+1]*3],
				vertices[(indices[face+1])*3+1],
				vertices[(indices[face+1])*3+2],
			),
			new Vector(
				vertices[indices[face+2]*3],
				vertices[(indices[face+2])*3+1],
				vertices[(indices[face+2])*3+2],
			)
		];
	}
	subdivide(){
		var oldFaces = [...this.indices];
		var oldVertices = [...this.vertices];
		this.indices = [];
		this.vertices = [];
		this.normals = [];
		
		for(var i = 0; i < oldFaces.length; i+=3){
			var [p1,p2,p3] = this.getVertices(oldVertices, oldFaces, i);
			var p1p2 = Vector.getMiddlePoint(p1, p2);
			var p1p3 = Vector.getMiddlePoint(p1, p3);
			var p2p3 = Vector.getMiddlePoint(p2, p3);
			this.addFace(p1,p1p2,p1p3);
			this.addFace(p2,p1p2,p2p3);
			this.addFace(p3,p1p3,p2p3);
			this.addFace(p1p2,p1p3,p2p3);
		}
	}
	subdivideNormalize(){
		var oldFaces = [...this.indices];
		var oldVertices = [...this.vertices];
		this.indices = [];
		this.vertices = [];
		this.normals = [];
		
		for(var i = 0; i < oldFaces.length; i+=3){
			var [p1,p2,p3] = this.getVertices(oldVertices, oldFaces, i);
			var p1p2 = Vector.getMiddlePoint(p1, p2);
			var p1p3 = Vector.getMiddlePoint(p1, p3);
			var p2p3 = Vector.getMiddlePoint(p2, p3);
			p1.normalize();
			p2.normalize();
			p3.normalize();
			p1p2.normalize();
			p1p3.normalize();
			p2p3.normalize();
			this.addFace(p1,p1p2,p1p3);
			this.addFace(p2,p1p2,p2p3);
			this.addFace(p3,p1p3,p2p3);
			this.addFace(p1p2,p1p3,p2p3);
			//this.addFace(p1,p2,p3);
		}
	}

	/**
	 * creates OBJ file from mesh
	 * @param { Mesh } mesh
	 * @returns { String } OBJ data
	 */
	static createObj ( mesh ) {

		// top of file
		var output = 
`# blaze OBJ
o mesh`;

		// vertices
		for(var i = 0; i < mesh.vertices.length/3; i++){
			const x = i*3;
			output += `\nv ${mesh.vertices[x]} ${mesh.vertices[x+1]} ${mesh.vertices[x+2]}`;
		}

		// texture coords
		for(var i = 0; i < mesh.textureCoordinates.length/2; i++){
			const x = i*2;
			output += `\nvt ${mesh.textureCoordinates[x]} ${mesh.textureCoordinates[x+1]}`;
		}

		// normals
		for(var i = 0; i < mesh.normals.length/3; i++){
			const x = i*3;
			output += `\nvn ${mesh.normals[x]} ${mesh.normals[x+1]} ${mesh.normals[x+2]}`;
		}

		// faces
		for(var i = 0; i < mesh.indices.length/3; i++){
			const x = i*3;
			output += `\nf ${mesh.indices[x]+1}/${mesh.indices[x]+1}/${mesh.indices[x]+1} ${mesh.indices[x+1]+1}/${mesh.indices[x+1]+1}/${mesh.indices[x+1]+1} ${mesh.indices[x+2]+1}/${mesh.indices[x+2]+1}/${mesh.indices[x+2]+1}`;
		}

		return output;
	}

	/**
	 * loads OBJ file with triangulated vertices given a string containing OBJ data
	 * @param {String} text 
	 * @returns {Mesh}
	 */
	static loadObj(mesh, text){
		mesh.indices = [];
		mesh.vertices = [];
		mesh.normals = [];
		mesh.textureCoordinates = [];

		// store variables here for later use
		var vertices = [];
		var textureCoordinates = [];
		var normals = [];
		var indexes = [];

		var index = 0;
		
		var lines = text.split('\n');
		for(var i = 0; i < lines.length; i++){
			
			if(lines[i].startsWith('#')){
				continue;
			}

			else if(lines[i].startsWith('v ')){

				var v = lines[i].split(' ');
				vertices.push(parseFloat(v[1]));
				vertices.push(parseFloat(v[2]));
				vertices.push(parseFloat(v[3]));

			}
			
			else if(lines[i].startsWith('vn ')){

				var v = lines[i].split(' ');
				normals.push(parseFloat(v[1]));
				normals.push(parseFloat(v[2]));
				normals.push(parseFloat(v[3]));

			}

			else if(lines[i].startsWith('vt ')){

				var v = lines[i].split(' ');
				textureCoordinates.push(parseFloat(v[1]));
				textureCoordinates.push(parseFloat(v[2]));

			}
			
			else if( lines[i].startsWith('f ') ){

				var l = lines[i].split(' ');
				l.shift();

				l.forEach((vert)=>{

					
					// get data for this vertex
					const data = vert.split('/');
					
					// add index to the indecies list
					mesh.indices.push(index);
					
					// vertex data
					const v = (parseFloat(data[0])-1)*3;
					mesh.vertices.push(vertices[v]);
					mesh.vertices.push(vertices[v+1]);
					mesh.vertices.push(vertices[v+2]);

					// texture coordinate data
					const vt = (parseFloat(data[1])-1)*2;
					mesh.textureCoordinates.push(textureCoordinates[vt]);
					mesh.textureCoordinates.push(textureCoordinates[vt+1]);
					
					// normal data
					const n = (parseFloat(data[2])-1)*3;
					mesh.normals.push(normals[n]);
					mesh.normals.push(normals[n+1]);
					mesh.normals.push(normals[n+2]);


					// increment index
					index++;

				});
			}
		}

		mesh.initData();

		return mesh;
	}
	static Sphere(){
		var mesh = new Mesh();
		// mesh.indices = [];
		// mesh.vertices = [];
		// mesh.normals = [];
		// mesh.subdivideNormalize();
		// mesh.subdivideNormalize();
		mesh.subdivide();
		mesh.subdivide();
		// mesh.subdivide();
		// mesh.subdivide();
		// mesh.addFace(
		// 	new Vector(0, 0, 0),
		// 	new Vector(0, 0, 1),
		// 	new Vector(0, 1, 0),
		// );
		// mesh.addFace(
		// 	new Vector(0, 0, 0),
		// 	new Vector(1, 0, 0),
		// 	new Vector(0, 1, 0),
		// );
		mesh.initData();

		return mesh;
	}
}

export default Mesh;