function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function httpPost(url, params) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", url, false);
	xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlHttp.send(params);
	return xmlHttp.responseText; 
}

function getLedStatus() {
	console.log("get led status");
	var url = location.origin + "/led_controller";
	var res = JSON.parse(httpGet(url));
	
	// set total time 
	var totalTime = res['time'];
	$("#result").html("Time to receive : " + totalTime + "ms");

	delete res['time'];
	$("#status").html(JSON.stringify(res, undefined, 2));
}

function setLed(value) {
	console.log(value); 
	var url = location.origin + "/led_controller";
	var param = {};
	param['sender'] = 'led_controller';
        param['time'] = Date.now();
        param['value'] = value;

	var res = httpPost(url, JSON.stringify(param));
	$("#result").html("Time to receive : " + res + "ms");
	
	// check led status 
	var url = location.origin + "/led_controller";
	var res = JSON.parse(httpGet(url));
	delete res['time'];
	$("#status").html(JSON.stringify(res, undefined, 2));

}

