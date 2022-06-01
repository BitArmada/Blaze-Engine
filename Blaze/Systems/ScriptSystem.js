import System from '../Systems/System.js';

class ScriptSystem extends System{
	requirements = [
		'Script',
	];

	start () {

	}

	update () {

	}

	Script(entity){
		var script = entity.Script.script;
		script.update();
	}
}

export default ScriptSystem;