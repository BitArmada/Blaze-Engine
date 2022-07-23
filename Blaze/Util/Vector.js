class Vector{
	constructor(x, y, z){
		this.x = x ?? 0;
		this.y = y ?? 0;
		this.z = z ?? 0;
	}
	get array(){
		return this.toArray();
	}
	add(vector, y){
		if(vector.constructor == this.constructor){
			this.x += vector.x;
			this.y += vector.y;
			this.z += vector.z;
		}
		return this;
	}
	multiply(vector, y, z){
		if(vector.constructor == this.constructor){
			//multiply vector
			this.x *= vector.x;
			this.y *= vector.y;
			this.z *= vector.z;
		}else if(!y){
			// multiply scalar
			this.x *= vector;
			this.y *= vector;
      		this.z *= vector;
		}else{
			//multiply by x y z
			this.x *= vector;
			this.y *= y;
			this.z *= z;
		}
	}
	toArray(){
		return [this.x, this.y, this.z]
	}
	zero(){
		this.x = 0;
		this.y = 0;
    	this.z = 0;
	}
	scale(value){
		this.x *= value;
		this.y *= value;
		this.z *= value;
		return this;
	}
	magnitude(){
		return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	}
	normalize(){
		this.scale(1/this.magnitude());
		return this;
	}
	invert(){
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		return this
	}
	absolute(){
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		this.z = Math.abs(this.z);
		return this;
	}
	static cross(a, b){
		var n = new Vector(
			(a.y*b.z)-(a.z*b.y),
			(a.z*b.x)-(a.x*b.z),
			(a.x*b.y)-(a.y*b.x)
		);
		return n;
	}
	static dot(a, b) {
		return (a.x*b.x)+(a.y*b.y)+(a.z*b.z);
	}
	static getMiddlePoint(a, b){
		var v = new Vector(a.x-b.x, a.y-b.y, a.z-b.z);
		v.scale(0.5);
		v.add(b);
		return v;
	}
	static subtract(a, b){
		var v = new Vector(
			a.x-b.x,
			a.y-b.y,
			a.z-b.z,
		);
		return v;
	}
	static multiply(vec1, vec2){
		var out = new Vector();
		if(vec2.constructor == this.constructor){
			out.x = vec1.x*vec2.x;
			out.y = vec1.y*vec2.y;
			out.z = vec1.y*vec2.z;
		}else{
			out.x = vec1.x*vec2;
			out.y = vec1.y*vec2;
			out.z = vec1.z*vec2;
		}
		return out;
	}
	static add(vec1, vec2){
		var out = new Vector(vec1.x+vec2.x, vec1.y+vec2.y, vec1.z+vec2.z);

		return out;
	}
	static scale(vec, value){
		return new Vector(
			vec.x*value,
			vec.y*value,
			vec.z*value,
		);
	}
	static normalize(vec){
		var m = vec.magnitude();
		return new Vector(
			vec.x/m,
			vec.y/m,
			vec.z/m,
		);
	}
}

export default Vector;