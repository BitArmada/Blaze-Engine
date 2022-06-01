
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
    setFromAxisAngle( axis, angle ) {
		const halfAngle = angle / 2, s = Math.sin( halfAngle );

		this.x = axis.x * s;
		this.y = axis.y * s;
		this.z = axis.z * s;
		this.w = Math.cos( halfAngle );

		//this._onChangeCallback();

		return this;

	}
}

export default Quaternion;