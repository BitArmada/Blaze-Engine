import '../Util/cast.js';
import * as Blaze from '../blaze.js';

/**
 * loads a scene
 * @param (JSON String) game - the scene files you whant to load
 */
function loadScene(scene){
	//convert the JSON to a scene object
	return Blaze.Scene.cast(scene, Blaze.Scene);
}

export default loadScene;