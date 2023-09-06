import "dotenv/config";
import EthereumIndexer from "./src/core/ethereum_indexer.js";
import { connectMongoDB } from "./src/instances/mongo_instance.js";

connectMongoDB()
  .then(() => {
    const indexer = new EthereumIndexer({ liveIndexer: true });
  })
  .catch(console.dir);
