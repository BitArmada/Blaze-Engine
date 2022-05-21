
class Shader{
    constructor(gl, vs, fs){
		//context
		this.gl = gl;

		// uniform and attrib objects
		this.attributes = {};
		this.uniforms = {};

		// sources
		this.vertexSource = vs;
		this.fragmentSource = fs;

		// create gl shaders
        this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        this.vertexShader = gl.createShader(gl.VERTEX_SHADER);

		//add shader source
		gl.shaderSource(this.fragmentShader, fs);
		gl.shaderSource(this.vertexShader, vs);

		//compile
        gl.compileShader(this.vertexShader);
        gl.compileShader(this.fragmentShader);

		// create program
		this.shaderProgram = gl.createProgram();

		// attach shaders
 	 	gl.attachShader(this.shaderProgram, this.vertexShader);
  		gl.attachShader(this.shaderProgram, this.fragmentShader);
		
		//link shaders
  		gl.linkProgram(this.shaderProgram);

		//report errors if there are any
		if (!gl.getShaderParameter(this.fragmentShader, gl.COMPILE_STATUS)) {
			console.log(gl.getShaderInfoLog(this.fragmentShader));
		}
		if (!gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS)) {
			console.log(gl.getShaderInfoLog(this.vertexShader));
		}

		this.getAttributes();
		this.getUniforms();

		console.log(this.uniforms);
    }
	getAttributes(){
		// get all atribute locations
		const count = this.gl.getProgramParameter(this.shaderProgram, this.gl.ACTIVE_ATTRIBUTES);

		for(var i = 0; i < count; i++){
			var attrib = this.gl.getActiveAttrib(this.shaderProgram, i);
			this.attributes[attrib.name] = attrib;
			this.attributes[attrib.name].location = i;
		}
	}
	getUniforms(){
		// get all atribute locations
		const count = this.gl.getProgramParameter(this.shaderProgram, this.gl.ACTIVE_UNIFORMS);

		for(var i = 0; i < count; i++){
			var uniform = this.gl.getActiveUniform(this.shaderProgram, i);
			this.uniforms[uniform.name] = uniform;
			this.uniforms[uniform.name].location = this.gl.getUniformLocation(this.shaderProgram, uniform.name);
		}
	}
	assignUniform(name, value){
		// find uniform
		var uniform = this.uniforms[name];

		if(uniform){
			switch(uniform.type){
				// float matrix
				case this.gl.FLOAT_MAT4:
					this.gl.uniformMatrix4fv(
						uniform.location,
						false,
						value
					);
					break;
				case this.gl.FLOAT_VEC3:
					this.gl.uniform3fv(
						uniform.location,
						((Array.isArray(value)) ? value : value.toArray())
					);
					break;
			}
		}else{
			console.error('invalid uniform (check spelling and usages)');
		}
	}
	assignAttribute(name, buffer){
		// find attribute
		var attribute = this.attributes[name];

		if(attribute){
			this.gl.vertexAttribPointer(
				attribute.location,
				3,
				this.gl.FLOAT,
				false,
				0,
				0
			);
		}else{
			console.error('invalid attribute '+name+' (check spelling and usages)');
		}
	}
}

export default Shader;