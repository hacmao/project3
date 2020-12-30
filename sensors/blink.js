const onoff = require("onoff");
const Web3 = require('web3');
const {verify, pushData} = require('./utils');
const sleep = require('sleep'); 

var Gpio = onoff.Gpio;
var led = new Gpio('26', 'out');  
var mqtt = require('mqtt'); 
var client = mqtt.connect("mqtt://0.0.0.0:1028"); 

client.on('connect', () => {
	client.subscribe("/pi/led_viewer", (err) => {
		if (err) throw err; 
		console.log("Client subscribe to led viewer.");
	});

	client.subscribe("/pi/led_controller", (err) => {
		console.log("Client subscribe to led controller."); 
	});

	client.subscribe("/pi/led_viewer_normal");
	client.subscribe("/pi/led_controller_normal");

	led.write(1); 
});




// set infinite loop to update led state 
var interval = setInterval(
	() => {
		 
	}
	, 2000);


// read mqtt message to control led 
client.on('message', (topic, message) => {
	console.log(topic, message.toString());
	if (topic === "/pi/led_controller") { 
		var msg = JSON.parse(message.toString());
		verify(message.toString()).then((res) => { 
			if (!res) {
				return;
			}
			var value = msg['value']; 
			if (value in [0, 1] && msg['sender'] == 'led_controller') {
				led.write(parseInt(value));
				var totalTime = Date.now() - msg['time']; 
				console.log("Time to receive : " + totalTime + 'ms');
				client.publish("/pi/led_viewer_res", totalTime + "");
			} 
		});
		sleep.usleep(100);

	} else if (topic === "/pi/led_viewer") {
		console.log("Reading led value ...");
		var msg = {'led' : '1', 'value' : ''};
		msg.value = led.readSync(); 
		msg['time'] = Date.now() - message; 
		client.publish('/pi/led_viewer_res', JSON.stringify(msg));		
		pushData(JSON.stringify(msg));  
		sleep.usleep(100);

	} else if (topic === "/pi/led_controller_normal") {
		var msg = JSON.parse(message.toString());
		var value = msg['value'];
		if (value in [0, 1]) {
			led.write(parseInt(value));
			var totalTime = Date.now() - msg['time']; 
			console.log("Time to receive : " + totalTime + 'ms');
			client.publish("/pi/led_viewer_res_normal", totalTime + "");

		} 
	} else if (topic === "/pi/led_viewer_normal") {
		console.log("Reading led value ...");
		var msg = {'led' : '1', 'value' : ''};
		msg.value = led.readSync(); 
		msg['time'] = Date.now() - message; 
		client.publish('/pi/led_viewer_res_normal', JSON.stringify(msg));			
	}

});



process.on("SIGINT", () => {
	led.write(0, console.log("End"));
	clearInterval(interval);
	led.unexport(); 
	client.end(); 
	process.exit(); 
});
