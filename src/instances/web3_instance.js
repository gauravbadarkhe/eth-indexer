import log_node from "log-node";
log_node();
import Web3 from "web3";
import Graceful from "node-graceful";
import _log from "log";
import subscriptionManager from "../helpers/subscription_manager.js";

const log = _log.get("web3-instance");
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

export default web3_instance;
