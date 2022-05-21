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
		]).array;

		this.normalMatrix = new Matrix4();
		
		//stores vertex positions
		this.positionBuffer = gl.createBuffer();
		//stores indice data
		this.indexBuffer = gl.createBuffer();
		//stores normal data
		this.normalBuffer = gl.createBuffer();

		// data
		this.vertices = [
	// 0.600000, 0.300000, -1.700000,
	// 0.600000, 0.100000, -1.800000,
	// 0.600000, 0.300000, -1.600000,
	// 0.600000, 0.100000, -0.800000,
	// 0.600000, 0.200000, -0.800000,
	// 0.500000, 0.300000, -0.800000,
	// 0.500000, 0.100000, -0.800000,
	// 0.500000, 0.200000, -0.000000,
	// 0.500000, 0.100000, -1.800000,
	// 0.500000, 0.300000, -1.800000,
	// 1.000000, 0.200000, -1.800000,
	// 1.000000, 0.200000, -1.800000,
	// 1.000000, 0.200000, -1.400000,
	// 1.000000, 0.200000, -1.400000,
	// 1.000000, 0.200000, -1.400000,
	// 0.600000, 0.300000, -1.800000,
	// 0.600000, 0.300000, -0.800000,
	// 0.500000, 0.300000, -1.700000,
	// 0.500000, 0.300000, -1.600000,
	// 0.700000, 0.500000, -1.900000,
	// 0.700000, 0.500000, -1.800000,
	// 0.700000, 0.500000, -1.900000,
	// 0.700000, 0.500000, -1.800000,
	// 0.400000, 0.300000, -1.700000,
	// 0.400000, 0.100000, -1.800000,
	// 0.400000, 0.300000, -1.600000,
	// 0.400000, 0.100000, -0.800000,
	// 0.400000, 0.200000, -0.800000,
	// 0.000000, 0.200000, -1.800000,
	// 0.000000, 0.200000, -1.800000,
	// 0.000000, 0.200000, -1.400000,
	// 0.000000, 0.200000, -1.400000,
	// 0.000000, 0.200000, -1.400000,
	// 0.400000, 0.300000, -1.800000,
	// 0.400000, 0.300000, -0.800000,
	// 0.500000, 0.300000, -1.700000,
	// 0.500000, 0.300000, -1.600000,
	// 0.300000, 0.500000, -1.900000,
	// 0.300000, 0.500000, -1.800000,
	// 0.300000, 0.500000, -1.900000,
	// 0.300000, 0.500000, -1.800000,
// Front face
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
		
		this.initData();
	}
	initData(){
		const gl = Renderer.gl;
		//bind
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		// put our data into the buffer
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array(this.vertices),
			gl.STATIC_DRAW
		);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

		this.vertexCount = this.indices.length;

		// put indices into buffer
		gl.bufferData(
			gl.ELEMENT_ARRAY_BUFFER,
			new Uint16Array(this.indices),
			gl.STATIC_DRAW
		);
		// bind normals
		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
		//put verticies into buffer
		gl.bufferData(
			gl.ARRAY_BUFFER, 
			new Float32Array(this.normals),
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
	static loadObj(text){
		var mesh = new Mesh();
		mesh.indices = [];
		mesh.vertices = [];
		mesh.normals = [];
		
		var lines = text.split('\n');
		for(var i = 0; i < lines.length; i++){
			if(lines[i].startsWith('#')){
				continue;
			}else if(lines[i].startsWith('v ')){
				var v = lines[i].split(' ');
				mesh.vertices.push(parseFloat(v[1]));
				mesh.vertices.push(parseFloat(v[2]));
				mesh.vertices.push(parseFloat(v[3]));
			}else if(lines[i].startsWith('vn ')){
				var v = lines[i].split(' ');
				mesh.normals.push(parseFloat(v[1]));
				mesh.normals.push(parseFloat(v[2]));
				mesh.normals.push(parseFloat(v[3]));
			}
			else if(lines[i].startsWith('f ')){
				var v = lines[i].split(' ');
				mesh.indices.push(parseFloat(v[1].split('/')[0])-1);
				mesh.indices.push(parseFloat(v[2].split('/')[0])-1);
				mesh.indices.push(parseFloat(v[3].split('/')[0])-1);
			}
		}

		mesh.initData();

		console.log(mesh)

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