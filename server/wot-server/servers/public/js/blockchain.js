web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.43.8:7545"));
var admin;
web3.eth.getAccounts().then((res) => {
    admin = res[0];
    console.log(admin);
});


abi = JSON.parse('[{"inputs":[{"internalType":"string","name":"hash","type":"string"},{"internalType":"uint256","name":"currentTime","type":"uint256"}],"name":"pushData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"hash","type":"string"}],"name":"verify","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]');

contract = new web3.eth.Contract(abi);
contract.options.address = "0x86a93b1830b96d45d18837a5a722306F29d41667";

async function verify(hash) {
    var res = await contract.methods.verify(hash).call();
    var res_json = {};
    if (res != 0) {
        var date = new Date(null);
        date.setMilliseconds(res);
        res_json['time'] = date.toLocaleString();
        $("#result").html("Valid hash<br>" + JSON.stringify(res_json, undefined, 2));
    } else {
        $("#result").html("Invalid hash!");
    }
}

function hashVerify() {
    var hash = $("#hash").val();
    verify(hash);

    // clear msg check 
    document.getElementById("msg").value = "";
}

function msgVerify() {
    var msg = $("#msg").val();
    var hash = md5(msg);
    verify(hash);
    document.getElementById("hash").value = "";

}

$(document).ready(function() {});