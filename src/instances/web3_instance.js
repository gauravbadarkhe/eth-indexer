import log_node from "log-node";
log_node();
import Web3 from "web3";
import Graceful from "node-graceful";
import _log from "log";
import subscriptionManager from "../core/subscription_manager.js";

const log = _log.get("web3-instance");
let isIndexorLive = false;
const endPints = {
  ws: "wss://eth-mainnet.blastapi.io/6f2c5ff7-9eab-41ee-9dfb-232d52811035",
  http: "'https://mainnet.infura.io/v3/2c1e7c210e064ad88c97474ecd3e1a40'",
};

const web3_instance = new Web3(
  new Web3.providers.WebsocketProvider(endPints.ws)
);

console.log(`Web3 Provider Connected.`);

Graceful.on("exit", async () => {
  web3_instance.currentProvider.disconnect();
  console.log("Gracefully Disconnected web3 provider & subscriptions");
  return;
});

export const web3_helpers = {
  setLiveIndexerStatus: (status) => {
    isIndexorLive = status;
  },
  getLiveIndexerStaus: () => isIndexorLive,
  getBlockByNumber: async (blockNumber) =>
    await web3_instance.eth.getBlock(blockNumber),
  getTransactionFromBlock: async (blockId) =>
    await web3_instance.eth.getTransactionFromBlock(blockId),
  getTransactionById: async (transactionId) =>
    await web3_instance.eth.getTransaction(transactionId),
};

export default web3_instance;
