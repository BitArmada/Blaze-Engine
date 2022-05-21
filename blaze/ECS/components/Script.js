import Vector from '../../Util/Vector.js';


function Script (script) {
	
	this.script = script;

	if(this.script == null){
		//script is not defined
		throw 'no script object provided';
	}

	return this;
}

Script.prototype.name = 'Script';

export default Script;