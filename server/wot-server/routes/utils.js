const Web3 = require('web3');
const md5 = require('md5'); 
const sleep = require('sleep');

IP = '192.168.43.8'
var web3 = new Web3(new Web3.providers.HttpProvider("http://" + IP + ":7545"));
var admin ;
async function getAdmin() {
	accounts = await web3.eth.getAccounts();
	return accounts[0];
}

abi = JSON.parse('[{"inputs":[{"internalType":"string","name":"hash","type":"string"},{"internalType":"uint256","name":"currentTime","type":"uint256"}],"name":"pushData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"hash","type":"string"}],"name":"verify","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]');

contract = new web3.eth.Contract(abi);
contract.options.address = "0x86a93b1830b96d45d18837a5a722306F29d41667";


async function verify(msg) {
	admin = await getAdmin();
	var hash = md5(msg);
	var msg_json = JSON.parse(msg);
	sleep.msleep(100);
	var res = await contract.methods.verify(hash).call({from : admin});
	if (res == msg_json['time']) {
		console.log('Verify success');
		return 1;
	} else {
		console.log('Verify failed'); 
		return 0; 
	}
}

async function pushData(msg) {
	admin = await getAdmin(); 
	var msg_json = JSON.parse(msg);
	var hash = md5(msg);
	var time = msg_json['time'];
	
	console.log("Message : " + msg);
	console.log("Hash : " + hash);
	contract.methods.pushData(hash, time).send({from : admin}).catch((err) => {
		console.log(err); 
	}); 
	console.log("Push data to blockchain successful!");
}


module.exports = {
	verify,
	pushData
}
