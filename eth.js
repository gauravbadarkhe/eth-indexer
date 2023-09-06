// require('dotenv').config();
// const { ObjectId } = require('mongodb');
 
// const mongo_helper = require('./src/mongo_helper');
// const { default: Web3, HttpProvider } = require("web3");
// const startBlock = 18069973;
// const limit =10;
// mongo_helper.connect()
// .then(connection=>{
//     return new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/2c1e7c210e064ad88c97474ecd3e1a40'));
// })
// .then(async web3=>{

//     // new BlockReader(startBlock)

//     const block = await web3.eth.getBlock(""+startBlock);
//     const transactions = block.transactions;
//     const transaction =  await web3.eth.getTransaction(transactions[0])

//     let blocksCollection = await mongo_helper.getDB().collection("blocks");
//     let result = await blocksCollection.insertOne(block);
//     console.log("Block",result);
//     const query = { _id: result.insertedId};
//     const updates = {
//         $push: { transaction_objects:transaction}
//       };
//     let result2 = await blocksCollection.updateOne(query, updates);
//     console.log("BlockTransactions",result2);
//     mongo_helper.closeDB()
//     return result;
// })
// .then(console.log)
// .catch(console.dir)



const { default: Web3, HttpProvider } = require("web3");
// const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/2c1e7c210e064ad88c97474ecd3e1a40'));
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/2c1e7c210e064ad88c97474ecd3e1a40'));

tt()
async function tt(){
    const block = await web3.eth.getBlock("18069973");
    const transactions = block.transactions;
    const transaction =  await web3.eth.getTransaction(transactions[0])

    // console.log(transactions[0]);
    console.log(transaction);
    // const accounts = await provider.request({ method: "eth_accounts", params: [] });
// console.log(web3.eth.accounts);
}// Request
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