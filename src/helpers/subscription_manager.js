import Graceful from "node-graceful";
import web3_instance from "../instances/web3_instance.js";

class SubscriptionManager {
  constructor() {
    // Singelton Pattern
    if (SubscriptionManager.instance == null) {
      this.subscriptions = {};
      SubscriptionManager.instance = this;
    }
    console.log("Sent Back Singelton");
    return SubscriptionManager.instance;
  }

  getActiveSubs() {
    return this.subscriptions;
  }

  subscribe(eventTag, dataCallback, errorCallback) {
    web3_instance.eth.subscribe("newBlockHeaders").then((subscription) => {
      this.subscriptions[eventTag] = subscription;

      subscription.on("data", function (blockHeader) {
        dataCallback(blockHeader);
      });

      subscription.on("error", (err) => {
        console.error(`SubscriptionManager Error On ${event}`, err);
        errorCallback(err);
      });
    });
  }

  async unsubscribe(eventTag) {
    if (!this.subscriptions[eventTag]) {
      console.log(`No active subscription with tag ${eventTag}`);
      return;
    }

    return new Promise((resolve, reject) => {
      console.log("Un Subbing ", eventTag);
      this.subscriptions[eventTag].unsubscribe(function (error, success) {
        if (success) {
          console.log(`${subscription.tag} Successfully unsubscribed!`);
          delete this.subscriptions[eventTag];
          return resolve(`unsubscribe -> ${eventTag}`);
        } else {
          console.error(`Error Unsubscribing from ${eventTag}`, error);
          return reject(error);
        }
      });
    });
  }

  async unsubscribeAll() {
    const keys = Object.keys(this.subscriptions);
    for (const eventTag of keys) {
      await this.unsubscribe(eventTag);
    }
  }
}

const subscriptionManager = new SubscriptionManager();

export const SUB_EVENTS = {
  NEW_BLOCK_HEADERS: "newBlockHeaders",
};
export default subscriptionManager;
Object.freeze(subscriptionManager);
