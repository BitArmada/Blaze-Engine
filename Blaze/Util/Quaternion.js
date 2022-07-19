import Vector from './Vector.js';

class Quaternion {
    constructor(x = 0, y = 0, z = 0, w = 1){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    get array(){
        return this.toArray();
    }

    toArray(){
        return [this.x, this.y, this.z, this.w]
    }

    magnitude(){
        return Math.sqrt(
            (this.x*this.x)+
            (this.y*this.y)+
            (this.z*this.z)+
            (this.w*this.w)
        );
    }

    normalize(){
        var magnitude = this.magnitude();
        this.x /= magnitude;
        this.y /= magnitude;
        this.z /= magnitude;
        this.w /= magnitude;

        return this;
    }

    setFromAxisAngle( axis, angle ) {
		const halfAngle = angle / 2, s = Math.sin( halfAngle );

		this.x = axis.x * s;
		this.y = axis.y * s;
		this.z = axis.z * s;
		this.w = Math.cos( halfAngle );

		//this._onChangeCallback();

		return this;

	}

    // resource for this function
    //http://lolengine.net/blog/2013/09/18/beautiful-maths-quaternion-from-vectors
    fromUnitVectors(u, v){
        var w = Vector.cross(u, v);
        this.w = 1 + Vector.dot(u, v);
        this.x = w.x;
        this.y = w.y;
        this.z = w.z;
        this.normalize();
        return this;
    }
}

export default Quaternion;