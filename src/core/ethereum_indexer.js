import subscriptionManager, { SUB_EVENTS } from "./subscription_manager.js";
import web3_instance, { web3_helpers } from "../instances/web3_instance.js";
import { COLLECTIONS, insertOne } from "../instances/mongo_instance.js";

export default class EthereumIndexer {
  constructor({ startingBlock, liveIndexer }) {
    this.startingBlock = startingBlock;
    this.liveIndexer = liveIndexer;

    if (liveIndexer) {
      this.startLiveIndex();
    }
  }

  startLiveIndex() {
    subscriptionManager.subscribe(
      SUB_EVENTS.NEW_BLOCK_HEADERS,
      async (data) => {
        console.log("data", data);

        this.loadAndSaveBlock(data.number).catch(console.error);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  async stopLiveIndex() {
    await subscriptionManager.unsubscribe(SUB_EVENTS.NEW_BLOCK_HEADERS);
  }

  async loadAndSaveBlock(blockNumber) {
    const block = await web3_helpers.getBlockByNumber(blockNumber);
    const savedBlock = await this.saveBlock(block);
    console.log("Saved", savedBlock);
    const transactions = block.transactions;

    for (const transaction of transactions) {
      await this.loadTransaction(transaction, savedBlock.insertedId);
    }
    return savedBlock;
  }

  async loadTransaction(transactionId, savedBlockId) {
    const transaction = await web3_helpers.getTransactionById(transactionId);
    return await this.saveTransaction(transaction, savedBlockId);
  }

  async saveBlock(blockObj) {
    return await insertOne(COLLECTIONS.BLOCKS, blockObj);
  }

  async saveTransaction(transaction, savedBlockObjId) {
    transaction["blockId"] = { $ref: COLLECTIONS.BLOCKS, $id: savedBlockObjId };
    return await insertOne(COLLECTIONS.TRANSACTIONS, transaction);
  }
}
