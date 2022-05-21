Object.prototype.cast = function cast(json, con)
{
	var rawObj = JSON.parse(json);
    var obj = new con();
    for(var i in rawObj)
        obj[i] = rawObj[i];
    return obj;
}