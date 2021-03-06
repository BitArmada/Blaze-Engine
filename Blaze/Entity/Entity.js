class Entity{
	constructor(){
		this.id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16)+Entity.prototype._count;

		Entity.prototype._count++;
	}
	initScript(scriptComponent){
		var script = scriptComponent.script;
		//script.enitity = this;
		for( var componentName in this ){
			var component = this[componentName];
			script[componentName] = component;
		}
	}
}

Entity.prototype._count = 0;

Entity.prototype.add = function addComponent(component) {
	this[component.name] = component;
	return this;
};

Entity.prototype.addScript = function addScript(component){
	//initialize the script
	this.initScript(component);
	
	this[component.name] = component;

	component.script.start();
	return this;
}

Entity.prototype.remove = function removeComponen(componentName){
	var name = componentName;

	if (typeof componentName === 'function') {
		// get the name from the prototype of the passed component function
		name = componentName.prototype.name;
	}

	// Remove component data by removing the reference to it
    delete this[name];
    return this;
};

export default Entity;