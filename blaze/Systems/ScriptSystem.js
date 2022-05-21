function ScriptSystem(entities){
	//loop through entities
	for( var entityId in entities ){
		//the curent entity
        var entity = entities[entityId];

		//check if current entity has a script component
		if(entity.Script){
			var script = entity.Script.script;
			script.update();
		}
	}
}

export default ScriptSystem;