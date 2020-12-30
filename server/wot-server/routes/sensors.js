var express = require("express");
var router = express.Router();
var mqtt = require('mqtt');
var bodyParser = require('body-parser'); 
var sleep = require('sleep');
const {pushData} = require("./utils");

router.use(bodyParser.json()); 

var client = mqtt.connect("mqtt://0.0.0.0:1028")
var msg = {
	"led" : "",
	"dht11" : "" 
} 

client.on('connect', () => {
	console.log('Connected to brocker');
	client.subscribe("/pi/led_viewer_res", (err) => {
		if (err) throw err; 
	});

	client.subscribe("/pi/led_viewer_res_normal");

	client.subscribe("/pi/dht11", (err) => {
		if (err) throw err; 
	});

});

client.on('message', (topic, message) => {
	var message = message.toString(); 
	switch(topic) {
		case "/pi/led_viewer_res" :
			msg.led = message; 
			break;
		case "/pi/led_viewer_res_normal" :
			msg.led = message;
			break;
		case "/pi/dht11" : 
			msg.dht11 = message;
			break; 
		default : 
			console.log(message); 
	}
});

router.route("/").get(function(req, res, next) {
	res.sendFile(__dirname + "/blockchain.html"); 
});

router.route("/led").get(function(req, res, next) {
	res.sendFile(__dirname + "/led.html");
});

// router with blockchain 
router.route("/led_controller").get(function(req, res, next) {
	console.log("sending read command to led ...");
	client.publish("/pi/led_viewer", Date.now() + ""); 
	//sleep.usleep(100); 
	var resInterval = setInterval(function() {
		if (msg.led != '') {
			res.send(msg.led);
			clearInterval(resInterval);
		}
		msg.led = '';
	}, 100); 
});

router.route("/led_controller").post(function(req, res, next) {
	var publish_msg = JSON.stringify(req.body); 
	// console.log(req.body);
	if (req.body.value in [0, 1]) { 
		pushData(publish_msg);
		client.publish("/pi/led_controller", publish_msg); 
		//res.send(`Setting led to ${req.body.value}`);  
		var resInterval = setInterval(function() {
			if (msg.led != '') {
				res.send(msg.led);
				clearInterval(resInterval);
			}
			msg.led = '';
		}, 100);

	}
});

// router without blockchain 
router.route("/led_normal").get(function(req, res, next) {
	res.sendFile(__dirname + "/led_normal.html");
});

router.route("/led_controller_normal").get(function(req, res, next) {
	console.log("sending read command to led ...");
	client.publish("/pi/led_viewer_normal", Date.now() + ""); 
	//sleep.usleep(100); 
	var resInterval = setInterval(function() {
		if (msg.led != '') {
			res.send(msg.led);
			clearInterval(resInterval);
		}
		msg.led = '';
	}, 100); 
});

router.route("/led_controller_normal").post(function(req, res, next) {
	var publish_msg = JSON.stringify(req.body); 
	// console.log(req.body);
	if (req.body.value in [0, 1]) { 
		client.publish("/pi/led_controller_normal", publish_msg); 
		//res.send(`Setting led to ${req.body.value}`);  
		var resInterval = setInterval(function() {
			if (msg.led != '') {
				res.send(msg.led);
				clearInterval(resInterval);
			}
			msg.led = '';
		}, 100);

	}
});

process.on('SIGINIT', (err) => {
	client.end(); 
	process.exit();
});;

module.exports = router;

