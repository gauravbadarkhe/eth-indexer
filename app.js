import "dotenv/config";
import EthereumIndexer from "./src/core/ethereum_indexer.js";
import { connectMongoDB } from "./src/instances/mongo_instance.js";
import express from "express";
import * as fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import {
  getBlocksFromDB,
  getStats,
  getTransactionsFromDB,
} from "./src/core/ethereum_explorer.js";

let clients = [];
let latestBlock = {};
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function eventsHandler(request, response, next) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  response.writeHead(200, headers);
  const data = `data: ${JSON.stringify(
    latestBlock,
    (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
  )}\n\n`;

  response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response,
  };

  clients.push(newClient);

  request.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
}

function sendEventsToAll(newBlock) {
  latestBlock = newBlock;
  clients.forEach((client) => {
    const data = `data: ${JSON.stringify(
      latestBlock,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    )}\n\n`;
    client.response.write(data);
    console.log("Response sent to client");
  });
}

app.get("/events", eventsHandler);
app.get("/blocks", getBlocksFromDB);
app.get("/blocks/transactions/:blockId", getTransactionsFromDB);
app.get("/stats", getStats);

connectMongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express Server listening on port ${port}`);
    });
    return;
  })
  .then(() => {
    const indexer = new EthereumIndexer({
      liveIndexer: true,
      storeInDB: true,
    });
    indexer.registerCallback(sendEventsToAll);
  })
  .catch((error) => {
    console.error("app.js");
    console.dir(error);
  });
