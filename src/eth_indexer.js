// import { getDB } from "./mongo_helper.js";

import { getDB } from "./mongo_helper.js";


export default class BlockReader {
  constructor(blockId,web3Instance,) {
    this.blockId = blockId;
    this.web3Instance = web3Instance;
  }

   saveBlock(){
    return new Promise( async (resolve,reject)=>{
        try {
            
            const block = await this.web3Instance.eth.getBlock(""+this.blockId);
            let blocksCollection = await  getDB().collection("blocks");
            this.transactions =  block.transactions;
            let result = await blocksCollection.insertOne(block);
             console.log(`New Block Added : ${result.insertedId}`);
             await this.saveTransactions();
            } catch (error) {
                return reject(error)
            }
            
            resolve(this.blockId)
        
    });
    
    
  }

  async loadTransaction(transactionId){
    const transaction =  await this.web3Instance.eth.getTransaction(transactionId);
    return transaction;
  }

  async saveTransactions(){
    let transactionsCollection = await getDB().collection("transactions");
    for (const transaction of this.transactions) {
        let result;
        try {
            let transactionObj = await this.loadTransaction(transaction);
             result = await transactionsCollection.insertOne(transactionObj);
             console.log(`New Transaction Added : ${result.insertedId}`);
        } catch (error) {
            console.error(error);
        }
    }
    return "Done"
  }
}
