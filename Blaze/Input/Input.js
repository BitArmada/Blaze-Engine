import Vector from '../Util/Vector.js';

class Input{
	// key maps
	keyEventMap = new Map();
	keys = {};

	// mouse
	mousePosition = new Vector();

	constructor(){

		// keyboard events
		document.addEventListener('keypress', this.keyEvent.bind(this), false);
		document.addEventListener("keydown", this.keyDown.bind(this));
		document.addEventListener("keyup", this.keyUp.bind(this));

		// mouse events
		document.addEventListener('mousemove', this.mouseMove.bind(this));
	}

	/** Mouse */

	mouseMove(event){
		this.mousePosition.x = event.clientX/window.innerWidth*2-1;
		this.mousePosition.y = event.clientY/window.innerHeight*2-1;
	}

	/** Keyboard */

	keyEvent(event){
		var name = event.key;
		var code = event.code;
		var charCode = event.charCode;

		if(this.keyEventMap.has(name)){
			var f = this.keyEventMap.get(name);
			f();
			return;
		}

		if(this.keyEventMap.has(code)){
			var f = this.keyEventMap.get(code);
			f();
			return;
		}

		if(this.keyEventMap.has(charCode)){
			var f = this.keyEventMap.get(charCode);
			f();
			return;
		}
	}

	keyDown(event){
		var name = event.key;
		var code = event.code;
		var charCode = event.charCode;
		this.keys[name] = true;
		this.keys[code] = true;
		this.keys[charCode] = true;
	}

	keyUp(event){
		var name = event.key;
		var code = event.code;
		var charCode = event.charCode;
		this.keys[name] = false;
		this.keys[code] = false;
		this.keys[charCode] = false;
	}

	keyPress(key, func){
		this.keyEventMap.set(key, func);
	}
}


export default Input;