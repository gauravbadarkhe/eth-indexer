import Web3 from "web3";
import Graceful from "node-graceful";
import web3_instance from "./instances/web3_instance.js";
import mongo_instance, { connect } from "./instances/mongo_instance.js";
import subscriptionManager, {
  SUB_EVENTS,
} from "./helpers/subscription_manager.js";

subscriptionManager.subscribe(
  SUB_EVENTS.NEW_BLOCK_HEADERS,
  (data) => {
    console.log("data", data);
  },
  (err) => {
    console.error(err);
  }
);
