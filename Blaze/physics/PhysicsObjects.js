
class BoxPhysics{
	constructor(pos, size, isStatic){
		this.body = Matter.Bodies.rectangle(pos.x, pos.y, size.x, size.y, { isStatic });
	}
}

class CirclePhysics{
	constructor(pos, size, isStatic){
		if(size.x){
			size = size.x;
		}
		this.body = Matter.Bodies.circle(pos.x, pos.y, size, { isStatic });
	}
}

export {BoxPhysics, CirclePhysics};