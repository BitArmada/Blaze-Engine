// stores witch funcitons to call for each key
var keyEventMap = new Map();
var keys = {};

document.addEventListener('keypress', (event) => {
	var name = event.key;
  	var code = event.code;
  	var charCode = event.charCode;

  	if(keyEventMap.has(name)){
	  	var f = keyEventMap.get(name);
	  	f();
	  	return;
  	}

  	if(keyEventMap.has(code)){
	  	var f = keyEventMap.get(code);
	  	f();
	  	return;
  	}

  	if(keyEventMap.has(charCode)){
	  	var f = keyEventMap.get(charCode);
	  	f();
	  	return;
  	}
}, false);

document.addEventListener("keydown", keyDown);
function keyDown(event){
	var name = event.key;
  	var code = event.code;
  	var charCode = event.charCode;
	keys[name] = true;
	keys[code] = true;
	keys[charCode] = true;
}
document.addEventListener("keyup", keyUp);
function keyUp(event){
	var name = event.key;
  	var code = event.code;
  	var charCode = event.charCode;
	keys[name] = false;
	keys[code] = false;
	keys[charCode] = false;
}

function keyPress(key, func){
	keyEventMap.set(key, func);
}

function getKey(){
	
}

export {keyPress, keys};