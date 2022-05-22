import PhysicsSystem from "./PhysicsSystem.js";
import RenderSystem from "./RenderSystem.js";
import ScriptSystem from "./ScriptSystem.js";
import Components from "../components/Components.js";

class SystemManager {
    constructor(){
        //physics engine
        //this.physics = new PhysicsSystem();

        // must be assigned by user
        this.renderer;

        this.systems = {
            renderSystem:  new RenderSystem(),
            scriptSystem: new ScriptSystem(),
        };
    }

    start (entities) {
        //this.physics.start(entities);

        this.systems.renderSystem.renderer = this.renderer;

        // call system starts 
        for (const eID in entities) {
            const entity = entities[eID];

            for (const sID in this.systems) {
                const system = this.systems[sID];
                system.start(entity);
            }

        }
    }

    update (entities) {

		//render entities
        for (const eID in entities) {
            const entity = entities[eID];

            
            for (const sID in this.systems) {
                const system = this.systems[sID];
                
                // check if entity meets reqs
                const valid = meetsRequirements(system, entity)

                if(valid){

                    system.update(entity);

                    for (const cID in entity){
                        // if system contains a function for this component call it
                        if(system[cID]){
                            system[cID](entity);
                        }
                    }
                }
            }
        }

		//calculate entities
		// this.physics.update(entities);
    }
}

function meetsRequirements (system, entity) {
    for(var i = 0; i < system.requirements.length; i++) {
        const req = system.requirements[i];
        if(entity[req] == undefined){
            return false;
        }
    }
    return true;
}

export default SystemManager;