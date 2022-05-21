import Physics from "./Physics.js";
import Render from "./Render.js";
import ScriptSystem from "./ScriptSystem.js";

class SystemManager {
    constructor(){
        //physics engine
        this.physics = new Physics();

        // must be assigned by user
        this.renderer;
    }

    start (entities) {
        this.physics.start(entities);
    }

    update (entities) {
        //run ScriptSystem
		ScriptSystem(entities);

		//render entities
		Render(entities, this.renderer);

		//calculate entities
		this.physics.update(entities);
    }
}

export default SystemManager;