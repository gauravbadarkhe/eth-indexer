import { getDB } from "./mongo_helper";

const { default: Web3, HttpProvider } = require("web3");

export default class BlockReader {
  constructor(blockId,web3Instance,) {
    this.blockId = blockId;
    this.web3Instance = web3Instance;
  }

  async saveBlock(){
    
    const block = await web3.eth.getBlock(""+this.blockId);
    let blocksCollection = await  getDB().collection("blocks");
    this.transactions =  block.transactions;
    let result = await blocksCollection.insertOne(block);
    await this.saveTransactions();
  }

  async loadTransaction(transactionId){
    const transaction =  await web3.eth.getTransaction(transactionId);
    //Clean & Presist
    return transaction;
  }

  async saveTransactions(){

    for (const transaction of this.transactions) {
        
        let transactionObj = await this.loadTransaction(transaction);
    }

  }
}
