var http = require('http');
 
var server = http.createServer(function (request, response) {
   response.writeHead(200, {"Content-Type":"text/plain"});
   response.end ("Hello World!n");
   console.log("Got a connection");
});
 
server.listen(80, "2405:201:1004:81cf:5d17:f10c:2043:d2a2");
 
console.log("Server running on localhost at port 80");

// // const Web3 = require('web3');


// const { default: Web3, HttpProvider } = require("web3");
// // const ganache = require("ganache");
// // const provider = ganache.provider({})



// const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

// tt()
// async function tt(){
    
//     console.log(web3.accountProvider.create());
//     // const accounts = await provider.request({ method: "eth_accounts", params: [] });
// // console.log(web3.eth.accounts);
// }// Request
// // curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' http://127.0.0.1:8551
// // curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'  127.0.0.1:8545
// // test()

// async function test(){

 
// var myAddr = '0x52C30eC210652D87C715987302782abd85ED43f5';
// var currentBlock = web3.eth.blockNumber;
// var n = await web3.eth.getTransactionCount(myAddr, currentBlock);
// var bal =await web3.eth.getBalance(myAddr);
// console.log(currentBlock,bal);
// for (var i = currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
// 	try {
// 		var block = eth.getBlock(i, true);
// 		if (block && block.transactions) {{
// 			block.transactions.forEach(function(e) {
// 				if (myAddr == e.from) {
// 					if (e.from != e.to) {
// 						bal = bal.plus(e.value);
// 						console.log(i, e.from, e.to, e.value.toString(10));
// 						--n;
// 					}
// 					if(myAddr = e.to) {
// 						if (e.from != e.to) 
// 							bal = bal.minus(e.value);
// 							console.log(i, e.from, e.to, e.value.toString(10));
// 					}
// 				}
// 			});
// 		}}
// 	} catch(e) {
// 		console.error("Error for block " + i, e);
// 	}
// }
// }